#! /usr/bin/env python3

from argparse import ArgumentParser
from pathlib import Path
import pprint
import re
import traceback
from typing import Dict, List, Union
import uuid
import yaml

MBDBModel = Dict[str, Union[str, Dict]]
HelpFieldRegex = re.compile('^(\\^)?help.([a-z]){2}$')
JSVarNameRegex = re.compile('^([A-Za-z_]){1}([A-Za-z0-9_])*$')

ITEMS_OF_INTERNAL_ID_TYPE = [
    'identifier',
    'internal_id',
    'measurement_group_id',
]

CUSTOM_COMPONENTS = {
    'Value_error': 'value-error',
}

PAD = ' ' * 4


class UIGParamsError(Exception):
    pass


class UIGSchemaError(Exception):
    pass


class ImportedItem:
    def __init__(self, defi: str, name: str, props: Dict, mbdbPath: str):
        parts = defi.split('_')
        self._js_var = ''.join([part.capitalize() for part in parts])
        self._js_file = '-'.join([part.lower() for part in parts])
        self._name = name
        self._props = props
        self._mbdbPath = mbdbPath

    def itemProps(self):
        return make_ui_item(self._name, self._props, self._mbdbPath)

    def jsFileName(self):
        return self._js_file

    def jsVarName(self):
        return self._js_var


class TypeDefnArg:
    def __init__(self, name):
        self.name = name
        self.args = []

    def __str__(self):
        return f'Name: "{self.name}", args: "{self.args}"'


pp = pprint.PrettyPrinter(indent=2, compact=False)


def _mk_parser():
    parser = ArgumentParser(
        description='MBDB UI Generator. A tool to generate a UI definition schema from a OARepo database schema file.'
    )
    parser.add_argument(
        '--input',
        type=Path,
        required=True,
        help='Input OARepo schema file.'
    )
    parser.add_argument(
        '--output',
        type=Path,
        required=False,
        help='Name of the output file. Output is written to stdout if no output file is provided.'
    )
    parser.add_argument(
        '--schema_name',
        type=str,
        required=False,
        help='Name of the schema. Used to generate more specific output.'
    )
    parser.add_argument(
        '--imported_defis',
        type=str,
        required=False,
        help='List of "$defs/<NAME>" definitions that will not be generated directly but imported from another file. It is your responsibility to make sure that all imported definitions are available',
        nargs='+'
    )
    parser.add_argument(
        '--partial',
        required=False,
        help='Schema will not be exported as a "TopLevelItem" but a plain object. This is useful when you want to create only partial schemas that can be imported by other schemas',
        action='store_true'
    )

    return parser


def _warn(msg):
    print('WARNING: {}'.format(msg))


def append_path(tail, prefix):
    return prefix + ('/' if prefix else '') + tail


def closing_string_index(s: str):
    N = len(s)

    idx = 0
    while idx < N:
        ch = s[idx]
        if ch == "'":
            return idx

        idx += 1

    raise UIGSchemaError(f'Unterminated string in string "{s}"')


def gather_helps_for_custom_component(item, defs):
    # THis is pretty much a very simplfied version of the recursive walk used in item_defn()
    # We only care about help texts that we gather into a stuctured key-value store

    helps = {}

    if 'properties' in item:
        defn = item['properties']
        for inner_name, inner_item in defn.items():
            helps[inner_name] = gather_helps_for_custom_component(inner_item, defs)
    elif 'use' in item:
        # BEWARE: There were no components that would exercise this branch so it may not work :)
        inner_item, _ = get_item_from_defs(item['use'], defs)
        for inner_name, inner_item in inner_item.items():
            helps[inner_name] = gather_helps_for_custom_component(inner_item, defs)

    help_fields = get_help_fields(item)
    if help_fields:
        for hf in help_fields:
            lang = hf.split('.')[1]
            helps[lang] = item[hf]

    return helps


def get_custom_component(path):
    c = CUSTOM_COMPONENTS

    for tok in path:
        if tok in c:
            c = c[tok]
        else:
            return None

    return c


def get_defi_path(defi: str):
    idx = defi.rfind('/');
    return defi[idx + 1:].split('/');


def get_item_from_defs(defi, defs):
    item_path = get_defi_path(defi)
    custom_item = get_custom_component(item_path)

    item = defs
    while item_path:
        p = item_path.pop(0)
        if p not in defs:
            raise UIGParamsError(f'Requested definition on path "{id}" but no such definition exists')
        item = item[p]

    return (item, custom_item)


def get_help_fields(item):
    help_fields = []

    if not isinstance(item, dict):
        _warn(f'Item "{item}" is not a dictionary. I will ignore it but you definitely want to check the input file and fix the issue there.')
        return []

    for key in item.keys():
        if HelpFieldRegex.match(key):
            help_fields.append(key)

    return help_fields


def item_defn(item, defs, name, mbdbPath, imported_defis):
    defn = {}
    help_fields = get_help_fields(item)

    if 'properties' in item:
        defn['input'] = ui_defn(item['properties'], defs, mbdbPath, imported_defis)
    elif 'use' in item:
        inner_item, custom_item = get_item_from_defs(item['use'], defs)
        if custom_item:
            defn['input'] = 'custom'
            defn['component'] = custom_item
            defn['help'] = gather_helps_for_custom_component(inner_item, defs)

            help_fields = [] # To avoid using the generic help fields filler and the end of this function
        else:
            if isinstance(inner_item, str):
                defn['input'] = inner_item
            else:
                defn = item_defn(inner_item, defs, name, mbdbPath, imported_defis)
    elif 'type' in item:
        t = item['type']
        if t == 'boolean':
            defn['input'] = 'boolean'
        elif t == 'integer':
            defn['input'] = 'int'
            if 'minimum' in item:
                defn['minimum'] = item['minimum']
            if 'maximum' in item:
                defn['maximum'] = item['maximum']
        elif t == 'double':
            defn['input'] = 'float'
            if 'minimum' in item:
                defn['minimum'] = item['minimum']
            if 'maximum' in item:
                defn['maximum'] = item['maximum']
        elif t == 'date':
            defn['input'] = 'calendar-date'
        elif t == 'keyword':
            if 'enum' in item:
                choices = [{ 'tag': x, 'title': x } for x in item['enum']]
                defn['input'] = 'options'
                defn['choices'] = choices
            # MEGAHAKZ MEGAHAKZ MEGAHAKZ - This section below needs to be reworked
            elif name in ITEMS_OF_INTERNAL_ID_TYPE:
                defn['input'] = 'internal-id'
            elif name == 'version':
                defn['input'] = 'ignore' # Temporary HAKZ
            else:
                defn['input'] = 'string'
        elif t == 'polymorphic':
            if 'schemas' not in item:
                raise UIGSchemaError('Got a polymorphic type but no "schemas"')
            if 'discriminator' not in item:
                raise UIGSchemaError('Got a polymorphic type but no "discriminator"')

            discriminator = item['discriminator']

            variants = {}
            for name, schema in item['schemas'].items():
                ui = make_ui_item(name, schema, mbdbPath)
                inner_defn = item_defn(schema, defs, name, mbdbPath, imported_defis)

                if not mark_discriminator_item_as_discriminator(inner_defn, discriminator):
                    pp.pprint(inner_defn)
                    raise UIGSchemaError(f'Field "{discriminator}" is used as polymorphic type discriminator but it is not present in the polymorphic type')

                ui = { **ui, **inner_defn }
                variants[name] = ui

            defn['input'] = variants
            defn['discriminator'] = discriminator
        elif t == 'relation':
            if 'model' not in item:
                raise UIGSchemaError(f'Field "{item.tag}" is a relation but does not say which item it relates to ("model" key is missing)')
            if 'keys' not in item:
                raise UIGSchemaError(f'Field "{item.tag}" is a relation but does not say which fields from the related item it is interested in ("keys" key is missing)')

            defn['input'] = 'related-to'
            defn['relatesTo'] = mbdb_relates_to(item['model'])
            defn['relatedKeys'] = mbdb_related_keys(item['keys'])

        elif t == 'url':
            # files are urls in the model, but they're marked with having (^)ui_file_context
            if "ui_file_context" in [k.removeprefix("^") for k in item.keys()]:
                defn['input'] = 'file'
            # not all urls are files, some are just urls
            else:
                defn['input'] = 'url'

        elif t == 'uuid':
            defn['input'] = 'uuid'
        elif t == 'vocabulary':
            if 'vocabulary-type' not in item:
                raise UIGSchemaError(f'Field "{item.tag}" is a vocabulary but it does not specify vocabulary-type')
            if 'keys' not in item:
                raise UIGSchemaError(f'Field "{item.tag}" is a vocabulary but it does not specify any keys')

            defn['input'] = 'vocabulary'
            defn['vocabularyType'] = item['vocabulary-type']
            defn['vocabularyKeys'] = item['keys']
        else:
            _warn(f'Type "{t}" is not handled, setting its input type to "ignore".')
            defn['input'] = 'ignore'
    else:
        _warn(f'I do not know how to handle item "{item}", setting its input type to "unknown".')
        defn['input'] = 'unknown'

    if 'id' in item:
        repurpose_id_as_referenceable_id(defn, item['id'])
    if help_fields:
        help = {}
        for hf in help_fields:
            lang = hf.split('.')[1]
            help[lang] = item[hf];

        defn['help'] = help

    # defn['internalId'] = uuid_for_item()

    return defn


def imported_defi(item: Dict, imported_defis: List[str]):
    if not 'use' in item:
        return None

    defi = '_'.join(get_defi_path(item['use']))
    return defi if (defi in imported_defis) else None


def make_ui_item(name, props, mbdbPath):
    isArray = name.endswith('[]')

    item = {
        'tag': mbdb_tag(name),
        'label': mbdb_tag(name),
        'isArray': isArray,
        'isRequired': False,
        'mbdbPath': mbdbPath,
    }

    if isArray:
        if '^required' in props and props['^required'] == True:
            item['isRequired'] = True
        if '^minItems' in props:
            item['minItems'] = props['^minItems']
    else:
        if 'required' in props and props['required'] == True:
            item['isRequired'] = True

    return item


def mark_discriminator_item_as_discriminator(defn, discr):
    if isinstance(defn['input'], dict):
        for item in defn['input'].values():
            return mark_discriminator_item_as_discriminator(item, discr)
    elif isinstance(defn['input'], list):
        for item in defn['input']:
            if item['tag'] == discr:
                item['input'] = 'variant-discriminator'
                return True
    else:
        return defn['tag'] == discr

    return False


def mbdb_related_keys(keys):
    if not isinstance(keys, list):
        raise UIGSchemaError(f'Related keys must be a list, got {keys} instead')

    # TODO: We should check if the keys really exists in the item we are referencing
    return keys


def mbdb_relates_to(relation):
    idx = relation.find('#')
    if idx != 0:
        raise UIGSchemaError(f'Relation value "{relation}" must begin with "#"')

    rel = relation[1:]
    if len(rel) == 0:
        raise UIGSchemaError(f'Relation value "{relation} is empty')

    return rel


def mbdb_tag(name):
    return name[:-2] if name.endswith('[]') else name


def oarepo_definition_to_ui(input_file: Path, imported_defis: List[str]):
    fh = open(input_file, 'r')
    model = yaml.safe_load(fh)
    fh.close()

    defs = model['$defs']
    if not defs:
        raise UIGSchemaError('Model does not contain "$defs"')

    top_level_defn = model['record']['properties']['metadata']['properties']
    if not top_level_defn:
        raise UIGSchemaError('Model does not define anything')

    return ui_defn(top_level_defn, defs, '', imported_defis)


def repurpose_id_as_referenceable_id(defn, reference_as):
    # HAKZ HAKZ HAKZ:
    # The model definition does not tell us anything useful here so we have to deploy some guesswork.
    # If an item is "referenceable", it means that other items in the model will refer to that item.
    # An item must be referenceable by some unique ID. That ID must be part of the data associated
    # with the item. The UI should generate such IDs automatically. But how can the UI know which
    # datum of the item is used as the referenceable ID if the model definition does not tell us?
    # Well, we will just assume that that a "keyword" type of item named "id" is the ID.

    if 'input' not in defn:
        pp.pprint(defn)
        raise UIGSchemaError('Item does not have "input" key')

    input = defn['input']

    if isinstance(input, dict):
        for inner_defn in input.values():
            repurpose_id_as_referenceable_id(inner_defn, reference_as)
    elif isinstance(input, list):
        did_fixup = False
        for inner_defn in input:
            if inner_defn['tag'] == 'id':
                if not isinstance(inner_defn['input'], str) or inner_defn['input'] != 'string':
                    raise UIGSchemaError('Attempted to repurpose the "id" inner item for referenceable ID but it has a wrong input type.')
                inner_defn['input'] = 'referenceable-id'
                inner_defn['referenceAs'] = reference_as
                did_fixup = True

        if not did_fixup:
            raise UIGSchemaError('Attempted to repurpose the "id" inner item for referenceable ID but no such inner item exists.')

    else:
        pp.pprint(defn)
        raise UIGSchemaError('Got a referenceable item that does not have complex input. I do not know what to do with that.')


def to_js(schema_name, ui, as_partial: bool):
    collected_imports: List[ImportedItem] = []

    items = f'export const {schema_name} = '
    items += to_js_item(ui[0], 0, collected_imports) if as_partial else to_js_complex(ui, 0, collected_imports)
    items += ';\n'

    if as_partial and len(ui) > 1:
        _warn(f'Partial schemas should contain only one top-level object but the input schema defines {len(ui)} top-level objects. Only the first object was exported')

    if collected_imports:
        imports = "import { clone } from '../../util/just-clone';\n"
        imports += '\n'.join(["import {{ {} }} from './{}';".format(imp.jsVarName(), imp.jsFileName()) for imp in collected_imports])

        return imports + '\n\n' + items
    else:
        return items


def to_js_complex(input: List, indent: int, collected_imports: List[ImportedItem]):
    SPC = PAD * indent
    out = '[\n'

    for item in input:
        out += to_js_item(item, indent + 1, collected_imports) + ',\n'

    out += SPC + ']'

    return out


def to_js_input(input: Dict | List | str, indent: int, collected_imports: List[ImportedItem]):
    if isinstance(input, list):
        return to_js_complex(input, indent, collected_imports)
    elif isinstance(input, dict):
        return to_js_variant(input, indent, collected_imports)
    else:
        return f'\'{input}\''


def to_js_item(item: Dict | ImportedItem, indent: int, collected_imports: List[ImportedItem], no_lead_indent = False):
    SPC = PAD * indent

    out = ('' if no_lead_indent else SPC) + '{\n'
    if isinstance(item, ImportedItem):
        out += '{}...clone({}),\n'.format(SPC + PAD, item.jsVarName())
        for k, v in item.itemProps().items():
            out += SPC + PAD + '{}: {},\n'.format(to_js_key(k), to_js_value(v, indent + 1, collected_imports))

        collected_imports.append(item)
    else:
        for k, v in item.items():
            if k == 'input':
                out += SPC + PAD + 'input: {},\n'.format(to_js_input(v, indent + 1, collected_imports))
            else:
                out += SPC + PAD + '{}: {},\n'.format(to_js_key(k), to_js_value(v, indent + 1, collected_imports))

    out += SPC + '}'

    return out


def to_js_key(k: str):
    if ' ' in k:
        return "'" + k + "'"
    return k


def to_js_value(v, indent: int, collected_imports: List[ImportedItem]):
    if isinstance(v, str):
        v = v.replace("'", "\\'")
        return f'\'{v}\''
    elif isinstance(v, bool):
        return 'true' if v else 'false'
    elif isinstance(v, list):
        SPC = PAD * indent
        out = '[\n'
        for elem in v:
            if isinstance(elem, dict):
                out += to_js_item(elem, indent + 1, collected_imports) + ',\n'
            else:
                out += SPC + PAD + to_js_value(elem, indent + 1, collected_imports) + ',\n'
        out += SPC + ']'

        return out
    elif isinstance(v, dict):
        SPC = PAD * indent
        out = '{\n'
        for k, v in v.items():
            out += SPC + PAD + '{}: {},\n'.format(to_js_key(k), to_js_value(v, indent + 1, collected_imports))
        out += SPC + '}'

        return out
    else:
        return v


def to_js_variant(input: Dict, indent: int, collected_imports: List[ImportedItem]):
    SPC = PAD * indent
    out = '{\n'

    for k, v in input.items():
        out += SPC + PAD + '{}: {},\n'.format(to_js_key(k), to_js_item(v, indent + 1, collected_imports, True))

    out += SPC + '}'

    return out


def ui_defn(defn, defs, parentMbdbPath, imported_defis):
    ui = []
    for name, props in defn.items():
        mbdbPath = append_path(name, parentMbdbPath)

        imported = imported_defi(props, imported_defis)
        if imported:
            ui.append(ImportedItem(imported, name, props, mbdbPath))
        else:
            input_defn = item_defn(props, defs, name, mbdbPath, imported_defis)
            item = make_ui_item(name, props, mbdbPath)
            item = { **item, **input_defn }
            ui.append(item)

    return ui


def uuid_for_item():
    return str(uuid.uuid4())


if __name__ == '__main__':
    parser = _mk_parser()
    args = parser.parse_args()

    try:
        input_file: Path = args.input
        if not input_file.is_file():
            raise UIGParamsError('Input file does not exist or it is not a file')

        schema_name = args.schema_name if args.schema_name else 'UI'
        if not JSVarNameRegex.match(schema_name):
            raise UIGParamsError(f'"schema_name" must be a valid JavaScript variable name but "{schema_name}" is not.')

        imported_defis = args.imported_defis if args.imported_defis else []

        ui = oarepo_definition_to_ui(input_file, imported_defis)
        js = to_js(schema_name, ui, args.partial)

        output_file = args.output
        if output_file:
            with open(output_file, 'w') as fh:
                fh.write(js)
        else:
            print(js)
    except UIGParamsError as ex:
        print(f'*** Invalid parameters: {ex}')
    except UIGSchemaError as ex:
        print(f'*** Cannot process the schema: {ex}')
        print(traceback.format_exc())
