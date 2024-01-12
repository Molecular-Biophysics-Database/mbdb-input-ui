export const GeneralParameters = {
    tag: 'general_parameters',
    label: 'general_parameters',
    isArray: false,
    isRequired: true,
    mbdbPath: 'general_parameters',
    input: [
        {
            tag: 'schema_version',
            label: 'schema_version',
            isArray: false,
            isRequired: true,
            mbdbPath: 'general_parameters/schema_version',
            input: 'options',
            choices: [
                {
                    tag: '0.9.17',
                    title: '0.9.17',
                },
            ],
            help: {
                en: 'The schema version used to annotate the general parameters',
            },
        },
        {
            tag: 'record_information',
            label: 'record_information',
            isArray: false,
            isRequired: true,
            mbdbPath: 'general_parameters/record_information',
            input: [
                {
                    tag: 'title',
                    label: 'title',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/record_information/title',
                    input: 'string',
                    help: {
                        en: 'Short descriptive title of the record',
                    },
                },
                {
                    tag: 'access_rights',
                    label: 'access_rights',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/record_information/access_rights',
                    input: 'options',
                    choices: [
                        {
                            tag: 'open access',
                            title: 'open access',
                        },
                        {
                            tag: 'embargoed access',
                            title: 'embargoed access',
                        },
                        {
                            tag: 'restricted access',
                            title: 'restricted access',
                        },
                    ],
                    help: {
                        en: 'The access rights to the uploaded files. There are three options, 1) "open access" where the files are accessible immediately when the deposition is published, 2) "embargoed access" where the files will only become available after a specified date, 3) "restricted access" where depositors are of the record are the only ones who has access',
                    },
                },
                {
                    tag: 'metadata_access_rights',
                    label: 'metadata_access_rights',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/record_information/metadata_access_rights',
                    input: 'options',
                    choices: [
                        {
                            tag: 'open access',
                            title: 'open access',
                        },
                        {
                            tag: 'embargoed access',
                            title: 'embargoed access',
                        },
                        {
                            tag: 'restricted access',
                            title: 'restricted access',
                        },
                    ],
                    help: {
                        en: 'The access rights to the metadata. Minimal metadata that includes title and depositors is accessible regardless of which type is chosen as it is required to obtain a DOI. There are three options, 1) "open access" where the complete metadata are accessible immediately when the deposition is published, 2) "embargoed access" where the files will only become available after a specified date, 3) "restricted access" where depositors are of the record are the only ones who has access',
                    },
                },
                {
                    tag: 'publisher',
                    label: 'publisher',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/record_information/publisher',
                    input: 'options',
                    choices: [
                        {
                            tag: 'MBDB',
                            title: 'MBDB',
                        },
                    ],
                    help: {
                        en: 'When made available MBDB is to be considered the publisher, however, the depositors are still the owners',
                    },
                },
                {
                    tag: 'resource_type_general',
                    label: 'resource_type_general',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/record_information/resource_type_general',
                    input: 'options',
                    choices: [
                        {
                            tag: 'Dataset',
                            title: 'Dataset',
                        },
                    ],
                    help: {
                        en: 'All records are considered to be datasets',
                    },
                },
                {
                    tag: 'resource_type',
                    label: 'resource_type',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/record_information/resource_type',
                    input: 'string',
                    help: {
                        en: 'DataCite item which shows type of dataset the record is and corresponds directly to which kind of technique was used (MST/BLI/SPR)',
                    },
                },
                {
                    tag: 'identifier',
                    label: 'identifier',
                    isArray: false,
                    isRequired: false,
                    mbdbPath: 'general_parameters/record_information/identifier',
                    input: 'internal-id',
                    help: {
                        en: 'The (external) identifier of the record which is a DOI generated by Datacite. This will automatically be generated when the record is published',
                    },
                },
                {
                    tag: 'subject_category',
                    label: 'subject_category',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/record_information/subject_category',
                    input: 'options',
                    choices: [
                        {
                            tag: 'Biophysics',
                            title: 'Biophysics',
                        },
                    ],
                    help: {
                        en: 'DataCite subject category the record data belongs to default is Biophysics',
                    },
                },
                {
                    tag: 'deposition_date',
                    label: 'deposition_date',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/record_information/deposition_date',
                    input: 'calendar-date',
                    help: {
                        en: 'The date when the data was deposited; automatically generated',
                    },
                },
                {
                    tag: 'date_available',
                    label: 'date_available',
                    isArray: false,
                    isRequired: false,
                    mbdbPath: 'general_parameters/record_information/date_available',
                    input: 'calendar-date',
                    help: {
                        en: 'The date when the data was/will be made publicly available. Will be automatically generated',
                    },
                },
            ],
            help: {
                en: 'Information about the record itself, including whether this particular record is associated with other records',
            },
        },
        {
            tag: 'depositors',
            label: 'depositors',
            isArray: false,
            isRequired: true,
            mbdbPath: 'general_parameters/depositors',
            input: [
                {
                    tag: 'depositor',
                    label: 'depositor',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/depositors/depositor',
                    input: [
                        {
                            tag: 'given_name',
                            label: 'given_name',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/depositors/depositor/given_name',
                            input: 'string',
                            help: {
                                en: 'The given name(s), including middlename(s), of the person',
                            },
                        },
                        {
                            tag: 'family_name',
                            label: 'family_name',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/depositors/depositor/family_name',
                            input: 'string',
                            help: {
                                en: 'The family name(s) the person',
                            },
                        },
                        {
                            tag: 'identifiers',
                            label: 'identifiers',
                            isArray: true,
                            isRequired: false,
                            mbdbPath: 'general_parameters/depositors/depositor/identifiers[]',
                            minItems: 1,
                            input: 'string',
                            help: {
                                en: 'Persistent personal identifiers, currently only ORCIDs are allowed',
                            },
                        },
                        {
                            tag: 'affiliations',
                            label: 'affiliations',
                            isArray: true,
                            isRequired: false,
                            mbdbPath: 'general_parameters/depositors/depositor/affiliations[]',
                            minItems: 1,
                            input: 'vocabulary',
                            vocabularyType: 'affiliations',
                            vocabularyKeys: [
                                'id',
                                'title',
                                'props.city',
                                'props.state',
                                'props.country',
                            ],
                            help: {
                                en: 'The affiliation of the person. Note that this is based on the Research Organization Registry (ROR)',
                            },
                        },
                    ],
                    help: {
                        en: 'The person who made the deposition to MBDB',
                    },
                },
                {
                    tag: 'principal_contact',
                    label: 'principal_contact',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/depositors/principal_contact',
                    input: [
                        {
                            tag: 'given_name',
                            label: 'given_name',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/depositors/principal_contact/given_name',
                            input: 'string',
                            help: {
                                en: 'The given name(s), including middlename(s), of the person',
                            },
                        },
                        {
                            tag: 'family_name',
                            label: 'family_name',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/depositors/principal_contact/family_name',
                            input: 'string',
                            help: {
                                en: 'The family name(s) the person',
                            },
                        },
                        {
                            tag: 'identifiers',
                            label: 'identifiers',
                            isArray: true,
                            isRequired: false,
                            mbdbPath: 'general_parameters/depositors/principal_contact/identifiers[]',
                            minItems: 1,
                            input: 'string',
                            help: {
                                en: 'Persistent personal identifiers, currently only ORCIDs are allowed',
                            },
                        },
                        {
                            tag: 'affiliations',
                            label: 'affiliations',
                            isArray: true,
                            isRequired: false,
                            mbdbPath: 'general_parameters/depositors/principal_contact/affiliations[]',
                            minItems: 1,
                            input: 'vocabulary',
                            vocabularyType: 'affiliations',
                            vocabularyKeys: [
                                'id',
                                'title',
                                'props.city',
                                'props.state',
                                'props.country',
                            ],
                            help: {
                                en: 'The affiliation of the person. Note that this is based on the Research Organization Registry (ROR)',
                            },
                        },
                    ],
                    help: {
                        en: 'The person responsible for the record and the one to contact for inquiries, would typically be the principle investigator group leader, or laboratory head',
                    },
                },
                {
                    tag: 'contributors',
                    label: 'contributors',
                    isArray: true,
                    isRequired: false,
                    mbdbPath: 'general_parameters/depositors/contributors[]',
                    minItems: 1,
                    input: [
                        {
                            tag: 'given_name',
                            label: 'given_name',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/depositors/contributors[]/given_name',
                            input: 'string',
                            help: {
                                en: 'The given name(s), including middlename(s), of the person',
                            },
                        },
                        {
                            tag: 'family_name',
                            label: 'family_name',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/depositors/contributors[]/family_name',
                            input: 'string',
                            help: {
                                en: 'The family name(s) the person',
                            },
                        },
                        {
                            tag: 'identifiers',
                            label: 'identifiers',
                            isArray: true,
                            isRequired: false,
                            mbdbPath: 'general_parameters/depositors/contributors[]/identifiers[]',
                            minItems: 1,
                            input: 'string',
                            help: {
                                en: 'Persistent personal identifiers, currently only ORCIDs are allowed',
                            },
                        },
                        {
                            tag: 'affiliations',
                            label: 'affiliations',
                            isArray: true,
                            isRequired: false,
                            mbdbPath: 'general_parameters/depositors/contributors[]/affiliations[]',
                            minItems: 1,
                            input: 'vocabulary',
                            vocabularyType: 'affiliations',
                            vocabularyKeys: [
                                'id',
                                'title',
                                'props.city',
                                'props.state',
                                'props.country',
                            ],
                            help: {
                                en: 'The affiliation of the person. Note that this is based on the Research Organization Registry (ROR)',
                            },
                        },
                    ],
                    help: {
                        en: 'List of other people who contributed to generating the deposited data, metadata, derived parameters, or the deposition itself',
                    },
                },
            ],
            help: {
                en: 'Information about the depositors (authors) of this record',
            },
        },
        {
            tag: 'associated_publication',
            label: 'associated_publication',
            isArray: false,
            isRequired: false,
            mbdbPath: 'general_parameters/associated_publication',
            input: [
                {
                    tag: 'pid',
                    label: 'pid',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/associated_publication/pid',
                    input: 'string',
                    help: {
                        en: 'Persistent identifier associated with the publication (e.g. DOI, ISBN, URN)',
                    },
                },
                {
                    tag: 'title',
                    label: 'title',
                    isArray: false,
                    isRequired: false,
                    mbdbPath: 'general_parameters/associated_publication/title',
                    input: 'string',
                    help: {
                        en: 'The title of the publication',
                    },
                },
                {
                    tag: 'resource_type',
                    label: 'resource_type',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/associated_publication/resource_type',
                    input: 'options',
                    choices: [
                        {
                            tag: 'Article',
                            title: 'Article',
                        },
                        {
                            tag: 'Book',
                            title: 'Book',
                        },
                        {
                            tag: 'Thesis',
                            title: 'Thesis',
                        },
                    ],
                    help: {
                        en: 'The type of publication',
                    },
                },
            ],
            help: {
                en: 'If the data in this record is described in published literature (article, journal, thesis), information about the literature can be specified here',
            },
        },
        {
            tag: 'funding_reference',
            label: 'funding_reference',
            isArray: true,
            isRequired: false,
            mbdbPath: 'general_parameters/funding_reference[]',
            minItems: 1,
            input: 'vocabulary',
            vocabularyType: 'grants',
            vocabularyKeys: [
                'id',
                'title',
                'props.funder_name',
            ],
            help: {
                en: 'List of information about the grants that supported generation of the raw data annotated by this record. Note that this information is based on OpenAire Projects',
            },
        },
        {
            tag: 'technique',
            label: 'technique',
            isArray: false,
            isRequired: true,
            mbdbPath: 'general_parameters/technique',
            input: 'options',
            choices: [
                {
                    tag: 'Bio-layer interferometry (BLI)',
                    title: 'Bio-layer interferometry (BLI)',
                },
                {
                    tag: 'Microscale thermophoresis/Temperature related intensity change (MST/TRIC)',
                    title: 'Microscale thermophoresis/Temperature related intensity change (MST/TRIC)',
                },
                {
                    tag: 'Surface plasmon resonance (SPR)',
                    title: 'Surface plasmon resonance (SPR)',
                },
            ],
            help: {
                en: 'The type of experimental technique used for collecting the raw data annotated by this record',
            },
        },
        {
            tag: 'collection_start_time',
            label: 'collection_start_time',
            isArray: false,
            isRequired: true,
            mbdbPath: 'general_parameters/collection_start_time',
            input: 'calendar-date',
            help: {
                en: 'The date when collection of the raw data began',
            },
        },
        {
            tag: 'instrument',
            label: 'instrument',
            isArray: false,
            isRequired: true,
            mbdbPath: 'general_parameters/instrument',
            input: [
                {
                    tag: 'manufacturer',
                    label: 'manufacturer',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/instrument/manufacturer',
                    input: 'options',
                    choices: [
                        {
                            tag: 'Bio-Rad',
                            title: 'Bio-Rad',
                        },
                        {
                            tag: 'Bruker',
                            title: 'Bruker',
                        },
                        {
                            tag: 'Cytiva',
                            title: 'Cytiva',
                        },
                        {
                            tag: 'Gatorbio',
                            title: 'Gatorbio',
                        },
                        {
                            tag: 'GE Healthcare',
                            title: 'GE Healthcare',
                        },
                        {
                            tag: 'Nanotemper',
                            title: 'Nanotemper',
                        },
                        {
                            tag: 'Nicoya Life',
                            title: 'Nicoya Life',
                        },
                        {
                            tag: 'Sartorius',
                            title: 'Sartorius',
                        },
                        {
                            tag: 'Malvern Panalytical',
                            title: 'Malvern Panalytical',
                        },
                        {
                            tag: 'Refeyn',
                            title: 'Refeyn',
                        },
                        {
                            tag: 'TA Instruments',
                            title: 'TA Instruments',
                        },
                    ],
                    help: {
                        en: 'Name of the manufacturer of the instrument used for raw data collection',
                    },
                },
                {
                    tag: 'name',
                    label: 'name',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/instrument/name',
                    input: 'string',
                    help: {
                        en: 'The name of the instrument as provided by the manufacturer',
                    },
                },
            ],
            help: {
                en: 'Information about the instrument being used to collect (measure) the raw data annotated by this record',
            },
        },
        {
            tag: 'chemical_information',
            label: 'chemical_information',
            isArray: false,
            isRequired: true,
            mbdbPath: 'general_parameters/chemical_information',
            input: [
                {
                    tag: 'chemical_environments',
                    label: 'chemical_environments',
                    isArray: true,
                    isRequired: true,
                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]',
                    minItems: 1,
                    input: [
                        {
                            tag: 'id',
                            label: 'id',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/id',
                            input: 'referenceable-id',
                            referenceAs: 'chemical-environment',
                        },
                        {
                            tag: 'name',
                            label: 'name',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/name',
                            input: 'string',
                            help: {
                                en: 'Name of the chemical environment (e.g. Measurement Buffer). The name must be unique within a record as it will be referred to the in method specific section in when describing the composition of the individual samples or measurement steps',
                            },
                        },
                        {
                            tag: 'solvent',
                            label: 'solvent',
                            isArray: true,
                            isRequired: true,
                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]',
                            minItems: 1,
                            input: {
                                Chemical: {
                                    tag: 'Chemical',
                                    label: 'Chemical',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]',
                                    input: [
                                        {
                                            tag: 'inchikey',
                                            label: 'inchikey',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]/inchikey',
                                            input: 'string',
                                            help: {
                                                en: 'InChIKey identifier of the chemical. In case of chemical polymers please specify the InChIKey of the monomer and specify the specific type in the additional identifiers field (e.g. if PEG 3350 was employed, the InChiKey of ethylene glycol, i.e. LYCAIKOWRPUZTN-UHFFFAOYSA-N should be specified here)',
                                            },
                                        },
                                        {
                                            tag: 'additional_identifiers',
                                            label: 'additional_identifiers',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]/additional_identifiers[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'Unique and persistent identifier from an external source; options of sources are CAS number, Pubchem Compound ID, and Pubchem Substance ID',
                                            },
                                        },
                                        {
                                            tag: 'isotopic_labeling',
                                            label: 'isotopic_labeling',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]/isotopic_labeling',
                                            input: 'string',
                                            help: {
                                                en: 'If the isotopic composition of the chemical was altered from the naturally occurring abundances, it can be specified here (e.g. 15N, 13C)',
                                            },
                                        },
                                        {
                                            tag: 'molecular_weight',
                                            label: 'molecular_weight',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]/molecular_weight',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]/molecular_weight/value',
                                                    input: 'float',
                                                    help: {
                                                        en: 'The numerical value of the molecular weight',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]/molecular_weight/unit',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'g/mol',
                                                            title: 'g/mol',
                                                        },
                                                        {
                                                            tag: 'Da',
                                                            title: 'Da',
                                                        },
                                                        {
                                                            tag: 'kDa',
                                                            title: 'kDa',
                                                        },
                                                        {
                                                            tag: 'MDa',
                                                            title: 'MDa',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The unit of the molecular weight',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'The molecular weight of the polymer',
                                            },
                                        },
                                        {
                                            tag: 'additional_specifications',
                                            label: 'additional_specifications',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]/additional_specifications[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'Additional information about the chemical can be specified here (e.g. RNase free water, recrystallization, desalting)',
                                            },
                                        },
                                        {
                                            tag: 'name',
                                            label: 'name',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]/name',
                                            input: 'string',
                                            help: {
                                                en: 'Short descriptive name (id) of the constituent, must be unique within a record',
                                            },
                                        },
                                        {
                                            tag: 'type',
                                            label: 'type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]/type',
                                            input: 'variant-discriminator',
                                            choices: [
                                                {
                                                    tag: 'Chemical',
                                                    title: 'Chemical',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of the constituent, options are Chemical',
                                            },
                                        },
                                        {
                                            tag: 'concentration',
                                            label: 'concentration',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]/concentration',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]/concentration/value',
                                                    input: 'float',
                                                    minimum: -1.0,
                                                    help: {
                                                        en: 'The numerical value of the concentration, -1 if unknown',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/solvent[]/concentration/unit',
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
                                            ],
                                            help: {
                                                en: 'Concentration of the constituent including its relative concentration related to the collected sample or absolute concentration of the constituent',
                                            },
                                        },
                                    ],
                                },
                            },
                            discriminator: 'type',
                            help: {
                                en: 'Information about the solvent component(s) of the chemical environment (e.g. water, D2O, DMSO, EtOH) can be specified here',
                            },
                        },
                        {
                            tag: 'constituents',
                            label: 'constituents',
                            isArray: true,
                            isRequired: false,
                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]',
                            minItems: 1,
                            input: {
                                Polymer: {
                                    tag: 'Polymer',
                                    label: 'Polymer',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]',
                                    input: [
                                        {
                                            tag: 'polymer_type',
                                            label: 'polymer_type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/polymer_type',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'cyclic-pseudo-peptide',
                                                    title: 'cyclic-pseudo-peptide',
                                                },
                                                {
                                                    tag: 'peptide nucleic acid',
                                                    title: 'peptide nucleic acid',
                                                },
                                                {
                                                    tag: 'polydeoxyribonucleotide',
                                                    title: 'polydeoxyribonucleotide',
                                                },
                                                {
                                                    tag: 'polydeoxyribonucleotide/polyribonucleotide hybrid',
                                                    title: 'polydeoxyribonucleotide/polyribonucleotide hybrid',
                                                },
                                                {
                                                    tag: 'polypeptide(D)',
                                                    title: 'polypeptide(D)',
                                                },
                                                {
                                                    tag: 'polypeptide(L)',
                                                    title: 'polypeptide(L)',
                                                },
                                                {
                                                    tag: 'polyribonucleotide',
                                                    title: 'polyribonucleotide',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of polymer (e.g. polypeptide(L))',
                                            },
                                        },
                                        {
                                            tag: 'sequence',
                                            label: 'sequence',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/sequence',
                                            input: 'string',
                                            help: {
                                                en: 'Primary sequence of the polymer, using single letter codes (e.g. SAGRELLE, AGTTA). In case of non-natural amino acids or nucleotides, please place the monomer in brackets',
                                            },
                                        },
                                        {
                                            tag: 'molecular_weight',
                                            label: 'molecular_weight',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/molecular_weight',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/molecular_weight/value',
                                                    input: 'float',
                                                    help: {
                                                        en: 'The numerical value of the molecular weight',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/molecular_weight/unit',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'g/mol',
                                                            title: 'g/mol',
                                                        },
                                                        {
                                                            tag: 'Da',
                                                            title: 'Da',
                                                        },
                                                        {
                                                            tag: 'kDa',
                                                            title: 'kDa',
                                                        },
                                                        {
                                                            tag: 'MDa',
                                                            title: 'MDa',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The unit of the molecular weight',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'The molecular weight of the polymer',
                                            },
                                        },
                                        {
                                            tag: 'external_databases',
                                            label: 'external_databases',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/external_databases[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'List of identifiers to records in external databases containing information about the polymer can be specified here (e.g UNIPROT:Q8KRF6)',
                                            },
                                        },
                                        {
                                            tag: 'variant',
                                            label: 'variant',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/variant',
                                            input: 'string',
                                            help: {
                                                en: 'Descriptive name indicating differences of primary sequence of the polymer as compared to the most common form, or wildtype, including mutations, purification tags, etc. (A53T, C-terminal GFP, N-terminal 6xHis-tag)',
                                            },
                                        },
                                        {
                                            tag: 'source_organism',
                                            label: 'source_organism',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/source_organism',
                                            input: 'vocabulary',
                                            vocabularyType: 'organisms',
                                            vocabularyKeys: [
                                                'id',
                                                'title',
                                                'props.rank',
                                            ],
                                        },
                                        {
                                            tag: 'modifications',
                                            label: 'modifications',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications',
                                            input: [
                                                {
                                                    tag: 'synthesis',
                                                    label: 'synthesis',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/synthesis[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'position',
                                                            label: 'position',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/synthesis[]/position',
                                                            input: 'string',
                                                            help: {
                                                                en: 'The position where the modification occurs',
                                                            },
                                                        },
                                                        {
                                                            tag: 'modification',
                                                            label: 'modification',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/synthesis[]/modification',
                                                            input: 'string',
                                                            help: {
                                                                en: 'The common name/type of the modification',
                                                            },
                                                        },
                                                        {
                                                            tag: 'protocol',
                                                            label: 'protocol',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/synthesis[]/protocol[]',
                                                            minItems: 1,
                                                            input: [
                                                                {
                                                                    tag: 'name',
                                                                    label: 'name',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/synthesis[]/protocol[]/name',
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
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/synthesis[]/protocol[]/description',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'Short description of the step',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'List of steps that led to the modification taking place',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'Modifications (e.g. non-natural amino acids) of the polymer made during synthesis (e.g. translation) of the polymer',
                                                    },
                                                },
                                                {
                                                    tag: 'biological_postprocessing',
                                                    label: 'biological_postprocessing',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/biological_postprocessing[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'position',
                                                            label: 'position',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/biological_postprocessing[]/position',
                                                            input: 'string',
                                                            help: {
                                                                en: 'The position where the modification occurs',
                                                            },
                                                        },
                                                        {
                                                            tag: 'modification',
                                                            label: 'modification',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/biological_postprocessing[]/modification',
                                                            input: 'string',
                                                            help: {
                                                                en: 'The common name/type of the modification',
                                                            },
                                                        },
                                                        {
                                                            tag: 'protocol',
                                                            label: 'protocol',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/biological_postprocessing[]/protocol[]',
                                                            minItems: 1,
                                                            input: [
                                                                {
                                                                    tag: 'name',
                                                                    label: 'name',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/biological_postprocessing[]/protocol[]/name',
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
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/biological_postprocessing[]/protocol[]/description',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'Short description of the step',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'List of steps that led to the modification taking place',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'Modifications of the polymer made after synthesis (e.g. posttranslational modifications, DNA methylation) by the organism where synthesis occurred (e.g. glycosylation)',
                                                    },
                                                },
                                                {
                                                    tag: 'chemical',
                                                    label: 'chemical',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/chemical[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'position',
                                                            label: 'position',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/chemical[]/position',
                                                            input: 'string',
                                                            help: {
                                                                en: 'The position where the modification occurs',
                                                            },
                                                        },
                                                        {
                                                            tag: 'modification',
                                                            label: 'modification',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/chemical[]/modification',
                                                            input: 'string',
                                                            help: {
                                                                en: 'The common name/type of the modification',
                                                            },
                                                        },
                                                        {
                                                            tag: 'protocol',
                                                            label: 'protocol',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/chemical[]/protocol[]',
                                                            minItems: 1,
                                                            input: [
                                                                {
                                                                    tag: 'name',
                                                                    label: 'name',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/chemical[]/protocol[]/name',
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
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/modifications/chemical[]/protocol[]/description',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'Short description of the step',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'List of steps that led to the modification taking place',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'Modifications of the polymer introduced by chemical, biochemical, or physical means in vitro (e.g. lysine methylation, cysteine iodoacetamide labeling, deglycosylation, covalent fluorescent labeling)',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'If the polymer contains modifications such as non-natural aminoacids, post translational modification, or chemically modifications like labeling, it can be specified here',
                                            },
                                        },
                                        {
                                            tag: 'expression_source_type',
                                            label: 'expression_source_type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/expression_source_type',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'Natively',
                                                    title: 'Natively',
                                                },
                                                {
                                                    tag: 'Recombinantly',
                                                    title: 'Recombinantly',
                                                },
                                                {
                                                    tag: 'Synthetically',
                                                    title: 'Synthetically',
                                                },
                                            ],
                                            help: {
                                                en: 'How the polymer was produced',
                                            },
                                        },
                                        {
                                            tag: 'expression_organism',
                                            label: 'expression_organism',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/expression_organism',
                                            input: 'vocabulary',
                                            vocabularyType: 'organisms',
                                            vocabularyKeys: [
                                                'id',
                                                'title',
                                                'props.rank',
                                            ],
                                        },
                                        {
                                            tag: 'additional_specifications',
                                            label: 'additional_specifications',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/additional_specifications[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'Additional information about the polymer can be specified here',
                                            },
                                        },
                                        {
                                            tag: 'name',
                                            label: 'name',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/name',
                                            input: 'string',
                                            help: {
                                                en: 'Short descriptive name (id) of the constituent, must be unique within a record (e.g. NaCl, Human serum P1, Lysozyme, etc.)',
                                            },
                                        },
                                        {
                                            tag: 'type',
                                            label: 'type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/type',
                                            input: 'variant-discriminator',
                                            choices: [
                                                {
                                                    tag: 'Polymer',
                                                    title: 'Polymer',
                                                },
                                                {
                                                    tag: 'Chemical',
                                                    title: 'Chemical',
                                                },
                                                {
                                                    tag: 'Molecular assembly',
                                                    title: 'Molecular assembly',
                                                },
                                                {
                                                    tag: 'Complex substance of biological origin',
                                                    title: 'Complex substance of biological origin',
                                                },
                                                {
                                                    tag: 'Complex substance of environmental origin',
                                                    title: 'Complex substance of environmental origin',
                                                },
                                                {
                                                    tag: 'Complex substance of chemical origin',
                                                    title: 'Complex substance of chemical origin',
                                                },
                                                {
                                                    tag: 'Complex substance of industrial production origin',
                                                    title: 'Complex substance of industrial production origin',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of the constituent, options are Polymer, Chemical, and defined assembly',
                                            },
                                        },
                                        {
                                            tag: 'concentration',
                                            label: 'concentration',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/value',
                                                    input: 'float',
                                                    minimum: -1.0,
                                                    help: {
                                                        en: 'The numerical value of the concentration, -1 if unknown',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/unit',
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
                                            ],
                                            help: {
                                                en: 'Concentration of the constituent including its relative concentration related to the collected sample or absolute concentration of the constituent',
                                            },
                                        },
                                    ],
                                },
                                Chemical: {
                                    tag: 'Chemical',
                                    label: 'Chemical',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]',
                                    input: [
                                        {
                                            tag: 'inchikey',
                                            label: 'inchikey',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/inchikey',
                                            input: 'string',
                                            help: {
                                                en: 'InChIKey identifier of the chemical. In case of chemical polymers please specify the InChIKey of the monomer and specify the specific type in the additional identifiers field (e.g. if PEG 3350 was employed, the InChiKey of ethylene glycol, i.e. LYCAIKOWRPUZTN-UHFFFAOYSA-N should be specified here)',
                                            },
                                        },
                                        {
                                            tag: 'additional_identifiers',
                                            label: 'additional_identifiers',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/additional_identifiers[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'Unique and persistent identifier from an external source; options of sources are CAS number, Pubchem Compound ID, and Pubchem Substance ID',
                                            },
                                        },
                                        {
                                            tag: 'isotopic_labeling',
                                            label: 'isotopic_labeling',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/isotopic_labeling',
                                            input: 'string',
                                            help: {
                                                en: 'If the isotopic composition of the chemical was altered from the naturally occurring abundances, it can be specified here (e.g. 15N, 13C)',
                                            },
                                        },
                                        {
                                            tag: 'molecular_weight',
                                            label: 'molecular_weight',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/molecular_weight',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/molecular_weight/value',
                                                    input: 'float',
                                                    help: {
                                                        en: 'The numerical value of the molecular weight',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/molecular_weight/unit',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'g/mol',
                                                            title: 'g/mol',
                                                        },
                                                        {
                                                            tag: 'Da',
                                                            title: 'Da',
                                                        },
                                                        {
                                                            tag: 'kDa',
                                                            title: 'kDa',
                                                        },
                                                        {
                                                            tag: 'MDa',
                                                            title: 'MDa',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The unit of the molecular weight',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'The molecular weight of the polymer',
                                            },
                                        },
                                        {
                                            tag: 'additional_specifications',
                                            label: 'additional_specifications',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/additional_specifications[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'Additional information about the chemical can be specified here (e.g. RNase free water, recrystallization, desalting)',
                                            },
                                        },
                                        {
                                            tag: 'name',
                                            label: 'name',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/name',
                                            input: 'string',
                                            help: {
                                                en: 'Short descriptive name (id) of the constituent, must be unique within a record (e.g. NaCl, Human serum P1, Lysozyme, etc.)',
                                            },
                                        },
                                        {
                                            tag: 'type',
                                            label: 'type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/type',
                                            input: 'variant-discriminator',
                                            choices: [
                                                {
                                                    tag: 'Polymer',
                                                    title: 'Polymer',
                                                },
                                                {
                                                    tag: 'Chemical',
                                                    title: 'Chemical',
                                                },
                                                {
                                                    tag: 'Molecular assembly',
                                                    title: 'Molecular assembly',
                                                },
                                                {
                                                    tag: 'Complex substance of biological origin',
                                                    title: 'Complex substance of biological origin',
                                                },
                                                {
                                                    tag: 'Complex substance of environmental origin',
                                                    title: 'Complex substance of environmental origin',
                                                },
                                                {
                                                    tag: 'Complex substance of chemical origin',
                                                    title: 'Complex substance of chemical origin',
                                                },
                                                {
                                                    tag: 'Complex substance of industrial production origin',
                                                    title: 'Complex substance of industrial production origin',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of the constituent, options are Polymer, Chemical, and defined assembly',
                                            },
                                        },
                                        {
                                            tag: 'concentration',
                                            label: 'concentration',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/value',
                                                    input: 'float',
                                                    minimum: -1.0,
                                                    help: {
                                                        en: 'The numerical value of the concentration, -1 if unknown',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/unit',
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
                                            ],
                                            help: {
                                                en: 'Concentration of the constituent including its relative concentration related to the collected sample or absolute concentration of the constituent',
                                            },
                                        },
                                    ],
                                },
                                'Molecular assembly': {
                                    tag: 'Molecular assembly',
                                    label: 'Molecular assembly',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]',
                                    input: [
                                        {
                                            tag: 'external_databases',
                                            label: 'external_databases',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/external_databases[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'List of identifiers to records in external databases containing information about the molecular assembly as a whole can be specified here (e.g. PDB:1YQ2 ); information about the individual components should be specified in the details of the individual components',
                                            },
                                        },
                                        {
                                            tag: 'components',
                                            label: 'components',
                                            isArray: true,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]',
                                            minItems: 1,
                                            input: {
                                                Polymer: {
                                                    tag: 'Polymer',
                                                    label: 'Polymer',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]',
                                                    input: [
                                                        {
                                                            tag: 'polymer_type',
                                                            label: 'polymer_type',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/polymer_type',
                                                            input: 'options',
                                                            choices: [
                                                                {
                                                                    tag: 'cyclic-pseudo-peptide',
                                                                    title: 'cyclic-pseudo-peptide',
                                                                },
                                                                {
                                                                    tag: 'peptide nucleic acid',
                                                                    title: 'peptide nucleic acid',
                                                                },
                                                                {
                                                                    tag: 'polydeoxyribonucleotide',
                                                                    title: 'polydeoxyribonucleotide',
                                                                },
                                                                {
                                                                    tag: 'polydeoxyribonucleotide/polyribonucleotide hybrid',
                                                                    title: 'polydeoxyribonucleotide/polyribonucleotide hybrid',
                                                                },
                                                                {
                                                                    tag: 'polypeptide(D)',
                                                                    title: 'polypeptide(D)',
                                                                },
                                                                {
                                                                    tag: 'polypeptide(L)',
                                                                    title: 'polypeptide(L)',
                                                                },
                                                                {
                                                                    tag: 'polyribonucleotide',
                                                                    title: 'polyribonucleotide',
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The type of polymer (e.g. polypeptide(L))',
                                                            },
                                                        },
                                                        {
                                                            tag: 'sequence',
                                                            label: 'sequence',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/sequence',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Primary sequence of the polymer, using single letter codes (e.g. SAGRELLE, AGTTA). In case of non-natural amino acids or nucleotides, please place the monomer in brackets',
                                                            },
                                                        },
                                                        {
                                                            tag: 'molecular_weight',
                                                            label: 'molecular_weight',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/molecular_weight',
                                                            input: [
                                                                {
                                                                    tag: 'value',
                                                                    label: 'value',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/molecular_weight/value',
                                                                    input: 'float',
                                                                    help: {
                                                                        en: 'The numerical value of the molecular weight',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'unit',
                                                                    label: 'unit',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/molecular_weight/unit',
                                                                    input: 'options',
                                                                    choices: [
                                                                        {
                                                                            tag: 'g/mol',
                                                                            title: 'g/mol',
                                                                        },
                                                                        {
                                                                            tag: 'Da',
                                                                            title: 'Da',
                                                                        },
                                                                        {
                                                                            tag: 'kDa',
                                                                            title: 'kDa',
                                                                        },
                                                                        {
                                                                            tag: 'MDa',
                                                                            title: 'MDa',
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'The unit of the molecular weight',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The molecular weight of the polymer',
                                                            },
                                                        },
                                                        {
                                                            tag: 'external_databases',
                                                            label: 'external_databases',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/external_databases[]',
                                                            minItems: 1,
                                                            input: 'string',
                                                            help: {
                                                                en: 'List of identifiers to records in external databases containing information about the polymer can be specified here (e.g UNIPROT:Q8KRF6)',
                                                            },
                                                        },
                                                        {
                                                            tag: 'variant',
                                                            label: 'variant',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/variant',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Descriptive name indicating differences of primary sequence of the polymer as compared to the most common form, or wildtype, including mutations, purification tags, etc. (A53T, C-terminal GFP, N-terminal 6xHis-tag)',
                                                            },
                                                        },
                                                        {
                                                            tag: 'source_organism',
                                                            label: 'source_organism',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/source_organism',
                                                            input: 'vocabulary',
                                                            vocabularyType: 'organisms',
                                                            vocabularyKeys: [
                                                                'id',
                                                                'title',
                                                                'props.rank',
                                                            ],
                                                        },
                                                        {
                                                            tag: 'modifications',
                                                            label: 'modifications',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications',
                                                            input: [
                                                                {
                                                                    tag: 'synthesis',
                                                                    label: 'synthesis',
                                                                    isArray: true,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/synthesis[]',
                                                                    minItems: 1,
                                                                    input: [
                                                                        {
                                                                            tag: 'position',
                                                                            label: 'position',
                                                                            isArray: false,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/synthesis[]/position',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'The position where the modification occurs',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'modification',
                                                                            label: 'modification',
                                                                            isArray: false,
                                                                            isRequired: true,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/synthesis[]/modification',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'The common name/type of the modification',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'protocol',
                                                                            label: 'protocol',
                                                                            isArray: true,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/synthesis[]/protocol[]',
                                                                            minItems: 1,
                                                                            input: [
                                                                                {
                                                                                    tag: 'name',
                                                                                    label: 'name',
                                                                                    isArray: false,
                                                                                    isRequired: true,
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/synthesis[]/protocol[]/name',
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
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/synthesis[]/protocol[]/description',
                                                                                    input: 'string',
                                                                                    help: {
                                                                                        en: 'Short description of the step',
                                                                                    },
                                                                                },
                                                                            ],
                                                                            help: {
                                                                                en: 'List of steps that led to the modification taking place',
                                                                            },
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'Modifications (e.g. non-natural amino acids) of the polymer made during synthesis (e.g. translation) of the polymer',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'biological_postprocessing',
                                                                    label: 'biological_postprocessing',
                                                                    isArray: true,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/biological_postprocessing[]',
                                                                    minItems: 1,
                                                                    input: [
                                                                        {
                                                                            tag: 'position',
                                                                            label: 'position',
                                                                            isArray: false,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/biological_postprocessing[]/position',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'The position where the modification occurs',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'modification',
                                                                            label: 'modification',
                                                                            isArray: false,
                                                                            isRequired: true,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/biological_postprocessing[]/modification',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'The common name/type of the modification',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'protocol',
                                                                            label: 'protocol',
                                                                            isArray: true,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/biological_postprocessing[]/protocol[]',
                                                                            minItems: 1,
                                                                            input: [
                                                                                {
                                                                                    tag: 'name',
                                                                                    label: 'name',
                                                                                    isArray: false,
                                                                                    isRequired: true,
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/biological_postprocessing[]/protocol[]/name',
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
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/biological_postprocessing[]/protocol[]/description',
                                                                                    input: 'string',
                                                                                    help: {
                                                                                        en: 'Short description of the step',
                                                                                    },
                                                                                },
                                                                            ],
                                                                            help: {
                                                                                en: 'List of steps that led to the modification taking place',
                                                                            },
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'Modifications of the polymer made after synthesis (e.g. posttranslational modifications, DNA methylation) by the organism where synthesis occurred (e.g. glycosylation)',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'chemical',
                                                                    label: 'chemical',
                                                                    isArray: true,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/chemical[]',
                                                                    minItems: 1,
                                                                    input: [
                                                                        {
                                                                            tag: 'position',
                                                                            label: 'position',
                                                                            isArray: false,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/chemical[]/position',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'The position where the modification occurs',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'modification',
                                                                            label: 'modification',
                                                                            isArray: false,
                                                                            isRequired: true,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/chemical[]/modification',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'The common name/type of the modification',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'protocol',
                                                                            label: 'protocol',
                                                                            isArray: true,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/chemical[]/protocol[]',
                                                                            minItems: 1,
                                                                            input: [
                                                                                {
                                                                                    tag: 'name',
                                                                                    label: 'name',
                                                                                    isArray: false,
                                                                                    isRequired: true,
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/chemical[]/protocol[]/name',
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
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/modifications/chemical[]/protocol[]/description',
                                                                                    input: 'string',
                                                                                    help: {
                                                                                        en: 'Short description of the step',
                                                                                    },
                                                                                },
                                                                            ],
                                                                            help: {
                                                                                en: 'List of steps that led to the modification taking place',
                                                                            },
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'Modifications of the polymer introduced by chemical, biochemical, or physical means in vitro (e.g. lysine methylation, cysteine iodoacetamide labeling, deglycosylation, covalent fluorescent labeling)',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'If the polymer contains modifications such as non-natural aminoacids, post translational modification, or chemically modifications like labeling, it can be specified here',
                                                            },
                                                        },
                                                        {
                                                            tag: 'expression_source_type',
                                                            label: 'expression_source_type',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/expression_source_type',
                                                            input: 'options',
                                                            choices: [
                                                                {
                                                                    tag: 'Natively',
                                                                    title: 'Natively',
                                                                },
                                                                {
                                                                    tag: 'Recombinantly',
                                                                    title: 'Recombinantly',
                                                                },
                                                                {
                                                                    tag: 'Synthetically',
                                                                    title: 'Synthetically',
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'How the polymer was produced',
                                                            },
                                                        },
                                                        {
                                                            tag: 'expression_organism',
                                                            label: 'expression_organism',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/expression_organism',
                                                            input: 'vocabulary',
                                                            vocabularyType: 'organisms',
                                                            vocabularyKeys: [
                                                                'id',
                                                                'title',
                                                                'props.rank',
                                                            ],
                                                        },
                                                        {
                                                            tag: 'additional_specifications',
                                                            label: 'additional_specifications',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/additional_specifications[]',
                                                            minItems: 1,
                                                            input: 'string',
                                                            help: {
                                                                en: 'Additional information about the polymer can be specified here',
                                                            },
                                                        },
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/name',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short descriptive name (id) given to the assembly component. The name must be unique within a record',
                                                            },
                                                        },
                                                        {
                                                            tag: 'type',
                                                            label: 'type',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/type',
                                                            input: 'variant-discriminator',
                                                            choices: [
                                                                {
                                                                    tag: 'Polymer',
                                                                    title: 'Polymer',
                                                                },
                                                                {
                                                                    tag: 'Chemical',
                                                                    title: 'Chemical',
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The type of component, options are (biological) Polymer and Chemical',
                                                            },
                                                        },
                                                        {
                                                            tag: 'copy_number',
                                                            label: 'copy_number',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/copy_number',
                                                            input: 'float',
                                                            minimum: -1.0,
                                                            help: {
                                                                en: 'Number of molecules of the component within the assembly, -1 if unknown',
                                                            },
                                                        },
                                                    ],
                                                },
                                                Chemical: {
                                                    tag: 'Chemical',
                                                    label: 'Chemical',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]',
                                                    input: [
                                                        {
                                                            tag: 'inchikey',
                                                            label: 'inchikey',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/inchikey',
                                                            input: 'string',
                                                            help: {
                                                                en: 'InChIKey identifier of the chemical. In case of chemical polymers please specify the InChIKey of the monomer and specify the specific type in the additional identifiers field (e.g. if PEG 3350 was employed, the InChiKey of ethylene glycol, i.e. LYCAIKOWRPUZTN-UHFFFAOYSA-N should be specified here)',
                                                            },
                                                        },
                                                        {
                                                            tag: 'additional_identifiers',
                                                            label: 'additional_identifiers',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/additional_identifiers[]',
                                                            minItems: 1,
                                                            input: 'string',
                                                            help: {
                                                                en: 'Unique and persistent identifier from an external source; options of sources are CAS number, Pubchem Compound ID, and Pubchem Substance ID',
                                                            },
                                                        },
                                                        {
                                                            tag: 'isotopic_labeling',
                                                            label: 'isotopic_labeling',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/isotopic_labeling',
                                                            input: 'string',
                                                            help: {
                                                                en: 'If the isotopic composition of the chemical was altered from the naturally occurring abundances, it can be specified here (e.g. 15N, 13C)',
                                                            },
                                                        },
                                                        {
                                                            tag: 'molecular_weight',
                                                            label: 'molecular_weight',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/molecular_weight',
                                                            input: [
                                                                {
                                                                    tag: 'value',
                                                                    label: 'value',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/molecular_weight/value',
                                                                    input: 'float',
                                                                    help: {
                                                                        en: 'The numerical value of the molecular weight',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'unit',
                                                                    label: 'unit',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/molecular_weight/unit',
                                                                    input: 'options',
                                                                    choices: [
                                                                        {
                                                                            tag: 'g/mol',
                                                                            title: 'g/mol',
                                                                        },
                                                                        {
                                                                            tag: 'Da',
                                                                            title: 'Da',
                                                                        },
                                                                        {
                                                                            tag: 'kDa',
                                                                            title: 'kDa',
                                                                        },
                                                                        {
                                                                            tag: 'MDa',
                                                                            title: 'MDa',
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'The unit of the molecular weight',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The molecular weight of the polymer',
                                                            },
                                                        },
                                                        {
                                                            tag: 'additional_specifications',
                                                            label: 'additional_specifications',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/additional_specifications[]',
                                                            minItems: 1,
                                                            input: 'string',
                                                            help: {
                                                                en: 'Additional information about the chemical can be specified here (e.g. RNase free water, recrystallization, desalting)',
                                                            },
                                                        },
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/name',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short descriptive name (id) given to the assembly component. The name must be unique within a record',
                                                            },
                                                        },
                                                        {
                                                            tag: 'type',
                                                            label: 'type',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/type',
                                                            input: 'variant-discriminator',
                                                            choices: [
                                                                {
                                                                    tag: 'Polymer',
                                                                    title: 'Polymer',
                                                                },
                                                                {
                                                                    tag: 'Chemical',
                                                                    title: 'Chemical',
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The type of component, options are (biological) Polymer and Chemical',
                                                            },
                                                        },
                                                        {
                                                            tag: 'copy_number',
                                                            label: 'copy_number',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/components[]/copy_number',
                                                            input: 'float',
                                                            minimum: -1.0,
                                                            help: {
                                                                en: 'Number of molecules of the component within the assembly, -1 if unknown',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            discriminator: 'type',
                                            help: {
                                                en: 'Description of the individual components (e.g. polypeptide, heme, lipids, metal ions etc.) the molecular assembly is composed of (e.g. Hemoglobin alpha) and how many copies of each component were present',
                                            },
                                        },
                                        {
                                            tag: 'molecular_weight',
                                            label: 'molecular_weight',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/molecular_weight',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/molecular_weight/value',
                                                    input: 'float',
                                                    help: {
                                                        en: 'The numerical value of the molecular weight',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/molecular_weight/unit',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'g/mol',
                                                            title: 'g/mol',
                                                        },
                                                        {
                                                            tag: 'Da',
                                                            title: 'Da',
                                                        },
                                                        {
                                                            tag: 'kDa',
                                                            title: 'kDa',
                                                        },
                                                        {
                                                            tag: 'MDa',
                                                            title: 'MDa',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The unit of the molecular weight',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'The molecular weight of the molecular assembly',
                                            },
                                        },
                                        {
                                            tag: 'chemical_modifications',
                                            label: 'chemical_modifications',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/chemical_modifications[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'position',
                                                    label: 'position',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/chemical_modifications[]/position',
                                                    input: 'string',
                                                    help: {
                                                        en: 'The position where the modification occurs',
                                                    },
                                                },
                                                {
                                                    tag: 'modification',
                                                    label: 'modification',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/chemical_modifications[]/modification',
                                                    input: 'string',
                                                    help: {
                                                        en: 'The common name/type of the modification',
                                                    },
                                                },
                                                {
                                                    tag: 'protocol',
                                                    label: 'protocol',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/chemical_modifications[]/protocol[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/chemical_modifications[]/protocol[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/chemical_modifications[]/protocol[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'List of steps that led to the modification taking place',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'List describing deliberate modifications made to the molecular assembly through chemical, biochemical, or physical means',
                                            },
                                        },
                                        {
                                            tag: 'additional_specifications',
                                            label: 'additional_specifications',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/additional_specifications[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'Additional information about the macromolecular assembly can be specified here',
                                            },
                                        },
                                        {
                                            tag: 'name',
                                            label: 'name',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/name',
                                            input: 'string',
                                            help: {
                                                en: 'Short descriptive name (id) of the constituent, must be unique within a record (e.g. NaCl, Human serum P1, Lysozyme, etc.)',
                                            },
                                        },
                                        {
                                            tag: 'type',
                                            label: 'type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/type',
                                            input: 'variant-discriminator',
                                            choices: [
                                                {
                                                    tag: 'Polymer',
                                                    title: 'Polymer',
                                                },
                                                {
                                                    tag: 'Chemical',
                                                    title: 'Chemical',
                                                },
                                                {
                                                    tag: 'Molecular assembly',
                                                    title: 'Molecular assembly',
                                                },
                                                {
                                                    tag: 'Complex substance of biological origin',
                                                    title: 'Complex substance of biological origin',
                                                },
                                                {
                                                    tag: 'Complex substance of environmental origin',
                                                    title: 'Complex substance of environmental origin',
                                                },
                                                {
                                                    tag: 'Complex substance of chemical origin',
                                                    title: 'Complex substance of chemical origin',
                                                },
                                                {
                                                    tag: 'Complex substance of industrial production origin',
                                                    title: 'Complex substance of industrial production origin',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of the constituent, options are Polymer, Chemical, and defined assembly',
                                            },
                                        },
                                        {
                                            tag: 'concentration',
                                            label: 'concentration',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/value',
                                                    input: 'float',
                                                    minimum: -1.0,
                                                    help: {
                                                        en: 'The numerical value of the concentration, -1 if unknown',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/unit',
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
                                            ],
                                            help: {
                                                en: 'Concentration of the constituent including its relative concentration related to the collected sample or absolute concentration of the constituent',
                                            },
                                        },
                                    ],
                                },
                                'Complex substance of biological origin': {
                                    tag: 'Complex substance of biological origin',
                                    label: 'Complex substance of biological origin',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]',
                                    input: {
                                        'Body fluid': {
                                            tag: 'Body fluid',
                                            label: 'Body fluid',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]',
                                            input: [
                                                {
                                                    tag: 'fluid',
                                                    label: 'fluid',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/fluid',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'Blood',
                                                            title: 'Blood',
                                                        },
                                                        {
                                                            tag: 'Fecal matter',
                                                            title: 'Fecal matter',
                                                        },
                                                        {
                                                            tag: 'Milk',
                                                            title: 'Milk',
                                                        },
                                                        {
                                                            tag: 'Plasma',
                                                            title: 'Plasma',
                                                        },
                                                        {
                                                            tag: 'Saliva',
                                                            title: 'Saliva',
                                                        },
                                                        {
                                                            tag: 'Serum',
                                                            title: 'Serum',
                                                        },
                                                        {
                                                            tag: 'Urine',
                                                            title: 'Urine',
                                                        },
                                                        {
                                                            tag: 'Plant extract',
                                                            title: 'Plant extract',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The body fluid the complex substance is derived from',
                                                    },
                                                },
                                                {
                                                    tag: 'health_status',
                                                    label: 'health_status',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/health_status',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Health status of the donor organism where the body fluid was derived from (e.g. healthy, sick, patient with Diabetes type 2)',
                                                    },
                                                },
                                                {
                                                    tag: 'derived_from',
                                                    label: 'derived_from',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/derived_from',
                                                    input: 'variant-discriminator',
                                                    choices: [
                                                        {
                                                            tag: 'Body fluid',
                                                            title: 'Body fluid',
                                                        },
                                                        {
                                                            tag: 'Cell fraction',
                                                            title: 'Cell fraction',
                                                        },
                                                        {
                                                            tag: 'Virion',
                                                            title: 'Virion',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The biological substance the complex substance is derived from',
                                                    },
                                                },
                                                {
                                                    tag: 'source_organism',
                                                    label: 'source_organism',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/source_organism',
                                                    input: 'vocabulary',
                                                    vocabularyType: 'organisms',
                                                    vocabularyKeys: [
                                                        'id',
                                                        'title',
                                                        'props.rank',
                                                    ],
                                                },
                                                {
                                                    tag: 'preparation_protocol',
                                                    label: 'preparation_protocol',
                                                    isArray: true,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'List of the steps performed during the preparation of the complex substance',
                                                    },
                                                },
                                                {
                                                    tag: 'storage',
                                                    label: 'storage',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage',
                                                    input: [
                                                        {
                                                            tag: 'temperature',
                                                            label: 'temperature',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature',
                                                            input: [
                                                                {
                                                                    tag: 'value',
                                                                    label: 'value',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature/value',
                                                                    input: 'float',
                                                                    help: {
                                                                        en: 'The numeric value of the temperature',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'unit',
                                                                    label: 'unit',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature/unit',
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
                                                            ],
                                                            help: {
                                                                en: 'The temperature the sample was stored at',
                                                            },
                                                        },
                                                        {
                                                            tag: 'duration',
                                                            label: 'duration',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration',
                                                            input: [
                                                                {
                                                                    tag: 'value',
                                                                    label: 'value',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration/value',
                                                                    input: 'float',
                                                                    minimum: 0.0,
                                                                    help: {
                                                                        en: 'The numerical value of the time point or duration',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'unit',
                                                                    label: 'unit',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration/unit',
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
                                                                en: 'Length of time the sample was stored before being measured',
                                                            },
                                                        },
                                                        {
                                                            tag: 'storage_preparation',
                                                            label: 'storage_preparation',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]',
                                                            minItems: 1,
                                                            input: [
                                                                {
                                                                    tag: 'name',
                                                                    label: 'name',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]/name',
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
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]/description',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'Short description of the step',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The specific steps that were taken to prepare the samples for storage (e.g. flash freezing in liquid nitrogen), if applicable',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'Information about how the complex substance was stored between being acquired and measured, including temperature and duration',
                                                    },
                                                },
                                                {
                                                    tag: 'additional_specifications',
                                                    label: 'additional_specifications',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/additional_specifications[]',
                                                    minItems: 1,
                                                    input: 'string',
                                                    help: {
                                                        en: 'Additional information about the complex substance can be specified here',
                                                    },
                                                },
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/name',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short descriptive name (id) of the constituent, must be unique within a record (e.g. NaCl, Human serum P1, Lysozyme, etc.)',
                                                    },
                                                },
                                                {
                                                    tag: 'type',
                                                    label: 'type',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/type',
                                                    input: 'variant-discriminator',
                                                    choices: [
                                                        {
                                                            tag: 'Polymer',
                                                            title: 'Polymer',
                                                        },
                                                        {
                                                            tag: 'Chemical',
                                                            title: 'Chemical',
                                                        },
                                                        {
                                                            tag: 'Molecular assembly',
                                                            title: 'Molecular assembly',
                                                        },
                                                        {
                                                            tag: 'Complex substance of biological origin',
                                                            title: 'Complex substance of biological origin',
                                                        },
                                                        {
                                                            tag: 'Complex substance of environmental origin',
                                                            title: 'Complex substance of environmental origin',
                                                        },
                                                        {
                                                            tag: 'Complex substance of chemical origin',
                                                            title: 'Complex substance of chemical origin',
                                                        },
                                                        {
                                                            tag: 'Complex substance of industrial production origin',
                                                            title: 'Complex substance of industrial production origin',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The type of the constituent, options are Polymer, Chemical, and defined assembly',
                                                    },
                                                },
                                                {
                                                    tag: 'concentration',
                                                    label: 'concentration',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/value',
                                                            input: 'float',
                                                            minimum: -1.0,
                                                            help: {
                                                                en: 'The numerical value of the concentration, -1 if unknown',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/unit',
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
                                                    ],
                                                    help: {
                                                        en: 'Concentration of the constituent including its relative concentration related to the collected sample or absolute concentration of the constituent',
                                                    },
                                                },
                                            ],
                                        },
                                        'Cell fraction': {
                                            tag: 'Cell fraction',
                                            label: 'Cell fraction',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]',
                                            input: [
                                                {
                                                    tag: 'fraction',
                                                    label: 'fraction',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/fraction',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'Ribosome',
                                                            title: 'Ribosome',
                                                        },
                                                        {
                                                            tag: 'Cell wall',
                                                            title: 'Cell wall',
                                                        },
                                                        {
                                                            tag: 'VesicleCell lysate/Cytoplasm',
                                                            title: 'VesicleCell lysate/Cytoplasm',
                                                        },
                                                        {
                                                            tag: 'Cell Membrane',
                                                            title: 'Cell Membrane',
                                                        },
                                                        {
                                                            tag: 'Extracellular matrix',
                                                            title: 'Extracellular matrix',
                                                        },
                                                        {
                                                            tag: 'Lysosome',
                                                            title: 'Lysosome',
                                                        },
                                                        {
                                                            tag: 'Golgi Apparatus',
                                                            title: 'Golgi Apparatus',
                                                        },
                                                        {
                                                            tag: 'Mitochondrion',
                                                            title: 'Mitochondrion',
                                                        },
                                                        {
                                                            tag: 'Nucleus',
                                                            title: 'Nucleus',
                                                        },
                                                        {
                                                            tag: 'Rough Endoplasmic Reticulum',
                                                            title: 'Rough Endoplasmic Reticulum',
                                                        },
                                                        {
                                                            tag: 'Smooth Endoplasmic Reticulum',
                                                            title: 'Smooth Endoplasmic Reticulum',
                                                        },
                                                        {
                                                            tag: 'Vacuole',
                                                            title: 'Vacuole',
                                                        },
                                                        {
                                                            tag: 'Chloroplast',
                                                            title: 'Chloroplast',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The subcelluar component e.g. (Ribosome)',
                                                    },
                                                },
                                                {
                                                    tag: 'organ',
                                                    label: 'organ',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/organ',
                                                    input: 'string',
                                                    help: {
                                                        en: 'The organ the cell fraction was derived from (e.g. heart)',
                                                    },
                                                },
                                                {
                                                    tag: 'tissue',
                                                    label: 'tissue',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/tissue',
                                                    input: 'string',
                                                    help: {
                                                        en: 'The tissue type the cell fraction was derived from',
                                                    },
                                                },
                                                {
                                                    tag: 'cell_type',
                                                    label: 'cell_type',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/cell_type',
                                                    input: 'string',
                                                    help: {
                                                        en: 'The cell type the cell fraction was derived from',
                                                    },
                                                },
                                                {
                                                    tag: 'health_status',
                                                    label: 'health_status',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/health_status',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Health status of the donor organism where the cell fraction was derived from (e.g. healthy, sick, patient with Diabetes type 2)',
                                                    },
                                                },
                                                {
                                                    tag: 'derived_from',
                                                    label: 'derived_from',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/derived_from',
                                                    input: 'variant-discriminator',
                                                    choices: [
                                                        {
                                                            tag: 'Body fluid',
                                                            title: 'Body fluid',
                                                        },
                                                        {
                                                            tag: 'Cell fraction',
                                                            title: 'Cell fraction',
                                                        },
                                                        {
                                                            tag: 'Virion',
                                                            title: 'Virion',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The biological substance the complex substance is derived from',
                                                    },
                                                },
                                                {
                                                    tag: 'source_organism',
                                                    label: 'source_organism',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/source_organism',
                                                    input: 'vocabulary',
                                                    vocabularyType: 'organisms',
                                                    vocabularyKeys: [
                                                        'id',
                                                        'title',
                                                        'props.rank',
                                                    ],
                                                },
                                                {
                                                    tag: 'preparation_protocol',
                                                    label: 'preparation_protocol',
                                                    isArray: true,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'List of the steps performed during the preparation of the complex substance',
                                                    },
                                                },
                                                {
                                                    tag: 'storage',
                                                    label: 'storage',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage',
                                                    input: [
                                                        {
                                                            tag: 'temperature',
                                                            label: 'temperature',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature',
                                                            input: [
                                                                {
                                                                    tag: 'value',
                                                                    label: 'value',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature/value',
                                                                    input: 'float',
                                                                    help: {
                                                                        en: 'The numeric value of the temperature',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'unit',
                                                                    label: 'unit',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature/unit',
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
                                                            ],
                                                            help: {
                                                                en: 'The temperature the sample was stored at',
                                                            },
                                                        },
                                                        {
                                                            tag: 'duration',
                                                            label: 'duration',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration',
                                                            input: [
                                                                {
                                                                    tag: 'value',
                                                                    label: 'value',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration/value',
                                                                    input: 'float',
                                                                    minimum: 0.0,
                                                                    help: {
                                                                        en: 'The numerical value of the time point or duration',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'unit',
                                                                    label: 'unit',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration/unit',
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
                                                                en: 'Length of time the sample was stored before being measured',
                                                            },
                                                        },
                                                        {
                                                            tag: 'storage_preparation',
                                                            label: 'storage_preparation',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]',
                                                            minItems: 1,
                                                            input: [
                                                                {
                                                                    tag: 'name',
                                                                    label: 'name',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]/name',
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
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]/description',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'Short description of the step',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The specific steps that were taken to prepare the samples for storage (e.g. flash freezing in liquid nitrogen), if applicable',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'Information about how the complex substance was stored between being acquired and measured, including temperature and duration',
                                                    },
                                                },
                                                {
                                                    tag: 'additional_specifications',
                                                    label: 'additional_specifications',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/additional_specifications[]',
                                                    minItems: 1,
                                                    input: 'string',
                                                    help: {
                                                        en: 'Additional information about the complex substance can be specified here',
                                                    },
                                                },
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/name',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short descriptive name (id) of the constituent, must be unique within a record (e.g. NaCl, Human serum P1, Lysozyme, etc.)',
                                                    },
                                                },
                                                {
                                                    tag: 'type',
                                                    label: 'type',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/type',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'Polymer',
                                                            title: 'Polymer',
                                                        },
                                                        {
                                                            tag: 'Chemical',
                                                            title: 'Chemical',
                                                        },
                                                        {
                                                            tag: 'Molecular assembly',
                                                            title: 'Molecular assembly',
                                                        },
                                                        {
                                                            tag: 'Complex substance of biological origin',
                                                            title: 'Complex substance of biological origin',
                                                        },
                                                        {
                                                            tag: 'Complex substance of environmental origin',
                                                            title: 'Complex substance of environmental origin',
                                                        },
                                                        {
                                                            tag: 'Complex substance of chemical origin',
                                                            title: 'Complex substance of chemical origin',
                                                        },
                                                        {
                                                            tag: 'Complex substance of industrial production origin',
                                                            title: 'Complex substance of industrial production origin',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The type of the constituent, options are Polymer, Chemical, and defined assembly',
                                                    },
                                                },
                                                {
                                                    tag: 'concentration',
                                                    label: 'concentration',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/value',
                                                            input: 'float',
                                                            minimum: -1.0,
                                                            help: {
                                                                en: 'The numerical value of the concentration, -1 if unknown',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/unit',
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
                                                    ],
                                                    help: {
                                                        en: 'Concentration of the constituent including its relative concentration related to the collected sample or absolute concentration of the constituent',
                                                    },
                                                },
                                            ],
                                        },
                                        Virion: {
                                            tag: 'Virion',
                                            label: 'Virion',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]',
                                            input: [
                                                {
                                                    tag: 'genetic_material',
                                                    label: 'genetic_material',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/genetic_material',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'No genetic material',
                                                            title: 'No genetic material',
                                                        },
                                                        {
                                                            tag: 'Virus genome',
                                                            title: 'Virus genome',
                                                        },
                                                        {
                                                            tag: 'Synthetic',
                                                            title: 'Synthetic',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The genetic material carried by the virions (None, virus genome, synthetic)',
                                                    },
                                                },
                                                {
                                                    tag: 'capsid_type',
                                                    label: 'capsid_type',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/capsid_type',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'None',
                                                            title: 'None',
                                                        },
                                                        {
                                                            tag: 'Native',
                                                            title: 'Native',
                                                        },
                                                        {
                                                            tag: 'Genetically Engineered',
                                                            title: 'Genetically Engineered',
                                                        },
                                                        {
                                                            tag: 'Synthetic',
                                                            title: 'Synthetic',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The type of virion capsid (e.g. genetically engineered, None',
                                                    },
                                                },
                                                {
                                                    tag: 'envelope_type',
                                                    label: 'envelope_type',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/envelope_type',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'None',
                                                            title: 'None',
                                                        },
                                                        {
                                                            tag: 'Native',
                                                            title: 'Native',
                                                        },
                                                        {
                                                            tag: 'Genetically Engineered',
                                                            title: 'Genetically Engineered',
                                                        },
                                                        {
                                                            tag: 'Synthetic',
                                                            title: 'Synthetic',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The type of virion envelope (e.g. genetically engineered, None',
                                                    },
                                                },
                                                {
                                                    tag: 'host_organism',
                                                    label: 'host_organism',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/host_organism',
                                                    input: 'vocabulary',
                                                    vocabularyType: 'organisms',
                                                    vocabularyKeys: [
                                                        'id',
                                                        'title',
                                                        'props.rank',
                                                    ],
                                                },
                                                {
                                                    tag: 'host_cell_type',
                                                    label: 'host_cell_type',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/host_cell_type',
                                                    input: 'string',
                                                    help: {
                                                        en: 'The host cell type the virion was produced in',
                                                    },
                                                },
                                                {
                                                    tag: 'derived_from',
                                                    label: 'derived_from',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/derived_from',
                                                    input: 'variant-discriminator',
                                                    choices: [
                                                        {
                                                            tag: 'Body fluid',
                                                            title: 'Body fluid',
                                                        },
                                                        {
                                                            tag: 'Cell fraction',
                                                            title: 'Cell fraction',
                                                        },
                                                        {
                                                            tag: 'Virion',
                                                            title: 'Virion',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The biological substance the complex substance is derived from',
                                                    },
                                                },
                                                {
                                                    tag: 'source_organism',
                                                    label: 'source_organism',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/source_organism',
                                                    input: 'vocabulary',
                                                    vocabularyType: 'organisms',
                                                    vocabularyKeys: [
                                                        'id',
                                                        'title',
                                                        'props.rank',
                                                    ],
                                                },
                                                {
                                                    tag: 'preparation_protocol',
                                                    label: 'preparation_protocol',
                                                    isArray: true,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'List of the steps performed during the preparation of the complex substance',
                                                    },
                                                },
                                                {
                                                    tag: 'storage',
                                                    label: 'storage',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage',
                                                    input: [
                                                        {
                                                            tag: 'temperature',
                                                            label: 'temperature',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature',
                                                            input: [
                                                                {
                                                                    tag: 'value',
                                                                    label: 'value',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature/value',
                                                                    input: 'float',
                                                                    help: {
                                                                        en: 'The numeric value of the temperature',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'unit',
                                                                    label: 'unit',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature/unit',
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
                                                            ],
                                                            help: {
                                                                en: 'The temperature the sample was stored at',
                                                            },
                                                        },
                                                        {
                                                            tag: 'duration',
                                                            label: 'duration',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration',
                                                            input: [
                                                                {
                                                                    tag: 'value',
                                                                    label: 'value',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration/value',
                                                                    input: 'float',
                                                                    minimum: 0.0,
                                                                    help: {
                                                                        en: 'The numerical value of the time point or duration',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'unit',
                                                                    label: 'unit',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration/unit',
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
                                                                en: 'Length of time the sample was stored before being measured',
                                                            },
                                                        },
                                                        {
                                                            tag: 'storage_preparation',
                                                            label: 'storage_preparation',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]',
                                                            minItems: 1,
                                                            input: [
                                                                {
                                                                    tag: 'name',
                                                                    label: 'name',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]/name',
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
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]/description',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'Short description of the step',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The specific steps that were taken to prepare the samples for storage (e.g. flash freezing in liquid nitrogen), if applicable',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'Information about how the complex substance was stored between being acquired and measured, including temperature and duration',
                                                    },
                                                },
                                                {
                                                    tag: 'additional_specifications',
                                                    label: 'additional_specifications',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/additional_specifications[]',
                                                    minItems: 1,
                                                    input: 'string',
                                                    help: {
                                                        en: 'Additional information about the complex substance can be specified here',
                                                    },
                                                },
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/name',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short descriptive name (id) of the constituent, must be unique within a record (e.g. NaCl, Human serum P1, Lysozyme, etc.)',
                                                    },
                                                },
                                                {
                                                    tag: 'type',
                                                    label: 'type',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/type',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'Polymer',
                                                            title: 'Polymer',
                                                        },
                                                        {
                                                            tag: 'Chemical',
                                                            title: 'Chemical',
                                                        },
                                                        {
                                                            tag: 'Molecular assembly',
                                                            title: 'Molecular assembly',
                                                        },
                                                        {
                                                            tag: 'Complex substance of biological origin',
                                                            title: 'Complex substance of biological origin',
                                                        },
                                                        {
                                                            tag: 'Complex substance of environmental origin',
                                                            title: 'Complex substance of environmental origin',
                                                        },
                                                        {
                                                            tag: 'Complex substance of chemical origin',
                                                            title: 'Complex substance of chemical origin',
                                                        },
                                                        {
                                                            tag: 'Complex substance of industrial production origin',
                                                            title: 'Complex substance of industrial production origin',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The type of the constituent, options are Polymer, Chemical, and defined assembly',
                                                    },
                                                },
                                                {
                                                    tag: 'concentration',
                                                    label: 'concentration',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/value',
                                                            input: 'float',
                                                            minimum: -1.0,
                                                            help: {
                                                                en: 'The numerical value of the concentration, -1 if unknown',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/unit',
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
                                                    ],
                                                    help: {
                                                        en: 'Concentration of the constituent including its relative concentration related to the collected sample or absolute concentration of the constituent',
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                    discriminator: 'derived_from',
                                    help: {
                                        en: 'Information about the biological substance the complex substance is derived from',
                                    },
                                },
                                'Complex substance of environmental origin': {
                                    tag: 'Complex substance of environmental origin',
                                    label: 'Complex substance of environmental origin',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]',
                                    input: [
                                        {
                                            tag: 'source',
                                            label: 'source',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/source',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'Fresh water',
                                                    title: 'Fresh water',
                                                },
                                                {
                                                    tag: 'Marine',
                                                    title: 'Marine',
                                                },
                                                {
                                                    tag: 'Ice core',
                                                    title: 'Ice core',
                                                },
                                                {
                                                    tag: 'Sediment',
                                                    title: 'Sediment',
                                                },
                                                {
                                                    tag: 'Sewage',
                                                    title: 'Sewage',
                                                },
                                                {
                                                    tag: 'Soil',
                                                    title: 'Soil',
                                                },
                                            ],
                                            help: {
                                                en: 'The environmental source where the complex substance was derived from',
                                            },
                                        },
                                        {
                                            tag: 'preparation_protocol',
                                            label: 'preparation_protocol',
                                            isArray: true,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]/name',
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
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]/description',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short description of the step',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'List of the steps performed during the preparation of the complex substance',
                                            },
                                        },
                                        {
                                            tag: 'location',
                                            label: 'location',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/location',
                                            input: [
                                                {
                                                    tag: 'latitude',
                                                    label: 'latitude',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/location/latitude',
                                                    input: 'float',
                                                    minimum: -90.0,
                                                    maximum: 90.0,
                                                    help: {
                                                        en: 'The latitude, from south to north, in degrees (decimal notation)',
                                                    },
                                                },
                                                {
                                                    tag: 'longitude',
                                                    label: 'longitude',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/location/longitude',
                                                    input: 'float',
                                                    minimum: -180.0,
                                                    maximum: 180.0,
                                                    help: {
                                                        en: 'The longitude, from west to east, in degrees (decimal notation)',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'The coordinates, in decimal notation, where the complex substance was collected',
                                            },
                                        },
                                        {
                                            tag: 'storage',
                                            label: 'storage',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage',
                                            input: [
                                                {
                                                    tag: 'temperature',
                                                    label: 'temperature',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature/value',
                                                            input: 'float',
                                                            help: {
                                                                en: 'The numeric value of the temperature',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature/unit',
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
                                                    ],
                                                    help: {
                                                        en: 'The temperature the sample was stored at',
                                                    },
                                                },
                                                {
                                                    tag: 'duration',
                                                    label: 'duration',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration/value',
                                                            input: 'float',
                                                            minimum: 0.0,
                                                            help: {
                                                                en: 'The numerical value of the time point or duration',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration/unit',
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
                                                        en: 'Length of time the sample was stored before being measured',
                                                    },
                                                },
                                                {
                                                    tag: 'storage_preparation',
                                                    label: 'storage_preparation',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The specific steps that were taken to prepare the samples for storage (e.g. flash freezing in liquid nitrogen), if applicable',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'Information about how the complex substance was stored between being acquired and measured, including temperature and duration',
                                            },
                                        },
                                        {
                                            tag: 'additional_specifications',
                                            label: 'additional_specifications',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/additional_specifications[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'Additional information about the complex substance can be specified here',
                                            },
                                        },
                                        {
                                            tag: 'name',
                                            label: 'name',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/name',
                                            input: 'string',
                                            help: {
                                                en: 'Short descriptive name (id) of the constituent, must be unique within a record (e.g. NaCl, Human serum P1, Lysozyme, etc.)',
                                            },
                                        },
                                        {
                                            tag: 'type',
                                            label: 'type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/type',
                                            input: 'variant-discriminator',
                                            choices: [
                                                {
                                                    tag: 'Polymer',
                                                    title: 'Polymer',
                                                },
                                                {
                                                    tag: 'Chemical',
                                                    title: 'Chemical',
                                                },
                                                {
                                                    tag: 'Molecular assembly',
                                                    title: 'Molecular assembly',
                                                },
                                                {
                                                    tag: 'Complex substance of biological origin',
                                                    title: 'Complex substance of biological origin',
                                                },
                                                {
                                                    tag: 'Complex substance of environmental origin',
                                                    title: 'Complex substance of environmental origin',
                                                },
                                                {
                                                    tag: 'Complex substance of chemical origin',
                                                    title: 'Complex substance of chemical origin',
                                                },
                                                {
                                                    tag: 'Complex substance of industrial production origin',
                                                    title: 'Complex substance of industrial production origin',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of the constituent, options are Polymer, Chemical, and defined assembly',
                                            },
                                        },
                                        {
                                            tag: 'concentration',
                                            label: 'concentration',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/value',
                                                    input: 'float',
                                                    minimum: -1.0,
                                                    help: {
                                                        en: 'The numerical value of the concentration, -1 if unknown',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/unit',
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
                                            ],
                                            help: {
                                                en: 'Concentration of the constituent including its relative concentration related to the collected sample or absolute concentration of the constituent',
                                            },
                                        },
                                    ],
                                },
                                'Complex substance of chemical origin': {
                                    tag: 'Complex substance of chemical origin',
                                    label: 'Complex substance of chemical origin',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]',
                                    input: [
                                        {
                                            tag: 'class',
                                            label: 'class',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/class',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'Lipid_assembly',
                                                    title: 'Lipid_assembly',
                                                },
                                            ],
                                            help: {
                                                en: 'The chemical origin where the complex substance was derived from',
                                            },
                                        },
                                        {
                                            tag: 'details',
                                            label: 'details',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details',
                                            input: [
                                                {
                                                    tag: 'type',
                                                    label: 'type',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/type',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'Micelle',
                                                            title: 'Micelle',
                                                        },
                                                        {
                                                            tag: 'Liposome',
                                                            title: 'Liposome',
                                                        },
                                                        {
                                                            tag: 'Nanodisc',
                                                            title: 'Nanodisc',
                                                        },
                                                        {
                                                            tag: 'Sheet',
                                                            title: 'Sheet',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The type of lipid assembly',
                                                    },
                                                },
                                                {
                                                    tag: 'number_of_mono_layers',
                                                    label: 'number_of_mono_layers',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/number_of_mono_layers',
                                                    input: 'int',
                                                    minimum: -1,
                                                    help: {
                                                        en: 'The number of lipid mono layers in the lipid assembly, -1 if unknown',
                                                    },
                                                },
                                                {
                                                    tag: 'size',
                                                    label: 'size',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/size',
                                                    input: [
                                                        {
                                                            tag: 'type',
                                                            label: 'type',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/size/type',
                                                            input: 'options',
                                                            choices: [
                                                                {
                                                                    tag: 'radius',
                                                                    title: 'radius',
                                                                },
                                                                {
                                                                    tag: 'diameter',
                                                                    title: 'diameter',
                                                                },
                                                                {
                                                                    tag: 'path length',
                                                                    title: 'path length',
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The type of size (e.g. radius)',
                                                            },
                                                        },
                                                        {
                                                            tag: 'mean',
                                                            label: 'mean',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/size/mean',
                                                            input: 'float',
                                                            minimum: 0.0,
                                                            help: {
                                                                en: 'The mean of the size',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/size/unit',
                                                            input: 'options',
                                                            choices: [
                                                                {
                                                                    tag: 'Å',
                                                                    title: 'Å',
                                                                },
                                                                {
                                                                    tag: 'nm',
                                                                    title: 'nm',
                                                                },
                                                                {
                                                                    tag: 'μm',
                                                                    title: 'μm',
                                                                },
                                                                {
                                                                    tag: 'mm',
                                                                    title: 'mm',
                                                                },
                                                                {
                                                                    tag: 'cm',
                                                                    title: 'cm',
                                                                },
                                                                {
                                                                    tag: 'm',
                                                                    title: 'm',
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The unit of the size',
                                                            },
                                                        },
                                                        {
                                                            tag: 'median',
                                                            label: 'median',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/size/median',
                                                            input: 'float',
                                                            minimum: 0.0,
                                                            help: {
                                                                en: 'The median of the size',
                                                            },
                                                        },
                                                        {
                                                            tag: 'upper',
                                                            label: 'upper',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/size/upper',
                                                            input: 'float',
                                                            help: {
                                                                en: 'The upper bound of the size',
                                                            },
                                                        },
                                                        {
                                                            tag: 'lower',
                                                            label: 'lower',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/size/lower',
                                                            input: 'float',
                                                            help: {
                                                                en: 'The lower bound of the size',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The size of the lipid assembly',
                                                    },
                                                },
                                                {
                                                    tag: 'components',
                                                    label: 'components',
                                                    isArray: true,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]',
                                                    minItems: 1,
                                                    input: {
                                                        Polymer: {
                                                            tag: 'Polymer',
                                                            label: 'Polymer',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]',
                                                            input: [
                                                                {
                                                                    tag: 'polymer_type',
                                                                    label: 'polymer_type',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/polymer_type',
                                                                    input: 'options',
                                                                    choices: [
                                                                        {
                                                                            tag: 'cyclic-pseudo-peptide',
                                                                            title: 'cyclic-pseudo-peptide',
                                                                        },
                                                                        {
                                                                            tag: 'peptide nucleic acid',
                                                                            title: 'peptide nucleic acid',
                                                                        },
                                                                        {
                                                                            tag: 'polydeoxyribonucleotide',
                                                                            title: 'polydeoxyribonucleotide',
                                                                        },
                                                                        {
                                                                            tag: 'polydeoxyribonucleotide/polyribonucleotide hybrid',
                                                                            title: 'polydeoxyribonucleotide/polyribonucleotide hybrid',
                                                                        },
                                                                        {
                                                                            tag: 'polypeptide(D)',
                                                                            title: 'polypeptide(D)',
                                                                        },
                                                                        {
                                                                            tag: 'polypeptide(L)',
                                                                            title: 'polypeptide(L)',
                                                                        },
                                                                        {
                                                                            tag: 'polyribonucleotide',
                                                                            title: 'polyribonucleotide',
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'The type of polymer (e.g. polypeptide(L))',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'sequence',
                                                                    label: 'sequence',
                                                                    isArray: false,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/sequence',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'Primary sequence of the polymer, using single letter codes (e.g. SAGRELLE, AGTTA). In case of non-natural amino acids or nucleotides, please place the monomer in brackets',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'molecular_weight',
                                                                    label: 'molecular_weight',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/molecular_weight',
                                                                    input: [
                                                                        {
                                                                            tag: 'value',
                                                                            label: 'value',
                                                                            isArray: false,
                                                                            isRequired: true,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/molecular_weight/value',
                                                                            input: 'float',
                                                                            help: {
                                                                                en: 'The numerical value of the molecular weight',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'unit',
                                                                            label: 'unit',
                                                                            isArray: false,
                                                                            isRequired: true,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/molecular_weight/unit',
                                                                            input: 'options',
                                                                            choices: [
                                                                                {
                                                                                    tag: 'g/mol',
                                                                                    title: 'g/mol',
                                                                                },
                                                                                {
                                                                                    tag: 'Da',
                                                                                    title: 'Da',
                                                                                },
                                                                                {
                                                                                    tag: 'kDa',
                                                                                    title: 'kDa',
                                                                                },
                                                                                {
                                                                                    tag: 'MDa',
                                                                                    title: 'MDa',
                                                                                },
                                                                            ],
                                                                            help: {
                                                                                en: 'The unit of the molecular weight',
                                                                            },
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'The molecular weight of the polymer',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'external_databases',
                                                                    label: 'external_databases',
                                                                    isArray: true,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/external_databases[]',
                                                                    minItems: 1,
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'List of identifiers to records in external databases containing information about the polymer can be specified here (e.g UNIPROT:Q8KRF6)',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'variant',
                                                                    label: 'variant',
                                                                    isArray: false,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/variant',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'Descriptive name indicating differences of primary sequence of the polymer as compared to the most common form, or wildtype, including mutations, purification tags, etc. (A53T, C-terminal GFP, N-terminal 6xHis-tag)',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'source_organism',
                                                                    label: 'source_organism',
                                                                    isArray: false,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/source_organism',
                                                                    input: 'vocabulary',
                                                                    vocabularyType: 'organisms',
                                                                    vocabularyKeys: [
                                                                        'id',
                                                                        'title',
                                                                        'props.rank',
                                                                    ],
                                                                },
                                                                {
                                                                    tag: 'modifications',
                                                                    label: 'modifications',
                                                                    isArray: false,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications',
                                                                    input: [
                                                                        {
                                                                            tag: 'synthesis',
                                                                            label: 'synthesis',
                                                                            isArray: true,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/synthesis[]',
                                                                            minItems: 1,
                                                                            input: [
                                                                                {
                                                                                    tag: 'position',
                                                                                    label: 'position',
                                                                                    isArray: false,
                                                                                    isRequired: false,
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/synthesis[]/position',
                                                                                    input: 'string',
                                                                                    help: {
                                                                                        en: 'The position where the modification occurs',
                                                                                    },
                                                                                },
                                                                                {
                                                                                    tag: 'modification',
                                                                                    label: 'modification',
                                                                                    isArray: false,
                                                                                    isRequired: true,
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/synthesis[]/modification',
                                                                                    input: 'string',
                                                                                    help: {
                                                                                        en: 'The common name/type of the modification',
                                                                                    },
                                                                                },
                                                                                {
                                                                                    tag: 'protocol',
                                                                                    label: 'protocol',
                                                                                    isArray: true,
                                                                                    isRequired: false,
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/synthesis[]/protocol[]',
                                                                                    minItems: 1,
                                                                                    input: [
                                                                                        {
                                                                                            tag: 'name',
                                                                                            label: 'name',
                                                                                            isArray: false,
                                                                                            isRequired: true,
                                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/synthesis[]/protocol[]/name',
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
                                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/synthesis[]/protocol[]/description',
                                                                                            input: 'string',
                                                                                            help: {
                                                                                                en: 'Short description of the step',
                                                                                            },
                                                                                        },
                                                                                    ],
                                                                                    help: {
                                                                                        en: 'List of steps that led to the modification taking place',
                                                                                    },
                                                                                },
                                                                            ],
                                                                            help: {
                                                                                en: 'Modifications (e.g. non-natural amino acids) of the polymer made during synthesis (e.g. translation) of the polymer',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'biological_postprocessing',
                                                                            label: 'biological_postprocessing',
                                                                            isArray: true,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/biological_postprocessing[]',
                                                                            minItems: 1,
                                                                            input: [
                                                                                {
                                                                                    tag: 'position',
                                                                                    label: 'position',
                                                                                    isArray: false,
                                                                                    isRequired: false,
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/biological_postprocessing[]/position',
                                                                                    input: 'string',
                                                                                    help: {
                                                                                        en: 'The position where the modification occurs',
                                                                                    },
                                                                                },
                                                                                {
                                                                                    tag: 'modification',
                                                                                    label: 'modification',
                                                                                    isArray: false,
                                                                                    isRequired: true,
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/biological_postprocessing[]/modification',
                                                                                    input: 'string',
                                                                                    help: {
                                                                                        en: 'The common name/type of the modification',
                                                                                    },
                                                                                },
                                                                                {
                                                                                    tag: 'protocol',
                                                                                    label: 'protocol',
                                                                                    isArray: true,
                                                                                    isRequired: false,
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/biological_postprocessing[]/protocol[]',
                                                                                    minItems: 1,
                                                                                    input: [
                                                                                        {
                                                                                            tag: 'name',
                                                                                            label: 'name',
                                                                                            isArray: false,
                                                                                            isRequired: true,
                                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/biological_postprocessing[]/protocol[]/name',
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
                                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/biological_postprocessing[]/protocol[]/description',
                                                                                            input: 'string',
                                                                                            help: {
                                                                                                en: 'Short description of the step',
                                                                                            },
                                                                                        },
                                                                                    ],
                                                                                    help: {
                                                                                        en: 'List of steps that led to the modification taking place',
                                                                                    },
                                                                                },
                                                                            ],
                                                                            help: {
                                                                                en: 'Modifications of the polymer made after synthesis (e.g. posttranslational modifications, DNA methylation) by the organism where synthesis occurred (e.g. glycosylation)',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'chemical',
                                                                            label: 'chemical',
                                                                            isArray: true,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/chemical[]',
                                                                            minItems: 1,
                                                                            input: [
                                                                                {
                                                                                    tag: 'position',
                                                                                    label: 'position',
                                                                                    isArray: false,
                                                                                    isRequired: false,
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/chemical[]/position',
                                                                                    input: 'string',
                                                                                    help: {
                                                                                        en: 'The position where the modification occurs',
                                                                                    },
                                                                                },
                                                                                {
                                                                                    tag: 'modification',
                                                                                    label: 'modification',
                                                                                    isArray: false,
                                                                                    isRequired: true,
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/chemical[]/modification',
                                                                                    input: 'string',
                                                                                    help: {
                                                                                        en: 'The common name/type of the modification',
                                                                                    },
                                                                                },
                                                                                {
                                                                                    tag: 'protocol',
                                                                                    label: 'protocol',
                                                                                    isArray: true,
                                                                                    isRequired: false,
                                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/chemical[]/protocol[]',
                                                                                    minItems: 1,
                                                                                    input: [
                                                                                        {
                                                                                            tag: 'name',
                                                                                            label: 'name',
                                                                                            isArray: false,
                                                                                            isRequired: true,
                                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/chemical[]/protocol[]/name',
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
                                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/modifications/chemical[]/protocol[]/description',
                                                                                            input: 'string',
                                                                                            help: {
                                                                                                en: 'Short description of the step',
                                                                                            },
                                                                                        },
                                                                                    ],
                                                                                    help: {
                                                                                        en: 'List of steps that led to the modification taking place',
                                                                                    },
                                                                                },
                                                                            ],
                                                                            help: {
                                                                                en: 'Modifications of the polymer introduced by chemical, biochemical, or physical means in vitro (e.g. lysine methylation, cysteine iodoacetamide labeling, deglycosylation, covalent fluorescent labeling)',
                                                                            },
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'If the polymer contains modifications such as non-natural aminoacids, post translational modification, or chemically modifications like labeling, it can be specified here',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'expression_source_type',
                                                                    label: 'expression_source_type',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/expression_source_type',
                                                                    input: 'options',
                                                                    choices: [
                                                                        {
                                                                            tag: 'Natively',
                                                                            title: 'Natively',
                                                                        },
                                                                        {
                                                                            tag: 'Recombinantly',
                                                                            title: 'Recombinantly',
                                                                        },
                                                                        {
                                                                            tag: 'Synthetically',
                                                                            title: 'Synthetically',
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'How the polymer was produced',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'expression_organism',
                                                                    label: 'expression_organism',
                                                                    isArray: false,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/expression_organism',
                                                                    input: 'vocabulary',
                                                                    vocabularyType: 'organisms',
                                                                    vocabularyKeys: [
                                                                        'id',
                                                                        'title',
                                                                        'props.rank',
                                                                    ],
                                                                },
                                                                {
                                                                    tag: 'additional_specifications',
                                                                    label: 'additional_specifications',
                                                                    isArray: true,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/additional_specifications[]',
                                                                    minItems: 1,
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'Additional information about the polymer can be specified here',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'name',
                                                                    label: 'name',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/name',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'Short descriptive name (id) given to the assembly component. The name must be unique within a record',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'type',
                                                                    label: 'type',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/type',
                                                                    input: 'variant-discriminator',
                                                                    choices: [
                                                                        {
                                                                            tag: 'Polymer',
                                                                            title: 'Polymer',
                                                                        },
                                                                        {
                                                                            tag: 'Chemical',
                                                                            title: 'Chemical',
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'The type of component, options are (biological) Polymer and Chemical',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'copy_number',
                                                                    label: 'copy_number',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/copy_number',
                                                                    input: 'float',
                                                                    minimum: -1.0,
                                                                    help: {
                                                                        en: 'Number of molecules of the component within the assembly, -1 if unknown',
                                                                    },
                                                                },
                                                            ],
                                                        },
                                                        Chemical: {
                                                            tag: 'Chemical',
                                                            label: 'Chemical',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]',
                                                            input: [
                                                                {
                                                                    tag: 'inchikey',
                                                                    label: 'inchikey',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/inchikey',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'InChIKey identifier of the chemical. In case of chemical polymers please specify the InChIKey of the monomer and specify the specific type in the additional identifiers field (e.g. if PEG 3350 was employed, the InChiKey of ethylene glycol, i.e. LYCAIKOWRPUZTN-UHFFFAOYSA-N should be specified here)',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'additional_identifiers',
                                                                    label: 'additional_identifiers',
                                                                    isArray: true,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/additional_identifiers[]',
                                                                    minItems: 1,
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'Unique and persistent identifier from an external source; options of sources are CAS number, Pubchem Compound ID, and Pubchem Substance ID',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'isotopic_labeling',
                                                                    label: 'isotopic_labeling',
                                                                    isArray: false,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/isotopic_labeling',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'If the isotopic composition of the chemical was altered from the naturally occurring abundances, it can be specified here (e.g. 15N, 13C)',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'molecular_weight',
                                                                    label: 'molecular_weight',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/molecular_weight',
                                                                    input: [
                                                                        {
                                                                            tag: 'value',
                                                                            label: 'value',
                                                                            isArray: false,
                                                                            isRequired: true,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/molecular_weight/value',
                                                                            input: 'float',
                                                                            help: {
                                                                                en: 'The numerical value of the molecular weight',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'unit',
                                                                            label: 'unit',
                                                                            isArray: false,
                                                                            isRequired: true,
                                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/molecular_weight/unit',
                                                                            input: 'options',
                                                                            choices: [
                                                                                {
                                                                                    tag: 'g/mol',
                                                                                    title: 'g/mol',
                                                                                },
                                                                                {
                                                                                    tag: 'Da',
                                                                                    title: 'Da',
                                                                                },
                                                                                {
                                                                                    tag: 'kDa',
                                                                                    title: 'kDa',
                                                                                },
                                                                                {
                                                                                    tag: 'MDa',
                                                                                    title: 'MDa',
                                                                                },
                                                                            ],
                                                                            help: {
                                                                                en: 'The unit of the molecular weight',
                                                                            },
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'The molecular weight of the polymer',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'additional_specifications',
                                                                    label: 'additional_specifications',
                                                                    isArray: true,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/additional_specifications[]',
                                                                    minItems: 1,
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'Additional information about the chemical can be specified here (e.g. RNase free water, recrystallization, desalting)',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'name',
                                                                    label: 'name',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/name',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'Short descriptive name (id) given to the assembly component. The name must be unique within a record',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'type',
                                                                    label: 'type',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/type',
                                                                    input: 'variant-discriminator',
                                                                    choices: [
                                                                        {
                                                                            tag: 'Polymer',
                                                                            title: 'Polymer',
                                                                        },
                                                                        {
                                                                            tag: 'Chemical',
                                                                            title: 'Chemical',
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'The type of component, options are (biological) Polymer and Chemical',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'copy_number',
                                                                    label: 'copy_number',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/components[]/copy_number',
                                                                    input: 'float',
                                                                    minimum: -1.0,
                                                                    help: {
                                                                        en: 'Number of molecules of the component within the assembly, -1 if unknown',
                                                                    },
                                                                },
                                                            ],
                                                        },
                                                    },
                                                    discriminator: 'type',
                                                    help: {
                                                        en: 'The components of the lipid assembly',
                                                    },
                                                },
                                                {
                                                    tag: 'additional_specifications',
                                                    label: 'additional_specifications',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/additional_specifications[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/additional_specifications[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/details/additional_specifications[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'Additional information about the lipid assembly, if applicable',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'The chemical origin where the complex substance was derived from',
                                            },
                                        },
                                        {
                                            tag: 'preparation_protocol',
                                            label: 'preparation_protocol',
                                            isArray: true,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]/name',
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
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]/description',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short description of the step',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'List of the steps performed during the preparation of the complex substance',
                                            },
                                        },
                                        {
                                            tag: 'storage',
                                            label: 'storage',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage',
                                            input: [
                                                {
                                                    tag: 'temperature',
                                                    label: 'temperature',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature/value',
                                                            input: 'float',
                                                            help: {
                                                                en: 'The numeric value of the temperature',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature/unit',
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
                                                    ],
                                                    help: {
                                                        en: 'The temperature the sample was stored at',
                                                    },
                                                },
                                                {
                                                    tag: 'duration',
                                                    label: 'duration',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration/value',
                                                            input: 'float',
                                                            minimum: 0.0,
                                                            help: {
                                                                en: 'The numerical value of the time point or duration',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration/unit',
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
                                                        en: 'Length of time the sample was stored before being measured',
                                                    },
                                                },
                                                {
                                                    tag: 'storage_preparation',
                                                    label: 'storage_preparation',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The specific steps that were taken to prepare the samples for storage (e.g. flash freezing in liquid nitrogen), if applicable',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'Information about how the complex substance was stored between being acquired and measured, including temperature and duration',
                                            },
                                        },
                                        {
                                            tag: 'additional_specifications',
                                            label: 'additional_specifications',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/additional_specifications[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'Additional information about the complex substance can be specified here',
                                            },
                                        },
                                        {
                                            tag: 'name',
                                            label: 'name',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/name',
                                            input: 'string',
                                            help: {
                                                en: 'Short descriptive name (id) of the constituent, must be unique within a record (e.g. NaCl, Human serum P1, Lysozyme, etc.)',
                                            },
                                        },
                                        {
                                            tag: 'type',
                                            label: 'type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/type',
                                            input: 'variant-discriminator',
                                            choices: [
                                                {
                                                    tag: 'Polymer',
                                                    title: 'Polymer',
                                                },
                                                {
                                                    tag: 'Chemical',
                                                    title: 'Chemical',
                                                },
                                                {
                                                    tag: 'Molecular assembly',
                                                    title: 'Molecular assembly',
                                                },
                                                {
                                                    tag: 'Complex substance of biological origin',
                                                    title: 'Complex substance of biological origin',
                                                },
                                                {
                                                    tag: 'Complex substance of environmental origin',
                                                    title: 'Complex substance of environmental origin',
                                                },
                                                {
                                                    tag: 'Complex substance of chemical origin',
                                                    title: 'Complex substance of chemical origin',
                                                },
                                                {
                                                    tag: 'Complex substance of industrial production origin',
                                                    title: 'Complex substance of industrial production origin',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of the constituent, options are Polymer, Chemical, and defined assembly',
                                            },
                                        },
                                        {
                                            tag: 'concentration',
                                            label: 'concentration',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/value',
                                                    input: 'float',
                                                    minimum: -1.0,
                                                    help: {
                                                        en: 'The numerical value of the concentration, -1 if unknown',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/unit',
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
                                            ],
                                            help: {
                                                en: 'Concentration of the constituent including its relative concentration related to the collected sample or absolute concentration of the constituent',
                                            },
                                        },
                                    ],
                                },
                                'Complex substance of industrial production origin': {
                                    tag: 'Complex substance of industrial production origin',
                                    label: 'Complex substance of industrial production origin',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]',
                                    input: [
                                        {
                                            tag: 'product',
                                            label: 'product',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/product',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'Beer',
                                                    title: 'Beer',
                                                },
                                                {
                                                    tag: 'Cell medium',
                                                    title: 'Cell medium',
                                                },
                                                {
                                                    tag: 'Whey',
                                                    title: 'Whey',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of product, byproduct, or waste product the complex substance was derived from',
                                            },
                                        },
                                        {
                                            tag: 'preparation_protocol',
                                            label: 'preparation_protocol',
                                            isArray: true,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]/name',
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
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/preparation_protocol[]/description',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short description of the step',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'List of the steps performed during the preparation of the complex substance',
                                            },
                                        },
                                        {
                                            tag: 'storage',
                                            label: 'storage',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage',
                                            input: [
                                                {
                                                    tag: 'temperature',
                                                    label: 'temperature',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature/value',
                                                            input: 'float',
                                                            help: {
                                                                en: 'The numeric value of the temperature',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/temperature/unit',
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
                                                    ],
                                                    help: {
                                                        en: 'The temperature the sample was stored at',
                                                    },
                                                },
                                                {
                                                    tag: 'duration',
                                                    label: 'duration',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration/value',
                                                            input: 'float',
                                                            minimum: 0.0,
                                                            help: {
                                                                en: 'The numerical value of the time point or duration',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/duration/unit',
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
                                                        en: 'Length of time the sample was stored before being measured',
                                                    },
                                                },
                                                {
                                                    tag: 'storage_preparation',
                                                    label: 'storage_preparation',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/storage/storage_preparation[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The specific steps that were taken to prepare the samples for storage (e.g. flash freezing in liquid nitrogen), if applicable',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'Information about how the complex substance was stored between being acquired and measured, including temperature and duration',
                                            },
                                        },
                                        {
                                            tag: 'additional_specifications',
                                            label: 'additional_specifications',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/additional_specifications[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'Additional information about the complex substance can be specified here',
                                            },
                                        },
                                        {
                                            tag: 'name',
                                            label: 'name',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/name',
                                            input: 'string',
                                            help: {
                                                en: 'Short descriptive name (id) of the constituent, must be unique within a record (e.g. NaCl, Human serum P1, Lysozyme, etc.)',
                                            },
                                        },
                                        {
                                            tag: 'type',
                                            label: 'type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/type',
                                            input: 'variant-discriminator',
                                            choices: [
                                                {
                                                    tag: 'Polymer',
                                                    title: 'Polymer',
                                                },
                                                {
                                                    tag: 'Chemical',
                                                    title: 'Chemical',
                                                },
                                                {
                                                    tag: 'Molecular assembly',
                                                    title: 'Molecular assembly',
                                                },
                                                {
                                                    tag: 'Complex substance of biological origin',
                                                    title: 'Complex substance of biological origin',
                                                },
                                                {
                                                    tag: 'Complex substance of environmental origin',
                                                    title: 'Complex substance of environmental origin',
                                                },
                                                {
                                                    tag: 'Complex substance of chemical origin',
                                                    title: 'Complex substance of chemical origin',
                                                },
                                                {
                                                    tag: 'Complex substance of industrial production origin',
                                                    title: 'Complex substance of industrial production origin',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of the constituent, options are Polymer, Chemical, and defined assembly',
                                            },
                                        },
                                        {
                                            tag: 'concentration',
                                            label: 'concentration',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/value',
                                                    input: 'float',
                                                    minimum: -1.0,
                                                    help: {
                                                        en: 'The numerical value of the concentration, -1 if unknown',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/constituents[]/concentration/unit',
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
                                            ],
                                            help: {
                                                en: 'Concentration of the constituent including its relative concentration related to the collected sample or absolute concentration of the constituent',
                                            },
                                        },
                                    ],
                                },
                            },
                            discriminator: 'type',
                            help: {
                                en: 'List of the constituents, excluding solvent components, that made up the chemical environment (i.e. buffer system, salts, surfactants, crowding agents, serum, etc.)',
                            },
                        },
                        {
                            tag: 'ph',
                            label: 'ph',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/ph',
                            input: [
                                {
                                    tag: 'value',
                                    label: 'value',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/ph/value',
                                    input: 'float',
                                    help: {
                                        en: 'The pH value of the solution',
                                    },
                                },
                                {
                                    tag: 'value_error',
                                    label: 'value_error',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/ph/value_error',
                                    input: 'custom',
                                    component: 'value-error',
                                    help: {
                                        upper_error: {
                                            en: 'The upper error, i.e. the number that should be added the value to get the upper bound. The same unit as the value being described is assumed, if relative errors are given please give it in fractional form (e.g. 0.01 for 1 %',
                                        },
                                        lower_error: {
                                            en: 'The lower error, i.e. the number that should be subtracted from the value to get the lower bound. The same unit as the value being described is assumed, if relative errors are given please give it in fractional form (e.g. 0.01 for 1 %)',
                                        },
                                        is_relative: {
                                            en: 'True if the error values given should be interpreted as relative errors (fractional uncertainty)',
                                        },
                                    },
                                },
                            ],
                            help: {
                                en: 'The pH value of the chemical environment and how the value was determined',
                            },
                        },
                        {
                            tag: 'additional_specifications',
                            label: 'additional_specifications',
                            isArray: true,
                            isRequired: false,
                            mbdbPath: 'general_parameters/chemical_information/chemical_environments[]/additional_specifications[]',
                            minItems: 1,
                            input: 'string',
                            help: {
                                en: 'Additional information about the chemical environment can be specified here (e.g. prepared just prior to conducting the measurement, additional treatments like UV irradiation, specific storage container of chemical environment if that influenced the measurement etc.)',
                            },
                        },
                    ],
                    help: {
                        en: 'Composition of the chemical environment (colloquially known as buffer) which are not being directly used to affect the behavior of the directly measured entities during the measurement',
                    },
                },
                {
                    tag: 'entities_of_interest',
                    label: 'entities_of_interest',
                    isArray: true,
                    isRequired: true,
                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]',
                    minItems: 1,
                    input: {
                        Polymer: {
                            tag: 'Polymer',
                            label: 'Polymer',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]',
                            input: [
                                {
                                    tag: 'polymer_type',
                                    label: 'polymer_type',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/polymer_type',
                                    input: 'options',
                                    choices: [
                                        {
                                            tag: 'cyclic-pseudo-peptide',
                                            title: 'cyclic-pseudo-peptide',
                                        },
                                        {
                                            tag: 'peptide nucleic acid',
                                            title: 'peptide nucleic acid',
                                        },
                                        {
                                            tag: 'polydeoxyribonucleotide',
                                            title: 'polydeoxyribonucleotide',
                                        },
                                        {
                                            tag: 'polydeoxyribonucleotide/polyribonucleotide hybrid',
                                            title: 'polydeoxyribonucleotide/polyribonucleotide hybrid',
                                        },
                                        {
                                            tag: 'polypeptide(D)',
                                            title: 'polypeptide(D)',
                                        },
                                        {
                                            tag: 'polypeptide(L)',
                                            title: 'polypeptide(L)',
                                        },
                                        {
                                            tag: 'polyribonucleotide',
                                            title: 'polyribonucleotide',
                                        },
                                    ],
                                    help: {
                                        en: 'The type of polymer (e.g. polypeptide(L))',
                                    },
                                },
                                {
                                    tag: 'sequence',
                                    label: 'sequence',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/sequence',
                                    input: 'string',
                                    help: {
                                        en: 'Primary sequence of the polymer, using single letter codes (e.g. SAGRELLE, AGTTA). In case of non-natural amino acids or nucleotides, please place the monomer in brackets',
                                    },
                                },
                                {
                                    tag: 'molecular_weight',
                                    label: 'molecular_weight',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/molecular_weight',
                                    input: [
                                        {
                                            tag: 'value',
                                            label: 'value',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/molecular_weight/value',
                                            input: 'float',
                                            help: {
                                                en: 'The numerical value of the molecular weight',
                                            },
                                        },
                                        {
                                            tag: 'unit',
                                            label: 'unit',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/molecular_weight/unit',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'g/mol',
                                                    title: 'g/mol',
                                                },
                                                {
                                                    tag: 'Da',
                                                    title: 'Da',
                                                },
                                                {
                                                    tag: 'kDa',
                                                    title: 'kDa',
                                                },
                                                {
                                                    tag: 'MDa',
                                                    title: 'MDa',
                                                },
                                            ],
                                            help: {
                                                en: 'The unit of the molecular weight',
                                            },
                                        },
                                    ],
                                    help: {
                                        en: 'The molecular weight of the polymer',
                                    },
                                },
                                {
                                    tag: 'external_databases',
                                    label: 'external_databases',
                                    isArray: true,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/external_databases[]',
                                    minItems: 1,
                                    input: 'string',
                                    help: {
                                        en: 'List of identifiers to records in external databases containing information about the polymer can be specified here (e.g UNIPROT:Q8KRF6)',
                                    },
                                },
                                {
                                    tag: 'variant',
                                    label: 'variant',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/variant',
                                    input: 'string',
                                    help: {
                                        en: 'Descriptive name indicating differences of primary sequence of the polymer as compared to the most common form, or wildtype, including mutations, purification tags, etc. (A53T, C-terminal GFP, N-terminal 6xHis-tag)',
                                    },
                                },
                                {
                                    tag: 'source_organism',
                                    label: 'source_organism',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/source_organism',
                                    input: 'vocabulary',
                                    vocabularyType: 'organisms',
                                    vocabularyKeys: [
                                        'id',
                                        'title',
                                        'props.rank',
                                    ],
                                },
                                {
                                    tag: 'modifications',
                                    label: 'modifications',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications',
                                    input: [
                                        {
                                            tag: 'synthesis',
                                            label: 'synthesis',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/synthesis[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'position',
                                                    label: 'position',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/synthesis[]/position',
                                                    input: 'string',
                                                    help: {
                                                        en: 'The position where the modification occurs',
                                                    },
                                                },
                                                {
                                                    tag: 'modification',
                                                    label: 'modification',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/synthesis[]/modification',
                                                    input: 'string',
                                                    help: {
                                                        en: 'The common name/type of the modification',
                                                    },
                                                },
                                                {
                                                    tag: 'protocol',
                                                    label: 'protocol',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/synthesis[]/protocol[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/synthesis[]/protocol[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/synthesis[]/protocol[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'List of steps that led to the modification taking place',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'Modifications (e.g. non-natural amino acids) of the polymer made during synthesis (e.g. translation) of the polymer',
                                            },
                                        },
                                        {
                                            tag: 'biological_postprocessing',
                                            label: 'biological_postprocessing',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/biological_postprocessing[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'position',
                                                    label: 'position',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/biological_postprocessing[]/position',
                                                    input: 'string',
                                                    help: {
                                                        en: 'The position where the modification occurs',
                                                    },
                                                },
                                                {
                                                    tag: 'modification',
                                                    label: 'modification',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/biological_postprocessing[]/modification',
                                                    input: 'string',
                                                    help: {
                                                        en: 'The common name/type of the modification',
                                                    },
                                                },
                                                {
                                                    tag: 'protocol',
                                                    label: 'protocol',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/biological_postprocessing[]/protocol[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/biological_postprocessing[]/protocol[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/biological_postprocessing[]/protocol[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'List of steps that led to the modification taking place',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'Modifications of the polymer made after synthesis (e.g. posttranslational modifications, DNA methylation) by the organism where synthesis occurred (e.g. glycosylation)',
                                            },
                                        },
                                        {
                                            tag: 'chemical',
                                            label: 'chemical',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/chemical[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'position',
                                                    label: 'position',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/chemical[]/position',
                                                    input: 'string',
                                                    help: {
                                                        en: 'The position where the modification occurs',
                                                    },
                                                },
                                                {
                                                    tag: 'modification',
                                                    label: 'modification',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/chemical[]/modification',
                                                    input: 'string',
                                                    help: {
                                                        en: 'The common name/type of the modification',
                                                    },
                                                },
                                                {
                                                    tag: 'protocol',
                                                    label: 'protocol',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/chemical[]/protocol[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/chemical[]/protocol[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/modifications/chemical[]/protocol[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'List of steps that led to the modification taking place',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'Modifications of the polymer introduced by chemical, biochemical, or physical means in vitro (e.g. lysine methylation, cysteine iodoacetamide labeling, deglycosylation, covalent fluorescent labeling)',
                                            },
                                        },
                                    ],
                                    help: {
                                        en: 'If the polymer contains modifications such as non-natural aminoacids, post translational modification, or chemically modifications like labeling, it can be specified here',
                                    },
                                },
                                {
                                    tag: 'expression_source_type',
                                    label: 'expression_source_type',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/expression_source_type',
                                    input: 'options',
                                    choices: [
                                        {
                                            tag: 'Natively',
                                            title: 'Natively',
                                        },
                                        {
                                            tag: 'Recombinantly',
                                            title: 'Recombinantly',
                                        },
                                        {
                                            tag: 'Synthetically',
                                            title: 'Synthetically',
                                        },
                                    ],
                                    help: {
                                        en: 'How the polymer was produced',
                                    },
                                },
                                {
                                    tag: 'expression_organism',
                                    label: 'expression_organism',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/expression_organism',
                                    input: 'vocabulary',
                                    vocabularyType: 'organisms',
                                    vocabularyKeys: [
                                        'id',
                                        'title',
                                        'props.rank',
                                    ],
                                },
                                {
                                    tag: 'additional_specifications',
                                    label: 'additional_specifications',
                                    isArray: true,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/additional_specifications[]',
                                    minItems: 1,
                                    input: 'string',
                                    help: {
                                        en: 'Additional information about the polymer can be specified here',
                                    },
                                },
                                {
                                    tag: 'id',
                                    label: 'id',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/id',
                                    input: 'referenceable-id',
                                    referenceAs: 'entity',
                                },
                                {
                                    tag: 'name',
                                    label: 'name',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/name',
                                    input: 'string',
                                    help: {
                                        en: 'Short descriptive name (id) of the entity; must be unique within a record (e.g. Lysozyme, Serum from Patient 1). This name is referenced in the measurement description to identify the entities present in measured sample',
                                    },
                                },
                                {
                                    tag: 'type',
                                    label: 'type',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/type',
                                    input: 'variant-discriminator',
                                    choices: [
                                        {
                                            tag: 'Polymer',
                                            title: 'Polymer',
                                        },
                                        {
                                            tag: 'Chemical',
                                            title: 'Chemical',
                                        },
                                        {
                                            tag: 'Molecular assembly',
                                            title: 'Molecular assembly',
                                        },
                                        {
                                            tag: 'Complex substance of biological origin',
                                            title: 'Complex substance of biological origin',
                                        },
                                        {
                                            tag: 'Complex substance of environmental origin',
                                            title: 'Complex substance of environmental origin',
                                        },
                                        {
                                            tag: 'Complex substance of chemical origin',
                                            title: 'Complex substance of chemical origin',
                                        },
                                        {
                                            tag: 'Complex substance of industrial production origin',
                                            title: 'Complex substance of industrial production origin',
                                        },
                                    ],
                                    help: {
                                        en: 'The type of the entity, where the options are (biological) Polymer, Chemical, Molecular assembly (also includes all proteins composed of more than one polypeptide chain) or Complex substance. Chemical polymers such as PEG 5000 should be described as being a Chemical. Complex substance refers to substances which are not exactly specified by their exact chemical composition by the time measurement were performed, but e.g. blood, serum, plant extract',
                                    },
                                },
                            ],
                        },
                        Chemical: {
                            tag: 'Chemical',
                            label: 'Chemical',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]',
                            input: [
                                {
                                    tag: 'inchikey',
                                    label: 'inchikey',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/inchikey',
                                    input: 'string',
                                    help: {
                                        en: 'InChIKey identifier of the chemical. In case of chemical polymers please specify the InChIKey of the monomer and specify the specific type in the additional identifiers field (e.g. if PEG 3350 was employed, the InChiKey of ethylene glycol, i.e. LYCAIKOWRPUZTN-UHFFFAOYSA-N should be specified here)',
                                    },
                                },
                                {
                                    tag: 'additional_identifiers',
                                    label: 'additional_identifiers',
                                    isArray: true,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/additional_identifiers[]',
                                    minItems: 1,
                                    input: 'string',
                                    help: {
                                        en: 'Unique and persistent identifier from an external source; options of sources are CAS number, Pubchem Compound ID, and Pubchem Substance ID',
                                    },
                                },
                                {
                                    tag: 'isotopic_labeling',
                                    label: 'isotopic_labeling',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/isotopic_labeling',
                                    input: 'string',
                                    help: {
                                        en: 'If the isotopic composition of the chemical was altered from the naturally occurring abundances, it can be specified here (e.g. 15N, 13C)',
                                    },
                                },
                                {
                                    tag: 'molecular_weight',
                                    label: 'molecular_weight',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/molecular_weight',
                                    input: [
                                        {
                                            tag: 'value',
                                            label: 'value',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/molecular_weight/value',
                                            input: 'float',
                                            help: {
                                                en: 'The numerical value of the molecular weight',
                                            },
                                        },
                                        {
                                            tag: 'unit',
                                            label: 'unit',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/molecular_weight/unit',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'g/mol',
                                                    title: 'g/mol',
                                                },
                                                {
                                                    tag: 'Da',
                                                    title: 'Da',
                                                },
                                                {
                                                    tag: 'kDa',
                                                    title: 'kDa',
                                                },
                                                {
                                                    tag: 'MDa',
                                                    title: 'MDa',
                                                },
                                            ],
                                            help: {
                                                en: 'The unit of the molecular weight',
                                            },
                                        },
                                    ],
                                    help: {
                                        en: 'The molecular weight of the polymer',
                                    },
                                },
                                {
                                    tag: 'additional_specifications',
                                    label: 'additional_specifications',
                                    isArray: true,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/additional_specifications[]',
                                    minItems: 1,
                                    input: 'string',
                                    help: {
                                        en: 'Additional information about the chemical can be specified here (e.g. RNase free water, recrystallization, desalting)',
                                    },
                                },
                                {
                                    tag: 'id',
                                    label: 'id',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/id',
                                    input: 'referenceable-id',
                                    referenceAs: 'entity',
                                },
                                {
                                    tag: 'name',
                                    label: 'name',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/name',
                                    input: 'string',
                                    help: {
                                        en: 'Short descriptive name (id) of the entity; must be unique within a record (e.g. Lysozyme, Serum from Patient 1). This name is referenced in the measurement description to identify the entities present in measured sample',
                                    },
                                },
                                {
                                    tag: 'type',
                                    label: 'type',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/type',
                                    input: 'variant-discriminator',
                                    choices: [
                                        {
                                            tag: 'Polymer',
                                            title: 'Polymer',
                                        },
                                        {
                                            tag: 'Chemical',
                                            title: 'Chemical',
                                        },
                                        {
                                            tag: 'Molecular assembly',
                                            title: 'Molecular assembly',
                                        },
                                        {
                                            tag: 'Complex substance of biological origin',
                                            title: 'Complex substance of biological origin',
                                        },
                                        {
                                            tag: 'Complex substance of environmental origin',
                                            title: 'Complex substance of environmental origin',
                                        },
                                        {
                                            tag: 'Complex substance of chemical origin',
                                            title: 'Complex substance of chemical origin',
                                        },
                                        {
                                            tag: 'Complex substance of industrial production origin',
                                            title: 'Complex substance of industrial production origin',
                                        },
                                    ],
                                    help: {
                                        en: 'The type of the entity, where the options are (biological) Polymer, Chemical, Molecular assembly (also includes all proteins composed of more than one polypeptide chain) or Complex substance. Chemical polymers such as PEG 5000 should be described as being a Chemical. Complex substance refers to substances which are not exactly specified by their exact chemical composition by the time measurement were performed, but e.g. blood, serum, plant extract',
                                    },
                                },
                            ],
                        },
                        'Molecular assembly': {
                            tag: 'Molecular assembly',
                            label: 'Molecular assembly',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]',
                            input: [
                                {
                                    tag: 'external_databases',
                                    label: 'external_databases',
                                    isArray: true,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/external_databases[]',
                                    minItems: 1,
                                    input: 'string',
                                    help: {
                                        en: 'List of identifiers to records in external databases containing information about the molecular assembly as a whole can be specified here (e.g. PDB:1YQ2 ); information about the individual components should be specified in the details of the individual components',
                                    },
                                },
                                {
                                    tag: 'components',
                                    label: 'components',
                                    isArray: true,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]',
                                    minItems: 1,
                                    input: {
                                        Polymer: {
                                            tag: 'Polymer',
                                            label: 'Polymer',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]',
                                            input: [
                                                {
                                                    tag: 'polymer_type',
                                                    label: 'polymer_type',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/polymer_type',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'cyclic-pseudo-peptide',
                                                            title: 'cyclic-pseudo-peptide',
                                                        },
                                                        {
                                                            tag: 'peptide nucleic acid',
                                                            title: 'peptide nucleic acid',
                                                        },
                                                        {
                                                            tag: 'polydeoxyribonucleotide',
                                                            title: 'polydeoxyribonucleotide',
                                                        },
                                                        {
                                                            tag: 'polydeoxyribonucleotide/polyribonucleotide hybrid',
                                                            title: 'polydeoxyribonucleotide/polyribonucleotide hybrid',
                                                        },
                                                        {
                                                            tag: 'polypeptide(D)',
                                                            title: 'polypeptide(D)',
                                                        },
                                                        {
                                                            tag: 'polypeptide(L)',
                                                            title: 'polypeptide(L)',
                                                        },
                                                        {
                                                            tag: 'polyribonucleotide',
                                                            title: 'polyribonucleotide',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The type of polymer (e.g. polypeptide(L))',
                                                    },
                                                },
                                                {
                                                    tag: 'sequence',
                                                    label: 'sequence',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/sequence',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Primary sequence of the polymer, using single letter codes (e.g. SAGRELLE, AGTTA). In case of non-natural amino acids or nucleotides, please place the monomer in brackets',
                                                    },
                                                },
                                                {
                                                    tag: 'molecular_weight',
                                                    label: 'molecular_weight',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/molecular_weight',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/molecular_weight/value',
                                                            input: 'float',
                                                            help: {
                                                                en: 'The numerical value of the molecular weight',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/molecular_weight/unit',
                                                            input: 'options',
                                                            choices: [
                                                                {
                                                                    tag: 'g/mol',
                                                                    title: 'g/mol',
                                                                },
                                                                {
                                                                    tag: 'Da',
                                                                    title: 'Da',
                                                                },
                                                                {
                                                                    tag: 'kDa',
                                                                    title: 'kDa',
                                                                },
                                                                {
                                                                    tag: 'MDa',
                                                                    title: 'MDa',
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The unit of the molecular weight',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The molecular weight of the polymer',
                                                    },
                                                },
                                                {
                                                    tag: 'external_databases',
                                                    label: 'external_databases',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/external_databases[]',
                                                    minItems: 1,
                                                    input: 'string',
                                                    help: {
                                                        en: 'List of identifiers to records in external databases containing information about the polymer can be specified here (e.g UNIPROT:Q8KRF6)',
                                                    },
                                                },
                                                {
                                                    tag: 'variant',
                                                    label: 'variant',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/variant',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Descriptive name indicating differences of primary sequence of the polymer as compared to the most common form, or wildtype, including mutations, purification tags, etc. (A53T, C-terminal GFP, N-terminal 6xHis-tag)',
                                                    },
                                                },
                                                {
                                                    tag: 'source_organism',
                                                    label: 'source_organism',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/source_organism',
                                                    input: 'vocabulary',
                                                    vocabularyType: 'organisms',
                                                    vocabularyKeys: [
                                                        'id',
                                                        'title',
                                                        'props.rank',
                                                    ],
                                                },
                                                {
                                                    tag: 'modifications',
                                                    label: 'modifications',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications',
                                                    input: [
                                                        {
                                                            tag: 'synthesis',
                                                            label: 'synthesis',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/synthesis[]',
                                                            minItems: 1,
                                                            input: [
                                                                {
                                                                    tag: 'position',
                                                                    label: 'position',
                                                                    isArray: false,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/synthesis[]/position',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'The position where the modification occurs',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'modification',
                                                                    label: 'modification',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/synthesis[]/modification',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'The common name/type of the modification',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'protocol',
                                                                    label: 'protocol',
                                                                    isArray: true,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/synthesis[]/protocol[]',
                                                                    minItems: 1,
                                                                    input: [
                                                                        {
                                                                            tag: 'name',
                                                                            label: 'name',
                                                                            isArray: false,
                                                                            isRequired: true,
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/synthesis[]/protocol[]/name',
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
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/synthesis[]/protocol[]/description',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'Short description of the step',
                                                                            },
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'List of steps that led to the modification taking place',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'Modifications (e.g. non-natural amino acids) of the polymer made during synthesis (e.g. translation) of the polymer',
                                                            },
                                                        },
                                                        {
                                                            tag: 'biological_postprocessing',
                                                            label: 'biological_postprocessing',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/biological_postprocessing[]',
                                                            minItems: 1,
                                                            input: [
                                                                {
                                                                    tag: 'position',
                                                                    label: 'position',
                                                                    isArray: false,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/biological_postprocessing[]/position',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'The position where the modification occurs',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'modification',
                                                                    label: 'modification',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/biological_postprocessing[]/modification',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'The common name/type of the modification',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'protocol',
                                                                    label: 'protocol',
                                                                    isArray: true,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/biological_postprocessing[]/protocol[]',
                                                                    minItems: 1,
                                                                    input: [
                                                                        {
                                                                            tag: 'name',
                                                                            label: 'name',
                                                                            isArray: false,
                                                                            isRequired: true,
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/biological_postprocessing[]/protocol[]/name',
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
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/biological_postprocessing[]/protocol[]/description',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'Short description of the step',
                                                                            },
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'List of steps that led to the modification taking place',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'Modifications of the polymer made after synthesis (e.g. posttranslational modifications, DNA methylation) by the organism where synthesis occurred (e.g. glycosylation)',
                                                            },
                                                        },
                                                        {
                                                            tag: 'chemical',
                                                            label: 'chemical',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/chemical[]',
                                                            minItems: 1,
                                                            input: [
                                                                {
                                                                    tag: 'position',
                                                                    label: 'position',
                                                                    isArray: false,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/chemical[]/position',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'The position where the modification occurs',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'modification',
                                                                    label: 'modification',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/chemical[]/modification',
                                                                    input: 'string',
                                                                    help: {
                                                                        en: 'The common name/type of the modification',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'protocol',
                                                                    label: 'protocol',
                                                                    isArray: true,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/chemical[]/protocol[]',
                                                                    minItems: 1,
                                                                    input: [
                                                                        {
                                                                            tag: 'name',
                                                                            label: 'name',
                                                                            isArray: false,
                                                                            isRequired: true,
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/chemical[]/protocol[]/name',
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
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/modifications/chemical[]/protocol[]/description',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'Short description of the step',
                                                                            },
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'List of steps that led to the modification taking place',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'Modifications of the polymer introduced by chemical, biochemical, or physical means in vitro (e.g. lysine methylation, cysteine iodoacetamide labeling, deglycosylation, covalent fluorescent labeling)',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'If the polymer contains modifications such as non-natural aminoacids, post translational modification, or chemically modifications like labeling, it can be specified here',
                                                    },
                                                },
                                                {
                                                    tag: 'expression_source_type',
                                                    label: 'expression_source_type',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/expression_source_type',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'Natively',
                                                            title: 'Natively',
                                                        },
                                                        {
                                                            tag: 'Recombinantly',
                                                            title: 'Recombinantly',
                                                        },
                                                        {
                                                            tag: 'Synthetically',
                                                            title: 'Synthetically',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'How the polymer was produced',
                                                    },
                                                },
                                                {
                                                    tag: 'expression_organism',
                                                    label: 'expression_organism',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/expression_organism',
                                                    input: 'vocabulary',
                                                    vocabularyType: 'organisms',
                                                    vocabularyKeys: [
                                                        'id',
                                                        'title',
                                                        'props.rank',
                                                    ],
                                                },
                                                {
                                                    tag: 'additional_specifications',
                                                    label: 'additional_specifications',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/additional_specifications[]',
                                                    minItems: 1,
                                                    input: 'string',
                                                    help: {
                                                        en: 'Additional information about the polymer can be specified here',
                                                    },
                                                },
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/name',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short descriptive name (id) given to the assembly component. The name must be unique within a record',
                                                    },
                                                },
                                                {
                                                    tag: 'type',
                                                    label: 'type',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/type',
                                                    input: 'variant-discriminator',
                                                    choices: [
                                                        {
                                                            tag: 'Polymer',
                                                            title: 'Polymer',
                                                        },
                                                        {
                                                            tag: 'Chemical',
                                                            title: 'Chemical',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The type of component, options are (biological) Polymer and Chemical',
                                                    },
                                                },
                                                {
                                                    tag: 'copy_number',
                                                    label: 'copy_number',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/copy_number',
                                                    input: 'float',
                                                    minimum: -1.0,
                                                    help: {
                                                        en: 'Number of molecules of the component within the assembly, -1 if unknown',
                                                    },
                                                },
                                            ],
                                        },
                                        Chemical: {
                                            tag: 'Chemical',
                                            label: 'Chemical',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]',
                                            input: [
                                                {
                                                    tag: 'inchikey',
                                                    label: 'inchikey',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/inchikey',
                                                    input: 'string',
                                                    help: {
                                                        en: 'InChIKey identifier of the chemical. In case of chemical polymers please specify the InChIKey of the monomer and specify the specific type in the additional identifiers field (e.g. if PEG 3350 was employed, the InChiKey of ethylene glycol, i.e. LYCAIKOWRPUZTN-UHFFFAOYSA-N should be specified here)',
                                                    },
                                                },
                                                {
                                                    tag: 'additional_identifiers',
                                                    label: 'additional_identifiers',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/additional_identifiers[]',
                                                    minItems: 1,
                                                    input: 'string',
                                                    help: {
                                                        en: 'Unique and persistent identifier from an external source; options of sources are CAS number, Pubchem Compound ID, and Pubchem Substance ID',
                                                    },
                                                },
                                                {
                                                    tag: 'isotopic_labeling',
                                                    label: 'isotopic_labeling',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/isotopic_labeling',
                                                    input: 'string',
                                                    help: {
                                                        en: 'If the isotopic composition of the chemical was altered from the naturally occurring abundances, it can be specified here (e.g. 15N, 13C)',
                                                    },
                                                },
                                                {
                                                    tag: 'molecular_weight',
                                                    label: 'molecular_weight',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/molecular_weight',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/molecular_weight/value',
                                                            input: 'float',
                                                            help: {
                                                                en: 'The numerical value of the molecular weight',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/molecular_weight/unit',
                                                            input: 'options',
                                                            choices: [
                                                                {
                                                                    tag: 'g/mol',
                                                                    title: 'g/mol',
                                                                },
                                                                {
                                                                    tag: 'Da',
                                                                    title: 'Da',
                                                                },
                                                                {
                                                                    tag: 'kDa',
                                                                    title: 'kDa',
                                                                },
                                                                {
                                                                    tag: 'MDa',
                                                                    title: 'MDa',
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The unit of the molecular weight',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The molecular weight of the polymer',
                                                    },
                                                },
                                                {
                                                    tag: 'additional_specifications',
                                                    label: 'additional_specifications',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/additional_specifications[]',
                                                    minItems: 1,
                                                    input: 'string',
                                                    help: {
                                                        en: 'Additional information about the chemical can be specified here (e.g. RNase free water, recrystallization, desalting)',
                                                    },
                                                },
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/name',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short descriptive name (id) given to the assembly component. The name must be unique within a record',
                                                    },
                                                },
                                                {
                                                    tag: 'type',
                                                    label: 'type',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/type',
                                                    input: 'variant-discriminator',
                                                    choices: [
                                                        {
                                                            tag: 'Polymer',
                                                            title: 'Polymer',
                                                        },
                                                        {
                                                            tag: 'Chemical',
                                                            title: 'Chemical',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The type of component, options are (biological) Polymer and Chemical',
                                                    },
                                                },
                                                {
                                                    tag: 'copy_number',
                                                    label: 'copy_number',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/components[]/copy_number',
                                                    input: 'float',
                                                    minimum: -1.0,
                                                    help: {
                                                        en: 'Number of molecules of the component within the assembly, -1 if unknown',
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                    discriminator: 'type',
                                    help: {
                                        en: 'Description of the individual components (e.g. polypeptide, heme, lipids, metal ions etc.) the molecular assembly is composed of (e.g. Hemoglobin alpha) and how many copies of each component were present',
                                    },
                                },
                                {
                                    tag: 'molecular_weight',
                                    label: 'molecular_weight',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/molecular_weight',
                                    input: [
                                        {
                                            tag: 'value',
                                            label: 'value',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/molecular_weight/value',
                                            input: 'float',
                                            help: {
                                                en: 'The numerical value of the molecular weight',
                                            },
                                        },
                                        {
                                            tag: 'unit',
                                            label: 'unit',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/molecular_weight/unit',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'g/mol',
                                                    title: 'g/mol',
                                                },
                                                {
                                                    tag: 'Da',
                                                    title: 'Da',
                                                },
                                                {
                                                    tag: 'kDa',
                                                    title: 'kDa',
                                                },
                                                {
                                                    tag: 'MDa',
                                                    title: 'MDa',
                                                },
                                            ],
                                            help: {
                                                en: 'The unit of the molecular weight',
                                            },
                                        },
                                    ],
                                    help: {
                                        en: 'The molecular weight of the molecular assembly',
                                    },
                                },
                                {
                                    tag: 'chemical_modifications',
                                    label: 'chemical_modifications',
                                    isArray: true,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/chemical_modifications[]',
                                    minItems: 1,
                                    input: [
                                        {
                                            tag: 'position',
                                            label: 'position',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/chemical_modifications[]/position',
                                            input: 'string',
                                            help: {
                                                en: 'The position where the modification occurs',
                                            },
                                        },
                                        {
                                            tag: 'modification',
                                            label: 'modification',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/chemical_modifications[]/modification',
                                            input: 'string',
                                            help: {
                                                en: 'The common name/type of the modification',
                                            },
                                        },
                                        {
                                            tag: 'protocol',
                                            label: 'protocol',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/chemical_modifications[]/protocol[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/chemical_modifications[]/protocol[]/name',
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
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/chemical_modifications[]/protocol[]/description',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short description of the step',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'List of steps that led to the modification taking place',
                                            },
                                        },
                                    ],
                                    help: {
                                        en: 'List describing deliberate modifications made to the molecular assembly through chemical, biochemical, or physical means',
                                    },
                                },
                                {
                                    tag: 'additional_specifications',
                                    label: 'additional_specifications',
                                    isArray: true,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/additional_specifications[]',
                                    minItems: 1,
                                    input: 'string',
                                    help: {
                                        en: 'Additional information about the macromolecular assembly can be specified here',
                                    },
                                },
                                {
                                    tag: 'id',
                                    label: 'id',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/id',
                                    input: 'referenceable-id',
                                    referenceAs: 'entity',
                                },
                                {
                                    tag: 'name',
                                    label: 'name',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/name',
                                    input: 'string',
                                    help: {
                                        en: 'Short descriptive name (id) of the entity; must be unique within a record (e.g. Lysozyme, Serum from Patient 1). This name is referenced in the measurement description to identify the entities present in measured sample',
                                    },
                                },
                                {
                                    tag: 'type',
                                    label: 'type',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/type',
                                    input: 'variant-discriminator',
                                    choices: [
                                        {
                                            tag: 'Polymer',
                                            title: 'Polymer',
                                        },
                                        {
                                            tag: 'Chemical',
                                            title: 'Chemical',
                                        },
                                        {
                                            tag: 'Molecular assembly',
                                            title: 'Molecular assembly',
                                        },
                                        {
                                            tag: 'Complex substance of biological origin',
                                            title: 'Complex substance of biological origin',
                                        },
                                        {
                                            tag: 'Complex substance of environmental origin',
                                            title: 'Complex substance of environmental origin',
                                        },
                                        {
                                            tag: 'Complex substance of chemical origin',
                                            title: 'Complex substance of chemical origin',
                                        },
                                        {
                                            tag: 'Complex substance of industrial production origin',
                                            title: 'Complex substance of industrial production origin',
                                        },
                                    ],
                                    help: {
                                        en: 'The type of the entity, where the options are (biological) Polymer, Chemical, Molecular assembly (also includes all proteins composed of more than one polypeptide chain) or Complex substance. Chemical polymers such as PEG 5000 should be described as being a Chemical. Complex substance refers to substances which are not exactly specified by their exact chemical composition by the time measurement were performed, but e.g. blood, serum, plant extract',
                                    },
                                },
                            ],
                        },
                        'Complex substance of biological origin': {
                            tag: 'Complex substance of biological origin',
                            label: 'Complex substance of biological origin',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]',
                            input: {
                                'Body fluid': {
                                    tag: 'Body fluid',
                                    label: 'Body fluid',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]',
                                    input: [
                                        {
                                            tag: 'fluid',
                                            label: 'fluid',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/fluid',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'Blood',
                                                    title: 'Blood',
                                                },
                                                {
                                                    tag: 'Fecal matter',
                                                    title: 'Fecal matter',
                                                },
                                                {
                                                    tag: 'Milk',
                                                    title: 'Milk',
                                                },
                                                {
                                                    tag: 'Plasma',
                                                    title: 'Plasma',
                                                },
                                                {
                                                    tag: 'Saliva',
                                                    title: 'Saliva',
                                                },
                                                {
                                                    tag: 'Serum',
                                                    title: 'Serum',
                                                },
                                                {
                                                    tag: 'Urine',
                                                    title: 'Urine',
                                                },
                                                {
                                                    tag: 'Plant extract',
                                                    title: 'Plant extract',
                                                },
                                            ],
                                            help: {
                                                en: 'The body fluid the complex substance is derived from',
                                            },
                                        },
                                        {
                                            tag: 'health_status',
                                            label: 'health_status',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/health_status',
                                            input: 'string',
                                            help: {
                                                en: 'Health status of the donor organism where the body fluid was derived from (e.g. healthy, sick, patient with Diabetes type 2)',
                                            },
                                        },
                                        {
                                            tag: 'derived_from',
                                            label: 'derived_from',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/derived_from',
                                            input: 'variant-discriminator',
                                            choices: [
                                                {
                                                    tag: 'Body fluid',
                                                    title: 'Body fluid',
                                                },
                                                {
                                                    tag: 'Cell fraction',
                                                    title: 'Cell fraction',
                                                },
                                                {
                                                    tag: 'Virion',
                                                    title: 'Virion',
                                                },
                                            ],
                                            help: {
                                                en: 'The biological substance the complex substance is derived from',
                                            },
                                        },
                                        {
                                            tag: 'source_organism',
                                            label: 'source_organism',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/source_organism',
                                            input: 'vocabulary',
                                            vocabularyType: 'organisms',
                                            vocabularyKeys: [
                                                'id',
                                                'title',
                                                'props.rank',
                                            ],
                                        },
                                        {
                                            tag: 'preparation_protocol',
                                            label: 'preparation_protocol',
                                            isArray: true,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]/name',
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
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]/description',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short description of the step',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'List of the steps performed during the preparation of the complex substance',
                                            },
                                        },
                                        {
                                            tag: 'storage',
                                            label: 'storage',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage',
                                            input: [
                                                {
                                                    tag: 'temperature',
                                                    label: 'temperature',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature/value',
                                                            input: 'float',
                                                            help: {
                                                                en: 'The numeric value of the temperature',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature/unit',
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
                                                    ],
                                                    help: {
                                                        en: 'The temperature the sample was stored at',
                                                    },
                                                },
                                                {
                                                    tag: 'duration',
                                                    label: 'duration',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration/value',
                                                            input: 'float',
                                                            minimum: 0.0,
                                                            help: {
                                                                en: 'The numerical value of the time point or duration',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration/unit',
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
                                                        en: 'Length of time the sample was stored before being measured',
                                                    },
                                                },
                                                {
                                                    tag: 'storage_preparation',
                                                    label: 'storage_preparation',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The specific steps that were taken to prepare the samples for storage (e.g. flash freezing in liquid nitrogen), if applicable',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'Information about how the complex substance was stored between being acquired and measured, including temperature and duration',
                                            },
                                        },
                                        {
                                            tag: 'additional_specifications',
                                            label: 'additional_specifications',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/additional_specifications[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'Additional information about the complex substance can be specified here',
                                            },
                                        },
                                        {
                                            tag: 'id',
                                            label: 'id',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/id',
                                            input: 'referenceable-id',
                                            referenceAs: 'entity',
                                        },
                                        {
                                            tag: 'name',
                                            label: 'name',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/name',
                                            input: 'string',
                                            help: {
                                                en: 'Short descriptive name (id) of the entity; must be unique within a record (e.g. Lysozyme, Serum from Patient 1). This name is referenced in the measurement description to identify the entities present in measured sample',
                                            },
                                        },
                                        {
                                            tag: 'type',
                                            label: 'type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/type',
                                            input: 'variant-discriminator',
                                            choices: [
                                                {
                                                    tag: 'Polymer',
                                                    title: 'Polymer',
                                                },
                                                {
                                                    tag: 'Chemical',
                                                    title: 'Chemical',
                                                },
                                                {
                                                    tag: 'Molecular assembly',
                                                    title: 'Molecular assembly',
                                                },
                                                {
                                                    tag: 'Complex substance of biological origin',
                                                    title: 'Complex substance of biological origin',
                                                },
                                                {
                                                    tag: 'Complex substance of environmental origin',
                                                    title: 'Complex substance of environmental origin',
                                                },
                                                {
                                                    tag: 'Complex substance of chemical origin',
                                                    title: 'Complex substance of chemical origin',
                                                },
                                                {
                                                    tag: 'Complex substance of industrial production origin',
                                                    title: 'Complex substance of industrial production origin',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of the entity, where the options are (biological) Polymer, Chemical, Molecular assembly (also includes all proteins composed of more than one polypeptide chain) or Complex substance. Chemical polymers such as PEG 5000 should be described as being a Chemical. Complex substance refers to substances which are not exactly specified by their exact chemical composition by the time measurement were performed, but e.g. blood, serum, plant extract',
                                            },
                                        },
                                    ],
                                },
                                'Cell fraction': {
                                    tag: 'Cell fraction',
                                    label: 'Cell fraction',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]',
                                    input: [
                                        {
                                            tag: 'fraction',
                                            label: 'fraction',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/fraction',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'Ribosome',
                                                    title: 'Ribosome',
                                                },
                                                {
                                                    tag: 'Cell wall',
                                                    title: 'Cell wall',
                                                },
                                                {
                                                    tag: 'VesicleCell lysate/Cytoplasm',
                                                    title: 'VesicleCell lysate/Cytoplasm',
                                                },
                                                {
                                                    tag: 'Cell Membrane',
                                                    title: 'Cell Membrane',
                                                },
                                                {
                                                    tag: 'Extracellular matrix',
                                                    title: 'Extracellular matrix',
                                                },
                                                {
                                                    tag: 'Lysosome',
                                                    title: 'Lysosome',
                                                },
                                                {
                                                    tag: 'Golgi Apparatus',
                                                    title: 'Golgi Apparatus',
                                                },
                                                {
                                                    tag: 'Mitochondrion',
                                                    title: 'Mitochondrion',
                                                },
                                                {
                                                    tag: 'Nucleus',
                                                    title: 'Nucleus',
                                                },
                                                {
                                                    tag: 'Rough Endoplasmic Reticulum',
                                                    title: 'Rough Endoplasmic Reticulum',
                                                },
                                                {
                                                    tag: 'Smooth Endoplasmic Reticulum',
                                                    title: 'Smooth Endoplasmic Reticulum',
                                                },
                                                {
                                                    tag: 'Vacuole',
                                                    title: 'Vacuole',
                                                },
                                                {
                                                    tag: 'Chloroplast',
                                                    title: 'Chloroplast',
                                                },
                                            ],
                                            help: {
                                                en: 'The subcelluar component e.g. (Ribosome)',
                                            },
                                        },
                                        {
                                            tag: 'organ',
                                            label: 'organ',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/organ',
                                            input: 'string',
                                            help: {
                                                en: 'The organ the cell fraction was derived from (e.g. heart)',
                                            },
                                        },
                                        {
                                            tag: 'tissue',
                                            label: 'tissue',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/tissue',
                                            input: 'string',
                                            help: {
                                                en: 'The tissue type the cell fraction was derived from',
                                            },
                                        },
                                        {
                                            tag: 'cell_type',
                                            label: 'cell_type',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/cell_type',
                                            input: 'string',
                                            help: {
                                                en: 'The cell type the cell fraction was derived from',
                                            },
                                        },
                                        {
                                            tag: 'health_status',
                                            label: 'health_status',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/health_status',
                                            input: 'string',
                                            help: {
                                                en: 'Health status of the donor organism where the cell fraction was derived from (e.g. healthy, sick, patient with Diabetes type 2)',
                                            },
                                        },
                                        {
                                            tag: 'derived_from',
                                            label: 'derived_from',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/derived_from',
                                            input: 'variant-discriminator',
                                            choices: [
                                                {
                                                    tag: 'Body fluid',
                                                    title: 'Body fluid',
                                                },
                                                {
                                                    tag: 'Cell fraction',
                                                    title: 'Cell fraction',
                                                },
                                                {
                                                    tag: 'Virion',
                                                    title: 'Virion',
                                                },
                                            ],
                                            help: {
                                                en: 'The biological substance the complex substance is derived from',
                                            },
                                        },
                                        {
                                            tag: 'source_organism',
                                            label: 'source_organism',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/source_organism',
                                            input: 'vocabulary',
                                            vocabularyType: 'organisms',
                                            vocabularyKeys: [
                                                'id',
                                                'title',
                                                'props.rank',
                                            ],
                                        },
                                        {
                                            tag: 'preparation_protocol',
                                            label: 'preparation_protocol',
                                            isArray: true,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]/name',
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
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]/description',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short description of the step',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'List of the steps performed during the preparation of the complex substance',
                                            },
                                        },
                                        {
                                            tag: 'storage',
                                            label: 'storage',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage',
                                            input: [
                                                {
                                                    tag: 'temperature',
                                                    label: 'temperature',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature/value',
                                                            input: 'float',
                                                            help: {
                                                                en: 'The numeric value of the temperature',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature/unit',
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
                                                    ],
                                                    help: {
                                                        en: 'The temperature the sample was stored at',
                                                    },
                                                },
                                                {
                                                    tag: 'duration',
                                                    label: 'duration',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration/value',
                                                            input: 'float',
                                                            minimum: 0.0,
                                                            help: {
                                                                en: 'The numerical value of the time point or duration',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration/unit',
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
                                                        en: 'Length of time the sample was stored before being measured',
                                                    },
                                                },
                                                {
                                                    tag: 'storage_preparation',
                                                    label: 'storage_preparation',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The specific steps that were taken to prepare the samples for storage (e.g. flash freezing in liquid nitrogen), if applicable',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'Information about how the complex substance was stored between being acquired and measured, including temperature and duration',
                                            },
                                        },
                                        {
                                            tag: 'additional_specifications',
                                            label: 'additional_specifications',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/additional_specifications[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'Additional information about the complex substance can be specified here',
                                            },
                                        },
                                        {
                                            tag: 'id',
                                            label: 'id',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/id',
                                            input: 'referenceable-id',
                                            referenceAs: 'entity',
                                        },
                                        {
                                            tag: 'name',
                                            label: 'name',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/name',
                                            input: 'string',
                                            help: {
                                                en: 'Short descriptive name (id) of the entity; must be unique within a record (e.g. Lysozyme, Serum from Patient 1). This name is referenced in the measurement description to identify the entities present in measured sample',
                                            },
                                        },
                                        {
                                            tag: 'type',
                                            label: 'type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/type',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'Polymer',
                                                    title: 'Polymer',
                                                },
                                                {
                                                    tag: 'Chemical',
                                                    title: 'Chemical',
                                                },
                                                {
                                                    tag: 'Molecular assembly',
                                                    title: 'Molecular assembly',
                                                },
                                                {
                                                    tag: 'Complex substance of biological origin',
                                                    title: 'Complex substance of biological origin',
                                                },
                                                {
                                                    tag: 'Complex substance of environmental origin',
                                                    title: 'Complex substance of environmental origin',
                                                },
                                                {
                                                    tag: 'Complex substance of chemical origin',
                                                    title: 'Complex substance of chemical origin',
                                                },
                                                {
                                                    tag: 'Complex substance of industrial production origin',
                                                    title: 'Complex substance of industrial production origin',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of the entity, where the options are (biological) Polymer, Chemical, Molecular assembly (also includes all proteins composed of more than one polypeptide chain) or Complex substance. Chemical polymers such as PEG 5000 should be described as being a Chemical. Complex substance refers to substances which are not exactly specified by their exact chemical composition by the time measurement were performed, but e.g. blood, serum, plant extract',
                                            },
                                        },
                                    ],
                                },
                                Virion: {
                                    tag: 'Virion',
                                    label: 'Virion',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]',
                                    input: [
                                        {
                                            tag: 'genetic_material',
                                            label: 'genetic_material',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/genetic_material',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'No genetic material',
                                                    title: 'No genetic material',
                                                },
                                                {
                                                    tag: 'Virus genome',
                                                    title: 'Virus genome',
                                                },
                                                {
                                                    tag: 'Synthetic',
                                                    title: 'Synthetic',
                                                },
                                            ],
                                            help: {
                                                en: 'The genetic material carried by the virions (None, virus genome, synthetic)',
                                            },
                                        },
                                        {
                                            tag: 'capsid_type',
                                            label: 'capsid_type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/capsid_type',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'None',
                                                    title: 'None',
                                                },
                                                {
                                                    tag: 'Native',
                                                    title: 'Native',
                                                },
                                                {
                                                    tag: 'Genetically Engineered',
                                                    title: 'Genetically Engineered',
                                                },
                                                {
                                                    tag: 'Synthetic',
                                                    title: 'Synthetic',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of virion capsid (e.g. genetically engineered, None',
                                            },
                                        },
                                        {
                                            tag: 'envelope_type',
                                            label: 'envelope_type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/envelope_type',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'None',
                                                    title: 'None',
                                                },
                                                {
                                                    tag: 'Native',
                                                    title: 'Native',
                                                },
                                                {
                                                    tag: 'Genetically Engineered',
                                                    title: 'Genetically Engineered',
                                                },
                                                {
                                                    tag: 'Synthetic',
                                                    title: 'Synthetic',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of virion envelope (e.g. genetically engineered, None',
                                            },
                                        },
                                        {
                                            tag: 'host_organism',
                                            label: 'host_organism',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/host_organism',
                                            input: 'vocabulary',
                                            vocabularyType: 'organisms',
                                            vocabularyKeys: [
                                                'id',
                                                'title',
                                                'props.rank',
                                            ],
                                        },
                                        {
                                            tag: 'host_cell_type',
                                            label: 'host_cell_type',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/host_cell_type',
                                            input: 'string',
                                            help: {
                                                en: 'The host cell type the virion was produced in',
                                            },
                                        },
                                        {
                                            tag: 'derived_from',
                                            label: 'derived_from',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/derived_from',
                                            input: 'variant-discriminator',
                                            choices: [
                                                {
                                                    tag: 'Body fluid',
                                                    title: 'Body fluid',
                                                },
                                                {
                                                    tag: 'Cell fraction',
                                                    title: 'Cell fraction',
                                                },
                                                {
                                                    tag: 'Virion',
                                                    title: 'Virion',
                                                },
                                            ],
                                            help: {
                                                en: 'The biological substance the complex substance is derived from',
                                            },
                                        },
                                        {
                                            tag: 'source_organism',
                                            label: 'source_organism',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/source_organism',
                                            input: 'vocabulary',
                                            vocabularyType: 'organisms',
                                            vocabularyKeys: [
                                                'id',
                                                'title',
                                                'props.rank',
                                            ],
                                        },
                                        {
                                            tag: 'preparation_protocol',
                                            label: 'preparation_protocol',
                                            isArray: true,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]/name',
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
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]/description',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short description of the step',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'List of the steps performed during the preparation of the complex substance',
                                            },
                                        },
                                        {
                                            tag: 'storage',
                                            label: 'storage',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage',
                                            input: [
                                                {
                                                    tag: 'temperature',
                                                    label: 'temperature',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature/value',
                                                            input: 'float',
                                                            help: {
                                                                en: 'The numeric value of the temperature',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature/unit',
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
                                                    ],
                                                    help: {
                                                        en: 'The temperature the sample was stored at',
                                                    },
                                                },
                                                {
                                                    tag: 'duration',
                                                    label: 'duration',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration',
                                                    input: [
                                                        {
                                                            tag: 'value',
                                                            label: 'value',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration/value',
                                                            input: 'float',
                                                            minimum: 0.0,
                                                            help: {
                                                                en: 'The numerical value of the time point or duration',
                                                            },
                                                        },
                                                        {
                                                            tag: 'unit',
                                                            label: 'unit',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration/unit',
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
                                                        en: 'Length of time the sample was stored before being measured',
                                                    },
                                                },
                                                {
                                                    tag: 'storage_preparation',
                                                    label: 'storage_preparation',
                                                    isArray: true,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]',
                                                    minItems: 1,
                                                    input: [
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]/name',
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
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]/description',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short description of the step',
                                                            },
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The specific steps that were taken to prepare the samples for storage (e.g. flash freezing in liquid nitrogen), if applicable',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'Information about how the complex substance was stored between being acquired and measured, including temperature and duration',
                                            },
                                        },
                                        {
                                            tag: 'additional_specifications',
                                            label: 'additional_specifications',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/additional_specifications[]',
                                            minItems: 1,
                                            input: 'string',
                                            help: {
                                                en: 'Additional information about the complex substance can be specified here',
                                            },
                                        },
                                        {
                                            tag: 'id',
                                            label: 'id',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/id',
                                            input: 'referenceable-id',
                                            referenceAs: 'entity',
                                        },
                                        {
                                            tag: 'name',
                                            label: 'name',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/name',
                                            input: 'string',
                                            help: {
                                                en: 'Short descriptive name (id) of the entity; must be unique within a record (e.g. Lysozyme, Serum from Patient 1). This name is referenced in the measurement description to identify the entities present in measured sample',
                                            },
                                        },
                                        {
                                            tag: 'type',
                                            label: 'type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/type',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'Polymer',
                                                    title: 'Polymer',
                                                },
                                                {
                                                    tag: 'Chemical',
                                                    title: 'Chemical',
                                                },
                                                {
                                                    tag: 'Molecular assembly',
                                                    title: 'Molecular assembly',
                                                },
                                                {
                                                    tag: 'Complex substance of biological origin',
                                                    title: 'Complex substance of biological origin',
                                                },
                                                {
                                                    tag: 'Complex substance of environmental origin',
                                                    title: 'Complex substance of environmental origin',
                                                },
                                                {
                                                    tag: 'Complex substance of chemical origin',
                                                    title: 'Complex substance of chemical origin',
                                                },
                                                {
                                                    tag: 'Complex substance of industrial production origin',
                                                    title: 'Complex substance of industrial production origin',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of the entity, where the options are (biological) Polymer, Chemical, Molecular assembly (also includes all proteins composed of more than one polypeptide chain) or Complex substance. Chemical polymers such as PEG 5000 should be described as being a Chemical. Complex substance refers to substances which are not exactly specified by their exact chemical composition by the time measurement were performed, but e.g. blood, serum, plant extract',
                                            },
                                        },
                                    ],
                                },
                            },
                            discriminator: 'derived_from',
                            help: {
                                en: 'Information about the biological substance the complex substance is derived from',
                            },
                        },
                        'Complex substance of environmental origin': {
                            tag: 'Complex substance of environmental origin',
                            label: 'Complex substance of environmental origin',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]',
                            input: [
                                {
                                    tag: 'source',
                                    label: 'source',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/source',
                                    input: 'options',
                                    choices: [
                                        {
                                            tag: 'Fresh water',
                                            title: 'Fresh water',
                                        },
                                        {
                                            tag: 'Marine',
                                            title: 'Marine',
                                        },
                                        {
                                            tag: 'Ice core',
                                            title: 'Ice core',
                                        },
                                        {
                                            tag: 'Sediment',
                                            title: 'Sediment',
                                        },
                                        {
                                            tag: 'Sewage',
                                            title: 'Sewage',
                                        },
                                        {
                                            tag: 'Soil',
                                            title: 'Soil',
                                        },
                                    ],
                                    help: {
                                        en: 'The environmental source where the complex substance was derived from',
                                    },
                                },
                                {
                                    tag: 'preparation_protocol',
                                    label: 'preparation_protocol',
                                    isArray: true,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]',
                                    minItems: 1,
                                    input: [
                                        {
                                            tag: 'name',
                                            label: 'name',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]/name',
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
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]/description',
                                            input: 'string',
                                            help: {
                                                en: 'Short description of the step',
                                            },
                                        },
                                    ],
                                    help: {
                                        en: 'List of the steps performed during the preparation of the complex substance',
                                    },
                                },
                                {
                                    tag: 'location',
                                    label: 'location',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/location',
                                    input: [
                                        {
                                            tag: 'latitude',
                                            label: 'latitude',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/location/latitude',
                                            input: 'float',
                                            minimum: -90.0,
                                            maximum: 90.0,
                                            help: {
                                                en: 'The latitude, from south to north, in degrees (decimal notation)',
                                            },
                                        },
                                        {
                                            tag: 'longitude',
                                            label: 'longitude',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/location/longitude',
                                            input: 'float',
                                            minimum: -180.0,
                                            maximum: 180.0,
                                            help: {
                                                en: 'The longitude, from west to east, in degrees (decimal notation)',
                                            },
                                        },
                                    ],
                                    help: {
                                        en: 'The coordinates, in decimal notation, where the complex substance was collected',
                                    },
                                },
                                {
                                    tag: 'storage',
                                    label: 'storage',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage',
                                    input: [
                                        {
                                            tag: 'temperature',
                                            label: 'temperature',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature/value',
                                                    input: 'float',
                                                    help: {
                                                        en: 'The numeric value of the temperature',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature/unit',
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
                                            ],
                                            help: {
                                                en: 'The temperature the sample was stored at',
                                            },
                                        },
                                        {
                                            tag: 'duration',
                                            label: 'duration',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration/value',
                                                    input: 'float',
                                                    minimum: 0.0,
                                                    help: {
                                                        en: 'The numerical value of the time point or duration',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration/unit',
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
                                                en: 'Length of time the sample was stored before being measured',
                                            },
                                        },
                                        {
                                            tag: 'storage_preparation',
                                            label: 'storage_preparation',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]/name',
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
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]/description',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short description of the step',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'The specific steps that were taken to prepare the samples for storage (e.g. flash freezing in liquid nitrogen), if applicable',
                                            },
                                        },
                                    ],
                                    help: {
                                        en: 'Information about how the complex substance was stored between being acquired and measured, including temperature and duration',
                                    },
                                },
                                {
                                    tag: 'additional_specifications',
                                    label: 'additional_specifications',
                                    isArray: true,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/additional_specifications[]',
                                    minItems: 1,
                                    input: 'string',
                                    help: {
                                        en: 'Additional information about the complex substance can be specified here',
                                    },
                                },
                                {
                                    tag: 'id',
                                    label: 'id',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/id',
                                    input: 'referenceable-id',
                                    referenceAs: 'entity',
                                },
                                {
                                    tag: 'name',
                                    label: 'name',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/name',
                                    input: 'string',
                                    help: {
                                        en: 'Short descriptive name (id) of the entity; must be unique within a record (e.g. Lysozyme, Serum from Patient 1). This name is referenced in the measurement description to identify the entities present in measured sample',
                                    },
                                },
                                {
                                    tag: 'type',
                                    label: 'type',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/type',
                                    input: 'variant-discriminator',
                                    choices: [
                                        {
                                            tag: 'Polymer',
                                            title: 'Polymer',
                                        },
                                        {
                                            tag: 'Chemical',
                                            title: 'Chemical',
                                        },
                                        {
                                            tag: 'Molecular assembly',
                                            title: 'Molecular assembly',
                                        },
                                        {
                                            tag: 'Complex substance of biological origin',
                                            title: 'Complex substance of biological origin',
                                        },
                                        {
                                            tag: 'Complex substance of environmental origin',
                                            title: 'Complex substance of environmental origin',
                                        },
                                        {
                                            tag: 'Complex substance of chemical origin',
                                            title: 'Complex substance of chemical origin',
                                        },
                                        {
                                            tag: 'Complex substance of industrial production origin',
                                            title: 'Complex substance of industrial production origin',
                                        },
                                    ],
                                    help: {
                                        en: 'The type of the entity, where the options are (biological) Polymer, Chemical, Molecular assembly (also includes all proteins composed of more than one polypeptide chain) or Complex substance. Chemical polymers such as PEG 5000 should be described as being a Chemical. Complex substance refers to substances which are not exactly specified by their exact chemical composition by the time measurement were performed, but e.g. blood, serum, plant extract',
                                    },
                                },
                            ],
                        },
                        'Complex substance of chemical origin': {
                            tag: 'Complex substance of chemical origin',
                            label: 'Complex substance of chemical origin',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]',
                            input: [
                                {
                                    tag: 'class',
                                    label: 'class',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/class',
                                    input: 'options',
                                    choices: [
                                        {
                                            tag: 'Lipid_assembly',
                                            title: 'Lipid_assembly',
                                        },
                                    ],
                                    help: {
                                        en: 'The chemical origin where the complex substance was derived from',
                                    },
                                },
                                {
                                    tag: 'details',
                                    label: 'details',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details',
                                    input: [
                                        {
                                            tag: 'type',
                                            label: 'type',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/type',
                                            input: 'options',
                                            choices: [
                                                {
                                                    tag: 'Micelle',
                                                    title: 'Micelle',
                                                },
                                                {
                                                    tag: 'Liposome',
                                                    title: 'Liposome',
                                                },
                                                {
                                                    tag: 'Nanodisc',
                                                    title: 'Nanodisc',
                                                },
                                                {
                                                    tag: 'Sheet',
                                                    title: 'Sheet',
                                                },
                                            ],
                                            help: {
                                                en: 'The type of lipid assembly',
                                            },
                                        },
                                        {
                                            tag: 'number_of_mono_layers',
                                            label: 'number_of_mono_layers',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/number_of_mono_layers',
                                            input: 'int',
                                            minimum: -1,
                                            help: {
                                                en: 'The number of lipid mono layers in the lipid assembly, -1 if unknown',
                                            },
                                        },
                                        {
                                            tag: 'size',
                                            label: 'size',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/size',
                                            input: [
                                                {
                                                    tag: 'type',
                                                    label: 'type',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/size/type',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'radius',
                                                            title: 'radius',
                                                        },
                                                        {
                                                            tag: 'diameter',
                                                            title: 'diameter',
                                                        },
                                                        {
                                                            tag: 'path length',
                                                            title: 'path length',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The type of size (e.g. radius)',
                                                    },
                                                },
                                                {
                                                    tag: 'mean',
                                                    label: 'mean',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/size/mean',
                                                    input: 'float',
                                                    minimum: 0.0,
                                                    help: {
                                                        en: 'The mean of the size',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/size/unit',
                                                    input: 'options',
                                                    choices: [
                                                        {
                                                            tag: 'Å',
                                                            title: 'Å',
                                                        },
                                                        {
                                                            tag: 'nm',
                                                            title: 'nm',
                                                        },
                                                        {
                                                            tag: 'μm',
                                                            title: 'μm',
                                                        },
                                                        {
                                                            tag: 'mm',
                                                            title: 'mm',
                                                        },
                                                        {
                                                            tag: 'cm',
                                                            title: 'cm',
                                                        },
                                                        {
                                                            tag: 'm',
                                                            title: 'm',
                                                        },
                                                    ],
                                                    help: {
                                                        en: 'The unit of the size',
                                                    },
                                                },
                                                {
                                                    tag: 'median',
                                                    label: 'median',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/size/median',
                                                    input: 'float',
                                                    minimum: 0.0,
                                                    help: {
                                                        en: 'The median of the size',
                                                    },
                                                },
                                                {
                                                    tag: 'upper',
                                                    label: 'upper',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/size/upper',
                                                    input: 'float',
                                                    help: {
                                                        en: 'The upper bound of the size',
                                                    },
                                                },
                                                {
                                                    tag: 'lower',
                                                    label: 'lower',
                                                    isArray: false,
                                                    isRequired: false,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/size/lower',
                                                    input: 'float',
                                                    help: {
                                                        en: 'The lower bound of the size',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'The size of the lipid assembly',
                                            },
                                        },
                                        {
                                            tag: 'components',
                                            label: 'components',
                                            isArray: true,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]',
                                            minItems: 1,
                                            input: {
                                                Polymer: {
                                                    tag: 'Polymer',
                                                    label: 'Polymer',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]',
                                                    input: [
                                                        {
                                                            tag: 'polymer_type',
                                                            label: 'polymer_type',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/polymer_type',
                                                            input: 'options',
                                                            choices: [
                                                                {
                                                                    tag: 'cyclic-pseudo-peptide',
                                                                    title: 'cyclic-pseudo-peptide',
                                                                },
                                                                {
                                                                    tag: 'peptide nucleic acid',
                                                                    title: 'peptide nucleic acid',
                                                                },
                                                                {
                                                                    tag: 'polydeoxyribonucleotide',
                                                                    title: 'polydeoxyribonucleotide',
                                                                },
                                                                {
                                                                    tag: 'polydeoxyribonucleotide/polyribonucleotide hybrid',
                                                                    title: 'polydeoxyribonucleotide/polyribonucleotide hybrid',
                                                                },
                                                                {
                                                                    tag: 'polypeptide(D)',
                                                                    title: 'polypeptide(D)',
                                                                },
                                                                {
                                                                    tag: 'polypeptide(L)',
                                                                    title: 'polypeptide(L)',
                                                                },
                                                                {
                                                                    tag: 'polyribonucleotide',
                                                                    title: 'polyribonucleotide',
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The type of polymer (e.g. polypeptide(L))',
                                                            },
                                                        },
                                                        {
                                                            tag: 'sequence',
                                                            label: 'sequence',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/sequence',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Primary sequence of the polymer, using single letter codes (e.g. SAGRELLE, AGTTA). In case of non-natural amino acids or nucleotides, please place the monomer in brackets',
                                                            },
                                                        },
                                                        {
                                                            tag: 'molecular_weight',
                                                            label: 'molecular_weight',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/molecular_weight',
                                                            input: [
                                                                {
                                                                    tag: 'value',
                                                                    label: 'value',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/molecular_weight/value',
                                                                    input: 'float',
                                                                    help: {
                                                                        en: 'The numerical value of the molecular weight',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'unit',
                                                                    label: 'unit',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/molecular_weight/unit',
                                                                    input: 'options',
                                                                    choices: [
                                                                        {
                                                                            tag: 'g/mol',
                                                                            title: 'g/mol',
                                                                        },
                                                                        {
                                                                            tag: 'Da',
                                                                            title: 'Da',
                                                                        },
                                                                        {
                                                                            tag: 'kDa',
                                                                            title: 'kDa',
                                                                        },
                                                                        {
                                                                            tag: 'MDa',
                                                                            title: 'MDa',
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'The unit of the molecular weight',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The molecular weight of the polymer',
                                                            },
                                                        },
                                                        {
                                                            tag: 'external_databases',
                                                            label: 'external_databases',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/external_databases[]',
                                                            minItems: 1,
                                                            input: 'string',
                                                            help: {
                                                                en: 'List of identifiers to records in external databases containing information about the polymer can be specified here (e.g UNIPROT:Q8KRF6)',
                                                            },
                                                        },
                                                        {
                                                            tag: 'variant',
                                                            label: 'variant',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/variant',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Descriptive name indicating differences of primary sequence of the polymer as compared to the most common form, or wildtype, including mutations, purification tags, etc. (A53T, C-terminal GFP, N-terminal 6xHis-tag)',
                                                            },
                                                        },
                                                        {
                                                            tag: 'source_organism',
                                                            label: 'source_organism',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/source_organism',
                                                            input: 'vocabulary',
                                                            vocabularyType: 'organisms',
                                                            vocabularyKeys: [
                                                                'id',
                                                                'title',
                                                                'props.rank',
                                                            ],
                                                        },
                                                        {
                                                            tag: 'modifications',
                                                            label: 'modifications',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications',
                                                            input: [
                                                                {
                                                                    tag: 'synthesis',
                                                                    label: 'synthesis',
                                                                    isArray: true,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/synthesis[]',
                                                                    minItems: 1,
                                                                    input: [
                                                                        {
                                                                            tag: 'position',
                                                                            label: 'position',
                                                                            isArray: false,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/synthesis[]/position',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'The position where the modification occurs',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'modification',
                                                                            label: 'modification',
                                                                            isArray: false,
                                                                            isRequired: true,
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/synthesis[]/modification',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'The common name/type of the modification',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'protocol',
                                                                            label: 'protocol',
                                                                            isArray: true,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/synthesis[]/protocol[]',
                                                                            minItems: 1,
                                                                            input: [
                                                                                {
                                                                                    tag: 'name',
                                                                                    label: 'name',
                                                                                    isArray: false,
                                                                                    isRequired: true,
                                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/synthesis[]/protocol[]/name',
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
                                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/synthesis[]/protocol[]/description',
                                                                                    input: 'string',
                                                                                    help: {
                                                                                        en: 'Short description of the step',
                                                                                    },
                                                                                },
                                                                            ],
                                                                            help: {
                                                                                en: 'List of steps that led to the modification taking place',
                                                                            },
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'Modifications (e.g. non-natural amino acids) of the polymer made during synthesis (e.g. translation) of the polymer',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'biological_postprocessing',
                                                                    label: 'biological_postprocessing',
                                                                    isArray: true,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/biological_postprocessing[]',
                                                                    minItems: 1,
                                                                    input: [
                                                                        {
                                                                            tag: 'position',
                                                                            label: 'position',
                                                                            isArray: false,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/biological_postprocessing[]/position',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'The position where the modification occurs',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'modification',
                                                                            label: 'modification',
                                                                            isArray: false,
                                                                            isRequired: true,
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/biological_postprocessing[]/modification',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'The common name/type of the modification',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'protocol',
                                                                            label: 'protocol',
                                                                            isArray: true,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/biological_postprocessing[]/protocol[]',
                                                                            minItems: 1,
                                                                            input: [
                                                                                {
                                                                                    tag: 'name',
                                                                                    label: 'name',
                                                                                    isArray: false,
                                                                                    isRequired: true,
                                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/biological_postprocessing[]/protocol[]/name',
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
                                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/biological_postprocessing[]/protocol[]/description',
                                                                                    input: 'string',
                                                                                    help: {
                                                                                        en: 'Short description of the step',
                                                                                    },
                                                                                },
                                                                            ],
                                                                            help: {
                                                                                en: 'List of steps that led to the modification taking place',
                                                                            },
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'Modifications of the polymer made after synthesis (e.g. posttranslational modifications, DNA methylation) by the organism where synthesis occurred (e.g. glycosylation)',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'chemical',
                                                                    label: 'chemical',
                                                                    isArray: true,
                                                                    isRequired: false,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/chemical[]',
                                                                    minItems: 1,
                                                                    input: [
                                                                        {
                                                                            tag: 'position',
                                                                            label: 'position',
                                                                            isArray: false,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/chemical[]/position',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'The position where the modification occurs',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'modification',
                                                                            label: 'modification',
                                                                            isArray: false,
                                                                            isRequired: true,
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/chemical[]/modification',
                                                                            input: 'string',
                                                                            help: {
                                                                                en: 'The common name/type of the modification',
                                                                            },
                                                                        },
                                                                        {
                                                                            tag: 'protocol',
                                                                            label: 'protocol',
                                                                            isArray: true,
                                                                            isRequired: false,
                                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/chemical[]/protocol[]',
                                                                            minItems: 1,
                                                                            input: [
                                                                                {
                                                                                    tag: 'name',
                                                                                    label: 'name',
                                                                                    isArray: false,
                                                                                    isRequired: true,
                                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/chemical[]/protocol[]/name',
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
                                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/modifications/chemical[]/protocol[]/description',
                                                                                    input: 'string',
                                                                                    help: {
                                                                                        en: 'Short description of the step',
                                                                                    },
                                                                                },
                                                                            ],
                                                                            help: {
                                                                                en: 'List of steps that led to the modification taking place',
                                                                            },
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'Modifications of the polymer introduced by chemical, biochemical, or physical means in vitro (e.g. lysine methylation, cysteine iodoacetamide labeling, deglycosylation, covalent fluorescent labeling)',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'If the polymer contains modifications such as non-natural aminoacids, post translational modification, or chemically modifications like labeling, it can be specified here',
                                                            },
                                                        },
                                                        {
                                                            tag: 'expression_source_type',
                                                            label: 'expression_source_type',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/expression_source_type',
                                                            input: 'options',
                                                            choices: [
                                                                {
                                                                    tag: 'Natively',
                                                                    title: 'Natively',
                                                                },
                                                                {
                                                                    tag: 'Recombinantly',
                                                                    title: 'Recombinantly',
                                                                },
                                                                {
                                                                    tag: 'Synthetically',
                                                                    title: 'Synthetically',
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'How the polymer was produced',
                                                            },
                                                        },
                                                        {
                                                            tag: 'expression_organism',
                                                            label: 'expression_organism',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/expression_organism',
                                                            input: 'vocabulary',
                                                            vocabularyType: 'organisms',
                                                            vocabularyKeys: [
                                                                'id',
                                                                'title',
                                                                'props.rank',
                                                            ],
                                                        },
                                                        {
                                                            tag: 'additional_specifications',
                                                            label: 'additional_specifications',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/additional_specifications[]',
                                                            minItems: 1,
                                                            input: 'string',
                                                            help: {
                                                                en: 'Additional information about the polymer can be specified here',
                                                            },
                                                        },
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/name',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short descriptive name (id) given to the assembly component. The name must be unique within a record',
                                                            },
                                                        },
                                                        {
                                                            tag: 'type',
                                                            label: 'type',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/type',
                                                            input: 'variant-discriminator',
                                                            choices: [
                                                                {
                                                                    tag: 'Polymer',
                                                                    title: 'Polymer',
                                                                },
                                                                {
                                                                    tag: 'Chemical',
                                                                    title: 'Chemical',
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The type of component, options are (biological) Polymer and Chemical',
                                                            },
                                                        },
                                                        {
                                                            tag: 'copy_number',
                                                            label: 'copy_number',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/copy_number',
                                                            input: 'float',
                                                            minimum: -1.0,
                                                            help: {
                                                                en: 'Number of molecules of the component within the assembly, -1 if unknown',
                                                            },
                                                        },
                                                    ],
                                                },
                                                Chemical: {
                                                    tag: 'Chemical',
                                                    label: 'Chemical',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]',
                                                    input: [
                                                        {
                                                            tag: 'inchikey',
                                                            label: 'inchikey',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/inchikey',
                                                            input: 'string',
                                                            help: {
                                                                en: 'InChIKey identifier of the chemical. In case of chemical polymers please specify the InChIKey of the monomer and specify the specific type in the additional identifiers field (e.g. if PEG 3350 was employed, the InChiKey of ethylene glycol, i.e. LYCAIKOWRPUZTN-UHFFFAOYSA-N should be specified here)',
                                                            },
                                                        },
                                                        {
                                                            tag: 'additional_identifiers',
                                                            label: 'additional_identifiers',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/additional_identifiers[]',
                                                            minItems: 1,
                                                            input: 'string',
                                                            help: {
                                                                en: 'Unique and persistent identifier from an external source; options of sources are CAS number, Pubchem Compound ID, and Pubchem Substance ID',
                                                            },
                                                        },
                                                        {
                                                            tag: 'isotopic_labeling',
                                                            label: 'isotopic_labeling',
                                                            isArray: false,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/isotopic_labeling',
                                                            input: 'string',
                                                            help: {
                                                                en: 'If the isotopic composition of the chemical was altered from the naturally occurring abundances, it can be specified here (e.g. 15N, 13C)',
                                                            },
                                                        },
                                                        {
                                                            tag: 'molecular_weight',
                                                            label: 'molecular_weight',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/molecular_weight',
                                                            input: [
                                                                {
                                                                    tag: 'value',
                                                                    label: 'value',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/molecular_weight/value',
                                                                    input: 'float',
                                                                    help: {
                                                                        en: 'The numerical value of the molecular weight',
                                                                    },
                                                                },
                                                                {
                                                                    tag: 'unit',
                                                                    label: 'unit',
                                                                    isArray: false,
                                                                    isRequired: true,
                                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/molecular_weight/unit',
                                                                    input: 'options',
                                                                    choices: [
                                                                        {
                                                                            tag: 'g/mol',
                                                                            title: 'g/mol',
                                                                        },
                                                                        {
                                                                            tag: 'Da',
                                                                            title: 'Da',
                                                                        },
                                                                        {
                                                                            tag: 'kDa',
                                                                            title: 'kDa',
                                                                        },
                                                                        {
                                                                            tag: 'MDa',
                                                                            title: 'MDa',
                                                                        },
                                                                    ],
                                                                    help: {
                                                                        en: 'The unit of the molecular weight',
                                                                    },
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The molecular weight of the polymer',
                                                            },
                                                        },
                                                        {
                                                            tag: 'additional_specifications',
                                                            label: 'additional_specifications',
                                                            isArray: true,
                                                            isRequired: false,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/additional_specifications[]',
                                                            minItems: 1,
                                                            input: 'string',
                                                            help: {
                                                                en: 'Additional information about the chemical can be specified here (e.g. RNase free water, recrystallization, desalting)',
                                                            },
                                                        },
                                                        {
                                                            tag: 'name',
                                                            label: 'name',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/name',
                                                            input: 'string',
                                                            help: {
                                                                en: 'Short descriptive name (id) given to the assembly component. The name must be unique within a record',
                                                            },
                                                        },
                                                        {
                                                            tag: 'type',
                                                            label: 'type',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/type',
                                                            input: 'variant-discriminator',
                                                            choices: [
                                                                {
                                                                    tag: 'Polymer',
                                                                    title: 'Polymer',
                                                                },
                                                                {
                                                                    tag: 'Chemical',
                                                                    title: 'Chemical',
                                                                },
                                                            ],
                                                            help: {
                                                                en: 'The type of component, options are (biological) Polymer and Chemical',
                                                            },
                                                        },
                                                        {
                                                            tag: 'copy_number',
                                                            label: 'copy_number',
                                                            isArray: false,
                                                            isRequired: true,
                                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/components[]/copy_number',
                                                            input: 'float',
                                                            minimum: -1.0,
                                                            help: {
                                                                en: 'Number of molecules of the component within the assembly, -1 if unknown',
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            discriminator: 'type',
                                            help: {
                                                en: 'The components of the lipid assembly',
                                            },
                                        },
                                        {
                                            tag: 'additional_specifications',
                                            label: 'additional_specifications',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/additional_specifications[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/additional_specifications[]/name',
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
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/details/additional_specifications[]/description',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short description of the step',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'Additional information about the lipid assembly, if applicable',
                                            },
                                        },
                                    ],
                                    help: {
                                        en: 'The chemical origin where the complex substance was derived from',
                                    },
                                },
                                {
                                    tag: 'preparation_protocol',
                                    label: 'preparation_protocol',
                                    isArray: true,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]',
                                    minItems: 1,
                                    input: [
                                        {
                                            tag: 'name',
                                            label: 'name',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]/name',
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
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]/description',
                                            input: 'string',
                                            help: {
                                                en: 'Short description of the step',
                                            },
                                        },
                                    ],
                                    help: {
                                        en: 'List of the steps performed during the preparation of the complex substance',
                                    },
                                },
                                {
                                    tag: 'storage',
                                    label: 'storage',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage',
                                    input: [
                                        {
                                            tag: 'temperature',
                                            label: 'temperature',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature/value',
                                                    input: 'float',
                                                    help: {
                                                        en: 'The numeric value of the temperature',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature/unit',
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
                                            ],
                                            help: {
                                                en: 'The temperature the sample was stored at',
                                            },
                                        },
                                        {
                                            tag: 'duration',
                                            label: 'duration',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration/value',
                                                    input: 'float',
                                                    minimum: 0.0,
                                                    help: {
                                                        en: 'The numerical value of the time point or duration',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration/unit',
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
                                                en: 'Length of time the sample was stored before being measured',
                                            },
                                        },
                                        {
                                            tag: 'storage_preparation',
                                            label: 'storage_preparation',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]/name',
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
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]/description',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short description of the step',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'The specific steps that were taken to prepare the samples for storage (e.g. flash freezing in liquid nitrogen), if applicable',
                                            },
                                        },
                                    ],
                                    help: {
                                        en: 'Information about how the complex substance was stored between being acquired and measured, including temperature and duration',
                                    },
                                },
                                {
                                    tag: 'additional_specifications',
                                    label: 'additional_specifications',
                                    isArray: true,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/additional_specifications[]',
                                    minItems: 1,
                                    input: 'string',
                                    help: {
                                        en: 'Additional information about the complex substance can be specified here',
                                    },
                                },
                                {
                                    tag: 'id',
                                    label: 'id',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/id',
                                    input: 'referenceable-id',
                                    referenceAs: 'entity',
                                },
                                {
                                    tag: 'name',
                                    label: 'name',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/name',
                                    input: 'string',
                                    help: {
                                        en: 'Short descriptive name (id) of the entity; must be unique within a record (e.g. Lysozyme, Serum from Patient 1). This name is referenced in the measurement description to identify the entities present in measured sample',
                                    },
                                },
                                {
                                    tag: 'type',
                                    label: 'type',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/type',
                                    input: 'variant-discriminator',
                                    choices: [
                                        {
                                            tag: 'Polymer',
                                            title: 'Polymer',
                                        },
                                        {
                                            tag: 'Chemical',
                                            title: 'Chemical',
                                        },
                                        {
                                            tag: 'Molecular assembly',
                                            title: 'Molecular assembly',
                                        },
                                        {
                                            tag: 'Complex substance of biological origin',
                                            title: 'Complex substance of biological origin',
                                        },
                                        {
                                            tag: 'Complex substance of environmental origin',
                                            title: 'Complex substance of environmental origin',
                                        },
                                        {
                                            tag: 'Complex substance of chemical origin',
                                            title: 'Complex substance of chemical origin',
                                        },
                                        {
                                            tag: 'Complex substance of industrial production origin',
                                            title: 'Complex substance of industrial production origin',
                                        },
                                    ],
                                    help: {
                                        en: 'The type of the entity, where the options are (biological) Polymer, Chemical, Molecular assembly (also includes all proteins composed of more than one polypeptide chain) or Complex substance. Chemical polymers such as PEG 5000 should be described as being a Chemical. Complex substance refers to substances which are not exactly specified by their exact chemical composition by the time measurement were performed, but e.g. blood, serum, plant extract',
                                    },
                                },
                            ],
                        },
                        'Complex substance of industrial production origin': {
                            tag: 'Complex substance of industrial production origin',
                            label: 'Complex substance of industrial production origin',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]',
                            input: [
                                {
                                    tag: 'product',
                                    label: 'product',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/product',
                                    input: 'options',
                                    choices: [
                                        {
                                            tag: 'Beer',
                                            title: 'Beer',
                                        },
                                        {
                                            tag: 'Cell medium',
                                            title: 'Cell medium',
                                        },
                                        {
                                            tag: 'Whey',
                                            title: 'Whey',
                                        },
                                    ],
                                    help: {
                                        en: 'The type of product, byproduct, or waste product the complex substance was derived from',
                                    },
                                },
                                {
                                    tag: 'preparation_protocol',
                                    label: 'preparation_protocol',
                                    isArray: true,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]',
                                    minItems: 1,
                                    input: [
                                        {
                                            tag: 'name',
                                            label: 'name',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]/name',
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
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/preparation_protocol[]/description',
                                            input: 'string',
                                            help: {
                                                en: 'Short description of the step',
                                            },
                                        },
                                    ],
                                    help: {
                                        en: 'List of the steps performed during the preparation of the complex substance',
                                    },
                                },
                                {
                                    tag: 'storage',
                                    label: 'storage',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage',
                                    input: [
                                        {
                                            tag: 'temperature',
                                            label: 'temperature',
                                            isArray: false,
                                            isRequired: true,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature/value',
                                                    input: 'float',
                                                    help: {
                                                        en: 'The numeric value of the temperature',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/temperature/unit',
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
                                            ],
                                            help: {
                                                en: 'The temperature the sample was stored at',
                                            },
                                        },
                                        {
                                            tag: 'duration',
                                            label: 'duration',
                                            isArray: false,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration',
                                            input: [
                                                {
                                                    tag: 'value',
                                                    label: 'value',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration/value',
                                                    input: 'float',
                                                    minimum: 0.0,
                                                    help: {
                                                        en: 'The numerical value of the time point or duration',
                                                    },
                                                },
                                                {
                                                    tag: 'unit',
                                                    label: 'unit',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/duration/unit',
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
                                                en: 'Length of time the sample was stored before being measured',
                                            },
                                        },
                                        {
                                            tag: 'storage_preparation',
                                            label: 'storage_preparation',
                                            isArray: true,
                                            isRequired: false,
                                            mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]',
                                            minItems: 1,
                                            input: [
                                                {
                                                    tag: 'name',
                                                    label: 'name',
                                                    isArray: false,
                                                    isRequired: true,
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]/name',
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
                                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/storage/storage_preparation[]/description',
                                                    input: 'string',
                                                    help: {
                                                        en: 'Short description of the step',
                                                    },
                                                },
                                            ],
                                            help: {
                                                en: 'The specific steps that were taken to prepare the samples for storage (e.g. flash freezing in liquid nitrogen), if applicable',
                                            },
                                        },
                                    ],
                                    help: {
                                        en: 'Information about how the complex substance was stored between being acquired and measured, including temperature and duration',
                                    },
                                },
                                {
                                    tag: 'additional_specifications',
                                    label: 'additional_specifications',
                                    isArray: true,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/additional_specifications[]',
                                    minItems: 1,
                                    input: 'string',
                                    help: {
                                        en: 'Additional information about the complex substance can be specified here',
                                    },
                                },
                                {
                                    tag: 'id',
                                    label: 'id',
                                    isArray: false,
                                    isRequired: false,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/id',
                                    input: 'referenceable-id',
                                    referenceAs: 'entity',
                                },
                                {
                                    tag: 'name',
                                    label: 'name',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/name',
                                    input: 'string',
                                    help: {
                                        en: 'Short descriptive name (id) of the entity; must be unique within a record (e.g. Lysozyme, Serum from Patient 1). This name is referenced in the measurement description to identify the entities present in measured sample',
                                    },
                                },
                                {
                                    tag: 'type',
                                    label: 'type',
                                    isArray: false,
                                    isRequired: true,
                                    mbdbPath: 'general_parameters/chemical_information/entities_of_interest[]/type',
                                    input: 'variant-discriminator',
                                    choices: [
                                        {
                                            tag: 'Polymer',
                                            title: 'Polymer',
                                        },
                                        {
                                            tag: 'Chemical',
                                            title: 'Chemical',
                                        },
                                        {
                                            tag: 'Molecular assembly',
                                            title: 'Molecular assembly',
                                        },
                                        {
                                            tag: 'Complex substance of biological origin',
                                            title: 'Complex substance of biological origin',
                                        },
                                        {
                                            tag: 'Complex substance of environmental origin',
                                            title: 'Complex substance of environmental origin',
                                        },
                                        {
                                            tag: 'Complex substance of chemical origin',
                                            title: 'Complex substance of chemical origin',
                                        },
                                        {
                                            tag: 'Complex substance of industrial production origin',
                                            title: 'Complex substance of industrial production origin',
                                        },
                                    ],
                                    help: {
                                        en: 'The type of the entity, where the options are (biological) Polymer, Chemical, Molecular assembly (also includes all proteins composed of more than one polypeptide chain) or Complex substance. Chemical polymers such as PEG 5000 should be described as being a Chemical. Complex substance refers to substances which are not exactly specified by their exact chemical composition by the time measurement were performed, but e.g. blood, serum, plant extract',
                                    },
                                },
                            ],
                        },
                    },
                    discriminator: 'type',
                    help: {
                        en: 'List of the entities that are being directly measured, as well as the entities that are being used as a variable to influence the behavior of the directly measured entities (e.g. lysozyme, NAG3, NaCl)',
                    },
                },
            ],
            help: {
                en: 'Information about entities of interest that were being measured (e.g. Lysozyme) or used to alter the behaviour of the measured species (e.g. Peptidoglycan), and the chemical environments that was used in the measurement (e.g. buffers, cleaning solutions)',
            },
        },
        {
            tag: 'results',
            label: 'results',
            isArray: true,
            isRequired: false,
            mbdbPath: 'general_parameters/results[]',
            minItems: 1,
            input: [
                {
                    tag: 'id',
                    label: 'id',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/results[]/id',
                    input: 'referenceable-id',
                    referenceAs: 'derived-parameter',
                },
                {
                    tag: 'name',
                    label: 'name',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/results[]/name',
                    input: 'string',
                    help: {
                        en: 'Descriptive name (id) of the derived parameter (e.g. Kd of Lysozyme and VHH2). Must be unique within a record',
                    },
                },
                {
                    tag: 'type',
                    label: 'type',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/results[]/type',
                    input: 'options',
                    choices: [
                        {
                            tag: 'Concentration',
                            title: 'Concentration',
                        },
                        {
                            tag: 'Stoichiometry',
                            title: 'Stoichiometry',
                        },
                        {
                            tag: 'Constant of association (K_A)',
                            title: 'Constant of association (K_A)',
                        },
                        {
                            tag: 'Constant of dissociation (K_D)',
                            title: 'Constant of dissociation (K_D)',
                        },
                        {
                            tag: 'Association rate (k_on)',
                            title: 'Association rate (k_on)',
                        },
                        {
                            tag: 'Dissociation rate (k_off)',
                            title: 'Dissociation rate (k_off)',
                        },
                        {
                            tag: 'Change in enthalpy (delta H)',
                            title: 'Change in enthalpy (delta H)',
                        },
                        {
                            tag: 'Change in entropy (delta S)',
                            title: 'Change in entropy (delta S)',
                        },
                        {
                            tag: 'Change in Gibbs free energy (delta G)',
                            title: 'Change in Gibbs free energy (delta G)',
                        },
                        {
                            tag: 'Molecular weight (MW)',
                            title: 'Molecular weight (MW)',
                        },
                    ],
                    help: {
                        en: 'The type of physical parameter the derived parameter represents',
                    },
                },
                {
                    tag: 'entities_involved',
                    label: 'entities_involved',
                    isArray: true,
                    isRequired: true,
                    mbdbPath: 'general_parameters/results[]/entities_involved[]',
                    minItems: 1,
                    input: [
                        {
                            tag: 'entity',
                            label: 'entity',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/results[]/entities_involved[]/entity',
                            input: 'related-to',
                            relatesTo: 'entity',
                            relatedKeys: [
                                'id',
                                'name',
                            ],
                        },
                        {
                            tag: 'copy_number',
                            label: 'copy_number',
                            isArray: false,
                            isRequired: true,
                            mbdbPath: 'general_parameters/results[]/entities_involved[]/copy_number',
                            input: 'float',
                            minimum: -1.0,
                            help: {
                                en: 'Number of copies of the entity that contribute to the derived parameter, -1 if unknown (e.g. if two individual copies of a polymer binds to another, the copy number would be 2)',
                            },
                        },
                    ],
                    help: {
                        en: 'List of chemical or molecular assemblies the derived parameter describes and how many copies of each are involved',
                    },
                },
                {
                    tag: 'value',
                    label: 'value',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/results[]/value',
                    input: 'float',
                    help: {
                        en: 'Numerical value of the derived parameter',
                    },
                },
                {
                    tag: 'value_error',
                    label: 'value_error',
                    isArray: false,
                    isRequired: false,
                    mbdbPath: 'general_parameters/results[]/value_error',
                    input: 'custom',
                    component: 'value-error',
                    help: {
                        upper_error: {
                            en: 'The upper error, i.e. the number that should be added the value to get the upper bound. The same unit as the value being described is assumed, if relative errors are given please give it in fractional form (e.g. 0.01 for 1 %',
                        },
                        lower_error: {
                            en: 'The lower error, i.e. the number that should be subtracted from the value to get the lower bound. The same unit as the value being described is assumed, if relative errors are given please give it in fractional form (e.g. 0.01 for 1 %)',
                        },
                        is_relative: {
                            en: 'True if the error values given should be interpreted as relative errors (fractional uncertainty)',
                        },
                    },
                },
                {
                    tag: 'unit',
                    label: 'unit',
                    isArray: false,
                    isRequired: true,
                    mbdbPath: 'general_parameters/results[]/unit',
                    input: 'string',
                    help: {
                        en: 'Unit of the derived parameter',
                    },
                },
            ],
            help: {
                en: 'List of the results (parameter) that were derived by analyzing the raw data, and which steps were taken to obtain them',
            },
        },
        {
            tag: 'raw_measurement_files',
            label: 'raw_measurement_files',
            isArray: true,
            isRequired: false,
            mbdbPath: 'general_parameters/raw_measurement_files[]',
            minItems: 1,
            input: 'file',
            help: {
                en: 'List of file(s) containing the raw measurements',
            },
        },
    ],
    help: {
        en: 'The general information of the measurements',
    },
};
