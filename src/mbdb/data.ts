import { Data, Path } from '../schema/data';
import { assert } from '../assert';

function arrayTokName(tok: string) {
    return tok.substring(0, tok.length - 2);
}

function isArray(v: MbdbData | MbdbData[] | MbdbScalar | MbdbScalar[]): v is MbdbData[] | MbdbScalar[] {
    return (typeof v === 'object' && Array.isArray(v));
}

function isObject(v: MbdbData | MbdbData[] | MbdbScalar | MbdbScalar[]): v is MbdbData {
    return (typeof v === 'object' && !Array.isArray(v));
}

function isScalar(v: MbdbData | MbdbData[] | MbdbScalar | MbdbScalar[]): v is MbdbScalar {
    return (
        typeof v === 'boolean' ||
        typeof v === 'number' ||
        typeof v === 'string'
    );
}

function mkChild(elem: Path[number]) {
    return elem.kind === 'obj' ? {} : [];
}

function tokMarksArray(tok: string) {
    return tok.endsWith('[]');
}

export type MbdbScalar = number | string | boolean;
export type MbdbData = { [key: string]: MbdbData | MbdbData[] | MbdbScalar | MbdbScalar[] };
export type MbdbDataItem = MbdbData | MbdbData[] | MbdbScalar | MbdbScalar[];

export const MbdbData = {
    getArray(data: MbdbData, path: Path): MbdbScalar[] | MbdbData[] | undefined {
        const v = MbdbData.getItem(data, path);
        if (v === undefined) return void 0;

        assert(isArray(v), `Expected MbdbScalar[] or MbdbData[] object but got a non-array object on path "${Data.Path.toString(path)}".`);

        return v;
    },

    getItem(data: MbdbData, path: Path): MbdbDataItem | undefined {
        let v: MbdbData | MbdbData[] = data;

        for (let idx = 0; idx < path.length; idx++) {
            const elem = path[idx];

            if (elem.kind === 'obj') {
                assert(!Array.isArray(v), 'Got an array but expected an object');
                v = v[elem.value] as MbdbData | MbdbData[];
            } else if (elem.kind === 'index') {
                assert(Array.isArray(v), 'Got an object but expected an array');
                v = v[elem.value];
            }

            if (v === undefined) return void 0;
        }

        return v;
    },

    getObject(data: MbdbData, path: Path): MbdbData | undefined {
        const v = MbdbData.getItem(data, path);
        if (v === undefined) return void 0;

        assert(isObject(v), `Expected a MbdbData object but got something else on Path "${Data.Path.toString(path)}".`);

        return v;
    },

    getScalar(data: MbdbData, path: Path): MbdbScalar | undefined {
        const v = MbdbData.getItem(data, path);
        if (v === undefined) return void 0;

        assert(isScalar(v), `Expected a MbdbScalar object but got something else on Path "${Data.Path.toString(path)}".`);

        return v;
    },

    set(data: MbdbData, value: MbdbData | MbdbScalar, path: Path) {
        let v: MbdbData | MbdbData[] = data;

        for (let idx = 0; idx < path.length - 1; idx++) {
            const elem = path[idx];

            if (elem.kind === 'obj') {
                assert(!Array.isArray(v), 'Got an array but expected an object');

                if (v[elem.value] === undefined) {
                    v[elem.value] = mkChild(path[idx + 1]);
                }
                v = v[elem.value] as MbdbData;
            } else if (elem.kind === 'index') {
                assert(Array.isArray(v), 'Got an object but expected an array');
                while (v.length <= elem.value) v.push({});
                v = v[elem.value];
            }
        }

        const last = path[path.length - 1];
        if (last.kind === 'obj') {
            assert(!Array.isArray(v), 'Got an array but expected an object');
            v[last.value] = value;
        } else if (last.kind === 'index') {
            assert(Array.isArray(v), 'Got an object but expected an array');
            // @ts-ignore
            v[last.value] = value;
        }
    },

    Path: {
        extend(tail: string, prefix: string) {
            return prefix.length === 0 ? tail : prefix + '/' + tail;
        },

        toArrayPath(mbdbPath: string, arrayIndices: number[]) {
            // Yucky yucky copy-pasta
            const toks = mbdbPath.split('/');

            const path: Path = [];
            let aIdx = 0;
            for (const tok of toks.slice(0, toks.length - 1)) {
                if (tokMarksArray(tok)) {
                    const i = arrayIndices[aIdx++];
                    assert(i !== undefined, `Undefined array index when creating a Path from mbdbPath. This happened with mbdbPath "${mbdbPath}" and array indices "${arrayIndices.join(', ')}"`);

                    path.push({ kind: 'obj', value: arrayTokName(tok) });
                    path.push({ kind: 'index', value: i });
                } else {
                    path.push({ kind: 'obj', value: tok });
                }
            }
            assert(aIdx === arrayIndices.length, `Did not exhaust all array indices when creating a Path from mbdbPath. This happened with mbdbPath "${mbdbPath}" and array indices "${arrayIndices.join(', ')}"`);

            const last = toks[toks.length - 1];
            assert(tokMarksArray(last), `Last token "${last}" must mark an array but it does not. This happened with mbdbPath "${mbdbPath}".`);

            path.push({ kind: 'obj', value: arrayTokName(last) });

            return path;
        },

        toPath(mbdbPath: string, arrayIndices: number[]) {
            const toks = mbdbPath.split('/');

            const path: Path = [];
            let aIdx = 0;
            for (const tok of toks) {
                if (tokMarksArray(tok)) {
                    const i = arrayIndices[aIdx++];
                    assert(i !== undefined, `Undefined array index when creating a Path from mbdbPath. This happened with mbdbPath "${mbdbPath}" and array indices "${arrayIndices.join(', ')}"`);

                    path.push({ kind: 'obj', value: arrayTokName(tok) });
                    path.push({ kind: 'index', value: i });
                } else {
                    path.push({ kind: 'obj', value: tok });
                }
            }

            assert(aIdx === arrayIndices.length, `Did not exhaust all array indices when creating a Path from mbdbPath. This happened with mbdbPath "${mbdbPath}" and array indices "${arrayIndices.join(', ')}"`);

            return path;
        }
    },
};
