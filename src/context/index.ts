import React from 'react';
import { FormContextHandler, _FormContextHandler } from './handler';
import { assert } from '../assert';
import { Register } from '../ui/form/custom-components/register';
import { AutogeneratedItem, ComplexInput, CustomItem, Item, Schema, TItem, TopLevelItem, VariantItem } from '../schema';
import { Data, DataTree, Path } from '../schema/data';
import { ReferenceAnchors, References } from '../schema/references';
import { Traverse } from '../schema/traverse';
import { Validators } from '../schema/validators';
import { Value } from '../schema/value';

function applyInitialDataItem(inData: DataTree, path: Path, item: Item, data: DataTree, references: ReferenceAnchors) {
    if (Schema.hasComplexInput(item)) {
        applyInitialData(inData, path, item.input, data, references);
    } else if (Schema.hasVariantInput(item)) {
        applyInitialVariantData(inData, path, item, data, references);
    } else if (Schema.hasCustomInput(item)) {
        const cc = Register.get(item.component);
        assert(!!cc, `Unknown custom component "${item.component}"`);

        const itemRootData = Data.getTree(inData, path);
        try {
            const itemData = cc.applyInitialData(itemRootData);
            cc.validateData(itemData);
            Data.set(data, path, itemData);
        } catch (e) {
            throw new Error(`Data for item on path "${Data.Path.toString(path)}" does not conform to the expected schema (${(e as Error).message})`);
        }
    } else if (Schema.hasRelatedToInput(item)) {
        // We need special handling here because "related-to" item contains an object.
        const itemData = Data.getTree(inData, path);
        if (!Value.isValue(itemData['id']) || !Value.isRelToId(itemData['id'])) {
            throw new Error(`Data for item on path "${Data.Path.toString(path)}" does not conform to the expected schema ("related-to" item does not have "id")`);
        }

        // "related-to" item can have other items in its data object. These items are read and checked
        // later when the entire data tree is read.

        Data.set(data, path, itemData);
    } else {
        const itemData = Data.getValue(inData, path);
        if (!checkItemDataSchema(itemData, item)) {
            throw new Error(`Data for item on path "${Data.Path.toString(path)}" does not conform to the expected schema`);
        }

        Data.set(data, path, itemData);
        validateData(data, path, item);

        // We need to set the internal value too
        if (Schema.hasReferenceableIdInput(item)) {
            const refIdPath =  Data.Path.path(Schema.ReferenceableId, Data.Path.parent(path));
            if (!Data.has(inData, refIdPath)) {
                throw new Error(`Data for item on path "${Data.Path.toString(path)}" does not conform to the expected schema ("referenceable-id" input is missing data)`);
            }

            const refId = Data.getValue(inData, path);
            if (!Value.isRefId(refId)) {
                throw new Error(`Data for item on path "${Data.Path.toString(path)}" does not conform to the expected schema`);
            }
            Data.set(data, refIdPath, refId);
        }
    }
}

function applyInitialVariantData(inData: DataTree, path: Path, item: VariantItem, data: DataTree, references: ReferenceAnchors) {
    const itemData = Data.getTree(inData, path);

    const keys = Object.keys(item.input);
    const choice = itemData.__mbdb_variant_choice;
    if (choice == undefined || !keys.includes(choice)) {
        throw new Error(`Item "${item.tag}" has variant input but the value of variant choice in the initial data is invalid. The actual value is "${choice}"`);
    }

    for (const _k of keys) {
        const k = _k as keyof typeof item.input;

        const varItem = item.input[k];
        const varItemPath = Data.Path.path(k, path);

        if (Schema.hasComplexInput(varItem)) {
            applyInitialData(inData, varItemPath, varItem.input, data, references);
        } else if (Schema.hasVariantInput(varItem)) {
            applyInitialVariantData(inData, varItemPath, varItem, data, references);
        } else if (Schema.hasCustomInput(item)) {
            if (Data.has(inData, varItemPath)) {
                const cc = Register.get(item.component);
                assert(!!cc, `Unknown custom component "${item.component}"`);

                const varItemRootData = Data.getTree(inData, varItemPath);
                try {
                    const varItemData = cc.applyInitialData(varItemRootData);
                    cc.validateData(varItemData);
                    Data.set(data, varItemPath, varItemData);
                } catch (e) {
                    throw new Error(`Data for item on path "${Data.Path.toString(varItemPath)}" does not conform to the expected schema (${(e as Error).message})`);
                }
            }
        } else {
            if (Data.has(inData, varItemPath)) {
                const varItemData = Data.getValue(inData, varItemPath);
                if (!checkItemDataSchema(varItemData, varItem)) {
                    throw new Error(`Data for item on path "${Data.Path.toString(varItemPath)}" does not conform to the expected schema`);
                }

                Data.set(data, varItemPath, varItemData);
                validateData(data, varItemPath, varItem);
            }
        }
    }

    setVariantChoice(data, path, choice);
}

function applyInitialData(inData: DataTree, path: Path, schema: Item[], data: DataTree, references: ReferenceAnchors) {
    for (const item of schema) {
        const innerPath = Data.Path.path(item.tag, path);

        if (Data.has(inData, innerPath)) {
            if (item.isArray) {
                Data.set(data, innerPath, []); // Make sure we have an empty array to push onto

                if (Schema.hasComplexInput(item) || Schema.hasVariantInput(item)) {
                    const itemData = Data.getTreeArray(inData, innerPath);

                    const pusher = Schema.hasComplexInput(item)
                        ? (arrayInnerPath: Path) => {
                            const empty = {};
                            FormContext.makeData(item.input, empty, references);
                            applyInitialData(inData, arrayInnerPath, item.input, data, references);
                        }
                        : (arrayInnerPath: Path) => {
                            const empty = {};
                            FormContext.makeVariantData(item, empty, references);
                            applyInitialVariantData(inData, arrayInnerPath, item, data, references);
                        };

                    for (let idx = 0; idx < itemData.length; idx++) {
                        const arrayInnerPath = Data.Path.index(idx, innerPath);
                        pusher(arrayInnerPath);
                    }

                } else {
                    const itemData = Data.getValueArray(inData, innerPath);
                    for (let idx = 0; idx < itemData.length; idx++) {
                        const arrayInnerPath = Data.Path.index(idx, innerPath);
                        applyInitialDataItem(inData, arrayInnerPath, item, data, references);
                    }
                }
            } else {
                applyInitialDataItem(inData, innerPath, item, data, references);
            }
        }
    }
}

function buildReferences(data: DataTree, schema: TopLevelItem) {
    const references = {};
    const anchors = References.Gather.anchors(schema);
    for (const a of anchors) {
        const refObjs = References.Gather.refObjsForAnchor(a, data, schema);
        for (const obj of refObjs) {
            References.add(references, a, obj.refId, obj.data);
        }
    }

    checkAndFixupReferences(data, [], references, schema);

    return references;
}

function checkItemDataSchema(data: Value, item: Item) {
    if (Schema.hasRelatedToInput(item)) {
        return (typeof data !== 'object' || Object.keys(data).length === 0);
    }

    if (data.payload === undefined || data.isValid === undefined) {
        return false;
    }

    if (Schema.hasOptionsInput(item)) {
        if (!Value.isOption(data)) return false;

        if ((item.choices.find((c) => c.tag === data.payload.tag) === undefined) && (!item.isRequired && data.payload.tag !== Schema.EmptyOptionValue)) {
            return false;
        }
        if (Schema.hasOptionsWithOtherInput(item)) {
            return data.payload.other !== undefined && typeof data.payload.other === 'string';
        }

        return true;
    } else if (Schema.hasAutogeneratedInput(item)) {
        if (Schema.hasUuidInput(item)) {
            return Value.isUuid(data);
        } else if (Schema.hasReferenceableIdInput(item)) {
            return Value.isRefId(data);
        }
    } else if (Schema.hasBooleanInput(item)) {
        return item.isRequired ? Value.isBoolean(data) : Value.isTristate(data);
    } else if (Schema.hasCalendarDateInput(item)) {
        return Value.isCalendarDate(data);
    } else if (Schema.hasUuidInput(item)) {
        return Value.isUuid(data);
    } else if (Schema.hasVocabularyInput(item)) {
        return Value.isVocabularyEntry(data);
    } else if (Schema.hasIgnoredInput(item) || Schema.hasUnknownInput(item)) {
        return true;
    } else {
        return Value.isTextual(data);
    }
}

function checkAndFixupReferences(data: DataTree, path: Path, references: ReferenceAnchors, schema: TopLevelItem) {
    const dataItem = Data.getItem(data, path);
    if (Data.isDataTree(dataItem)) {
        for (const k in dataItem) {
            if (Schema.isReservedKey(k))
                continue;

            const innerPath = Data.Path.path(k, path);
            const objPath = Traverse.objPathFromDataPath(innerPath);
            const item = Traverse.itemFromSchema(objPath, schema);
            if (Schema.hasCustomInput(item)) {
                continue;
            } else if (Schema.hasRelatedToInput(item)) {
                const v = Data.getValue(data, Data.Path.path('id', innerPath));

                if (!Value.isEmpty(v)) {
                    const refId = Value.toRelToId(v);
                    if (!References.has(references, item.relatesTo, refId)) {
                        throw new Error(`Item on path "${Data.Path.toString(innerPath)}" references a referenceable that does not exist.`);
                    }

                    // We cannot trust that the related keys set by the "related-to" item
                    // are actually correct. We need to get them from the referenceable.
                    //
                    // To elaborate, suppose that a "related-to" item references a field
                    // called "name" in a referenceable. We need to do two checks here.
                    // First, we need to check that the referenceable actually has a field called "name".
                    // Second, since we cannot do proper referencing here, we need to take the value of
                    // the referenceable's "name" field and copy it into "related-to"'s name field.
                    // This is the correct way how to ensure consistency. Referenceable is considered
                    // to be the "source of truth".

                    const ref = References.get(references, item.relatesTo, refId);
                    for (const rk of item.relatedKeys) {
                        if (rk === 'id') continue;
                        const rv = ref.data[rk];
                        if (!Value.isValue(rv) || !Value.isTextual(rv)) {
                            throw new Error(`Item on path "${Data.Path.toString(innerPath)}" expected its referenceable to have a key "${rk}" but the referenceable does not have it.`);
                        }

                        Data.set(data, Data.Path.path(rk, innerPath), rv);
                    }
                }
            } else {
                checkAndFixupReferences(data, Data.Path.path(k, path), references, schema);
            }
        }
    } else if (Data.isDataTreeArray(dataItem)) {
        for (let idx = 0; idx < dataItem.length; idx++) {
            checkAndFixupReferences(data, Data.Path.index(idx, path), references, schema);
        }
    }
}

function handleAutogeneratedInput(item: AutogeneratedItem, data: DataTree, references: ReferenceAnchors) {
    const refId = Value.autogeneratedForItem(item);
    data[item.tag] = refId;

    if (Schema.hasReferenceableIdInput(item)) {
        // TODO: Do we need this assertion?
        if (References.findByData(references, item.referenceAs, data)) {
            assert(false, `Attempted to autogenerate value for item "${item.tag}" that already exists`);
        }

        data[Schema.ReferenceableId] = refId;
    }
}

function setVariantChoice(data: DataTree, path: Path, choice: string) {
    const d = Data.getTree(data, path);
    d.__mbdb_variant_choice = choice;
}

function validateData(data: DataTree, path: Path, item: Item) {
    if (Schema.hasRelatedToInput(item)) {
        return; // Do not validate "related-to" input because it does not have any "own" data
    }

    const value = Data.getValue(data, path);

    if (Schema.hasCustomInput(item)) {
        const cc = Register.get(item.input);
        cc.validateData(value);

        return;
    } else {
        value.isValid = Validators.validateCommon(item, value.payload);

        if (Schema.hasUuidInput(item) && !value.isValid) {
            throw new Error(`Item at path ${Data.Path.toString(path)} is an automatically generated UUIDv4 but its value "${value.payload}" is not a valid UUIDv4`);
        }
    }
}

export type FormContext = {
    data: DataTree,
    references: ReferenceAnchors,
    schema: TopLevelItem,
};

export const FormContext = {
    create(schema: TopLevelItem): FormContext {
        const data = {};
        const references = {};
        this.makeData(schema.input, data, references);

        return { data, references, schema };
    },

    empty(): FormContext {
        return { data: {}, references: {}, schema: TopLevelItem([]) };
    },

    load(inData: any, ctx: FormContext) {
        if (typeof inData !== 'object' || Array.isArray(inData)) {
            throw new Error('Invalid input data');
        }

        const data = {};
        this.makeData(ctx.schema.input, data, {});
        applyInitialData(inData, [], ctx.schema.input, data, {});

        const references = buildReferences(data, ctx.schema);

        ctx.data = data;
        ctx.references = references;
    },

    makeCustomData(item: CustomItem, data: DataTree, references: ReferenceAnchors) {
        const cc = Register.get(item.component);
        data[item.tag] = cc.emptyData();
    },

    makeData(schema: ComplexInput, data: DataTree, references: ReferenceAnchors) {
        for (const item of schema) {
            if (item.isArray) {
                data[item.tag] = [];
            } else {
                assert(!Array.isArray(data), `Got array of items where an object was expected.`);

                if (Schema.hasComplexInput(item)) {
                    data[item.tag] = {};
                    this.makeData(item.input, data[item.tag] as DataTree, references);
                } else if (Schema.hasVariantInput(item)) {
                    data[item.tag] = {};
                    this.makeVariantData(item, data[item.tag] as DataTree, references);
                } else if (Schema.hasCustomInput(item)) {
                    this.makeCustomData(item, data, references);
                } else {
                    this.makeTrivialData(item, data, references);
                }
            }
        }
    },

    makeDefaultTrivialData(item: Item, data: DataTree) {
        if (Schema.hasBooleanInput(item)) {
            data[item.tag] = Value.boolean(item.defaultValue!);
        } else if (Schema.hasOptionsInput(item)) {
            const allowsOther = Schema.hasOptionsWithOtherInput(item);
            if (allowsOther) {
                item.choices.push({ tag: Schema.OtherChoice, title: 'Other' });
            }

            const dv = item.defaultValue!;
            const iv = Schema.initialOptionsValue(item.isRequired);
            if (item.choices.find((c) => c.tag === dv) === undefined)
                throw new Error(`Attempted to set default value "${dv}" for options input "${item.tag}" but such value is invalid for that item.`);

            iv.payload.tag = dv;
            iv.isValid = Validators.commonForItem(item)(iv.payload);
            data[item.tag] = iv;
        } else if (Schema.hasTextualInput(item)) {
            data[item.tag] = Value.textual(item.defaultValue!, true);
        }
    },

    makeVariantData(item: VariantItem, data: DataTree, references: ReferenceAnchors) {
        assert(Object.keys(item.input).length > 0, `Item "${item.tag}" has an empty variant input. Empty variant inputs are not allowed.`);

        data.__mbdb_variant_choice = Object.keys(item.input)[0];
        for (const _k in item.input) {
            const k = _k as keyof typeof item.input;
            assert(k !== Schema.VariantChoice, `Variant input contains a choice named with a reserved name "${Schema.VariantChoice}". This is not allowed.`);

            const varItem = item.input[k];

            if (Schema.hasComplexInput(varItem)) {
                data[k] = {};
                this.makeData(varItem.input, data[k] as DataTree, references);
            } else if (Schema.hasVariantInput(varItem)) {
                data[k] = {}; // Variants are not allowed to be arrays directly
                this.makeVariantData(varItem, data[k] as DataTree, references);
            } else if (Schema.hasCustomInput(item)) {
                this.makeCustomData(item, data, references);
            } else {
                this.makeTrivialData(item, data, references);
            }
        }
    },

    makeTrivialData(item: TItem<any>, data: DataTree, references: ReferenceAnchors) {
        if (item.defaultValue !== undefined) {
            this.makeDefaultTrivialData(item, data);
        } else {
            if (Schema.hasAutogeneratedInput(item)) {
                handleAutogeneratedInput(item, data, references);
            } else if (Schema.hasIgnoredInput(item)) {
                // Do nothing
            } else if (Schema.hasUnknownInput(item)) {
                console.warn(`Item "${item.tag}" has unknown input. Review the schema. Ignoring the item.`);
            } else if (Schema.hasRelatedToInput(item)) {
                // HAKZ HAKZ HAKZ
                // We assume that the tag "id" is the id through which we refer to the referenceable
                assert(item.relatedKeys.includes('id'), `related-to item "${item.tag}" does not mention "id" in its related keys but we require that. Its keys are "${item.relatedKeys.join(', ')}.`);
                data[item.tag] = {};
                (data[item.tag] as DataTree)['id'] = Value.empty(!item.isRequired);
            } else {
                data[item.tag] = Value.defaultForItem(item);
            }
        }
    },

    readVariantChoice(data: DataTree): string {
        const choice = data.__mbdb_variant_choice;
        if (choice === undefined) {
            throw new Error('Attempted to read variant choice from a data item that does not define it');
        }
        return choice;
    },
};

export const FormContextInstance = React.createContext<{ handler: _FormContextHandler }>({ handler: FormContextHandler._null() });
