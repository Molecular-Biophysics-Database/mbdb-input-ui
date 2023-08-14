import { BLI } from './bli';
import { MST } from './mst';
import { SPR } from './spr';
import { Test1 } from './test_1';
import { TopLevelItem } from '../';
import { MbdbModels } from '../../mbdb/models';

export type SchemaItem = {
    name: string,
    schema: TopLevelItem,
};

export const Register: Record<keyof typeof MbdbModels, SchemaItem> = {
    bli: {
        name: 'Bio-layer interferometry',
        schema: TopLevelItem(BLI),
    },
    mst: {
        name: 'Micro-scale thermophoresis',
        schema: TopLevelItem(MST),
    },
    spr: {
        name: 'Surface plasmon resonance',
        schema: TopLevelItem(SPR),
    },
    test_1: {
        name: 'Test 1',
        schema: TopLevelItem(Test1),
    },
} as const;
