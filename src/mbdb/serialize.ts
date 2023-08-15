import { MbdbData, MbdbScalar } from './data';
import { assert } from '../assert';
import { FormContext } from '../context';
import { Item, Schema, TopLevelItem, VariantItem } from '../schema';
import { Data, DataTree, Path } from '../schema/data';
import { Traverse } from '../schema/traverse';
import { Value } from '../schema/value';
import { Register } from '../ui/form/custom-components/register';

function toMbdbDataSimpleItem(internalData: DataTree, internalParentPath: Path, mbdbData: MbdbData, mbdbArrayIndices: number[], errors: string[], item: Item, options: Options) {
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
                    const storePath = MbdbData.Path.toPath(`${item.mbdbPath}/${k}`, mbdbArrayIndices);

                    // REVIEW: Here we assume that the related data are primitive values. Can we get something else here?
                    assert(Value.isTextual(v) || Value.isBoolean(v) || Value.isTristate(v), `Unexpected value type on path "${Data.Path.toString(vPath)}."`);
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

        if (!item.isRequired && Value.isEmpty(v) && !item.isArray) {
            return; // Ignore optional empty value but only if the value not directly in an array
        }

        if (!Value.isValid(v) && !options.ignoreErrors) {
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
        } else if (Schema.hasVocabularyInput(item)) {
            const out = Value.toVocabularyEntry(v);
            if (out.data !== null) {
                MbdbData.set(mbdbData, { id: out.id }, storePath);
            }
        } else {
            // NOTE: TS cannot figure out that we cannot get a VocabularyEntry type because that is
            //       covered by the hasVocabularyInput() check, hence the cast to MbdbScalar.
            MbdbData.set(mbdbData, v.payload as MbdbScalar, storePath);
        }
    }
}

function toMbdbDataItem(internalData: DataTree, internalParentPath: Path, mbdbData: MbdbData, mbdbArrayIndices: number[], errors: string[], item: Item, options: Options) {
    if (Schema.hasComplexInput(item)) {
        toMbdbDataTree(internalData, internalParentPath, mbdbData, mbdbArrayIndices, errors, item, options);
    } else if (Schema.hasVariantInput(item)) {
        toMbdbDataVariant(internalData, internalParentPath, mbdbData, mbdbArrayIndices, errors, item, options);
    } else {
        toMbdbDataSimpleItem(internalData, internalParentPath, mbdbData, mbdbArrayIndices, errors, item, options);
    }
}

function toMbdbDataVariant(internalData: DataTree, internalParentPath: Path, mbdbData: MbdbData, mbdbArrayIndices: number[], errors: string[], item: VariantItem, options: Options) {
    assert(item.discriminator !== undefined, `Item with variant input does not specify a type discriminator.`);

    const v = Data.getTree(internalData, internalParentPath);
    const choice = FormContext.readVariantChoice(v);
    const varItem = item.input[choice];
    assert(varItem !== undefined, `Variant choice "${choice}" is invalid for input item "${Data.Path.toString(internalParentPath)}}"`);

    if (Schema.hasComplexInput(varItem)) {
        toMbdbDataTree(internalData, Data.Path.path(choice, internalParentPath), mbdbData, mbdbArrayIndices, errors, varItem, options);
    } else if (Schema.hasVariantInput(varItem)) {
        toMbdbDataVariant(internalData, Data.Path.path(choice, internalParentPath), mbdbData, mbdbArrayIndices, errors, varItem, options);
    } else {
        toMbdbDataSimpleItem(internalData, Data.Path.path(choice, internalParentPath), mbdbData, mbdbArrayIndices, errors, varItem, options);
    }

    MbdbData.set(mbdbData, choice, MbdbData.Path.toPath(MbdbData.Path.extend(item.discriminator, item.mbdbPath), mbdbArrayIndices));
}

function toMbdbDataTree(internalData: DataTree, internalParentPath: Path, mbdbData: MbdbData, mbdbArrayIndices: number[], errors: string[], item: TopLevelItem, options: Options) {
    const tree = Data.getTree(internalData, internalParentPath);
    for (const k in tree) {
        if (Schema.isReservedKey(k)) continue;

        const path = Data.Path.path(k, internalParentPath);
        const innerItem = Traverse.itemFromSchema(k, item);

        if (innerItem.isArray) {
            const v = Data.getArray(internalData, path);
            const minItems = innerItem.minItems ?? 0;

            if (innerItem.isRequired && v.length < minItems && !options.ignoreErrors) {
                errors.push(`${Data.Path.toString(path)} must have at least ${minItems} but it has only ${v.length} items.`);
            } else {
                assert(Array.isArray(v), `Expected an array of values for input at object path "${Data.Path.toString(path)}"`);

                // The logic around this code never creates empty arrays. This is intentional because there should be no valid
                // reason to ever write empty arrays to the Mbdb data object. Empty array is expressed as the array key
                // not being present at all in the parent object.
                for (let idx = 0; idx < v.length; idx++) {
                    toMbdbDataItem(internalData, Data.Path.index(idx, path), mbdbData, [...mbdbArrayIndices, idx], errors, innerItem, options);
                }
            }
        } else {
            toMbdbDataItem(internalData, Data.Path.path(k, internalParentPath), mbdbData, mbdbArrayIndices, errors, innerItem, options);
        }
    }
}


export type Options = {
    ignoreErrors?: boolean,
};

export const Serialize = {
    serialize(ctx: FormContext, schema: TopLevelItem, options?: Options): { data: MbdbData, errors: string [] } {
        const data = {};
        const errors = new Array<string>();

        toMbdbDataTree(ctx.data, [], data, [], errors, schema, options ?? {});

        return { data, errors };
    },
};
