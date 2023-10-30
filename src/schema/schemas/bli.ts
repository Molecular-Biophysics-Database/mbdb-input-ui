import { clone } from '../../util/just-clone';
import { GeneralParameters } from './general-parameters';

export const BLI = [
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
                        tag: '0.9.3',
                        title: '0.9.3',
                    },
                ],
                help: {
                    en: 'The schema version used to annotate the BLI method specific parameters',
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
                        tag: 'Quantification',
                        title: 'Quantification',
                    },
                    {
                        tag: 'Other',
                        title: 'Other',
                    },
                ],
                help: {
                    en: 'Which type of parameter is sought with the measurements',
                },
            },
            {
                tag: 'plates',
                label: 'plates',
                isArray: true,
                isRequired: true,
                mbdbPath: 'method_specific_parameters/plates[]',
                minItems: 1,
                input: [
                    {
                        tag: 'id',
                        label: 'id',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/plates[]/id',
                        input: 'referenceable-id',
                        referenceAs: 'plate',
                    },
                    {
                        tag: 'name',
                        label: 'name',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/plates[]/name',
                        input: 'string',
                        help: {
                            en: 'Name (id) of the plate which must be unique within a record',
                        },
                    },
                    {
                        tag: 'wells',
                        label: 'wells',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/plates[]/wells',
                        input: 'options',
                        choices: [
                            {
                                tag: '96',
                                title: '96',
                            },
                            {
                                tag: '384',
                                title: '384',
                            },
                        ],
                        help: {
                            en: 'Number of wells in the plate',
                        },
                    },
                    {
                        tag: 'type',
                        label: 'type',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/plates[]/type',
                        input: 'string',
                        help: {
                            en: 'The type of the plate',
                        },
                    },
                    {
                        tag: 'supplier',
                        label: 'supplier',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/plates[]/supplier',
                        input: [
                            {
                                tag: 'name',
                                label: 'name',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/plates[]/supplier/name',
                                input: 'string',
                                help: {
                                    en: 'Name of the supplier',
                                },
                            },
                            {
                                tag: 'catalog_number',
                                label: 'catalog_number',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/plates[]/supplier/catalog_number',
                                input: 'string',
                                help: {
                                    en: 'The catalog number or identifier of the item',
                                },
                            },
                            {
                                tag: 'further_information',
                                label: 'further_information',
                                isArray: true,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/plates[]/supplier/further_information[]',
                                minItems: 1,
                                input: 'string',
                                help: {
                                    en: 'Further information e.g. batch number',
                                },
                            },
                        ],
                        help: {
                            en: 'Information about the supplier of the plate',
                        },
                    },
                    {
                        tag: 'sealing',
                        label: 'sealing',
                        isArray: false,
                        isRequired: false,
                        mbdbPath: 'method_specific_parameters/plates[]/sealing',
                        input: 'string',
                        help: {
                            en: 'The type of sealing used to seal the top of the plate',
                        },
                    },
                    {
                        tag: 'surface_modification',
                        label: 'surface_modification',
                        isArray: false,
                        isRequired: false,
                        mbdbPath: 'method_specific_parameters/plates[]/surface_modification',
                        input: [
                            {
                                tag: 'type',
                                label: 'type',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/plates[]/surface_modification/type',
                                input: 'string',
                                help: {
                                    en: 'The expected type of surface of the wells after the modification (e.g. BSA coated)',
                                },
                            },
                            {
                                tag: 'protocol',
                                label: 'protocol',
                                isArray: true,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/plates[]/surface_modification/protocol[]',
                                minItems: 1,
                                input: [
                                    {
                                        tag: 'name',
                                        label: 'name',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/plates[]/surface_modification/protocol[]/name',
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
                                        mbdbPath: 'method_specific_parameters/plates[]/surface_modification/protocol[]/description',
                                        input: 'string',
                                        help: {
                                            en: 'Short description of the step',
                                        },
                                    },
                                ],
                                help: {
                                    en: 'List of protocol steps used to modify the surface of the wells',
                                },
                            },
                        ],
                        help: {
                            en: 'The type of sealing used to seal the top of the plate',
                        },
                    },
                ],
                help: {
                    en: 'List of the plate types used for the measurements',
                },
            },
            {
                tag: 'sensors',
                label: 'sensors',
                isArray: true,
                isRequired: true,
                mbdbPath: 'method_specific_parameters/sensors[]',
                minItems: 1,
                input: [
                    {
                        tag: 'id',
                        label: 'id',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/sensors[]/id',
                        input: 'referenceable-id',
                        referenceAs: 'bli-sensor',
                    },
                    {
                        tag: 'name',
                        label: 'name',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/sensors[]/name',
                        input: 'string',
                        help: {
                            en: 'Descriptive name of the sensor',
                        },
                    },
                    {
                        tag: 'ligand_information',
                        label: 'ligand_information',
                        isArray: false,
                        isRequired: false,
                        mbdbPath: 'method_specific_parameters/sensors[]/ligand_information',
                        input: [
                            {
                                tag: 'ligand',
                                label: 'ligand',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/sensors[]/ligand_information/ligand',
                                input: 'related-to',
                                relatesTo: 'entity',
                                relatedKeys: [
                                    'id',
                                    'name',
                                ],
                            },
                            {
                                tag: 'ligand_immobilization_chemistry',
                                label: 'ligand_immobilization_chemistry',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/sensors[]/ligand_information/ligand_immobilization_chemistry',
                                input: 'string',
                                help: {
                                    en: 'The type of chemistry on ligands and surface that allows for immobilization of the ligands on the surface of the senor',
                                },
                            },
                            {
                                tag: 'ligand_immobilization_protocol',
                                label: 'ligand_immobilization_protocol',
                                isArray: true,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/sensors[]/ligand_information/ligand_immobilization_protocol[]',
                                minItems: 1,
                                input: [
                                    {
                                        tag: 'name',
                                        label: 'name',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/sensors[]/ligand_information/ligand_immobilization_protocol[]/name',
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
                                        mbdbPath: 'method_specific_parameters/sensors[]/ligand_information/ligand_immobilization_protocol[]/description',
                                        input: 'string',
                                        help: {
                                            en: 'Short description of the step',
                                        },
                                    },
                                ],
                                help: {
                                    en: 'List of steps for immobilizing the ligand on the surface of the sensor',
                                },
                            },
                        ],
                        help: {
                            en: 'Information about the ligand and how it was immobilized',
                        },
                    },
                    {
                        tag: 'sensor_id',
                        label: 'sensor_id',
                        isArray: false,
                        isRequired: false,
                        mbdbPath: 'method_specific_parameters/sensors[]/sensor_id',
                        input: 'string',
                        help: {
                            en: 'The id of the sensor as given by the supplier',
                        },
                    },
                    {
                        tag: 'surface_properties',
                        label: 'surface_properties',
                        isArray: false,
                        isRequired: false,
                        mbdbPath: 'method_specific_parameters/sensors[]/surface_properties',
                        input: 'string',
                        help: {
                            en: 'The type of surface properties the sensor has, e.g. Protein A',
                        },
                    },
                    {
                        tag: 'supplier',
                        label: 'supplier',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/sensors[]/supplier',
                        input: [
                            {
                                tag: 'name',
                                label: 'name',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/sensors[]/supplier/name',
                                input: 'string',
                                help: {
                                    en: 'Name of the supplier',
                                },
                            },
                            {
                                tag: 'catalog_number',
                                label: 'catalog_number',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/sensors[]/supplier/catalog_number',
                                input: 'string',
                                help: {
                                    en: 'The catalog number or identifier of the item',
                                },
                            },
                            {
                                tag: 'further_information',
                                label: 'further_information',
                                isArray: true,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/sensors[]/supplier/further_information[]',
                                minItems: 1,
                                input: 'string',
                                help: {
                                    en: 'Further information e.g. batch number',
                                },
                            },
                        ],
                        help: {
                            en: 'Information about the supplier of the senor',
                        },
                    },
                    {
                        tag: 'hydration_time',
                        label: 'hydration_time',
                        isArray: false,
                        isRequired: false,
                        mbdbPath: 'method_specific_parameters/sensors[]/hydration_time',
                        input: [
                            {
                                tag: 'value',
                                label: 'value',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/sensors[]/hydration_time/value',
                                input: 'float',
                                minimum: 0.0,
                                help: {
                                    en: 'Numerical value of the time point or duration',
                                },
                            },
                            {
                                tag: 'value_error',
                                label: 'value_error',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/sensors[]/hydration_time/value_error',
                                input: 'custom',
                                component: 'value-error',
                                help: {
                                    upper_error: {
                                        en: 'The upper error, i.e. the number added to the value',
                                    },
                                    lower_error: {
                                        en: 'The lower error, i.e. the number subtracted from the value',
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
                                mbdbPath: 'method_specific_parameters/sensors[]/hydration_time/unit',
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
                                    en: 'The unit of the time duration',
                                },
                            },
                        ],
                        help: {
                            en: 'How long the sensor was hydrated before being employed',
                        },
                    },
                    {
                        tag: 'previously_used',
                        label: 'previously_used',
                        isArray: false,
                        isRequired: false,
                        mbdbPath: 'method_specific_parameters/sensors[]/previously_used',
                        input: 'boolean',
                        help: {
                            en: 'Whether or not the sensor was used for previous measurements',
                        },
                    },
                ],
                help: {
                    en: 'List of the senors used for the measurements, reference sensors included',
                },
            },
            {
                tag: 'measurement_protocol',
                label: 'measurement_protocol',
                isArray: true,
                isRequired: true,
                mbdbPath: 'method_specific_parameters/measurement_protocol[]',
                minItems: 1,
                input: [
                    {
                        tag: 'id',
                        label: 'id',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/measurement_protocol[]/id',
                        input: 'referenceable-id',
                        referenceAs: 'bli-protocol-step',
                    },
                    {
                        tag: 'name',
                        label: 'name',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/measurement_protocol[]/name',
                        input: 'string',
                        help: {
                            en: 'Descriptive name (id) of the a step in the measurement protocol which must be unique within a record',
                        },
                    },
                    {
                        tag: 'type',
                        label: 'type',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/measurement_protocol[]/type',
                        input: 'options',
                        choices: [
                            {
                                tag: 'Association',
                                title: 'Association',
                            },
                            {
                                tag: 'Baseline',
                                title: 'Baseline',
                            },
                            {
                                tag: 'Dissociation',
                                title: 'Dissociation',
                            },
                            {
                                tag: 'Regeneration',
                                title: 'Regeneration',
                            },
                            {
                                tag: 'Load',
                                title: 'Load',
                            },
                            {
                                tag: 'Wash',
                                title: 'Wash',
                            },
                            {
                                tag: 'Activation',
                                title: 'Activation',
                            },
                        ],
                        help: {
                            en: 'Which type of step in the measurement protocol this refers to',
                        },
                    },
                    {
                        tag: 'start_time',
                        label: 'start_time',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/measurement_protocol[]/start_time',
                        input: [
                            {
                                tag: 'value',
                                label: 'value',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/measurement_protocol[]/start_time/value',
                                input: 'float',
                                minimum: 0.0,
                                help: {
                                    en: 'Numerical value of the time point or duration',
                                },
                            },
                            {
                                tag: 'value_error',
                                label: 'value_error',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/measurement_protocol[]/start_time/value_error',
                                input: 'custom',
                                component: 'value-error',
                                help: {
                                    upper_error: {
                                        en: 'The upper error, i.e. the number added to the value',
                                    },
                                    lower_error: {
                                        en: 'The lower error, i.e. the number subtracted from the value',
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
                                mbdbPath: 'method_specific_parameters/measurement_protocol[]/start_time/unit',
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
                                    en: 'The unit of the time duration',
                                },
                            },
                        ],
                        help: {
                            en: 'The numerical value of the start point of the measurement step relative to the beginning of the measurement in the units defined in the general parameters',
                        },
                    },
                    {
                        tag: 'time_length',
                        label: 'time_length',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/measurement_protocol[]/time_length',
                        input: [
                            {
                                tag: 'value',
                                label: 'value',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/measurement_protocol[]/time_length/value',
                                input: 'float',
                                minimum: 0.0,
                                help: {
                                    en: 'Numerical value of the time point or duration',
                                },
                            },
                            {
                                tag: 'value_error',
                                label: 'value_error',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/measurement_protocol[]/time_length/value_error',
                                input: 'custom',
                                component: 'value-error',
                                help: {
                                    upper_error: {
                                        en: 'The upper error, i.e. the number added to the value',
                                    },
                                    lower_error: {
                                        en: 'The lower error, i.e. the number subtracted from the value',
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
                                mbdbPath: 'method_specific_parameters/measurement_protocol[]/time_length/unit',
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
                                    en: 'The unit of the time duration',
                                },
                            },
                        ],
                        help: {
                            en: 'The numerical value of the total time of the measurement step took in the units defined in the general parameters',
                        },
                    },
                    {
                        tag: 'shaking_speed',
                        label: 'shaking_speed',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/measurement_protocol[]/shaking_speed',
                        input: [
                            {
                                tag: 'value',
                                label: 'value',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/measurement_protocol[]/shaking_speed/value',
                                input: 'int',
                                minimum: 0,
                                help: {
                                    en: 'The numerical value of the shaking speed of the plate during the measurement step in the units defined in the general parameters',
                                },
                            },
                            {
                                tag: 'value_error',
                                label: 'value_error',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/measurement_protocol[]/shaking_speed/value_error',
                                input: 'custom',
                                component: 'value-error',
                                help: {
                                    upper_error: {
                                        en: 'The upper error, i.e. the number added to the value',
                                    },
                                    lower_error: {
                                        en: 'The lower error, i.e. the number subtracted from the value',
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
                                mbdbPath: 'method_specific_parameters/measurement_protocol[]/shaking_speed/unit',
                                input: 'options',
                                choices: [
                                    {
                                        tag: 'RPM',
                                        title: 'RPM',
                                    },
                                ],
                                help: {
                                    en: 'The reported error of the value of the shaking speed (e.g. standard deviation, % error)',
                                },
                            },
                        ],
                        help: {
                            en: 'The numerical value of the shaking speed of the plate during the measurement step in the units defined in the general parameters',
                        },
                    },
                ],
                help: {
                    en: 'List of the steps in the measurement protocol',
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
                        referenceAs: 'bli-measurement',
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
                        tag: 'sensor',
                        label: 'sensor',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/measurements[]/sensor',
                        input: 'related-to',
                        relatesTo: 'bli-sensor',
                        relatedKeys: [
                            'id',
                            'name',
                        ],
                    },
                    {
                        tag: 'measurement_protocol_step',
                        label: 'measurement_protocol_step',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/measurements[]/measurement_protocol_step',
                        input: 'related-to',
                        relatesTo: 'bli-protocol-step',
                        relatedKeys: [
                            'id',
                            'name',
                        ],
                    },
                    {
                        tag: 'sample',
                        label: 'sample',
                        isArray: false,
                        isRequired: true,
                        mbdbPath: 'method_specific_parameters/measurements[]/sample',
                        input: [
                            {
                                tag: 'plate',
                                label: 'plate',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/measurements[]/sample/plate',
                                input: 'related-to',
                                relatesTo: 'plate',
                                relatedKeys: [
                                    'id',
                                    'name',
                                ],
                            },
                            {
                                tag: 'well_position',
                                label: 'well_position',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/measurements[]/sample/well_position',
                                input: 'string',
                                help: {
                                    en: 'The position the well (in the plate) where the sample was during the measurement',
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
                                tag: 'analytes',
                                label: 'analytes',
                                isArray: true,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/measurements[]/sample/analytes[]',
                                minItems: 1,
                                input: [
                                    {
                                        tag: 'entity',
                                        label: 'entity',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/analytes[]/entity',
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
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/analytes[]/concentration',
                                        input: [
                                            {
                                                tag: 'value',
                                                label: 'value',
                                                isArray: false,
                                                isRequired: true,
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/analytes[]/concentration/value',
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
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/analytes[]/concentration/value_error',
                                                input: 'custom',
                                                component: 'value-error',
                                                help: {
                                                    upper_error: {
                                                        en: 'The upper error, i.e. the number added to the value',
                                                    },
                                                    lower_error: {
                                                        en: 'The lower error, i.e. the number subtracted from the value',
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
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/analytes[]/concentration/unit',
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
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/analytes[]/concentration/obtained_by',
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
                                                mbdbPath: 'method_specific_parameters/measurements[]/sample/analytes[]/concentration/obtained_protocol[]',
                                                minItems: 1,
                                                input: [
                                                    {
                                                        tag: 'name',
                                                        label: 'name',
                                                        isArray: false,
                                                        isRequired: true,
                                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/analytes[]/concentration/obtained_protocol[]/name',
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
                                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/analytes[]/concentration/obtained_protocol[]/description',
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
                                    en: 'List of names (ids) of entities (from the entities of interest defined in the general parameters) that was used to alter the behavior of the target(s) or entities present at varying concentrations for a series of measurements and their concentrations',
                                },
                            },
                            {
                                tag: 'temperature',
                                label: 'temperature',
                                isArray: false,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/measurements[]/sample/temperature',
                                input: [
                                    {
                                        tag: 'value',
                                        label: 'value',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/temperature/value',
                                        input: 'float',
                                        help: {
                                            en: 'Numeric value of the temperature',
                                        },
                                    },
                                    {
                                        tag: 'value_error',
                                        label: 'value_error',
                                        isArray: false,
                                        isRequired: false,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/temperature/value_error',
                                        input: 'custom',
                                        component: 'value-error',
                                        help: {
                                            upper_error: {
                                                en: 'The upper error, i.e. the number added to the value',
                                            },
                                            lower_error: {
                                                en: 'The lower error, i.e. the number subtracted from the value',
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
                                        tag: 'operational_value',
                                        label: 'operational_value',
                                        isArray: false,
                                        isRequired: false,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/temperature/operational_value',
                                        input: 'options',
                                        choices: [
                                            {
                                                tag: 'Room temperature',
                                                title: 'Room temperature',
                                            },
                                            {
                                                tag: 'On Ice',
                                                title: 'On Ice',
                                            },
                                            {
                                                tag: 'Other',
                                                title: 'Other',
                                            },
                                        ],
                                        help: {
                                            en: 'If the temperature was defined by the procedure rather than the numerical value the value can be specified here (e.g. Room temperature, on ice, etc.)',
                                        },
                                    },
                                    {
                                        tag: 'unit',
                                        label: 'unit',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/temperature/unit',
                                        input: 'options',
                                        choices: [
                                            {
                                                tag: 'K',
                                                title: 'K',
                                            },
                                            {
                                                tag: '°C',
                                                title: '°C',
                                            },
                                            {
                                                tag: '°F',
                                                title: '°F',
                                            },
                                        ],
                                        help: {
                                            en: 'The unit of temperature',
                                        },
                                    },
                                    {
                                        tag: 'obtained_by',
                                        label: 'obtained_by',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/temperature/obtained_by',
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
                                            en: 'The means through which the temperature value was obtained',
                                        },
                                    },
                                    {
                                        tag: 'controlled',
                                        label: 'controlled',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/temperature/controlled',
                                        input: 'boolean',
                                        help: {
                                            en: 'Whether the temperature was actively controlled',
                                        },
                                    },
                                ],
                                help: {
                                    en: 'Temperature of the sample while being measured',
                                },
                            },
                            {
                                tag: 'preparation_protocol',
                                label: 'preparation_protocol',
                                isArray: true,
                                isRequired: false,
                                mbdbPath: 'method_specific_parameters/measurements[]/sample/preparation_protocol[]',
                                minItems: 1,
                                input: [
                                    {
                                        tag: 'name',
                                        label: 'name',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/preparation_protocol[]/name',
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
                                        mbdbPath: 'method_specific_parameters/measurements[]/sample/preparation_protocol[]/description',
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
                            en: 'Sample the sensor was in contact with during the measurement',
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
                                tag: 'time',
                                label: 'time',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/measurements[]/measured_data/time',
                                input: [
                                    {
                                        tag: 'id',
                                        label: 'id',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/time/id',
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
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/time/name',
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
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/time/values[]',
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
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/time/unit',
                                        input: 'string',
                                        help: {
                                            en: 'The numerical values of the data series',
                                        },
                                    },
                                ],
                                help: {
                                    en: 'Where the measured data time data is stored along side an ID and the unit',
                                },
                            },
                            {
                                tag: 'response',
                                label: 'response',
                                isArray: false,
                                isRequired: true,
                                mbdbPath: 'method_specific_parameters/measurements[]/measured_data/response',
                                input: [
                                    {
                                        tag: 'id',
                                        label: 'id',
                                        isArray: false,
                                        isRequired: true,
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/response/id',
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
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/response/name',
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
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/response/values[]',
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
                                        mbdbPath: 'method_specific_parameters/measurements[]/measured_data/response/unit',
                                        input: 'string',
                                        help: {
                                            en: 'The numerical values of the data series',
                                        },
                                    },
                                ],
                                help: {
                                    en: 'Where the measured response data is stored along side an ID and the unit',
                                },
                            },
                        ],
                    },
                ],
                help: {
                    en: 'List of measurement where each step from each sensor is considered a single measurement',
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
                        relatesTo: 'bli-measurement',
                        relatedKeys: [
                            'id',
                            'name',
                        ],
                        help: {
                            en: 'List of measurement links that was analyzed together',
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
                                    en: 'Descriptive name of the processing step',
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
                            en: 'Describe the steps in the data analysis prior to fitting (removing outliers in the raw data, applying data filter, placing data at same start time etc. )',
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
                                    en: 'Description of the model(e.g. 1:1 binding)',
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
                                    en: 'The name of the software that was used for doing the fitting (e.g. Excel)',
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
                    en: 'Details of how the data was processed and model in order to derive parameters from it',
                },
            },
        ],
        help: {
            en: 'The parameters of the experiment that is specific to BLI',
        },
    },
];
