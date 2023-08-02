import { BLI } from './bli';
import { MST } from './mst';
import { ComplexInput } from '../';
import { Models } from '../../mbdb/models';

export type SchemaItem = {
    name: string,
    schema: ComplexInput,
};

export const Register: { [key: keyof typeof Models]: SchemaItem } = {
    bli: {
        name: 'Bio-layer interferometry',
        schema: BLI,
    },
    mst: {
        name: 'Micro-scale thermophoresis',
        schema: MST,
    },
} as const;
