import { Common } from './common';

export const MST = {
    ...Common,

    'general_parameters/record_information/resource_type': {
        dontDisplay: true,
        defaultValue: 'MST'
    },

    'general_parameters/technique': {
        defaultValue: 'Microscale thermophoresis/Temperature related intensity change (MST/TRIC)',
        dontDisplay: true,
    },

    'method_specific_parameters/excitation_led_color': {
        label: 'Excitation LED color',
    },
    'method_specific_parameters/excitation_led_power': {
        label: 'Excitation LED power',
    },
    'method_specific_parameters/ir_mst_laser_power': {
        label: 'IR MST laser power',
    },
};
