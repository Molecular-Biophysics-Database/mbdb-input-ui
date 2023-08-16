import { MbdbData } from './data';
import { Vocabulary } from './vocabulary';
import { ComplexItem, Item, Schema, TopLevelItem, VariantItem } from '../schema';
import { FormContext } from '../context';
import { Data, DataTree, Path } from '../schema/data';
import { CalendarDate, Value } from '../schema/value';
import { ReferenceAnchors } from '../schema/references';
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

function toInternalData(item: TopLevelItem | ComplexItem, mbdbData: MbdbData, parentPath: Path, data: DataTree, references: ReferenceAnchors) {
    for (const innerItem of item.input) {
        if (innerItem.isArray) {
            const innerItemPath = Data.Path.path(innerItem.tag, parentPath);
            const indices = gatherArrayIndices(innerItemPath);
            const mbdbArray = MbdbData.getArray(mbdbData, MbdbData.Path.toArrayPath(innerItem.mbdbPath, indices));

            if (mbdbArray) {
                for (let idx = 0; idx < mbdbArray.length; idx++) {
                    toInternalDataItem(innerItem, mbdbData, Data.Path.index(idx, innerItemPath), data, references);
                }
            } else {
                Data.set(data, innerItemPath, []);
            }
        } else {
            toInternalDataItem(innerItem, mbdbData, Data.Path.path(innerItem.tag, parentPath), data, references);
        }
    }
}

function toInternalDataItem(item: Item, mbdbData: MbdbData, itemPath: Path, data: DataTree, references: ReferenceAnchors) {
    if (Schema.hasComplexInput(item)) {
        toInternalData(item, mbdbData, itemPath, data, references);
    } else if (Schema.hasVariantInput(item)) {
        toInternalDataVariant(item, mbdbData, itemPath, data, references);
    } else if (Schema.hasCustomInput(item)) {
        const cc = CustomComponentsRegister.get(item.component);
        if (!cc) {
            throw new Error(`No custom component "${item.component}" registered for item "${item.tag}".`);
        }

        const indices = gatherArrayIndices(itemPath);
        const mbdbCustomData = MbdbData.getObject(mbdbData, MbdbData.Path.toPath(item.mbdbPath, indices));
        const customData = mbdbCustomData ? cc.fromMbdb(mbdbCustomData) : cc.emptyData();

        Data.set(data, itemPath, customData);
    } else if (Schema.hasIgnoredInput(item) || Schema.hasUnknownInput(item)) {
        return;
    } else {
        const indices = gatherArrayIndices(itemPath);
        const loadPath = MbdbData.Path.toPath(item.mbdbPath, indices);

        if (Schema.hasRelatedToInput(item)) {
            const related = MbdbData.getObject(mbdbData, MbdbData.Path.toPath(item.mbdbPath, indices));

            if (related) {
                for (const key of item.relatedKeys) {
                    const innerLoadPath = MbdbData.Path.extend(key, item.mbdbPath);
                    const v = MbdbData.getScalar(mbdbData, MbdbData.Path.toPath(innerLoadPath, indices));
                    if (v === undefined || typeof v !== 'string') {
                        throw new Error(`Item "${key}" in a "related-to" item on MbdbPath "${item.mbdbPath}" either does not exist or it is not a string.`);
                    }

                    const value = Value.textual(v, true); // Again the assumption that related values are simple textual values
                    const storePath = Data.Path.path(key, itemPath);

                    Data.set(data, storePath, value);
                }
            } else {
                Data.set(data, Data.Path.path('id', itemPath), Value.empty());
            }
        } else {
            const mbdbScalar = MbdbData.getScalar(mbdbData, loadPath);

            if (mbdbScalar === undefined) {
                if (item.isRequired) {
                    throw new Error(`Item on MbdbPath "${item.mbdbPath}" is required but the MbdbData object do not contain it.`);
                } else {
                    Data.set(data, itemPath, getDefaultTrivialData(item, references));
                    return;
                }
            }

            if (Schema.hasBooleanInput(item)) {
                if (typeof mbdbScalar !== 'boolean') {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for a boolean item "${item.tag}" is not a boolean.`);
                }

                const value = item.isRequired ? Value.boolean(mbdbScalar) : Value.tristate(mbdbScalar ? 'true' : 'false');
                Data.set(data, itemPath, value);
            } else if (Schema.hasOptionsInput(item)) {
                if (typeof mbdbScalar !== 'string') {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for an options item "${item.tag}" is not a string.`);
                }

                if (item.choices.find((c) => c.tag === mbdbScalar) === undefined) {
                    if (Schema.hasOptionsWithOtherInput(item)) {
                        const value = Value.option(Schema.OtherChoice, mbdbScalar);
                        Data.set(data, itemPath, value);
                    } else {
                        throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for an options item "${item.tag}" is not amongst the allowed choices and the item does not allow "other" choice.`);
                    }
                } else {
                    const value = Value.option(mbdbScalar);
                    Data.set(data, itemPath, value);
                }
            } else if (Schema.hasVocabularyInput(item)) {
                if (typeof mbdbScalar !== 'string') {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for a vocabulary item "${item.tag}" is not a string.`);
                }

                const voc = Vocabulary.getCached(item.vocabularyType);
                if (!voc) return; // We don't have the voc so the safest thing to do is just ignore the item
                const vocItem = voc.find((e) => e.id === mbdbScalar);
                if (!vocItem) {
                    throw new Error(`Value of MbdbPath on MbdbPath "${item.mbdbPath}" for a vocabulary item "${item.tag}" references a non-existing vocabulary item ID.`);
                }

                Data.set(data, itemPath, Value.vocabularyEntry(mbdbScalar, vocItem.title.en, vocItem, true));
            } else if (Schema.hasReferenceableIdInput(item)) {
                if (typeof mbdbScalar !== 'string') {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for a ReferenceableId item "${item.tag}" is not a string.`);
                }
                if (!Uuid.check(mbdbScalar)) {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for a ReferenceableId item "${item.tag}" is not a valid UUIDv4.`);
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
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for a Uuid item "${item.tag}" with UUIDv4 value is not a valud UUIDv4`);
                }

                Data.set(data, itemPath, Value.uuid(mbdbScalar));
            } else {
                if (typeof mbdbScalar !== 'string') {
                    throw new Error(`Value of MbdbScalar on MbdbPath "${item.mbdbPath}" for an item "${item.tag}" with textual value is not a string.`);
                }

                Data.set(data, itemPath, Value.textual(mbdbScalar, true));
            }
        }
    }
}

function toInternalDataVariant(item: VariantItem, mbdbData: MbdbData, itemPath: Path, data: DataTree, references: ReferenceAnchors) {
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
        toInternalDataItem(item.input[discriminator], mbdbData, Data.Path.path(discriminator, itemPath), data, references);
    }
}

export const Deserialize = {
    deserialize(item: TopLevelItem, references: ReferenceAnchors, mbdbData: MbdbData) {
        const data = {};
        toInternalData(item, mbdbData, [], data, references);

        return data;
    },

    async fromFile(item: TopLevelItem, references: ReferenceAnchors, file: File) {
        const text = await file.text();
        const json = JSON.parse(text);
        const metadata = json['metadata'];

        if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
            throw new Error('Mbdb source data must contain a "metadata" object. The object is either not present or it has a wrong type.');
        }

        return Deserialize.deserialize(item, references, metadata);
    },
};