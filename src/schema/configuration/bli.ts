import { Common } from './common';

export const BLI = {
    ...Common,

    'general_parameters/record_information/publisher': {
        dontDisplay: true,
        defaultValue: 'MBDB'
    },

    'general_parameters/record_information/resource_type': {
        dontDisplay: true,
        defaultValue: 'BLI'
    },

    'general_parameters/technique': {
        defaultValue: 'Bio-layer interferometry (BLI)',
        dontDisplay: true,
    },
};
