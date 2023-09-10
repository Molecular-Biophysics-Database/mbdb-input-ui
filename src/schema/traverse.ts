import { AnyItem, Item, Schema } from './';
import { Path } from './data';
import { assert } from '../assert';

export const Traverse = {
    itemFromSchema(objPath: string, schema: AnyItem): Item {
        assert(objPath !== '', 'Top-level schema item shall not be retrieved from this function.');

        const toks = objPath.split('/');

        let item: Item | undefined = schema as Item;
        let idx;
        for (idx = 0; idx < toks.length; idx++) {
            const tok = toks[idx];

            if (Schema.hasComplexInput(item!)) {
                item = item.input.find((im) => im.tag === tok);
            } else if (Schema.hasVariantInput(item!)) {
                item = item.input[tok];
            } else {
                assert(false, `Attempted to descend into item "${item!.tag}" but that item does not have a descendable. This happened with object path "${objPath}"`);
            }
            assert(item !== undefined, `No item in schema for object path "${objPath}", failed at path token "${tok}"`);
        }

        assert(idx === toks.length, `Did not exhaust object path "${objPath}", got stuck on index ${idx}`);

        return item;
    },

    objPath(tag: string, prefix: string) {
        return !prefix ? tag : `${prefix}/${tag}`;
    },

    objPathFromDataPath(dataPath: Path) {
        let objPath = '';

        for (const tok of dataPath) {
            if (tok.kind === 'index') {
                // We do not care about array indices here because the number of array elements
                // does not matter when we try to retrieve an item from the schema.
                continue;
            }
            objPath = this.objPath(tok.value.toString(), objPath);
        }

        return objPath;
    },
};
