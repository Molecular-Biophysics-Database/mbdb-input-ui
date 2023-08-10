import { replaceAll } from '../../util';
import { Data, DataTree, Path } from '../../schema/data';
import { objKeys } from '../../util';

export function subtreeHasErrors(data: DataTree, path: Path): boolean {
    const item = Data.getItem(data, path);

    if (Data.isDataTree(item)) {
        if (item.__mbdb_variant_choice !== undefined) {
            // Ignore variant choices that are not displayed in the form
            // to prevent false error indications. We this is necessary
            // because we keep the data for all variant choices all the time
            // even though only one choice can be displayed at a time
            return subtreeHasErrors(data, Data.Path.path(item.__mbdb_variant_choice, path));
        } else {
            for (const key of objKeys(item)) {
                const hasError = subtreeHasErrors(data, Data.Path.path(key as string, path));
                if (hasError) return true;
            }

            return false;
        }
    } else if (Data.isDataTreeArray(item)) {
        for (let idx = 0; idx < item.length; idx++) {
            const hasError = subtreeHasErrors(data, Data.Path.index(idx, path));
            if (hasError) return true;
        }

        return false;
    } else {
        if (Array.isArray(item)) {
            for (const v of item) {
                if (!v.isValid) return true;
            }

            return false;
        } else {
            return !item.isValid;
        }
    }
}

export function niceLabel(label: string, noop = false) {
    if (label.length === 0 || noop) return label;

    return label[0].toLocaleUpperCase() + replaceAll(label.substring(1), '_', ' ');
}
