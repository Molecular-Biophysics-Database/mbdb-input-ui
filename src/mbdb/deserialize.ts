import { MbdbData } from './data';
import { Vocabulary } from './vocabulary';
import {ComplexItem, DepositedFileMetadata, Item, Schema, TopLevelItem, VariantItem} from '../schema';
import { FormContext } from '../context';
import { Data, DataTree, Path } from '../schema/data';
import { CalendarDate, Value } from '../schema/value';
import { ReferenceAnchors, References } from '../schema/references';
import { Tristate } from '../schema/tristate';
import { Uuid } from '../schema/uuid';
import { CommonValidators } from '../schema/validators';
import { Register as CustomComponentsRegister } from '../ui/form/custom-components/register';
import { objKeys } from '../util';

function gatherArrayIndices(path: Path) {
    const indices = [];
    for (const tok of path) {
        if (tok.kind === 'index') indices.push(tok.value);
    }

    return indices;
}

function getDefaultTrivialData(item: Item, references: ReferenceAnchors) {
    const fakeRoot = {} as any;

    FormContext.makeTrivialData(item, fakeRoot, references);
    return fakeRoot[item.tag];
}

function setComplexDataStub(data: DataTree, path: Path, markGroupEmpty: boolean) {
    // This creates an empty data tree just with the empty/not-empty tag.
    // This is okay because the rest will be filled out elsewhere as required
    // and the result will be merged with the default data so it is okay
    // to not have the complete data here.
    Data.set(data, path, { __mbdb_group_marked_empty: markGroupEmpty } as DataTree);
}

function toCalendarDate(s: string): CalendarDate {
    const [year, month, day] = s.split('-');
    if (!year || !month || !day) {
        throw new Error(`String "${s}" is not a valid date representation`);
    }

    const nYear = parseInt(year);
    const nMonth = parseInt(month);
    const nDay = parseInt(day);

    if (isNaN(nYear) || isNaN(nMonth) || isNaN(nDay)) {
        throw new Error(`String "${s}" is not a valid date representation`);
    }

    return { year: nYear, month: nMonth, day: nDay };
}

async function toInternalData(item: TopLevelItem | ComplexItem, mbdbData: MbdbData, parentPath: Path, data: DataTree, references: ReferenceAnchors,
                              depositedFiles: Record<string, DepositedFileMetadata>, options: Options) {
    for (const innerItem of item.input) {
        if (innerItem.isArray) {
            const innerItemPath = Data.Path.path(innerItem.tag, parentPath);
            const indices = gatherArrayIndices(innerItemPath);
            const mbdbArray = MbdbData.getArray(mbdbData, MbdbData.Path.toArrayPath(innerItem.mbdbPath, indices));

            if (mbdbArray) {
                for (let idx = 0; idx < mbdbArray.length; idx++) {
                    await toInternalDataItem(innerItem, mbdbData, Data.Path.index(idx, innerItemPath), data, references, depositedFiles, options);
                }
            } else {
                Data.set(data, innerItemPath, []);
            }
        } else {
            await toInternalDataItem(innerItem, mbdbData, Data.Path.path(innerItem.tag, parentPath), data, references, depositedFiles, options);
        }
    }
}

async function toInternalDataItem(item: Item, mbdbData: MbdbData, itemPath: Path, data: DataTree, references: ReferenceAnchors, depositedFiles: Record<string, DepositedFileMetadata>, options: Options) {
    const indices = gatherArrayIndices(itemPath);
    const loadPath = MbdbData.Path.toPath(item.mbdbPath, indices);

    if (Schema.hasComplexInput(item)) {
        const mbdbDataExists = !!MbdbData.getObject(mbdbData, loadPath);
        if (!mbdbDataExists && item.isRequired && !options.allowPartials) {
            throw new Error(`Item on MbdbPath "${item.mbdbPath}" is required but the MbdbData object does not contain it.`);
        }

        setComplexDataStub(data, itemPath, !mbdbDataExists && !item.isRequired);
        if (mbdbDataExists) {
            await toInternalData(item, mbdbData, itemPath, data, references, depositedFiles, options);
        }
    } else if (Schema.hasVariantInput(item)) {
        await toInternalDataVariant(item, mbdbData, itemPath, data, references, depositedFiles, options);
    } else if (Schema.hasCustomInput(item)) {
        const cc = CustomComponentsRegister.get(item.component);
        if (!cc) {
            throw new Error(`No custom component "${item.component}" registered for item "${item.tag}".`);
        }

        const indices = gatherArrayIndices(itemPath);
        const mbdbCustomData = MbdbData.getObject(mbdbData, MbdbData.Path.toPath(item.mbdbPath, indices));
        const customData = mbdbCustomData ? cc.fromMbdb(mbdbCustomData, options) : cc.emptyData(true);

        Data.set(data, itemPath, customData);
    } else if (Schema.hasIgnoredInput(item) || Schema.hasUnknownInput(item)) {
        return;
    } else {
        if (Schema.hasRelatedToInput(item)) {
            const related = MbdbData.getObject(mbdbData, MbdbData.Path.toPath(item.mbdbPath, indices));

            const relTo = Value.emptyRelTo(!item.isRequired);
            if (related) {
                relTo.payload.data = {};
                for (const relKey of item.relatedKeys) {
                    const innerLoadPath = MbdbData.Path.extend(relKey, item.mbdbPath);
                    const v = MbdbData.getScalar(mbdbData, MbdbData.Path.toPath(innerLoadPath, indices));

                    if (relKey !== 'id') {
                        if (v === undefined) {
                            throw new Error(`Item "${relKey}" in a "related-to" item on MbdbPath "${item.mbdbPath}" either does not exist.`);
                        }

                        if (typeof v === 'string') {
                            relTo.payload.data[relKey] = Value.textual(v, true);
                        } else if (typeof v === 'number') {
                            relTo.payload.data[relKey] = Value.textual(v.toString(), true);
                        } else if (typeof v === 'boolean') {
                            relTo.payload.data[relKey] = Value.boolean(v);
                        } else {
                            throw new Error(`Item "${relKey}" in a "related-to" item on MbdbPath "${item.mbdbPath}" is neither textual or boolean value`);
                        }
                    } else {
                        if (typeof v !== 'string') {
                            throw new Error(`Item "id" in a "related-to" item on MbdbPath "${item.mbdbPath}" is not a string.`);
                        }
                        if (!(v === '' || References.isValidRefId(v))) {
                            throw new Error(`Item "id" in a "related-to" item on MbdbPath "${item.mbdbPath}" is not a valid reference ID.`);
                        }

                        relTo.payload.id = v;
                    }
                }

                Data.set(data, itemPath, relTo);
            } else {
                if (item.isRequired && !options.allowPartials) {
                    throw new Error(`Item on MbdbPath "${item.mbdbPath}" is required but the MbdbData object does not contain it.`);
                }

                Data.set(data, itemPath, relTo);
            }
        } else if (Schema.hasVocabularyInput(item)) {
            const mbdbVoc = MbdbData.getObject(mbdbData, loadPath);

            if (mbdbVoc) {
                const id = mbdbVoc['id'];
                if (id === undefined) {
                    throw new Error(`Item on MbdbPath "${item.mbdbPath}" is a Vocabulary item but it does not specify an id.`);
                } else if (id === null) {
                    Data.set(data, itemPath, Value.emptyVocabularyEntry(!item.isRequired));
                } else if (typeof id !== 'string') {
                    throw new Error(`Item on MbdbPath "${item.mbdbPath}" is a Vocabulary item but its id has a wrong type.`);
                } else {
                    try {
                        const vocEntry = await Vocabulary.getById(item.vocabularyType, id);
                        if (vocEntry === undefined) {
                            throw new Error(`Item on MbdbPath "${item.mbdbPath}" is a Vocabulary item but its id does not exist in the vocabulary that is currently available.`);
                        } else {
                            Data.set(data, itemPath, Value.vocabularyEntry(id, vocEntry.title.en, vocEntry, true));
                        }
                    } catch (e) {
                        console.warn(`Failed to fetch vocabulary "${item.vocabularyType}" for item on MbdbPath "${item.mbdbPath}".`);

                        // Since we cannot verify the item, let's just set an empty value ant have the user deal with the fallout
                        Data.set(data, itemPath, Value.emptyVocabularyEntry(!item.isRequired));
                    }
                }
            } else {
                if (item.isRequired && !options.allowPartials) {
                    throw new Error(`Item on MbdbPath "${item.mbdbPath}" is required but the MbdbData object does not contain it.`);
                }

                Data.set(data, itemPath, Value.emptyVocabularyEntry(!item.isRequired));
            }
        } else if (Schema.hasFileInput(item)) {
            const mbdbFile = MbdbData.getScalar(mbdbData, loadPath);
            if (mbdbFile) {
                const url = mbdbFile as string
                if (url && url.length>0) {
                    const key = url.split('/').pop()!
                    const fileMetadata = depositedFiles[key]
                    Data.set(data, itemPath, Value.file(null, fileMetadata, true));
                }
            }
        } else {
            const mbdbScalar = MbdbData.getScalar(mbdbData, loadPath);

            if (mbdbScalar === undefined) {
                if (item.isRequired && !options.allowPartials) {
                    throw new Error(`Item on MbdbPath "${item.mbdbPath}" is required but the MbdbData object does not contain it.`);
                } else {
                    Data.set(data, itemPath, getDefaultTrivialData(item, references));
                    return;
                }
            }

            if (Schema.hasBooleanInput(item)) {
                if (typeof mbdbScalar !== 'boolean') {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for a boolean item "${item.tag}" is not a boolean.`);
                }

                const value = Value.tristate(mbdbScalar ? Tristate.True : Tristate.False, true);
                Data.set(data, itemPath, value);
            } else if (Schema.hasOptionsInput(item)) {
                if (typeof mbdbScalar !== 'string') {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for a Option item "${item.tag}" is not a string.`);
                }

                if (item.choices.find((c) => c.tag === mbdbScalar) === undefined) {
                    if (Schema.hasOptionsWithOtherInput(item)) {
                        Data.set(data, itemPath, Value.option(Schema.OtherChoice, mbdbScalar));
                    } else {
                        throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for an options item "${item.tag}" is not amongst the allowed choices and the item does not allow "other" choice. Actual value ${mbdbScalar}. Options ${item.choices.map(choice => choice.tag).join(",")}`);
                    }
                } else {
                    Data.set(data, itemPath, Value.option(mbdbScalar));
                }
            } else if (Schema.hasReferenceableIdInput(item)) {
                if (typeof mbdbScalar !== 'string') {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for a ReferenceableId item "${item.tag}" is not a string.`);
                }
                if (!References.isValidRefId(mbdbScalar)) {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for a ReferenceableId item "${item.tag}" is not a valid referenceable ID.`);
                }

                Data.set(data, itemPath, Value.refId(mbdbScalar));

                // Also set the internal refId value
                const refIdPath =  Data.Path.path(Schema.ReferenceableId, Data.Path.parent(itemPath));
                Data.set(data, refIdPath, Value.refId(mbdbScalar));
            } else if (Schema.hasCalendarDateInput(item)) {
                if (typeof mbdbScalar !== 'string') {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for a CalendarDate item "${item.tag}" is not a string.`);
                }
                const date = toCalendarDate(mbdbScalar);
                if (!CommonValidators.isCalendarDate(date)) {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for a CalendarDate item "${item.tag}" represents a nonsensical calendar date.`);
                }

                Data.set(data, itemPath, Value.calendarDate(date.year, date.month, date.day, true));
            } else if (Schema.hasUuidInput(item)) {
                if (typeof mbdbScalar !== 'string') {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for a Uuid item "${item.tag}" with UUIDv4 value is not a string.`);
                }
                if (!Uuid.check(mbdbScalar)) {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for a Uuid item "${item.tag}" with UUIDv4 value is not a valid UUIDv4.`);
                }

                Data.set(data, itemPath, Value.uuid(mbdbScalar));
            } else if (Schema.hasNumericInput(item)) {
                if (typeof mbdbScalar !== 'number') {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for an item "${item.tag}" with textual value is not a string.`);
                }

                Data.set(data, itemPath, Value.textual(mbdbScalar.toString(), true));
            } else {
                if (typeof mbdbScalar !== 'string') {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for an item "${item.tag}" with textual value is not a string.`);
                }

                Data.set(data, itemPath, Value.textual(mbdbScalar, true));
            }
        }
    }
}

async function toInternalDataVariant(item: VariantItem, mbdbData: MbdbData, itemPath: Path, data: DataTree, references: ReferenceAnchors, depositedFiles: Record<string, DepositedFileMetadata>, options: Options) {
    const variantRoot = {} as DataTree;
    FormContext.makeVariantData(item, variantRoot, references);

    const mbdbPath = MbdbData.Path.toPath(item.mbdbPath, gatherArrayIndices(itemPath));
    const varData = MbdbData.getObject(mbdbData, mbdbPath);

    if (!varData) {
        // There is no data for this Variant. Just go with the defaults
        Data.set(data, itemPath, variantRoot);
    } else {
        const discriminator = varData[item.discriminator];
        if (!discriminator || typeof discriminator !== 'string') {
            throw new Error(`Value of MbdbData on MbdbData "${item.mbdbPath}" for a Variant item "${item.tag}" is either not set or it is not a string.`);
        }

        let choiceOk = false;
        for (const ik of objKeys(item.input)) {
            const tag = item.input[ik].tag;
            if (tag === discriminator) {
                choiceOk = true;
                break;
            }
        }
        if (!choiceOk) {
            throw new Error(`Discriminator value "${discriminator}" is invalid for a Variant item "${item.tag}".`);
        }
        variantRoot.__mbdb_variant_choice = discriminator;

        Data.set(data, itemPath, variantRoot);

        // Now we have the "root" and default data set for the Variant.
        // The next step is to descend into the variant to set the content. This must be done only for the type
        // specified by the discriminator.
        await toInternalDataItem(item.input[discriminator], mbdbData, Data.Path.path(discriminator, itemPath), data, references, depositedFiles, options);
    }
}

export type Options = {
    allowPartials?: boolean,
};

export const Deserialize = {
    async deserialize(ctx: FormContext, mbdbData: MbdbData, depositedFiles: Record<string, DepositedFileMetadata>, options?: Options) {
        const data = {};
        await toInternalData(ctx.schema, mbdbData, [], data, ctx.references, depositedFiles, options ?? {});

        return data;
    },

    async fromFile(ctx: FormContext, file: File, options?: Options) {
        const text = await file.text();
        // TODO: files for fromFile
        return await Deserialize.fromJson(ctx, text, {}, options);
    },

    async fromJson(ctx: FormContext, input: string, depositedFiles: Record<string, DepositedFileMetadata>, options?: Options) {
        const json = JSON.parse(input);
        const metadata = json['metadata'];

        if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
            throw new Error('Mbdb source data must contain a "metadata" object. The object is either not present or it has a wrong type.');
        }

        return await Deserialize.deserialize(ctx, metadata, depositedFiles,options ?? {});
    },
};
