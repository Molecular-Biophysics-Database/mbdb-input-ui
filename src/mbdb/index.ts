import { Options as SerializationOptions, Serialize } from './serialize';
import { FormContext } from '../context';
import { Path } from '../schema/data';

export type DataError = {
    path: Path,
    message: string,
};
export function DataError(path: Path, message: string): DataError {
    return { path, message };
}

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
    toData(ctx: FormContext, options?: Options) {
        const { data, errors, files } = Serialize.serialize(ctx, options);

        if (!options?.dontPrune) {
            pruneEmpty(data);
        }

        return {
            toApi: {
                metadata: data
            },
            errors,
            files,
        };
    },
}
