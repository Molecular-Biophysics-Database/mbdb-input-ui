import { clone } from '../../util/just-clone';
import { GeneralParameters } from './general-parameters';

export const MST = [
    {
        ...clone(GeneralParameters),
        tag: 'general_parameters',
        label: 'general_parameters',
        isArray: false,
        isRequired: true,
        mbdbPath: 'general_parameters',
    },
    {
        tag: 'method_specific_parameters',
        label: 'method_specific_parameters',
        isArray: false,
        isRequired: true,
        mbdbPath: 'method_specific_parameters',
        input: [
            {
                tag: 'schema_version',
                label: 'schema_version',
                isArray: false,
                isRequired: true,
                mbdbPath: 'method_specific_parameters/schema_version',
                input: 'options',
                choices: [
                    {
                        tag: '0.9.7',
                        title: '0.9.7',
                    },
                ],
                help: {
                    en: 'The schema version used to annotate the MST method specific parameters',
                },
            },
            {
                tag: 'experiment_type',
                label: 'experiment_type',
                isArray: false,
                isRequired: true,
                mbdbPath: 'method_specific_parameters/experiment_type',
                input: 'options',
                choices: [
                    {
                        tag: 'Affinity',
                        title: 'Affinity',
                    },
                    {
                        tag: 'Concentration',
                        title: 'Concentration',
                    },
                    {
                        tag: 'Other',
                        title: 'Other',
                    },
                ],
                help: {
                    en: 'The type of physical parameter that was sought',
                },
            },
            {
                tag: 'signal_type',
                label: 'signal_type',
                isArray: false,
                isRequired: true,
                mbdbPath: 'method_specific_parameters/signal_type',
                input: 'options',
                choices: [
                    {
                        tag: 'Initial intensity',
                        title: 'Initial intensity',
                    },
                    {
                        tag: 'TRIC/MST',
                        title: 'TRIC/MST',
                    },
                    {
                        tag: 'Spectral shift',
                        title: 'Spectral shift',
                    },
                ],
                help: {
                    en: 'The type of signal that was being measured',
                },
            },
            {
                tag: 'excitation_led_color',
                label: 'excitation_led_color',
                isArray: false,
                isRequired: true,
                mbdbPath: 'method_specific_parameters/excitation_led_color',
                input: 'options',
                choices: [
                    {
                        tag: 'RED (ex 605-645nm, em 660-720nm)',
                        title: 'RED (ex 605-645nm, em 660-720nm)',
                    },
                    {
                        tag: 'RED (ex 610-645nm, em 680-720nm)',
                        title: 'RED (ex 610-645nm, em 680-720nm)',
                    },
                    {
                        tag: 'GREEN (ex 555-585nm, em 605-690nm)',
                        title: 'GREEN (ex 555-585nm, em 605-690nm)',
                    },
                    {
                        tag: 'GREEN (ex 515-550nm, em 565-600nm)',
                        title: 'GREEN (ex 515-550nm, em 565-600nm)',
                    },
                    {
                        tag: 'BLUE (ex 480-500nm, em 515-550nm)',
                        title: 'BLUE (ex 480-500nm, em 515-550nm)',
                    },
                    {
                        tag: 'BLUE (ex 460-500nm, em 515-560nm)',
                        title: 'BLUE (ex 460-500nm, em 515-560nm)',
                    },
                    {
                        tag: 'UV (ex 260-300nm, em 330-380nm)',
                        title: 'UV (ex 260-300nm, em 330-380nm)',
                    },
                    {
                        tag: 'Spectral shift',
                        title: 'Spectral shift',
                    },
                ],
                help: {
                    en: 'The color of the excitation LED used for the experiment. NOTE that colors are specific to the combination in which it occurs, e.g. the GREEN in a BLUE/GREEN instrument, is not the same as the GREEN in a GREEN/RED instrument',
                },
            },
            {
                tag: 'excitation_led_power',
                label: 'excitation_led_power',
                isArray: false,
                isRequired: true,
                mbdbPath: 'method_specific_parameters/excitation_led_power',
                input: 'float',
                minimum: 0.0,
                maximum: 100.0,
                help: {
                    en: 'The power, in percentage, of the excitation LED used in experiment',
                },
            },
            {
                tag: 'ir_mst_laser_power',
                label: 'ir_mst_laser_power',
                isArray: false,
                isRequired: true,
                mbdbPath: 'method_specific_parameters/ir_mst_laser_power',
                input: 'float',
                minimum: 0.0,
                maximum: 100.0,
                help: {
                    en: 'The power of the infrared LASER used in the experiment in percentages. Even though a change in nomenclature occurred in Nanotemper\'s control software, the underlying data is still stored in percentages. Use the following conversion; Low = 20, Medium = 40, High = 60',
                },
            },
            {
                tag: 'measurements',
                label: 'measurements',
                isArray: true,
                isRequired: true,
                mbdbPath: 'method_specific_parameters/measurements[]',
                minItems: 1,
                input: [
                    {
                        tag: 'id',
                        label: 'id',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/measurements[]/id',
                        input: 'referenceable-id',
                        referenceAs: 'mst-measurement',
                    },
                    {
                        tag: 'name',
                        label: 'name',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/measurements[]/name',
                        input: 'string',
                        help: {
                            en: 'Name (id) of the measurement which must be unique within a record (i.e. triplicates must be named individually in the raw data file). The name must allow location of the measurement data within the raw data file as well as processed data files if these are present',
                        },
                    },
                    {
                        tag: 'position',
                        label: 'position',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/measurements[]/position',
                        input: 'string',
                        help: {
                            en: 'Position where the container (capillary) of the measured sample within the instrument (e.g. 1, 2, 3)',
                        },
                    },
                    {
                        tag: 'sample',
                        label: 'sample',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/measurements[]/sample',
                        input: [
                            {
                                tag: 'targets',
                                label: 'targets',
                                isArray: true,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/measurements[]/sample/targets[]',
                                minItems: 1,
                                input: [
                                    {
                                        tag: 'entity',
                                        label: 'entity',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/targets[]/entity',
                                        input: 'related-to',
                                        relatesTo: 'entity',
                                        relatedKeys: [
                                            'id',
                                            'name',
                                        ],
                                    },
                                    {
                                        tag: 'concentration',
                                        label: 'concentration',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/targets[]/concentration',
                                        input: [
                                            {
                                                tag: 'value',
                                                label: 'value',
                                                isArray: false,
                                                isRequired: true,
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/targets[]/concentration/value',
                                                input: 'float',
                                                minimum: -1.0,
                                                help: {
                                                    en: 'The numerical value of the concentration, -1 if unknown',
                                                },
                                            },
                                            {
                                                tag: 'value_error',
                                                label: 'value_error',
                                                isArray: false,
                                                isRequired: false,
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/targets[]/concentration/value_error',
                                                input: 'custom',
                                                component: 'value-error',
                                                help: {
                                                    upper_error: {
                                                        en: 'The upper error, i.e. the number that should be added the value to get the upper bound',
                                                    },
                                                    lower_error: {
                                                        en: 'The lower error, i.e. the number that should be subtracted from the value to get the lower bound',
                                                    },
                                                    errors_are_relative: {
                                                        en: 'Whether the errors should be interpreted as relative errors in percent',
                                                    },
                                                    error_level: {
                                                        en: 'How many standard deviations the error corresponds to',
                                                    },
                                                },
                                            },
                                            {
                                                tag: 'unit',
                                                label: 'unit',
                                                isArray: false,
                                                isRequired: true,
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/targets[]/concentration/unit',
                                                input: 'options',
                                                choices: [
                                                    {
                                                        tag: 'M',
                                                        title: 'M',
                                                    },
                                                    {
                                                        tag: 'mM',
                                                        title: 'mM',
                                                    },
                                                    {
                                                        tag: 'µM',
                                                        title: 'µM',
                                                    },
                                                    {
                                                        tag: 'nM',
                                                        title: 'nM',
                                                    },
                                                    {
                                                        tag: 'pM',
                                                        title: 'pM',
                                                    },
                                                    {
                                                        tag: 'fM',
                                                        title: 'fM',
                                                    },
                                                    {
                                                        tag: 'aM',
                                                        title: 'aM',
                                                    },
                                                    {
                                                        tag: 'g/L',
                                                        title: 'g/L',
                                                    },
                                                    {
                                                        tag: 'mg/mL',
                                                        title: 'mg/mL',
                                                    },
                                                    {
                                                        tag: 'µg/mL',
                                                        title: 'µg/mL',
                                                    },
                                                    {
                                                        tag: 'ng/mL',
                                                        title: 'ng/mL',
                                                    },
                                                    {
                                                        tag: 'mol/kg',
                                                        title: 'mol/kg',
                                                    },
                                                    {
                                                        tag: 'mmol/kg',
                                                        title: 'mmol/kg',
                                                    },
                                                    {
                                                        tag: 'v/v %',
                                                        title: 'v/v %',
                                                    },
                                                    {
                                                        tag: 'w/w %',
                                                        title: 'w/w %',
                                                    },
                                                    {
                                                        tag: 'v/w %',
                                                        title: 'v/w %',
                                                    },
                                                    {
                                                        tag: 'w/v %',
                                                        title: 'w/v %',
                                                    },
                                                    {
                                                        tag: 'U/ml',
                                                        title: 'U/ml',
                                                    },
                                                    {
                                                        tag: '% saturated',
                                                        title: '% saturated',
                                                    },
                                                ],
                                                help: {
                                                    en: 'The unit of the concentration',
                                                },
                                            },
                                            {
                                                tag: 'obtained_by',
                                                label: 'obtained_by',
                                                isArray: false,
                                                isRequired: false,
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/targets[]/concentration/obtained_by',
                                                input: 'options',
                                                choices: [
                                                    {
                                                        tag: 'Measurement',
                                                        title: 'Measurement',
                                                    },
                                                    {
                                                        tag: 'Calculation',
                                                        title: 'Calculation',
                                                    },
                                                    {
                                                        tag: 'Assumption',
                                                        title: 'Assumption',
                                                    },
                                                    {
                                                        tag: 'Other',
                                                        title: 'Other',
                                                    },
                                                ],
                                                help: {
                                                    en: 'The means through which the concentration was obtained',
                                                },
                                            },
                                            {
                                                tag: 'obtained_protocol',
                                                label: 'obtained_protocol',
                                                isArray: true,
                                                isRequired: false,
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/targets[]/concentration/obtained_protocol[]',
                                                minItems: 1,
                                                input: [
                                                    {
                                                        tag: 'name',
                                                        label: 'name',
                                                        isArray: false,
                                                        isRequired: true,
                                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/targets[]/concentration/obtained_protocol[]/name',
                                                        input: 'string',
                                                        help: {
                                                            en: 'Descriptive name of the step',
                                                        },
                                                    },
                                                    {
                                                        tag: 'description',
                                                        label: 'description',
                                                        isArray: false,
                                                        isRequired: true,
                                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/targets[]/concentration/obtained_protocol[]/description',
                                                        input: 'string',
                                                        help: {
                                                            en: 'Short description of the step',
                                                        },
                                                    },
                                                ],
                                                help: {
                                                    en: 'Information of how the concentration was obtained (e.g, Absorbance at 280 nm, buffer absorbance subtraction, extinction coefficient',
                                                },
                                            },
                                        ],
                                        help: {
                                            en: 'Concentration of the entity',
                                        },
                                    },
                                ],
                                help: {
                                    en: 'List of names (ids), from the entities of interest defined in the general parameters, of directly measured entities and entities at constant concentration for a series of measurements and their concentration',
                                },
                            },
                            {
                                tag: 'ligands',
                                label: 'ligands',
                                isArray: true,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/measurements[]/sample/ligands[]',
                                minItems: 1,
                                input: [
                                    {
                                        tag: 'entity',
                                        label: 'entity',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/ligands[]/entity',
                                        input: 'related-to',
                                        relatesTo: 'entity',
                                        relatedKeys: [
                                            'id',
                                            'name',
                                        ],
                                    },
                                    {
                                        tag: 'concentration',
                                        label: 'concentration',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/ligands[]/concentration',
                                        input: [
                                            {
                                                tag: 'value',
                                                label: 'value',
                                                isArray: false,
                                                isRequired: true,
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/ligands[]/concentration/value',
                                                input: 'float',
                                                minimum: -1.0,
                                                help: {
                                                    en: 'The numerical value of the concentration, -1 if unknown',
                                                },
                                            },
                                            {
                                                tag: 'value_error',
                                                label: 'value_error',
                                                isArray: false,
                                                isRequired: false,
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/ligands[]/concentration/value_error',
                                                input: 'custom',
                                                component: 'value-error',
                                                help: {
                                                    upper_error: {
                                                        en: 'The upper error, i.e. the number that should be added the value to get the upper bound',
                                                    },
                                                    lower_error: {
                                                        en: 'The lower error, i.e. the number that should be subtracted from the value to get the lower bound',
                                                    },
                                                    errors_are_relative: {
                                                        en: 'Whether the errors should be interpreted as relative errors in percent',
                                                    },
                                                    error_level: {
                                                        en: 'How many standard deviations the error corresponds to',
                                                    },
                                                },
                                            },
                                            {
                                                tag: 'unit',
                                                label: 'unit',
                                                isArray: false,
                                                isRequired: true,
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/ligands[]/concentration/unit',
                                                input: 'options',
                                                choices: [
                                                    {
                                                        tag: 'M',
                                                        title: 'M',
                                                    },
                                                    {
                                                        tag: 'mM',
                                                        title: 'mM',
                                                    },
                                                    {
                                                        tag: 'µM',
                                                        title: 'µM',
                                                    },
                                                    {
                                                        tag: 'nM',
                                                        title: 'nM',
                                                    },
                                                    {
                                                        tag: 'pM',
                                                        title: 'pM',
                                                    },
                                                    {
                                                        tag: 'fM',
                                                        title: 'fM',
                                                    },
                                                    {
                                                        tag: 'aM',
                                                        title: 'aM',
                                                    },
                                                    {
                                                        tag: 'g/L',
                                                        title: 'g/L',
                                                    },
                                                    {
                                                        tag: 'mg/mL',
                                                        title: 'mg/mL',
                                                    },
                                                    {
                                                        tag: 'µg/mL',
                                                        title: 'µg/mL',
                                                    },
                                                    {
                                                        tag: 'ng/mL',
                                                        title: 'ng/mL',
                                                    },
                                                    {
                                                        tag: 'mol/kg',
                                                        title: 'mol/kg',
                                                    },
                                                    {
                                                        tag: 'mmol/kg',
                                                        title: 'mmol/kg',
                                                    },
                                                    {
                                                        tag: 'v/v %',
                                                        title: 'v/v %',
                                                    },
                                                    {
                                                        tag: 'w/w %',
                                                        title: 'w/w %',
                                                    },
                                                    {
                                                        tag: 'v/w %',
                                                        title: 'v/w %',
                                                    },
                                                    {
                                                        tag: 'w/v %',
                                                        title: 'w/v %',
                                                    },
                                                    {
                                                        tag: 'U/ml',
                                                        title: 'U/ml',
                                                    },
                                                    {
                                                        tag: '% saturated',
                                                        title: '% saturated',
                                                    },
                                                ],
                                                help: {
                                                    en: 'The unit of the concentration',
                                                },
                                            },
                                            {
                                                tag: 'obtained_by',
                                                label: 'obtained_by',
                                                isArray: false,
                                                isRequired: false,
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/ligands[]/concentration/obtained_by',
                                                input: 'options',
                                                choices: [
                                                    {
                                                        tag: 'Measurement',
                                                        title: 'Measurement',
                                                    },
                                                    {
                                                        tag: 'Calculation',
                                                        title: 'Calculation',
                                                    },
                                                    {
                                                        tag: 'Assumption',
                                                        title: 'Assumption',
                                                    },
                                                    {
                                                        tag: 'Other',
                                                        title: 'Other',
                                                    },
                                                ],
                                                help: {
                                                    en: 'The means through which the concentration was obtained',
                                                },
                                            },
                                            {
                                                tag: 'obtained_protocol',
                                                label: 'obtained_protocol',
                                                isArray: true,
                                                isRequired: false,
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/ligands[]/concentration/obtained_protocol[]',
                                                minItems: 1,
                                                input: [
                                                    {
                                                        tag: 'name',
                                                        label: 'name',
                                                        isArray: false,
                                                        isRequired: true,
                                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/ligands[]/concentration/obtained_protocol[]/name',
                                                        input: 'string',
                                                        help: {
                                                            en: 'Descriptive name of the step',
                                                        },
                                                    },
                                                    {
                                                        tag: 'description',
                                                        label: 'description',
                                                        isArray: false,
                                                        isRequired: true,
                                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/ligands[]/concentration/obtained_protocol[]/description',
                                                        input: 'string',
                                                        help: {
                                                            en: 'Short description of the step',
                                                        },
                                                    },
                                                ],
                                                help: {
                                                    en: 'Information of how the concentration was obtained (e.g, Absorbance at 280 nm, buffer absorbance subtraction, extinction coefficient',
                                                },
                                            },
                                        ],
                                        help: {
                                            en: 'Concentration of the entity',
                                        },
                                    },
                                ],
                                help: {
                                    en: 'List of names (ids) of entities (from the entities of interest defined in the general parameters) that were used to alter the behavior of the target(s) or entities present at varying concentrations for a series of measurements and their concentration',
                                },
                            },
                            {
                                tag: 'chemical_environment',
                                label: 'chemical_environment',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/measurements[]/sample/chemical_environment',
                                input: 'related-to',
                                relatesTo: 'chemical-environment',
                                relatedKeys: [
                                    'id',
                                    'name',
                                ],
                            },
                            {
                                tag: 'container',
                                label: 'container',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/measurements[]/sample/container',
                                input: 'options',
                                choices: [
                                    {
                                        tag: 'Monolith Standard Capillary',
                                        title: 'Monolith Standard Capillary',
                                    },
                                    {
                                        tag: 'Monolith Premium Capillary',
                                        title: 'Monolith Premium Capillary',
                                    },
                                    {
                                        tag: 'Monolith LabelFree Capillary',
                                        title: 'Monolith LabelFree Capillary',
                                    },
                                    {
                                        tag: 'Monolith LabelFree Premium Capillary',
                                        title: 'Monolith LabelFree Premium Capillary',
                                    },
                                    {
                                        tag: 'Monolith NT.Automated Capillary Chip',
                                        title: 'Monolith NT.Automated Capillary Chip',
                                    },
                                    {
                                        tag: 'Monolith NT.Automated Premium Capillary Chip',
                                        title: 'Monolith NT.Automated Premium Capillary Chip',
                                    },
                                    {
                                        tag: 'Monolith NT.Automated LabelFree Capillary Chip',
                                        title: 'Monolith NT.Automated LabelFree Capillary Chip',
                                    },
                                    {
                                        tag: 'Monolith NT.Automated LabelFree Premium Capillary Chip',
                                        title: 'Monolith NT.Automated LabelFree Premium Capillary Chip',
                                    },
                                    {
                                        tag: '384-well plate',
                                        title: '384-well plate',
                                    },
                                    {
                                        tag: 'other',
                                        title: 'other',
                                    },
                                ],
                                help: {
                                    en: 'The container the sample was in',
                                },
                            },
                            {
                                tag: 'preparation',
                                label: 'preparation',
                                isArray: true,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/measurements[]/sample/preparation[]',
                                minItems: 1,
                                input: [
                                    {
                                        tag: 'name',
                                        label: 'name',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/preparation[]/name',
                                        input: 'string',
                                        help: {
                                            en: 'Descriptive name of the step',
                                        },
                                    },
                                    {
                                        tag: 'description',
                                        label: 'description',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/preparation[]/description',
                                        input: 'string',
                                        help: {
                                            en: 'Short description of the step',
                                        },
                                    },
                                ],
                                help: {
                                    en: 'List of steps taken to prepare the sample',
                                },
                            },
                        ],
                        help: {
                            en: 'Information about the sample including concentrations of ligands and targets, and which chemical environment the sample was composed of',
                        },
                    },
                    {
                        tag: 'measured_data',
                        label: 'measured_data',
                        isArray: false,
                        isRequired: false,
                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data',
                        input: [
                            {
                                tag: 'x_data',
                                label: 'x_data',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/measurements[]/measured_data/x_data',
                                input: [
                                    {
                                        tag: 'id',
                                        label: 'id',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/x_data/id',
                                        input: 'uuid',
                                        help: {
                                            en: 'Unique ID for the measured data to be used as a link',
                                        },
                                    },
                                    {
                                        tag: 'name',
                                        label: 'name',
                                        isArray: false,
                                        isRequired: false,
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/x_data/name',
                                        input: 'string',
                                        help: {
                                            en: 'Short descriptive name of the data series',
                                        },
                                    },
                                    {
                                        tag: 'values',
                                        label: 'values',
                                        isArray: true,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/x_data/values[]',
                                        minItems: 1,
                                        input: 'float',
                                        help: {
                                            en: 'The numerical values of the data series',
                                        },
                                    },
                                    {
                                        tag: 'unit',
                                        label: 'unit',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/x_data/unit',
                                        input: 'string',
                                        help: {
                                            en: 'The numerical values of the data series',
                                        },
                                    },
                                ],
                                help: {
                                    en: 'Values for the independent variable, normally time, of the measured data',
                                },
                            },
                            {
                                tag: 'y_data',
                                label: 'y_data',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/measurements[]/measured_data/y_data',
                                input: [
                                    {
                                        tag: 'id',
                                        label: 'id',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/y_data/id',
                                        input: 'uuid',
                                        help: {
                                            en: 'Unique ID for the measured data to be used as a link',
                                        },
                                    },
                                    {
                                        tag: 'name',
                                        label: 'name',
                                        isArray: false,
                                        isRequired: false,
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/y_data/name',
                                        input: 'string',
                                        help: {
                                            en: 'Short descriptive name of the data series',
                                        },
                                    },
                                    {
                                        tag: 'values',
                                        label: 'values',
                                        isArray: true,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/y_data/values[]',
                                        minItems: 1,
                                        input: 'float',
                                        help: {
                                            en: 'The numerical values of the data series',
                                        },
                                    },
                                    {
                                        tag: 'unit',
                                        label: 'unit',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/y_data/unit',
                                        input: 'string',
                                        help: {
                                            en: 'The numerical values of the data series',
                                        },
                                    },
                                ],
                                help: {
                                    en: 'Values for the dependent variable, normally fluorescence intensity, of the measured data',
                                },
                            },
                        ],
                    },
                ],
                help: {
                    en: 'List of the information about each measurement. This includes target(s), ligand(s), chemical environment, and the position of the sample within the instrument',
                },
            },
            {
                tag: 'data_analysis',
                label: 'data_analysis',
                isArray: true,
                isRequired: false,
                mbdbPath: 'method_specific_parameters/data_analysis[]',
                minItems: 1,
                input: [
                    {
                        tag: 'derived_parameter',
                        label: 'derived_parameter',
                        isArray: false,
                        isRequired: false,
                        mbdbPath: 'method_specific_parameters/data_analysis[]/derived_parameter',
                        input: 'related-to',
                        relatesTo: 'derived-parameter',
                        relatedKeys: [
                            'id',
                            'name',
                        ],
                    },
                    {
                        tag: 'measurements',
                        label: 'measurements',
                        isArray: true,
                        isRequired: false,
                        mbdbPath: 'method_specific_parameters/data_analysis[]/measurements[]',
                        minItems: 1,
                        input: 'related-to',
                        relatesTo: 'mst-measurement',
                        relatedKeys: [
                            'id',
                            'name',
                        ],
                        help: {
                            en: 'List of the measurements that was analyzed together for a specific parameter',
                        },
                    },
                    {
                        tag: 'f_cold_and_hot',
                        label: 'f_cold_and_hot',
                        isArray: false,
                        isRequired: false,
                        mbdbPath: 'method_specific_parameters/data_analysis[]/f_cold_and_hot',
                        input: [
                            {
                                tag: 'time_unit',
                                label: 'time_unit',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/f_cold_and_hot/time_unit',
                                input: 'options',
                                choices: [
                                    {
                                        tag: 'nanoseconds',
                                        title: 'nanoseconds',
                                    },
                                    {
                                        tag: 'microseconds',
                                        title: 'microseconds',
                                    },
                                    {
                                        tag: 'milliseconds',
                                        title: 'milliseconds',
                                    },
                                    {
                                        tag: 'seconds',
                                        title: 'seconds',
                                    },
                                    {
                                        tag: 'minutes',
                                        title: 'minutes',
                                    },
                                    {
                                        tag: 'hours',
                                        title: 'hours',
                                    },
                                    {
                                        tag: 'days',
                                        title: 'days',
                                    },
                                    {
                                        tag: 'months',
                                        title: 'months',
                                    },
                                    {
                                        tag: 'years',
                                        title: 'years',
                                    },
                                ],
                                help: {
                                    en: 'The unit of time used for reporting measurement data',
                                },
                            },
                            {
                                tag: 'f_cold_start',
                                label: 'f_cold_start',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/f_cold_and_hot/f_cold_start',
                                input: 'float',
                                minimum: -100.0,
                                help: {
                                    en: 'Numerical value of the start-point of time interval used to establish the initial fluorescence, F_cold',
                                },
                            },
                            {
                                tag: 'f_cold_end',
                                label: 'f_cold_end',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/f_cold_and_hot/f_cold_end',
                                input: 'float',
                                minimum: -100.0,
                                help: {
                                    en: 'Numerical value of the end-point of time interval used to establish the initial fluorescence, F_cold',
                                },
                            },
                            {
                                tag: 'f_hot_start',
                                label: 'f_hot_start',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/f_cold_and_hot/f_hot_start',
                                input: 'float',
                                minimum: 0.0,
                                help: {
                                    en: 'Numerical value of the start-point of time interval used to establish the fluorescence temperature induced change in fluorescence, F_hot',
                                },
                            },
                            {
                                tag: 'f_hot_end',
                                label: 'f_hot_end',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/f_cold_and_hot/f_hot_end',
                                input: 'float',
                                minimum: 0.0,
                                help: {
                                    en: 'Numerical value of the end-point of time interval used to establish the fluorescence temperature induced change in fluorescence, F_hot',
                                },
                            },
                        ],
                        help: {
                            en: 'If the data was analyzed with time windows corresponding to fluorescence before and after an IR laser was heating the sample the edges of the time windows can be specified here',
                        },
                    },
                    {
                        tag: 'data_processing_steps',
                        label: 'data_processing_steps',
                        isArray: true,
                        isRequired: false,
                        mbdbPath: 'method_specific_parameters/data_analysis[]/data_processing_steps[]',
                        minItems: 1,
                        input: [
                            {
                                tag: 'name',
                                label: 'name',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/data_processing_steps[]/name',
                                input: 'string',
                                help: {
                                    en: 'Short descriptive name of the processing step',
                                },
                            },
                            {
                                tag: 'description',
                                label: 'description',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/data_processing_steps[]/description',
                                input: 'string',
                                help: {
                                    en: 'Description of what the processing step was',
                                },
                            },
                            {
                                tag: 'software_name',
                                label: 'software_name',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/data_processing_steps[]/software_name',
                                input: 'string',
                                help: {
                                    en: 'The name of the software that was used for the step (e.g. Excel)',
                                },
                            },
                            {
                                tag: 'software_version',
                                label: 'software_version',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/data_processing_steps[]/software_version',
                                input: 'string',
                                help: {
                                    en: 'The version of the software that was used for the step',
                                },
                            },
                            {
                                tag: 'software_tool',
                                label: 'software_tool',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/data_processing_steps[]/software_tool',
                                input: 'string',
                                help: {
                                    en: 'The name of the tool within the specified software, i.e. a particular method called or "button pressed" (e.g. equation solver, buffer subtraction)',
                                },
                            },
                            {
                                tag: 'link_to_source_code',
                                label: 'link_to_source_code',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/data_processing_steps[]/link_to_source_code',
                                input: 'url',
                                help: {
                                    en: 'If processing was performed with software where the source code is legally available a link can be specified here (e.g. self-written python script in a GitHub repository',
                                },
                            },
                        ],
                        help: {
                            en: 'Describe the steps in the data analysis prior to fitting (removing outliers in the raw data, applying smoothing filters, etc.)',
                        },
                    },
                    {
                        tag: 'data_fitting',
                        label: 'data_fitting',
                        isArray: false,
                        isRequired: false,
                        mbdbPath: 'method_specific_parameters/data_analysis[]/data_fitting',
                        input: [
                            {
                                tag: 'model',
                                label: 'model',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/data_fitting/model',
                                input: 'string',
                                help: {
                                    en: 'Description of the model (e.g. 1:1 binding)',
                                },
                            },
                            {
                                tag: 'software_name',
                                label: 'software_name',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/data_fitting/software_name',
                                input: 'string',
                                help: {
                                    en: 'The name of the software that was used for doing the data fitting (e.g. Excel)',
                                },
                            },
                            {
                                tag: 'software_version',
                                label: 'software_version',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/data_fitting/software_version',
                                input: 'string',
                                help: {
                                    en: 'The version of the software that was used for the step',
                                },
                            },
                            {
                                tag: 'quality',
                                label: 'quality',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/data_fitting/quality',
                                input: 'float',
                                help: {
                                    en: 'Numerical value representing the quality estimate of the derived parameter',
                                },
                            },
                            {
                                tag: 'quality_type',
                                label: 'quality_type',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/data_analysis[]/data_fitting/quality_type',
                                input: 'options',
                                choices: [
                                    {
                                        tag: 'R^2',
                                        title: 'R^2',
                                    },
                                    {
                                        tag: 'SEM',
                                        title: 'SEM',
                                    },
                                    {
                                        tag: 'red. Chi^2',
                                        title: 'red. Chi^2',
                                    },
                                    {
                                        tag: '1sigma',
                                        title: '1sigma',
                                    },
                                    {
                                        tag: '2sigma',
                                        title: '2sigma',
                                    },
                                    {
                                        tag: '3sigma',
                                        title: '3sigma',
                                    },
                                    {
                                        tag: '5sigma',
                                        title: '5sigma',
                                    },
                                    {
                                        tag: 'Skewness',
                                        title: 'Skewness',
                                    },
                                ],
                                help: {
                                    en: 'Type of the quality estimate',
                                },
                            },
                        ],
                        help: {
                            en: 'The details of how data fitting of the data to obtain the derived parameter was performed',
                        },
                    },
                ],
                help: {
                    en: 'Details of how the data was processed and modelled in order to derive parameters from it',
                },
            },
        ],
        help: {
            en: 'The parameters of the experiment that is specific to MST/TRIC/Spectral Shift',
        },
    },
];
