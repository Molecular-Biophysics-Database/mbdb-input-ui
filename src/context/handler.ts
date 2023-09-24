import { assert } from '../assert';
import { FormContext } from './';
import { TopLevelItem } from '../schema';
import { Data, DataTree, DataTreeItem, Path } from '../schema/data';
import { References } from '../schema/references';
import { Value } from '../schema/value';

function gatherReferenceables(ctx: FormContext, onlyReferenced: boolean, path: Path) {
        // Before we delete an item from the data tree, we need to check if deleting
        // an item would break a depencendy. A dependency means that an item in the data tree
        // may reference another item in the data tree. If the referenced item went away, we would
        // have invalid data.
        // Here we check if the item that is being deleted is "referenceable" (= something that can be referenced)
        // and if it is. Depending on the situation, we might also want to check if the referenceable is referenced
        // by something.
        // Mind that an item can be a complex object that may contain multiple "referenceables" as its children.
        // We must make sure that none of those are referenced.
        const rrIds = References.List.referenceableIdsInData(ctx.data, path);
        const rrs = References.List.activeReferenceables(ctx.references, rrIds, onlyReferenced);

        // TODO: Here we get a list of all referenceables in the data subtree that belong to the
        // item that is about to be deleted. A proper error message should list the items that are
        // referencing the active referenceables. This would involve walking through the list of
        // referenceables and looking up the corresponding data in the data tree.

        return rrs.length === 0;
}

function makeHandler(ctxGetter: () => FormContext, updater: (handler: _FormContextHandler) => void) {
    const handler = {
        __ctx: ctxGetter(), // TODO: This is unnecessary, we have it here only for easy debugging purposes

        canDelete(path: Path) {
            return gatherReferenceables(ctxGetter(), true, path);
        },

        canMarkEmpty(path: Path) {
            return gatherReferenceables(ctxGetter(), false, path);
        },

        data() {
            return ctxGetter().data;
        },

        delete(path: Path, passive = false) {
            if (!this.canDelete(path)) {
                throw new Error(`Item on path "${Data.Path.toString(path)}" cannot be removed because it is referenced by some other item(s)`);
            }

            let v = ctxGetter().data as DataTreeItem;
            for (let idx = 0; idx < path.length - 1; idx++) {
                const elem = path[idx];
                if (elem.kind === 'obj') {
                    assert(Data.isDataTree(v), `Expected a DataTree`);
                    v = v[elem.value];
                } else {
                    assert(Data.isDataTreeArray(v), `Expected a DataTree[]`);
                    v = v[elem.value];
                }
                assert(v !== undefined, `Attempted to delete a non-existent item at path "${Data.Path.toString(path)}"`);
            }

            const last = path[path.length - 1];
            if (last.kind === 'index') {
                assert(Array.isArray(v), `Expected an array`);
                v.splice(last.value, 1);
            } else {
                assert(Data.isDataTree(v), `Expected a DataTree`);
                delete v[last.value];
            }

            if (!passive) this.update();
        },

        getArray(path: Path) {
            return Data.getArray(ctxGetter().data, path);
        },

        getItem(path: Path): DataTreeItem {
            return Data.getItem(ctxGetter().data, path);
        },

        getTree(path: Path) {
            return Data.getTree(ctxGetter().data, path);
        },

        getTreeArray(path: Path): DataTree[] {
            return Data.getTreeArray(ctxGetter().data, path);
        },

        getValue(path: Path, defaultValue?: Value) {
            return Data.getValue(ctxGetter().data, path, defaultValue);
        },

        getValueArray(path: Path): Value[] {
            return Data.getValueArray(ctxGetter().data, path);
        },

        getVariantChoice(path: Path) {
            const data = Data.getTree(ctxGetter().data, path);
            assert(data.__mbdb_variant_choice !== undefined, `Attempted to get variant choice for an item that does not have any. This happened on path "${Data.Path.toString(path)}"`);

            return data.__mbdb_variant_choice;
        },

        hasItem(path: Path) {
            return Data.has(ctxGetter().data, path);
        },

        isGroupMarkedEmpty(path: Path) {
            const _data = Data.getTree(ctxGetter().data, path);
            return !!_data.__mbdb_group_marked_empty;
        },

        markGroupEmpty(markEmpty: boolean, path: Path) {
            const _data = Data.getTree(ctxGetter().data, path);
            _data.__mbdb_group_marked_empty = markEmpty;
        },

        navigation: {
            collapsedItems: new Set<object>(),

            clear() {
                this.collapsedItems.clear();
            },

            isCollapsed(dataItem: object) {
                return this.collapsedItems.has(dataItem);
            },

            removeItem(dataItem: object) {
                this.collapsedItems.delete(dataItem);
            },

            setCollapsed(dataItem: object, collapsed: boolean) {
                if (collapsed) {
                    assert(!this.collapsedItems.has(dataItem), 'Attempted to set item as collapsed but that item is already set as collapsed.');
                    this.collapsedItems.add(dataItem);
                } else {
                    assert(this.collapsedItems.has(dataItem), 'Attempted to set item as expanded but that item is already set as expanded.');
                    this.collapsedItems.delete(dataItem);
                }

                doUpdate();
            },
        },

        putVariantChoice(data: DataTree, choice: string) {
            data.__mbdb_variant_choice = choice;
        },

        refs: {
            add(path: Path, referenceAs: string, refId: string, passive = false) {
                const d = ctxGetter();
                References.add(d.references, referenceAs, refId, Data.getTree(d.data, path));
                if (!passive) doUpdate();
            },

            get() {
                return ctxGetter().references;
            },

            has(referenceAs: string, refId: string) {
                return References.has(ctxGetter().references, referenceAs, refId);
            },

            hasAnchor(referenceAs: string) {
                return References.hasAnchor(ctxGetter().references, referenceAs);
            },

            isItemReferenced(path: Path) {
                const rrIds = References.List.referenceableIdsInData(ctxGetter().data, path);
                return References.List.activeReferenceables(ctxGetter().references, rrIds, true).length > 0;
            },

            remove(referenceAs: string, refId: string, passive = false) {
                References.remove(ctxGetter().references, referenceAs, refId);
                if (!passive) doUpdate();
            },

            reset() {
                References.reset(ctxGetter().references);
            },
        },

        schema(): TopLevelItem {
            return ctxGetter().schema;
        },

        set(path: Path, value: Value | DataTree, passive = false) {
            Data.set(ctxGetter().data, path, value);
            if (!passive) this.update();
        },

        setVariantChoice(path: Path, choice: string, passive = false) {
            const data = Data.getTree(ctxGetter().data, path);
            this.putVariantChoice(data, choice);

            if (!passive) this.update();
        },

        unset(path: Path, passive = false) {
            Data.set(ctxGetter().data, path, void 0);
            if (!passive) this.update();
        },

        update() {
            doUpdate();
        },
    };

    const doUpdate = () => updater(handler);

    return handler;
}
export type _FormContextHandler = ReturnType<typeof makeHandler>;

export const FormContextHandler = {
    make(ctxGetter: () => FormContext, updater: (handler: _FormContextHandler) => void) {
        return makeHandler(ctxGetter, updater);
    },

    _null() {
        return makeHandler(
            () => {
                return FormContext.empty();
            },
            () => {
                // NOOP
            }
        );
    }
};
