import { BLI } from './bli';
import { MST } from './mst';
import { Configuration } from '../configuration';
import { Models } from '../../mbdb/models';

export const Register: { [key: keyof typeof Models]: Configuration } = {
    bli: BLI,
    mst: MST,
} as const;
