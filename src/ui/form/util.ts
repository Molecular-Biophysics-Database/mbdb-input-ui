import { replaceAll } from '../../util';
import { TopLevelItem } from '../../schema';
import { Data, DataTree, Path } from '../../schema/data';
import { Traverse } from '../../schema/traverse';
import { objKeys } from '../../util';

export function niceLabel(label: string, noop = false) {
    if (label.length === 0 || noop) return label;

    return label[0].toLocaleUpperCase() + replaceAll(label.substring(1), '_', ' ');
}

export function subtreeHasErrors(data: DataTree, path: Path, schema: TopLevelItem): boolean {
    const item = Data.getItem(data, path);

    if (Data.isDataTree(item)) {
        if (item.__mbdb_variant_choice !== undefined) {
            // Ignore variant choices that are not displayed in the form
            // to prevent false error indications. We this is necessary
            // because we keep the data for all variant choices all the time
            // even though only one choice can be displayed at a time
            return subtreeHasErrors(data, Data.Path.path(item.__mbdb_variant_choice, path), schema);
        } else {
            for (const key of objKeys(item)) {
                const hasError = subtreeHasErrors(data, Data.Path.path(key as string, path), schema);
                if (hasError) return true;
            }

            return false;
        }
    } else if (Data.isDataTreeArray(item)) {
        const schemaItem = Traverse.itemFromSchema(Traverse.objPathFromDataPath(path), schema);
        if (schemaItem.isRequired) {
            const minItems = schemaItem.minItems ?? 0;
            if (item.length < minItems) return true;
        }

        for (let idx = 0; idx < item.length; idx++) {
            const hasError = subtreeHasErrors(data, Data.Path.index(idx, path), schema);
            if (hasError) return true;
        }

        return false;
    } else {
        if (Array.isArray(item)) {
            const schemaItem = Traverse.itemFromSchema(Traverse.objPathFromDataPath(path), schema);
            if (schemaItem.isRequired) {
                const minItems = schemaItem.minItems ?? 0;
                if (item.length < minItems) return true;
            }

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
