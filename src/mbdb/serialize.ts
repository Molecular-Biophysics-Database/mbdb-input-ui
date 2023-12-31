import { DataError } from './';
import { MbdbData, MbdbScalar } from './data';
import { assert } from '../assert';
import { FormContext } from '../context';
import { DepositedFile, Item, Schema, TopLevelItem, VariantItem } from '../schema';
import { Data, DataTree, Path } from '../schema/data';
import { Traverse } from '../schema/traverse';
import { Tristate } from '../schema/tristate';
import { Value } from '../schema/value';
import { Register } from '../ui/form/custom-components/register';

function toMbdbDataSimpleItem(internalData: DataTree, internalParentPath: Path, mbdbData: MbdbData, mbdbArrayIndices: number[], errors: DataError[], files: DepositedFile[], item: Item, options: Options) {
    if (Schema.hasRelatedToInput(item)) {
        const v = Data.getValue(internalData, internalParentPath);
        if (!Value.isEmpty(v)) {
            const relTo = Value.toRelTo(v);

            const storePath = MbdbData.Path.toPath(`${item.mbdbPath}/id`, mbdbArrayIndices);
            MbdbData.set(mbdbData, relTo.id, storePath);

            for (const relKey in relTo.data) {
                const referencedValuePath = Data.Path.path(relKey, internalParentPath);
                const referencedValue = relTo.data[relKey];
                if (!Value.isValid(referencedValue)) {
                    errors.push(DataError(referencedValuePath, 'Item has an invalid'));
                } else {
                    const storePath = MbdbData.Path.toPath(`${item.mbdbPath}/${relKey}`, mbdbArrayIndices);

                    assert(Value.isTextual(referencedValue) || Value.isBoolean(referencedValue) || Value.isTristate(referencedValue), `Unexpected value type on path "${Data.Path.toString(referencedValuePath)}."`);
                    MbdbData.set(mbdbData, referencedValue.payload, storePath);
                }
            }
        } else {
            if (item.isRequired) {
                errors.push(DataError(
                    internalParentPath,
                    'Item must have a value but it is empty'
                ));
            }
        }
    } else if (Schema.hasCustomInput(item)) {
        const cc = Register.get(item.component);
        const customData = cc.toMbdb(internalData, internalParentPath, errors);
        if (customData !== undefined) {
            MbdbData.set(mbdbData, customData, MbdbData.Path.toPath(item.mbdbPath, mbdbArrayIndices));
        }
    } else {
        const v = Data.getValue(internalData, internalParentPath);

        if (!item.isRequired && Value.isEmpty(v) && !item.isArray) {
            return; // Ignore optional empty value but only if the value not directly in an array
        }

        if (!Value.isValid(v) && !options.ignoreErrors) {
            // Log error and ignore the value
            errors.push(DataError(
                internalParentPath,
                Value.isEmpty(v) ? 'Item must have a value but it is empty.' : 'Item has an invalid value.'
            ));
            return;
        }

        const storePath = MbdbData.Path.toPath(item.mbdbPath, mbdbArrayIndices);
        if (Schema.hasOptionsInput(item)) {
            assert(Value.isOption(v), 'Value is not an Option value.');
            if (Value.isEmptyOption(v)) {
                if (item.isRequired) {
                    errors.push(DataError(internalParentPath, 'Field must have a value but no value was selected.'));
                }
            } else {
                const out = Schema.isOtherChoice(v) ? Value.toOtherOption(v) : Value.toOption(v);
                MbdbData.set(mbdbData, out, storePath);
            }
        } else if (Schema.hasBooleanInput(item)) {
            const tv = Value.toTristate(v);
            if (tv === Tristate.True) MbdbData.set(mbdbData, true, storePath);
            else if (tv === Tristate.False) MbdbData.set(mbdbData, false, storePath);
            // Do not set anything if Tristate is none
        } else if (Schema.hasCalendarDateInput(item)) {
            const { year, month, day } = Value.toCalendarDate(v);
            const out = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            MbdbData.set(mbdbData, out, storePath);
        } else if (Schema.hasVocabularyInput(item)) {
            const out = Value.toVocabularyEntry(v);
            if (out.data !== null) {
                MbdbData.set(mbdbData, { id: out.id }, storePath);
            }
        } else if (Schema.hasFileInput(item)) {
            assert(Value.isFile(v), 'Value is not a File');
            if (v.payload.file || v.payload.metadata.key) {
                if (files.find((x) => x.file!.name === v.payload.file?.name)) {
                    errors.push(DataError(internalParentPath, `File named "${v.payload.file!.name}" is present more than once in the data.`));
                } else {
                    files.push(DepositedFile(v.payload.file, v.payload.metadata));
                }
                MbdbData.set(mbdbData, `files/${v.payload.file?.name || v.payload.metadata.key}`, storePath);
            } else {
                // assert(v.payload.file !== null, 'Value of a file must not be null'); // removed so that edit page works
            }
        } else if (Schema.hasNumericInput(item)) {
            const nv = item.input === 'int' ? parseInt(v.payload as string) : parseFloat(v.payload as string);
            MbdbData.set(mbdbData, nv, storePath);
        } else {
            // NOTE: TS cannot figure out that we cannot get a VocabularyEntry type because that is
            //       covered by the hasVocabularyInput() check, hence the cast to MbdbScalar.
            MbdbData.set(mbdbData, v.payload as MbdbScalar, storePath);
        }
    }
}

function toMbdbDataItem(internalData: DataTree, internalParentPath: Path, mbdbData: MbdbData, mbdbArrayIndices: number[], errors: DataError[], files: DepositedFile[], item: Item, options: Options) {
    if (Schema.hasComplexInput(item)) {
        const v = Data.getTree(internalData, internalParentPath);
        if (!v.__mbdb_group_marked_empty) {
            toMbdbDataTree(internalData, internalParentPath, mbdbData, mbdbArrayIndices, errors, files, item, options);
        }
    } else if (Schema.hasVariantInput(item)) {
        toMbdbDataVariant(internalData, internalParentPath, mbdbData, mbdbArrayIndices, errors, files, item, options);
    } else {
        toMbdbDataSimpleItem(internalData, internalParentPath, mbdbData, mbdbArrayIndices, errors, files, item, options);
    }
}

function toMbdbDataVariant(internalData: DataTree, internalParentPath: Path, mbdbData: MbdbData, mbdbArrayIndices: number[], errors: DataError[], files: DepositedFile[], item: VariantItem, options: Options) {
    assert(item.discriminator !== undefined, `Item with variant input does not specify a type discriminator.`);

    const v = Data.getTree(internalData, internalParentPath);
    const choice = FormContext.readVariantChoice(v);
    const varItem = item.input[choice];
    assert(varItem !== undefined, `Variant choice "${choice}" is invalid for input item "${Data.Path.toString(internalParentPath)}}"`);

    if (Schema.hasComplexInput(varItem)) {
        if (!v.__mbdb_group_marked_empty) {
            toMbdbDataTree(internalData, Data.Path.path(choice, internalParentPath), mbdbData, mbdbArrayIndices, errors, files, varItem, options);
        }
    } else if (Schema.hasVariantInput(varItem)) {
        toMbdbDataVariant(internalData, Data.Path.path(choice, internalParentPath), mbdbData, mbdbArrayIndices, errors, files, varItem, options);
    } else {
        toMbdbDataSimpleItem(internalData, Data.Path.path(choice, internalParentPath), mbdbData, mbdbArrayIndices, errors, files, varItem, options);
    }

    MbdbData.set(mbdbData, choice, MbdbData.Path.toPath(MbdbData.Path.extend(item.discriminator, item.mbdbPath), mbdbArrayIndices));
}

function toMbdbDataTree(internalData: DataTree, internalParentPath: Path, mbdbData: MbdbData, mbdbArrayIndices: number[], errors: DataError[], files: DepositedFile[], item: TopLevelItem, options: Options) {
    const tree = Data.getTree(internalData, internalParentPath);
    for (const k in tree) {
        if (Schema.isReservedKey(k)) continue;

        const path = Data.Path.path(k, internalParentPath);
        const innerItem = Traverse.itemFromSchema(k, item);

        if (innerItem.isArray) {
            const v = Data.getArray(internalData, path);
            const minItems = innerItem.minItems ?? 0;

            if (innerItem.isRequired && v.length < minItems && !options.ignoreErrors) {
                errors.push(DataError(path, `At least ${minItems} item(s) are required but only ${v.length} item(s) were provided.`));
            } else {
                assert(Array.isArray(v), `Expected an array of values for input at object path "${Data.Path.toString(path)}"`);

                // The logic around this code never creates empty arrays. This is intentional because there should be no valid
                // reason to ever write empty arrays to the Mbdb data object. Empty array is expressed as the array object
                // not being present at all in the parent object.
                for (let idx = 0; idx < v.length; idx++) {
                    toMbdbDataItem(internalData, Data.Path.index(idx, path), mbdbData, [...mbdbArrayIndices, idx], errors, files, innerItem, options);
                }
            }
        } else {
            toMbdbDataItem(internalData, Data.Path.path(k, internalParentPath), mbdbData, mbdbArrayIndices, errors, files, innerItem, options);
        }
    }
}


export type Options = {
    ignoreErrors?: boolean,
};

export const Serialize = {
    serialize(ctx: FormContext, options?: Options): { data: MbdbData, errors: DataError[], files: DepositedFile[] } {
        const data = {};
        const errors = new Array<DataError>();
        const files = new Array<DepositedFile>();

        toMbdbDataTree(ctx.data, [], data, [], errors, files, ctx.schema, options ?? {});

        return { data, errors, files };
    },

    toJson(ctx: FormContext, options?: Options) {
        const { data, errors } = this.serialize(ctx, options ?? {});
        if (errors.length !== 0 && !options?.ignoreErrors) {
            throw errors;
        }

        return JSON.stringify({ metadata: data }, void 0, 2);
    },
};
