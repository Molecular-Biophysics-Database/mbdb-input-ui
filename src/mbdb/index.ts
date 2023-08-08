import { MbdbData } from './data';
import { assert } from '../assert';
import { FormContext } from '../context';
import { Register } from '../ui/form/custom-components/register';
import { ComplexItem, Item, Schema, VariantItem } from '../schema';
import { Data, DataTree, Path } from '../schema/data';
import { Traverse } from '../schema/traverse';
import { Value } from '../schema/value';

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

function toMbdbDataSimpleItem(internalData: DataTree, internalParentPath: Path, mbdbData: MbdbData, mbdbArrayIndices: number[], errors: string[], item: Item) {
    if (Schema.hasRelatedToInput(item)) {
        const id = Data.getValue(internalData, Data.Path.path('id', internalParentPath));
        if (!Value.isEmpty(id)) {
            const tree = Data.getTree(internalData, internalParentPath);
            for (const k in tree) {
                const vPath = Data.Path.path(k, internalParentPath);
                const v = Data.getValue(internalData, vPath);
                if (!Value.isValid(v)) {
                    errors.push(Data.Path.toString(vPath));
                } else {
                    const storePath = MbdbData.Path.toPath(item.mbdbPath, mbdbArrayIndices);
                    // REVIEW: Here we assume that the related data are primitive values. Can we get something else here?
                    assert(Value.isTextual(v) || Value.isBoolean(v) || Value.isTristate(v), `Unexpected value type on path "${Data.Path.toString(vPath)}"`);
                    MbdbData.set(mbdbData, v.payload, storePath);
                }
            }
        }
    } else if (Schema.hasCustomInput(item)) {
        const cc = Register.get(item.component);
        const customData = cc.toMbdb(internalData, internalParentPath, errors);
        MbdbData.set(mbdbData, customData, MbdbData.Path.toPath(item.mbdbPath, mbdbArrayIndices));
    } else {
        const v = Data.getValue(internalData, internalParentPath);

        if (!item.isRequired && Value.isEmpty(v)) {
            return; // Ignore optional empty value
        }
        if (!Value.isValid(v)) {
            // Log error and ignore the value
            errors.push(Data.Path.toString(internalParentPath));
            return;
        }

        const storePath = MbdbData.Path.toPath(item.mbdbPath, mbdbArrayIndices);
        if (Schema.hasOptionsInput(item)) {
            assert(Value.isOption(v), `Value is not an Option value`);
            if (Value.isEmptyOption(v)) {
                if (item.isRequired) {
                    errors.push(Data.Path.toString(internalParentPath));
                }
            } else {
                const out = Schema.isOtherChoice(v) ? Value.toOtherOption(v) : Value.toOption(v);
                MbdbData.set(mbdbData, out, storePath);
            }
        } else if (Schema.hasBooleanInput(item)) {
            if (item.isRequired) {
                MbdbData.set(mbdbData, Value.toBoolean(v), storePath);
            } else {
                const tv = Value.toTristate(v);
                if (tv === 'true') MbdbData.set(mbdbData, true, storePath);
                else if (tv === 'false') MbdbData.set(mbdbData, false, storePath);
                // Do not set anything if Tristate is none
            }
        } else if (Schema.hasCalendarDateInput(item)) {
            const { year, month, day } = Value.toCalendarDate(v);
            const out = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            MbdbData.set(mbdbData, out, storePath);
        } else {
            MbdbData.set(mbdbData, v.payload, storePath);
        }
    }
}

function toMbdbDataItem(internalData: DataTree, internalParentPath: Path, mbdbData: MbdbData, mbdbArrayIndices: number[], errors: string[], item: Item) {
    if (Schema.hasComplexInput(item)) {
        toMbdbDataTree(internalData, internalParentPath, mbdbData, mbdbArrayIndices, errors, item);
    } else if (Schema.hasVariantInput(item)) {
        toMbdbDataVariant(internalData, internalParentPath, mbdbData, mbdbArrayIndices, errors, item);
    } else {
        toMbdbDataSimpleItem(internalData, internalParentPath, mbdbData, mbdbArrayIndices, errors, item);
    }
}

function toMbdbDataVariant(internalData: DataTree, internalParentPath: Path, mbdbData: MbdbData, mbdbArrayIndices: number[], errors: string[], item: VariantItem) {
    assert(item.discriminator !== undefined, `Item with variant input does not specify a type discriminator.`);

    const v = Data.getTree(internalData, internalParentPath);
    const choice = FormContext.readVariantChoice(v);
    const varItem = item.input[choice];
    assert(varItem !== undefined, `Variant choice "${choice}" is invalid for input item "${Data.Path.toString(internalParentPath)}}"`);

    if (Schema.hasComplexInput(varItem)) {
        toMbdbDataTree(internalData, Data.Path.path(choice, internalParentPath), mbdbData, mbdbArrayIndices, errors, varItem);
    } else if (Schema.hasVariantInput(varItem)) {
        toMbdbDataVariant(internalData, Data.Path.path(choice, internalParentPath), mbdbData, mbdbArrayIndices, errors, varItem);
    } else {
        toMbdbDataSimpleItem(internalData, Data.Path.path(choice, internalParentPath), mbdbData, mbdbArrayIndices, errors, varItem);
    }

    MbdbData.set(mbdbData, choice, MbdbData.Path.toPath(MbdbData.Path.extend(item.discriminator, item.mbdbPath), mbdbArrayIndices));
}

function toMbdbDataTree(internalData: DataTree, internalParentPath: Path, mbdbData: MbdbData, mbdbArrayIndices: number[], errors: string[], item: ComplexItem) {
    const tree = Data.getTree(internalData, internalParentPath);
    for (const k in tree) {
        if (Schema.isReservedKey(k)) continue;

        const path = Data.Path.path(k, internalParentPath);
        const innerItem = Traverse.itemFromSchema(k, item);

        if (innerItem.isArray) {
            const v = Data.getArray(internalData, path);

            assert(Array.isArray(v), `Expected an array of values for input at object path "${Data.Path.toString(path)}"`);
            for (let idx = 0; idx < v.length; idx++) {
                toMbdbDataItem(internalData, Data.Path.index(idx, path), mbdbData, [...mbdbArrayIndices, idx], errors, innerItem);
            }
        } else {
            toMbdbDataItem(internalData, Data.Path.path(k, internalParentPath), mbdbData, mbdbArrayIndices, errors, innerItem);
        }
    }
}

export const Mbdb = {
    toData(ctx: FormContext, schema: ComplexItem) {
        const data = {};
        const errors = new Array<string>();
        toMbdbDataTree(ctx.data, [], data, [], errors, schema);
        pruneEmpty(data);

        return {
            toApi: {
                metadata: data
            },
            errors,
        };
    },
}
