import { Register as SchemasRegister, SchemaItem } from '../schema/schemas/register';

export type MbdbModel = {
    apiEndpoint: string,
    schema: SchemaItem,
};

export const Models: { [key: string]: MbdbModel } = {
    bli: {
        apiEndpoint: 'api/mbdb-bli',
        schema: SchemasRegister.bli,
    },
    mst: {
        apiEndpoint: 'api/mbdb-mst',
        schema: SchemasRegister.mst,
    },
} as const;
