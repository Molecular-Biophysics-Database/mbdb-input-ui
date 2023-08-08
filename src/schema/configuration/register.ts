import { BLI } from './bli';
import { MST } from './mst';
import { Configuration } from '../configuration';
import { MbdbModels } from '../../mbdb/models';

export const Register: Record<keyof typeof MbdbModels, Configuration> = {
    bli: BLI,
    mst: MST,
    test_1: {},
} as const;
