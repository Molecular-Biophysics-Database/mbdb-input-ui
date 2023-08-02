import { Item, Schema } from './';
import { Path } from './data';
import { assert } from '../assert';

export const Traverse = {
    /*
     * NO NO NO!!! Remove this once we are sure that the alternate implementation works
    itemFromSchema(objPath: string, fullSchema: Item) {
        const toks = objPath.split('/');

        let schema = fullSchema;

        let item; let idx;
        for (idx = 0; idx < toks.length; idx++) {
            const tok = toks[idx];

            if (Schema.hasComplexInput(schema)) {
                item = schema.input.find((im) => im.tag === tok);
            } else if (Schema.hasVariantInput(schema)) {
                item = schema.input[tok];
            } else {
                if (!item) {
                    assert(false, `Attempted to descend into undefined item. This happened with object path "${objPath}"`);
                } else {
                    assert(false, `Attempted to descend into item "${item.tag}" but that item does not have a descendable. This happened with object path "${objPath}"`);
                }
            }
            assert(item !== undefined, `No item in schema for object path "${objPath}", failed at path token "${tok}"`);

            if (item.isArray) {
                schema = item.input as CtxSchema;
                idx++;
            } else {
                if (Schema.hasComplexInput(item)) {
                    schema = item.input;
                } else if (Schema.hasVariantInput(item)) {
                    idx++;
                    const varTok = toks[idx];

                    // The path might end at the variant item itself
                    if (!varTok) {
                        return item;
                    }

                    let varItem = undefined;
                    for (const k in item.input) {
                        if (k === varTok) {
                            varItem = item.input[k];
                            break;
                        }
                    }

                    assert(varItem !== undefined, `Attempted to resolve variant input for item "${item.tag}" but the given item does not have the requested variant input "${varTok}"`);

                    if (!Schema.hasComplexInput(varItem)) {
                        item = varItem;
                    } else {
                        schema = varItem.input;
                    }
                } else {
                    continue;
                }
            }
        }

        assert(idx >= toks.length, `Did not exhaust object path "${objPath}", got stuck on index ${idx}`);

        return item;
    },
    */

    itemFromSchema(objPath: string, schema: Item) {
        const toks = objPath.split('/');

        let item: Item | undefined = schema
        let idx;
        for (idx = 0; idx < toks.length; idx++) {
            const tok = toks[idx];

            if (Schema.hasComplexInput(item!)) {
                item = item.input.find((im) => im.tag === tok);
            } else if (Schema.hasVariantInput(item!)) {
                item = item.input[tok];
            } else {
                assert(false, `Attempted to descend into item "${item!.tag}" but that item does not have a descendable. This happened with object path "${objPath}"`);
            }
            assert(item !== undefined, `No item in schema for object path "${objPath}", failed at path token "${tok}"`);
        }

        assert(idx === toks.length, `Did not exhaust object path "${objPath}", got stuck on index ${idx}`);

        return item;
    },

    objPath(tag: string, prefix: string) {
        return !prefix ? tag : `${prefix}/${tag}`;
    },

    objPathFromDataPath(dataPath: Path) {
        let objPath = '';

        for (const tok of dataPath) {
            if (tok.kind === 'index') {
                // We do not care about array indices here because the number of array elements
                // does not matter when we try to retrieve an item from the schema.
                continue;
            }
            objPath = this.objPath(tok.value.toString(), objPath);
        }

        return objPath;
    },
};
