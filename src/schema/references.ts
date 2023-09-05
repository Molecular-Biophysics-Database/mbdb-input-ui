import { AnyItem, Schema, TopLevelItem } from './';
import { Data, DataTree, Path } from './data';
import { Traverse } from './traverse';
import { Value } from './value';
import { assert } from '../assert';
import { objKeys } from '../util';

function gatherAnchors(anchors: Set<string>, item: AnyItem) {
    if (Schema.isTopLevelItem(item) || Schema.hasComplexInput(item)) {
        for (const innerItem of item.input) {
            gatherAnchors(anchors, innerItem);
        }
    } else if (Schema.hasVariantInput(item)) {
        for (const k of objKeys(item.input)) {
            const varItem = item.input[k];
            gatherAnchors(anchors, varItem);
        }
    } else if (Schema.hasReferenceableIdInput(item)) {
        anchors.add(item.referenceAs);
    }
}

function gatherRefObjsForAnchor(anchor: string, data: DataTree, path: Path, schema: TopLevelItem, objs: { refId: string, data: DataTree }[], onlyAlive: boolean) {
    const dataItem = Data.getItem(data, path);
    if (Data.isDataTree(dataItem)) {
        for (const k in dataItem) {
            if (Schema.isReservedKey(k))
                continue;

            const innerPath = Data.Path.path(k, path);
            const objPath = Traverse.objPathFromDataPath(innerPath);
            const item = Traverse.itemFromSchema(objPath, schema);

            if (Schema.hasRelatedToInput(item) || Schema.hasCustomInput(item)) {
                // Do not try to descend into these items
                // They have a complex structure but we do not want to handle it
            } else if (Schema.hasReferenceableIdInput(item) && item.referenceAs === anchor) {
                const v = Data.getValue(data, Data.Path.path(Schema.ReferenceableId, path));
                objs.push({ refId: v.payload as string, data: Data.getTree(data, path) });
            } else if (Schema.hasVariantInput(item) && !item.isArray) {
                if (onlyAlive) {
                    const innerData = Data.getTree(data, innerPath);

                    // Descend only into the selected variant to avoid creating dead references
                    gatherRefObjsForAnchor(anchor, data, Data.Path.path(innerData.__mbdb_variant_choice!, innerPath), schema, objs, onlyAlive);
                } else {
                    gatherRefObjsForAnchor(anchor, data, innerPath, schema, objs, onlyAlive);
                }
            } else {
                gatherRefObjsForAnchor(anchor, data, innerPath, schema, objs, onlyAlive);
            }
        }
    } else if (Data.isDataTreeArray(dataItem)) {
        if (onlyAlive) {
            const objPath = Traverse.objPathFromDataPath(path);
            const item = Traverse.itemFromSchema(objPath, schema);
            if (Schema.hasVariantInput(item)) {
                assert(item.isArray, `Item "${item.tag}" is not an array but we expected that it would be.`);

                for (let idx = 0; idx < dataItem.length; idx++) {
                    const innerPath = Data.Path.index(idx, path);
                    const innerData = Data.getTree(data, innerPath);

                    // Descend only into the selected variant to avoid creating dead references
                    gatherRefObjsForAnchor(anchor, data,  Data.Path.path(innerData.__mbdb_variant_choice!, innerPath), schema, objs, onlyAlive);
                }
            } else {
                // No special handling is required for data that do not belong to Variants
                for (let idx = 0; idx < dataItem.length; idx++) {
                    gatherRefObjsForAnchor(anchor, data, Data.Path.index(idx, path), schema, objs, onlyAlive);
                }
            }
        } else {
            // Let's make it simple
            for (let idx = 0; idx < dataItem.length; idx++) {
                gatherRefObjsForAnchor(anchor, data, Data.Path.index(idx, path), schema, objs, onlyAlive);
            }
        }
    }
}

function gatherReferenceableIdsInData(data: DataTree | DataTree[], gatheredRefIds: string[]) {
    if (Array.isArray(data)) {
        gatherReferenceableIdsInDataArray(data, gatheredRefIds);
    } else {
        for (const k of objKeys(data)) {
            if (k === Schema.ReferenceableId) {
                gatheredRefIds.push(Value.toRefId(data[k] as Value));
            } else {
                const item = data[k];

                if (Data.isDataTree(item)) {
                    gatherReferenceableIdsInData(item, gatheredRefIds);
                } else if (Data.isDataTreeArray(item)) {
                    gatherReferenceableIdsInDataArray(item, gatheredRefIds);
                }
            }
        }
    }
}

function gatherReferenceableIdsInDataArray(data: DataTree[], gatheredRefIds: string[]) {
    for (const item of data) {
        gatherReferenceableIdsInData(item, gatheredRefIds);
    }
}

function getReferenceable(rr: Reference[], refId: string) {
    for (const r of rr) {
        if (r.refId === refId) return r;
    }
    return undefined;
}

export type Reference = {
    refId: string,
    data: DataTree,
    referencedBy: { refingId: string, data: DataTree }[],
};
export type ReferenceAnchors = Record<string, Reference[]>;

export const References = {
    add(refs: ReferenceAnchors, anchor: string, refId: string, data: DataTree) {
        if (refs[anchor] === undefined) {
            refs[anchor] = [];
        }

        assert(refs[anchor].find((r) => r.refId === refId) === undefined, `Attempted to add referenceable "${anchor}/${refId}" but such referenceable already exists.`);

        refs[anchor].push({
            refId,
            data,
            referencedBy: [],
        });
    },

    anchors(refs: ReferenceAnchors) {
        return Object.keys(refs);
    },

    findByData(refs: ReferenceAnchors, anchor: string, data: DataTree) {
        const rr = refs[anchor];
        if (rr === undefined) {
            return undefined;
        }

        return rr.find((r) => r.data === data);
    },

    get(refs: ReferenceAnchors, anchor: string, refId: string) {
        const rr = refs[anchor];
        assert(rr !== undefined, `Attempted to get referenceable "${anchor}/${refId}" but the anchor does not exist.`);

        const r = getReferenceable(rr, refId);
        assert(r !== undefined, `Attempted to get referenceable "${anchor}/${refId}" but the refId does not exist.`);

        return r;
    },

    has(refs: ReferenceAnchors, anchor: string, refId: string) {
        const rr = refs[anchor];
        assert(rr !== undefined, `Attempted to check if anchor "${anchor}" has "${refId}" but the anchor does not exist.`);

        return getReferenceable(rr, refId) !== undefined;
    },

    hasAnchor(refs: ReferenceAnchors, anchor: string) {
        return refs[anchor] !== undefined;
    },

    isReferenced(refs: ReferenceAnchors, anchor: string, refId: string) {
        const rr = refs[anchor];
        assert(rr !== undefined, `Attempted to check if referenceable "${anchor}/${refId}" is referenced but the anchor does not exist.`);

        const r = getReferenceable(rr, refId);
        assert(r !== undefined, `Attempted to check if referenceable "${anchor}/${refId}" is referenced but referenceable with the given ID does not exist.`);

        return r.referencedBy.length > 0;
    },

    isReferencedBy(refs: ReferenceAnchors, anchor: string, refId: string, refingId: string) {
        const rr = refs[anchor];
        assert(rr !== undefined, `Attempted to check if referenceable "${anchor}/${refId}" is referenced but the anchor does not exist.`);

        const r = getReferenceable(rr, refId);
        assert(r !== undefined, `Attempted to check if referenceable "${anchor}/${refId}" is referenced but referenceable with the given ID does not exist.`);

        return !!r.referencedBy.find((r) => r.refingId === refingId);
    },

    isValidRefId(s: string) {
        return s.length > 0;
    },

    list(refs: ReferenceAnchors, anchor: string) {
        const rr = refs[anchor];
        if (rr === undefined) {
            return [];
        }

        return rr;
    },

    ref(refs: ReferenceAnchors, anchor: string, refId: string, refingId: string, data: DataTree) {
        assert(refs[anchor] !== undefined, `Attempted to add a reference for referenceable "${anchor}/${refId}" but the anchor does not exist.`);

        const r = refs[anchor].find((r) => r.refId === refId);
        assert(r !== undefined, `Attempted to add a reference for referenceable "${anchor}/${refId}" but referenceable with the given ID does not exist.`);

        // console.log(`Adding a reference "${refingId}" to referenceable "${anchor}/${refId}"`);

        r.referencedBy.push({ refingId, data });
    },

    remove(refs: ReferenceAnchors, anchor: string, refId: string) {
        const rr = refs[anchor];
        assert(rr !== undefined, `Attempted to remove referenceable "${anchor}/${refId}" but the anchor does not exist.`);

        const idx = rr.findIndex((r) => r.refId === refId);
        assert(idx >= 0, `Attempted to remove referenceable "${anchor}/${refId}" but referenceable with the given ID does not exist.`);
        assert(rr[idx].referencedBy.length === 0, `Attempted to remove referenceable "${anchor}/${refId}" but referenceable is referenced by ${rr[idx].referencedBy.length} items`);
        rr.splice(idx, 1);
    },

    unref(refs: ReferenceAnchors, anchor: string, refId: string, refingId: string) {
        assert(refs[anchor] !== undefined, `Attempted to remove a reference for referenceable "${anchor}/${refId}" but the anchor does not exist.`);

        const r = refs[anchor].find((r) => r.refId === refId);
        assert(r !== undefined, `Attempted to remove a reference for referenceable "${anchor}/${refId}" but referenceable with the given ID does not exist.`);

        const idx = r.referencedBy.findIndex((rf) => rf.refingId === refingId);
        assert(idx >= 0, `Attempted to remove a reference for referenceable "${anchor}/${refId}" but the referenceable does not reference the referencing item "${refingId}" that was to be removed.`);
        r.referencedBy.splice(idx,  1);

        // console.log(`Removed a reference "${refingId}" from referenceable "${anchor}/${refId}"`);
    },

    Gather: {
        anchors(schema: TopLevelItem) {
            const anchors = new Set<string>();
            gatherAnchors(anchors, schema);

            return Array.from(anchors);
        },

        refObjsForAnchor(anchor: string, data: DataTree, schema: TopLevelItem, onlyAlive = true) {
            const objs = new Array<{ refId: string, data: DataTree }>();
            gatherRefObjsForAnchor(anchor, data, [], schema, objs, onlyAlive);

            return objs;
        },
    },

    List: {
        activeReferenceables(refs: ReferenceAnchors, rrIds: string[], onlyReferenced = false) {
            let active = [];
            for (const a of References.anchors(refs)) {
                for (const refId of rrIds) {
                    if (References.has(refs, a, refId)) {
                        if (!onlyReferenced || (onlyReferenced && References.isReferenced(refs, a, refId))) {
                            active.push(References.get(refs, a, refId));
                        }
                    }
                }
            }

            return active;
        },

        referenceableIdsInData(data: DataTree, dataPath: Path) {
            const rrIds = new Array<string>();

            const item = Data.getItem(data, dataPath);
            if (Data.isDataTree(item) || Data.isDataTreeArray(item)) {
                gatherReferenceableIdsInData(item, rrIds);
            }
            // else: A plain value cannot be a referenceable

            return rrIds;
        },
    },
};
