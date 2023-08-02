import { assert } from '../assert';
import { FormContext } from '../context';
import { Register } from '../ui/form/custom-components/register';
import { Item, Schema, VariantItem } from '../schema';
import { Data, DataTree, Path } from '../schema/data';
import { Traverse } from '../schema/traverse';
import { Value } from '../schema/value';

export type MbdbScalar = number | string | boolean;
export type MbdbData = { [key: string]: MbdbData | MbdbData[] | MbdbScalar | MbdbScalar[] };


function isArray(obj: MbdbData | MbdbScalar[]): obj is MbdbData {
    return Array.isArray(obj);
}
function isArrayKey(k: keyof MbdbData | keyof MbdbScalar[]): k is keyof MbdbData {
    return typeof k === 'number';
}

function isTree(obj: MbdbData | MbdbScalar[]): obj is MbdbData {
    return typeof obj === 'object' && !Array.isArray(obj);
}
function isTreeKey(k: keyof MbdbData | keyof MbdbScalar[]): k is keyof MbdbData {
    return typeof k === 'string';
}

function pruneEmpty(data: Record<string, any>) {
    for (const prop in data) {
        const child = data[prop as keyof typeof data];

        if (typeof child === 'object' && !Array.isArray(child)) {
            pruneEmpty(child);

            if (Object.keys(child).length === 0) {
                delete data[prop as keyof typeof data];
            }
        }
    }
}

function toModelJsonSimpleItem(internalData: DataTree, data: MbdbData | MbdbScalar[], parentPath: Path, item: Item, k: keyof MbdbData | keyof MbdbScalar[], errors: string[]) {
    assert((isTree(data) && isTreeKey(k)) || (isArray(data) && isArrayKey(k)), `Mismatching "MbdbData/string" or "MbdbScalar[]/number" value/key pair with values "${data.toString()}" / "${k.toString()}"`);

    if (Schema.hasRelatedToInput(item)) {
        const idPath = Data.Path.path('id', parentPath);
        const id = Data.getValue(internalData, idPath);

        if (Value.isEmpty(id)) {
            return; // Empty ID means no data
        }

        data[k] = {};
        // REVIEW: Here we assume that the related data are primitive values
        const pv = Data.getTree(internalData, parentPath);
        for (const ik in pv) {
            const path = Data.Path.path(ik, parentPath);
            (data[k] as MbdbData)[ik] = Data.getValue(internalData, path);
        }

        return;
    }

    if (Schema.hasCustomInput(item)) {
        const cc = Register.get(item.component);
        data[k] = cc.toMbdb(internalData, parentPath, errors);
    } else {
        const v = Data.getValue(internalData, parentPath);

        if (!item.isRequired && Value.isEmpty(v)) {
            return; // Ignore optional empty value
        }

        if (!Value.isValid(v)) {
            // Log error and ignore the value
            errors.push(Data.Path.toString(parentPath));
            return;
        }

        if (Schema.hasOptionsInput(item)) {
            assert(Value.isOption(v), `Value is not an Option value`);
            const out = Schema.isOtherChoice(v) ? Value.toOtherOption(v) : Value.toOption(v);
            data[k] = out;
        } else {
            if (Schema.hasBooleanInput(item)) {
                if (item.isRequired) {
                    data[k] = Value.toBoolean(v);
                } else {
                    const tv = Value.toTristate(v);
                    if (tv === 'true') data[k] = true;
                    else if (tv === 'false') data[k] = false;
                    // Do not set anything if Tristate is none
                }
            } else if (Schema.hasCalendarDateInput(item)) {
                const { year, month, day } = Value.toCalendarDate(v);
                data[k] = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            } else {
                data[k] = v.payload;
            }
        }
    }
}

function toModelJsonVariantItem(internalData: DataTree, data: MbdbData, parentPath: Path, item: VariantItem, errors: string[], schema: Item) {
    assert(item.discriminator !== undefined, `Item with variant input does not specify a type discriminator.`);

    const v = Data.getTree(internalData, parentPath);
    const choice = FormContext.readVariantChoice(v);
    const varItem = item.input[choice];
    assert(varItem !== undefined, `Variant choice "${choice}" is invalid for input item "${Data.Path.toString(parentPath)}}"`);

    if (Schema.hasComplexInput(varItem)) {
        toModelData(internalData, data, Data.Path.path(choice, parentPath), errors, schema);
    } else if (Schema.hasVariantInput(varItem)) {
        toModelJsonVariantItem(internalData, data, Data.Path.path(choice, parentPath), varItem, errors, schema);
    } else {
        toModelJsonSimpleItem(internalData, data, Data.Path.path(choice, parentPath), varItem, choice, errors);
    }
    data[item.discriminator] = choice;
}

function toModelJsonItem(internalData: DataTree, data: MbdbData | MbdbScalar[], parentPath: Path, item: Item, k: keyof MbdbData | keyof MbdbScalar[], errors: string[], schema: Item) {
    assert((isTree(data) && isTreeKey(k)) || (isArray(data) && isArrayKey(k)), `Mismatching "MbdbData/string" or "MbdbScalar[]/number" value/key pair with values "${data.toString()}" / "${k.toString()}"`);

    if (Schema.hasComplexInput(item)) {
        data[k] = {};
        toModelData(internalData, data[k] as MbdbData, parentPath, errors, schema);
    } else if (Schema.hasVariantInput(item)) {
        data[k] = {};
        toModelJsonVariantItem(internalData, data[k] as MbdbData, parentPath, item, errors, schema);
    } else {
        toModelJsonSimpleItem(internalData, data, parentPath, item, k, errors);
    }
}

function toModelData(internalData: DataTree, data: MbdbData, parentPath: Path, errors: string[], schema: Item) {
    const pv = Data.getTree(internalData, parentPath);
    for (const k in pv) {
        if (Schema.isReservedKey(k)) continue;

        const path = Data.Path.path(k, parentPath);
        const item = Traverse.itemFromSchema(Traverse.objPathFromDataPath(path), schema);

        if (item.isArray) {
            const v = Data.getArray(internalData, path);

            assert(Array.isArray(v), `Expected an array of values for input at object path "${Data.Path.toString(path)}"`);
            const a = new Array<MbdbScalar>(v.length);
            for (let idx = 0; idx < v.length; idx++) {
                toModelJsonItem(internalData, a, Data.Path.index(idx, path), item, idx, errors, schema);
            }
            if (a.length > 0) {
                data[k] = a;
            }
        } else {
            toModelJsonItem(internalData, data, path, item, k, errors, schema);
        }
    }
}

export const Mbdb = {
    toData(ctx: FormContext, schema: Item) {
        const data = {};
        const errors = new Array<string>();
        toModelData(ctx.data, data, [], errors, schema);
        pruneEmpty(data);

        return {
            toApi: {
                metadata: data
            },
            errors,
        };
    },
}
