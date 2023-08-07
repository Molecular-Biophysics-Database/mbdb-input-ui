import { BLI } from './bli';
import { MST } from './mst';
import { Test1 } from './test_1';
import { ComplexInput } from '../';
import { MbdbModels } from '../../mbdb/models';

export type SchemaItem = {
    name: string,
    schema: ComplexInput,
};

export const Register: Record<keyof typeof MbdbModels, SchemaItem> = {
    bli: {
        name: 'Bio-layer interferometry',
        schema: BLI,
    },
    mst: {
        name: 'Micro-scale thermophoresis',
        schema: MST,
    },
    test_1: {
        name: 'Test 1',
        schema: Test1,
    },
} as const;
