import { assert } from '../../assert';
import { Register } from '../../ui/form/custom-components/register';
import { replaceAll } from '../../util';
import { Item, Schema, TopLevelItem } from '../../schema';
import { Data, DataTree, Path } from '../../schema/data';
import { Value } from '../../schema/value';
import { Traverse } from '../../schema/traverse';

function hasArrayCorrectLength(item: DataTree[] | Value[], schemaItem: Item) {
    const minItems = schemaItem.isRequired ? (schemaItem.minItems ?? 1) : 0;
    return item.length >= minItems;
}

export function niceLabel(label: string, noop = false) {
    if (label.length === 0 || noop) return label;

    return label[0].toLocaleUpperCase() + replaceAll(label.substring(1), '_', ' ');
}

export function sectionBgCls(isDark: boolean, isDisabled: boolean) {
    return isDark
        ? isDisabled
            ? 'mbdb-section-disabled-dark'
            : 'mbdb-block-dark'
        : isDisabled
            ? 'mbdb-section-disabled-light'
            : 'mbdb-block-light';
}

export function subtreeHasErrors(data: DataTree, path: Path, schema: TopLevelItem): boolean {
    const item = Data.getItem(data, path);

    if (Data.isDataTree(item)) {
        if (item.__mbdb_variant_choice !== undefined) /* A cheapo way how to check for VariantItem :) */ {
            // Ignore variant choices that are not displayed in the form
            // to prevent false error indications. This is necessary
            // because we keep the data for all variant choices all the time
            // even though only one choice can be displayed at a time
            return subtreeHasErrors(data, Data.Path.path(item.__mbdb_variant_choice, path), schema);
        } else {
            const schemaItem = Traverse.itemFromSchema(Traverse.objPathFromDataPath(path), schema);

            if (Schema.hasCustomInput(schemaItem)) {
                const cc = Register.get(schemaItem.component);
                assert(!!cc, `Unknown custom component "${schemaItem.component}".`);

                if (cc.hasErrors(item)) return true;
            } else if (Schema.hasComplexInput(schemaItem)) {
                for (const innerSchemaItem of schemaItem.input) {
                    if (Schema.hasIgnoredInput(innerSchemaItem)) continue;

                    const hasError = subtreeHasErrors(data, Data.Path.path(innerSchemaItem.tag, path), schema);
                    if (hasError) return true;
                }
            } else if (Schema.hasRelatedToInput(schemaItem)) {
                // All items that should be ignored in this check should go here
                return false;
            } else {
                assert(false, `Item "${schemaItem.tag}" is not handled but it should be.`);
            }

            return false;
        }
    } else if (Data.isDataTreeArray(item)) {
        const schemaItem = Traverse.itemFromSchema(Traverse.objPathFromDataPath(path), schema);
        if (!hasArrayCorrectLength(item, schemaItem)) return true;

        if (Schema.hasCustomInput(schemaItem)) {
            const cc = Register.get(schemaItem.component);
            assert(!!cc, `Unknown custom component "${schemaItem.component}"`);

            for (let idx = 0; idx < item.length; idx++) {
                if (cc.hasErrors(item[idx])) return true;
            }
        } else {
            for (let idx = 0; idx < item.length; idx++) {
                const hasError = subtreeHasErrors(data, Data.Path.index(idx, path), schema);
                if (hasError) return true;
            }
        }

        return false;
    } else {
        if (Array.isArray(item)) {
            const schemaItem = Traverse.itemFromSchema(Traverse.objPathFromDataPath(path), schema);
            if (!hasArrayCorrectLength(item, schemaItem)) return true;

            for (const v of item) {
                if (!v.isValid) return true;
            }

            return false;
        } else {
            return !item.isValid;
        }
    }
}

export function useDarkBlock(nestLevel: number) {
    return nestLevel % 2 === 1;
}
