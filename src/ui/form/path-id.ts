import { assert } from '../../assert';
import { Path } from '../../schema/data';

const Delim = '-';
const VariantTag = '_variant';

function getValue(e: Path[0]) {
    return e.kind === 'index' ? `[${e.value}]` : e.value;
}

export const PathId = {
    extendId(ext: string | number, path: string, isIndex = false): string {
        // NO NO N: Infer is/is not index from ext type
        const _ext = isIndex ? `[${ext}]` : ext.toString();

        return !path ? _ext : path + Delim + _ext;
    },

    tagAsVariant(htmlId: string) {
        return htmlId + VariantTag;
    },

    toId(path: Path) {
        return path.map(getValue).join(Delim);
    },

    toPath(htmlId: string): Path {
        const toks = htmlId.split(Delim);
        const path = [];

        for (const tok of toks) {
            if (tok.startsWith('[') && tok.endsWith(']') && tok.length > 2) {
                const idx = parseInt(tok.substring(1, tok.length - 1));
                assert(!isNaN(idx), `Array index must be a number but is ${tok}`);
                path.push({ kind: 'index', value: idx } as Path[0]);
            } else {
                path.push({ kind: 'obj', value: tok } as Path[0]);
            }
        }

        return path;
    },

    toVariantId(path: Path) {
        return this.toId(path) + VariantTag;
    },
}
