import { ComplexItem, Item, Input, Schema, TopLevelItem } from '../';
import { assert } from '../../assert';

export type ConfigurationItem = {
    defaultValue: string | number | boolean,
    dontDisplay: boolean,
    dontTransformContent: boolean,
    dontTransformLabels: boolean,
    label: string,
    order: { tag: string, index: number }[],
};
export type Configuration = Record<string, Partial<ConfigurationItem>>;

function configureItem(item: Item, cfg: Partial<ConfigurationItem>) {
    if (cfg.order) {
        if (!Schema.hasComplexInput(item)) {
            console.warn(`Attempted to reorder items in an item "${item.tag}" that does not have complex input. This is not allowed.`);
        } else {
            reorderChildren(item, cfg.order);
        }
    }
    if (cfg.label) {
        item.label = cfg.label;
    }
    if (cfg.dontDisplay) {
        item.dontDisplay = true;
    }
    if (cfg.dontTransformContent) {
        item.dontTransformContent = true;
    }
    if (cfg.dontTransformLabels) {
        item.dontTransformLabels = true;
    }
    if (cfg.defaultValue !== undefined) {
        if (Schema.hasNumericInput(item)) {
            if (typeof cfg.defaultValue === 'number') {
                item.defaultValue = cfg.defaultValue;
            } else {
                console.warn(`Invalid default value "${cfg.defaultValue}" for item "${item.tag}".`);
            }
        } else if (Schema.hasTextualInput(item)) {
            if (typeof cfg.defaultValue === 'string') {
                item.defaultValue = cfg.defaultValue;
            } else {
                console.warn(`Invalid default value "${cfg.defaultValue}" for item "${item.tag}".`);
            }
        } else if (Schema.hasOptionsInput(item)) {
            if (typeof cfg.defaultValue === 'string' && !!item.choices.find((c) => c.tag === cfg.defaultValue)) {
                item.defaultValue = cfg.defaultValue;
            } else {
                console.warn(`Invalid default value "${cfg.defaultValue}" for item "${item.tag}".`);
            }
        } else {
            console.warn(`Attempted to set default value for item "${item.tag}" but that item cannot have default value.`);
        }
    }
}

function getAllConfigurees(schema: Input, pattern: string, configurees: Item[] = []) {
    if (Schema.isComplexInput(schema)) {
        for (const item of schema) {
            if (item.tag === pattern) {
                configurees.push(item);
            }

            if (Schema.hasComplexInput(item) || Schema.hasVariantInput(item)) {
                getAllConfigurees(item.input, pattern, configurees);
            }
        }
    } else if (Schema.isVariantInput(schema)) {
        for (const prop in schema) {
            const varItem = schema[prop];
            if (varItem.tag === pattern) {
                configurees.push(varItem);
            }

            getAllConfigurees(varItem.input, pattern, configurees);
        }
    }

    return configurees;
}

function getSpecificConfiguree(schema: Input, path: string[]) {
    let item = { 'input': schema } as Item; // We must always get the whole schema here so we imitate an Item here

    for (let idx = 0; idx < path.length; idx++) {
        const tok = path[idx];
        let _item: Item | undefined = undefined;

        if (Schema.hasVariantInput(item)) {
            for (const prop in item.input) {
                if (prop === tok) {
                    _item = item.input[prop];
                    break;
                }
            }
        } else if (Schema.hasComplexInput(item)) {
            for (const x of item.input) {
                if (x.tag === tok) {
                    _item = x;
                    break;
                }
            }
        } else if (Schema.hasTextualInput(item)) {
            if (idx === path.length - 1) {
                return item;
            } else {
                console.warn('Item with textual input must be at the end of the path');
                return void 0;
            }
        }

        if (_item === undefined) {
            return void 0;
        }

        item = _item;
    }

    return item;
}

function reorderChildren(item: ComplexItem, order: ConfigurationItem['order']) {
    let input = item.input;
    for (const o of order) {
        const fromIdx = input.findIndex((x) => x.tag === o.tag);
        if (fromIdx === -1)
            continue;
        if (o.index >= input.length)
            throw new Error(`Requested item child position ${o.index} but the item has only ${input.length} children`);

        const i = input.splice(fromIdx, 1);
        input = [...input.slice(0, o.index), ...i, ...input.slice(o.index)];
    }

    item.input = input;
}

export const Configuration = {
    configure(schema: TopLevelItem, config: Configuration | null): TopLevelItem {
        assert(typeof config === 'object', 'Configuration parameter must be an object');

        for (const prop in config) {
            const cfg = config[prop];

            if (prop.startsWith('*/')) {
                // SOMETHING TO CONSIDER:
                // The pattern could be expanded to something more targeted. For instance, a pattern like:
                // '*/general_parameters/*/Author' would apply to all items tagged 'Author' but only if they
                // were inside the 'general_parameters' section.
                // Currently, we can restrict only from the tail, meaning that we can do things like
                // '*/constituents/Chemical' to restrict the scope to 'Chemical' items that are direct
                // children of 'constituents/ items.
                const pattern = prop.split('/').slice(1);

                let configurees = new Array<Item>();
                for (const tok of pattern) {
                    configurees = getAllConfigurees(schema.input, tok);
                }

                for (const configuree of configurees) {
                    configureItem(configuree, cfg);
                }
            } else {
                const path = prop.split('/');

                const configuree = getSpecificConfiguree(schema.input, path);
                if (configuree) {
                    configureItem(configuree, cfg);
                }
            }
        }

        return schema;
    },
}
