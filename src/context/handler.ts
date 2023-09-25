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

        /**
         * Checks if a data item on a given path can be deleted.
         *
         * @param {Path} path - Path of the data item
         * @return {boolean} True if the item can be deleted, false otherwise
         */
        canDelete(path: Path) {
            return gatherReferenceables(ctxGetter(), true, path);
        },

        /**
         * Checks if a data section on a given path` can be marked as empty.
         *
         * @param {Path} path - Path of the data item representing the data section.
         * @return {boolean} True of the section can be marked as empty, false otherwise
         */
        canMarkEmpty(path: Path) {
            return gatherReferenceables(ctxGetter(), false, path);
        },

        /**
         * Retrieves the `data` part of the `FormContext`
         *
         * @return {DataTree} The data
         */
        data() {
            return ctxGetter().data;
        },

        /**
         * Deletes a data item on the given path.
         *
         * @param {Path} path - Path of the data item to delete.
         * @param {boolean} passive - If true, the handler will not trigger a re-render.
         * @throws Will throw in the data item cannot be deleted or of there is no data on the given path.
         */
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

        /**
         * Retrieves a data item on the given path as an array of `DataTree`s or `Value`s.
         * @param {Path} path - Path of the data item.
         * @throws Will throw if there is no data on the given path or if the data is not an array.
         * @return {DataTree[] | Value[]}
         */
        getArray(path: Path) {
            return Data.getArray(ctxGetter().data, path);
        },

        /**
         * Retrieves a data item on the given path as a `DataTreeItem`.
         * @param {Path} path - Path of the data item.
         * @throws Will throw if there is no data on the given path.
         * @return {DataTreeItem}
         */
        getItem(path: Path): DataTreeItem {
            return Data.getItem(ctxGetter().data, path);
        },

        /**
         * Retrieves a data item on the given path as a `DataTree`.
         * @param {Path} path - Path of the data item.
         * @throws Will throw if there is no data on the given path or if the data on the path is not a `DataTree`.
         * @return {DataTree}
         */
        getTree(path: Path) {
            return Data.getTree(ctxGetter().data, path);
        },

        /**
         * Retrieves a data item on the given path as an array of `DataTree`s.
         * @param {Path} path - Path of the data item.
         * @throws Will throw if there is no data on the given path or if the data on the path is not a `DataTree[]`.
         * @return {DataTree[]}
         */
        getTreeArray(path: Path): DataTree[] {
            return Data.getTreeArray(ctxGetter().data, path);
        },

        /**
         * Retrieves a data item on the given path as a `Value`.
         * @param {Path} path - Path of the data item.
         * @param {Value | undefined} defaultValue - Value that will be returned if there is no data on the given path.
         * @throws Will throw if there is no data on the given path, unless a default value is provided, or if the data on the path is not a `Value`.
         * @return {Value}
         */
        getValue(path: Path, defaultValue?: Value) {
            return Data.getValue(ctxGetter().data, path, defaultValue);
        },

        /**
         * Retrieves a data item on the given path as an array of `Value`s.
         * @param {Path} path - Path of the data item.
         * @throws Will throw if there is no data on the given path or if the data on the path is not a `Value[]`.
         * @return {Value[]}
         */
        getValueArray(path: Path): Value[] {
            return Data.getValueArray(ctxGetter().data, path);
        },

        /**
         * Retrieves the currently selected choice for a variant on the given path.
         *
         * @param{Path} path - Path of the variant
         * @throws If there is no data on the given path or the data is not a variant
         * @return {string}
         */
        getVariantChoice(path: Path) {
            const data = Data.getTree(ctxGetter().data, path);
            assert(data.__mbdb_variant_choice !== undefined, `Attempted to get variant choice for an item that does not have any. This happened on path "${Data.Path.toString(path)}"`);

            return data.__mbdb_variant_choice;
        },

        /**
         * Checks if a data item exists on the given path
         *
         * @param {Path} path - The path to probe
         * @return {boolean}
         */
        hasItem(path: Path) {
            return Data.has(ctxGetter().data, path);
        },

        /**
         * Checks if a group on the givet path is marked as empty.
         *
         * @param {Path} path - The path to probe
         * @throws Will throw if the data on the given path does not represent a group (= type of the data is not `DataTree`)
         * @return {boolean}
         */
        isGroupMarkedEmpty(path: Path) {
            const _data = Data.getTree(ctxGetter().data, path);
            return !!_data.__mbdb_group_marked_empty;
        },

        /**
         * Marks or unmarks group on the given path as empty.
         *
         * @param {boolean} markEmpty - Set to true to mark a group as empty or to false to unmark it.
         * @param {Path} path - Path to the group.
         * @throws Will throw if the data on the given path is not a group
         */
        markGroupEmpty(markEmpty: boolean, path: Path) {
            const _data = Data.getTree(ctxGetter().data, path);
            _data.__mbdb_group_marked_empty = markEmpty;
        },

        /**
         * Supporting functionality used by the navigation panel.
         */
        navigation: {
            /**
             * A set of `DataTreeItem`s that are currently collapsed in the form.
             * If a `DataTreeItem` is collapsed, it shall be present in the set.
             */
            collapsedItems: new Set<DataTreeItem>(),

            /**
             * Clears the list of collapsed items.
             */
            clear() {
                this.collapsedItems.clear();
            },

            /**
             * Checks if the given `DataTreeItem` is collapsed.
             * @param {DataTreeItem} dataItem - item to probe.
             * @return {boolean}
             */
            isCollapsed(dataItem: DataTreeItem) {
                return this.collapsedItems.has(dataItem);
            },

            /**
             * Removes item from the set of collapsed items.
             * This function allows attempts to remove items that are not present in the set.
             * @param {DataTreeItem} dataItem - Item to remove.
             */
            removeItem(dataItem: DataTreeItem) {
                this.collapsedItems.delete(dataItem);
            },

            /**
             * Sets or unsets `DataTreeItem` as collapsed.
             * Attempts to set/unset an item that already is/is not collapsed is an error.
             *
             * @param {DataTreeItem} dataItem - Item to set/unset
             * @param {boolean} collapsed - If true, item is set as collapsed and vice versa.
             * @throws Will throw if an attempt is made to collapse an already collapsed item and vice versa.
             */
            setCollapsed(dataItem: DataTreeItem, collapsed: boolean) {
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

        /**
         * Changes the currently selected choice of a variant
         *
         * @param {DataTree} data - Data representing the variant.
         * @param {string} choice - The choice to select.
         */
        putVariantChoice(data: DataTree, choice: string) {
            data.__mbdb_variant_choice = choice;
        },

        /**
         * Handling of referenceable items (also referred to as "referenceables", for short).
         */
        refs: {
            /**
             * Adds a new referenceable item.
             *
             * @param {Path} path - Path of the referenceable item in the data tree.
             * @param {string} referenceAs - Kind of the referenceable item (also referred to as `anchor`).
             * @param {string} refId - Unique identifier of the referenceable item.
             * @param {boolean} passive - If true, this function will not trigger re-render of the form.
             * @throws Will throw if the item is already present in the list.
             */
            add(path: Path, referenceAs: string, refId: string, passive = false) {
                const d = ctxGetter();
                References.add(d.references, referenceAs, refId, Data.getTree(d.data, path));
                if (!passive) doUpdate();
            },

            /**
             * Retrieves the entire `References` object.
             *
             * @return {ReferenceAnchors}
             */
            get() {
                return ctxGetter().references
            },

            /**
             * Checks if there is a reference of the given kind (anchor) and identifier.
             *
             * @param {string} referenceAs -Kind of the referenceable item (also referred to as `anchor`).
             * @param {string} refId - Unique identifier of the referenceable item.
             * @return {boolean}
             */
            has(referenceAs: string, refId: string) {
                return References.has(ctxGetter().references, referenceAs, refId);
            },

            /**
             * Checks if the given anchor exists in the list of referenceable items.
             *
             * @param {string} referenceAs - Kind of the referenceable item (also referred to as `anchor`).
             * @return {boolean}
             */
            hasAnchor(referenceAs: string) {
                return References.hasAnchor(ctxGetter().references, referenceAs);
            },

            /**
             * Checks if an item on the given path is referenced by any other items.
             *
             * @param {Path} path - Path of the item to probe
             * @return {boolean}
             */
            isItemReferenced(path: Path) {
                const rrIds = References.List.referenceableIdsInData(ctxGetter().data, path);
                return References.List.activeReferenceables(ctxGetter().references, rrIds, true).length > 0;
            },

            /**
             * Removes a referenceable item from the list of referenceable items.
             *
             * @param {string} referenceAs - Kind of the referenceable item (also referred to as `anchor`).
             * @param {string} refId - Unique identifier of the referenceable item.
             * @param {boolean} passive - If true, this function will not trigger re-render of the form.
             * @throw Will throw if an attempt is made to remove a non-existent referenceable item or if the referenceable item is referenced by something.
             */
            remove(referenceAs: string, refId: string, passive = false) {
                References.remove(ctxGetter().references, referenceAs, refId);
                if (!passive) doUpdate();
            },

            /**
             * Clears the list of all referenceable items.
             */
            reset() {
                References.reset(ctxGetter().references);
            },
        },

        /**
         * Retrieves the `schema` part of the `FormContext`.
         *
         * @return {TopLevelItem}
         */
        schema(): TopLevelItem {
            return ctxGetter().schema;
        },

        /**
         * Sets the given value in the data tree on the given path.
         * Data tree is built up as needed to put the value onto the correct path.
         *
         * @param {Path} path - Path where to put the value.
         * @param {DataTree | Value} - The value to store. The value can also be a tree.
         * @param {boolean} passive - If true, this function will not trigger re-render of the form.
         */
        set(path: Path, value: Value | DataTree, passive = false) {
            Data.set(ctxGetter().data, path, value);
            if (!passive) this.update();
        },

        /**
         * Changes the currently selected choice for a variant on the given path.
         *
         * @param {Path} path - Path to the variant.
         * @param {string} choice - The choice to set.
         * @param {boolean} passive - If true, this function will not trigger re-render of the form.
         */
        setVariantChoice(path: Path, choice: string, passive = false) {
            const data = Data.getTree(ctxGetter().data, path);
            this.putVariantChoice(data, choice);

            if (!passive) this.update();
        },

        /**
         * Removes an item on the given path from the data tree.
         *
         * @param {Path} path - Path to delete
         * @param {boolean} passive - If true, this function will not trigger re-render of the form.
         */
        unset(path: Path, passive = false) {
            Data.set(ctxGetter().data, path, void 0);
            if (!passive) this.update();
        },

        /**
         * Triggers a re-render of the form.
         */
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
