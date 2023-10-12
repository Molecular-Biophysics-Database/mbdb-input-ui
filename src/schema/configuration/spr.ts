import { Common } from './common';

export const SPR = {
    ...Common,

    'general_parameters/record_information/publisher': {
        dontDisplay: true,
        defaultValue: 'MBDB'
    },

    'general_parameters/record_information/resource_type': {
        dontDisplay: true,
        defaultValue: 'SPR'
    },

    'general_parameters/technique': {
        defaultValue: 'Surface plasmon resonance (SPR)',
        dontDisplay: true,
    },
};
