import { Register as SchemasRegister, SchemaItem } from '../schema/schemas/register';

export type MbdbModel = {
    apiEndpoint: string,
    schema: SchemaItem,
};

export const MbdbModels: Record<'bli' | 'mst' | 'test_1', MbdbModel> = {
    bli: {
        apiEndpoint: 'api/mbdb-bli',
        schema: SchemasRegister.bli,
    },
    mst: {
        apiEndpoint: 'api/mbdb-mst',
        schema: SchemasRegister.mst,
    },
    test_1: {
        apiEndpoint: '',
        schema: SchemasRegister.test_1,
    },
} as const;
