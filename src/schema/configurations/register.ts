import { MST } from './mst';
import { Configuration } from '../configuration';
import { Models } from '../../mbdb/models';

export const Register: { [key: keyof typeof Models]: Configuration | null } = {
    bli: null,
    mst: MST,
} as const;
