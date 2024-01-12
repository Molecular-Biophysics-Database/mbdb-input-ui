export const Common = {
    'general_parameters':{
        order: [
            {tag: 'raw_measurement_files', index: 0},
            {tag: 'record_information', index: 1},
            {tag: 'depositors', index: 2},
            {tag: 'funding_reference', index: 3},
            {tag: 'associated_publication', index: 4},
            {tag: 'chemical_information', index: 5},
            {tag: 'results', index: 6},
            {tag: 'instrument', index: 7},
        ]
    },

    '*/Chemical': {
        order: [
            { tag: 'name', index: 0 },
        ],
    },
        '*/Complex substance of biological origin/Body fluid': {
            order: [
                { tag: 'name', index: 0 },
                { tag: 'description', index: 1 },
            ],
        },
        '*/Complex substance of biological origin/Cell fraction': {
            order: [
                { tag: 'name', index: 0 },
                { tag: 'description', index: 1 },
            ],
        },
        '*/Complex substance of biological origin/Virion': {
            order: [
                { tag: 'name', index: 0 },
                { tag: 'description', index: 1 },
            ],
        },
    '*/Complex substance of chemical origin': {
        order: [
            { tag: 'name', index: 0 },
        ],
    },
    '*/Complex substance of environmental origin': {
        order: [
            { tag: 'name', index: 0 },
        ],
    },
    '*/Complex substance of industrial production origin': {
        order: [
            { tag: 'name', index: 0 },
        ],
    },
    '*/Molecular assembly': {
        order: [
            { tag: 'name', index: 0 },
        ],
    },
    '*/Polymer': {
        order: [
            { tag: 'name', index: 0 },
        ],
    },

    '*/ph': {
        dontTransformLabels: true,
        label: 'pH',
    },

    '*/unit': {
        dontTransformContent: true,
    },

    'general_parameters/instrument': {
        order: [
            { tag: 'name', index: 0 },
        ],
    },
    
    'general_parameters/chemical_information/chemical_environments': {
        order: [
            { tag: 'name', index: 0 },
            { tag: 'solvent', index: 1 },
            { tag: 'constituents', index: 2 },
        ],
    },

    'general_parameters/chemical_information/entities_of_interest/Polymer/modifications/synthesis/protocol': {
        order: [
            { tag: 'name', index: 0 },
        ],
    },
    'general_parameters/chemical_information/entities_of_interest/Polymer/modifications/biological_postprocessing/protocol': {
        order: [
            { tag: 'name', index: 0 },
        ],
    },
    'general_parameters/chemical_information/entities_of_interest/Polymer/modifications/chemical/protocol': {
        order: [
            { tag: 'name', index: 0 },
        ],
    },


    'general_parameters/record_information': {
        order: [
            { tag: 'title', index: 0 },
        ],
    },
        'general_parameters/record_information/date_available': {
            dontDisplay: true,
        },
        'general_parameters/record_information/deposition_date': {
            dontDisplay: true,
        },
        'general_parameters/record_information/publisher': {
            defaultValue: 'MBDB',
        },
        'general_parameters/record_information/resource_type_general': {
            dontDisplay: true,
            forceChoice: true,
        },
        'general_parameters/record_information/subject_category': {
            dontDisplay: true,
            defaultValue: 'Biophysics',
        },


    'general_parameters/schema_version': {
        dontDisplay: true,
        forceChoice: true,
    },

    'method_specific_parameters/schema_version': {
        dontDisplay: true,
        forceChoice: true,
    },
};
