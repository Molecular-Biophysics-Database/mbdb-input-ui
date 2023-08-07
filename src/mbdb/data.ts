import { Path } from '../schema/data';
import { assert } from '../assert';

function mkChild(elem: Path[number]) {
    return elem.kind === 'obj' ? {} : [];
}

export type MbdbScalar = number | string | boolean;
export type MbdbData = { [key: string]: MbdbData | MbdbData[] | MbdbScalar | MbdbScalar[] };

export const MbdbData = {
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
            return prefix.length === 0 ? tail : prefix + '/' +tail;
        },

        toPath(mbdbPath: string, arrayIndices: number[]) {
            const toks = mbdbPath.split('/');

            const path: Path = [];
            let aIdx = 0;
            for (const tok of toks) {
                if (tok.endsWith('[]')) {
                    const i = arrayIndices[aIdx++];
                    assert(i !== undefined, `Undefined array index when creating a Path from mbdbPath. This happened with mbdbPath "${mbdbPath}" and array indices "${arrayIndices.join(', ')}"`);

                    path.push({ kind: 'obj', value: tok.substring(0, tok.length - 2) });
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
