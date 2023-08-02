import { Data, DataTree, Path } from './data';
import { Value } from './value';
import { assert } from '../assert';

function gatherReferenceableIdsInData(data: DataTree, gatheredRefIds: string[]) {
    if (Array.isArray(data)) {
        gatherReferenceableIdsInDataArray(data, gatheredRefIds);
    } else {
        for (const k in data) {
            const _k = k as keyof typeof data;
            if (_k === '__mbdb_referenceable_id') {
                gatheredRefIds.push(Value.toRefId(data[_k] as Value));
            } else if (Data.isDataTree(data[_k])) {
                const item = data[_k];
                if (Data.isDataTree(item)) {
                    gatherReferenceableIdsInData(item, gatheredRefIds);
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
            const subtree = Data.Path.subtree(data, dataPath);
            const rrIds = new Array<string>();

            gatherReferenceableIdsInData(subtree, rrIds);
            return rrIds;
        },
    },
};
