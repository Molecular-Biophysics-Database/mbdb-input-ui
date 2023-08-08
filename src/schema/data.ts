import { Schema } from './';
import { Value, TValue } from './value';
import { assert } from '../assert';

function get(data: DataTree, path: Path, defaultValue?: Value) {
    let v = data as DataTreeItem;

    for (const elem of path) {
        if (elem.kind === 'obj') {
            if (isDataTree(v)) {
                v = v[elem.value];
            } else {
                assert(false, `Path element ${elem} attempted to get a child object but the item does not have any.`);
            }
        } else {
            if (Array.isArray(v)) {
                v = v[elem.value];
            } else {
                assert(false, `Path element ${elem} attempted to get an array element but the item is not an array.`);
            }
        }

        if (v === undefined) {
            if (defaultValue !== undefined) {
                const _v = { [elem.value]: defaultValue };
                v = _v[elem.value];
            } else {
                throw new Error(`Expected to have data on path "${Data.Path.toString(path)}" but there is no data`);
            }
        }
    }

    return v;
}

function isDataTree(item: DataTreeItem): item is DataTree {
    return typeof item === 'object' && !Array.isArray(item) && !Value.isValue(item);
}

function isDataTreeArray(item: DataTreeItem): item is DataTree[] {
    return Array.isArray(item) && (item.length > 0 ? isDataTree(item[0]) : true);
}

function isDescendable(item: DataTreeItem) {
    return Array.isArray(item) || (typeof item === 'object' && !Value.isValue(item));
}

function isValueArray(item: DataTreeItem): item is Value[] {
    return Array.isArray(item) && (item.length > 0 ? Value.isValue(item[0]) : true);
}

function mkChild(elem: Path[number]) {
    return elem.kind === 'obj' ? {} : [];
}

function walk(subtree: DataTreeItem, parentPath: Path, callback: (item: Value, path: Path) => void) {
    if (Array.isArray(subtree)) {
        for (let idx = 0; idx < subtree.length; idx++) {
            const elem = subtree[idx];
            const path = Data.Path.index(idx, parentPath);

            if (isDescendable(elem)) {
                walk(elem, path, callback);
            } else {
                callback(elem as Value, path);
            }
        }
    } else if (isDataTree(subtree)) {
        for (const prop in subtree) {
            if (Schema.isReservedKey(prop))
                continue;

            const item = subtree[prop];
            const path = Data.Path.path(prop, parentPath);

            if (isDescendable(item)) {
                walk(item, path, callback);
            } else {
                assert(Value.isValue(item), `Expected a Value object but got something else.`);
                callback(item, path);
            }
        }
    }
}

export type DataTreeItem = DataTree | DataTree[] | Value | Value[];
export type MbdbInternal = {
    __mbdb_other_choice?: string,
    __mbdb_variant_choice?: string,
    __mbdb_referenceable_id?: TValue<string>,
};
export type DataTree = {
    [key: string]: DataTreeItem,
} & MbdbInternal;

export type Path = ({ kind: 'obj', value: string } | { kind: 'index', value: number })[];

export const Data = {
    getArray(data: DataTree, path: Path): DataTree[] | Value[] {
        const v = get(data, path);
        assert(Array.isArray(v), `getArray() function must return an array but it returned something else. This happened with path "${Data.Path.toString(path)}".`);

        return v;
    },

    getItem(data: DataTree, path: Path): DataTreeItem {
        return get(data, path);
    },

    getTree(data: DataTree, path: Path): DataTree {
        const v = get(data, path);
        assert(isDataTree(v), `getTree() function must return a tree but it returned something else. This happened with path "${Data.Path.toString(path)}".`);

        return v;
    },

    getTreeArray(data: DataTree, path: Path): DataTree[] {
        const v = get(data, path);
        assert(isDataTreeArray(v), `getTreeArray() function must return an array of trees but it returned something else. This happened with path "${Data.Path.toString(path)}".`);

        return v as DataTree[];
    },

    getValue(data: DataTree, path: Path, defaultValue?: Value): Value {
        const v = get(data, path, defaultValue);
        assert(Value.isValue(v), `getValue() function must return a value but it looks like it returned a subtree instead. This happened with path "${Data.Path.toString(path)}".`);

        return v;
    },

    getValueArray(data: DataTree, path: Path): Value[] {
        const v = get(data, path);
        assert(isValueArray(v), `getValueArray() function must return an array of values but it looks like it returned a subtree instead. This happened with path "${Data.Path.toString(path)}".`);

        return v as Value[];
    },

    has(data: DataTree, path: Path) {
        let v = data as DataTreeItem;
        for (const elem of path) {
            if (elem.kind === 'obj') {
                if (isDataTree(v)) {
                    v = v[elem.value];
                } else {
                    assert(false, `Path element ${elem} attempted to get a child object but the item does not have any.`);
                }
            } else {
                if (Array.isArray(v)) {
                    v = v[elem.value];
                } else {
                    assert(false, `Path element ${elem} attempted to get an array element but the item is not an array.`);
                }
            }

            if (v === undefined) {
                return false;
            }
        }

        return true;
    },

    isDataTree(item: DataTreeItem): item is DataTree {
        return isDataTree(item);
    },

    isDataTreeArray(item: DataTreeItem): item is DataTree[] {
        return isDataTreeArray(item);
    },

    set(data: DataTree, path: Path, value: Value | Value[] | DataTree | undefined) {
        let v = data as DataTreeItem;
        for (let idx = 0; idx < path.length - 1; idx++) {
            const elem = path[idx];
            if (elem.kind === 'obj') {
                assert(!Array.isArray(v), 'Got an array but expected an object');

                if ((v as DataTree)[elem.value] === undefined) {
                   (v as DataTree)[elem.value] = mkChild(path[idx + 1]);
                }
                v = (v as DataTree)[elem.value];
            } else if (elem.kind === 'index') {
                assert(Array.isArray(v), 'Got an object but expected an array');
                while (v.length <= elem.value) (v as DataTree[]).push({});
                v = v[elem.value];
            }
        }

        const last = path[path.length - 1];
        if (value === undefined) {
            if (!isDataTree(v)) {
                assert(false, `Attempted to delete value from an array on path "${Data.Path.toString(path)}".`);
            } else {
                assert(v[last.value] !== undefined, `Attempted to delete non-existent value on path "${Data.Path.toString(path)}"`);
                delete v[last.value];
            }
        } else {
            if (last.kind === 'obj') {
                assert(!Array.isArray(v), 'Got an array but expected an object');
                // @ts-ignore
                v[last.value] = value;
            } else if (last.kind === 'index') {
                assert(Array.isArray(v), 'Got an object but expected an array');
                // @ts-ignore
                v[last.value] = value;
            }
        }
    },

    walk(subtree: DataTree, callback: (item: Value, path: Path) => void) {
        if (Value.isValue(subtree)) {
            callback(subtree, []);
        } else {
            walk(subtree, [], callback);
        }
    },

    walkShallow(subtree: DataTree, callback: (item: Value, path?: number | string) => void) {
        if (Array.isArray(subtree)) {
            for (let idx = 0; idx < subtree.length; idx++) {
                const elem = subtree[idx];

                if (Value.isValue(elem)) {
                    callback(elem, idx);
                }
            }
        } else {
            if (Value.isValue(subtree)) {
                callback(subtree);
            } else {
                for (const prop in subtree) {
                    const item = subtree[prop];

                    if (Value.isValue(item)) {
                        callback(item, prop);
                    }
                }
            }
        }
    },

    Path: {
        arePathsEqual(a: Path, b: Path) {
            if (a.length !== b.length) return false;

            for (let idx = 0; idx < a.length; idx++) {
                const iA = a[idx];
                const iB = b[idx];

                if (iA.kind !== iB.kind || iA.value !== iB.value) return false;
            }

            return true;
        },

        index(value: number, parent: Path): Path {
            return [...parent, { kind: 'index', value }];
        },

        path(value: string, parent: Path): Path {
            return [...parent, { kind: 'obj', value }];
        },

        parent(path: Path) {
            return path.length < 2 ? path : path.slice(0, path.length - 1);
        },

        subtree(data: DataTree, path: Path): DataTree {
            let subtree = data as DataTreeItem;

            for (const elem of path) {
                if (isDataTree(subtree) && elem.kind === 'obj') {
                    subtree = subtree[elem.value];
                } else if (Array.isArray(subtree) && elem.kind === 'index') {
                    subtree = subtree[elem.value];
                } else {
                    assert(false, `Attempted to get wrong kind of data due to object vs. array mismatch. The offending path was "${this.toString(path)}"`);
                }

                assert(subtree !== undefined, `Attempted to get data subtree for path "${this.toString(path)}" but there is no subtree for path element "${elem.value}"`);
            }

            assert(isDataTree(subtree), `subtree() function must return DataTree but it returned something else. This happened with path "${this.toString(path)}"`);

            return subtree;
        },

        toString(path: Path) {
            let p = '';
            for (const elem of path) {
                if (elem.kind === 'obj') {
                    p += `/${elem.value}`;
                } else if (elem.kind === 'index') {
                    p += `[${elem.value}]`;
                }
            }

            return p;
        },
    },
};
