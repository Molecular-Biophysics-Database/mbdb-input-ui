import { Options as SerializationOptions, Serialize } from './serialize';
import { FormContext } from '../context';
import { TopLevelItem } from '../schema';

export type Options = {
    dontPrune?: boolean,
} & SerializationOptions;

function pruneEmpty(data: Record<string, any>) {
    for (const prop in data) {
        const child = data[prop as keyof typeof data];

        if (typeof child === 'object' && !Array.isArray(child)) {
            pruneEmpty(child);

            if (Object.keys(child).length === 0) {
                delete data[prop as keyof typeof data];
            }
        }
    }
}

export const Mbdb = {
    toData(ctx: FormContext, schema: TopLevelItem, options?: Options) {
        const { data, errors } = Serialize.serialize(ctx, schema, options);

        if (!options?.dontPrune) {
            pruneEmpty(data);
        }

        return {
            toApi: {
                metadata: data
            },
            errors,
        };
    },
}
