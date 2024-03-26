import { Configuration } from '../src/schema/configuration';
import { Register as ConfigurationRegister } from '../src/schema/configuration/register';
import { Register as SchemaRegister } from '../src/schema/schemas/register';
import { deepCopy } from '../src/util';

test('BLI configuration', () => {
    const schema = SchemaRegister.bli;
    const config = ConfigurationRegister.bli;

    expect(() => Configuration.configure(schema.schema, config)).not.toThrow();
});

test('MST configuration', () => {
    const schema = SchemaRegister.mst;
    const config = ConfigurationRegister.mst;

    expect(() => Configuration.configure(schema.schema, config)).not.toThrow();
});

test('SPR configuration', () => {
    const schema = SchemaRegister.spr;
    const config = ConfigurationRegister.spr;

    expect(() => Configuration.configure(schema.schema, config)).not.toThrow();
});


test('Invalid configuration checks', () => {
    const schema = SchemaRegister.mst;
    const config = ConfigurationRegister.mst;

    let badConfig = deepCopy(config);
    badConfig['general_parameters/technique'].defaultValue = 'INVALID';
    expect(() => Configuration.configure(schema.schema, badConfig)).toThrow('Schema configuration error: Invalid default value "INVALID" for item "technique".');

    badConfig = deepCopy(config);
    badConfig['general_parameters/record_information/title'] = { forceChoice: true };
    expect(() => Configuration.configure(schema.schema, badConfig)).toThrow('Schema configuration error: Attempted to force a value for item "title" but this flag is valid only for items with Options input.');

    badConfig = deepCopy(config);
    badConfig['non_existent/field'] = {};
    expect(() => Configuration.configure(schema.schema, badConfig)).toThrow('Schema configuration error: No configurees for configuration item "non_existent/field".');

    badConfig = deepCopy(config);
    badConfig['general_parameters/depositors/contributors'] = { defaultValue: 'something' };
    expect(() => Configuration.configure(schema.schema, badConfig)).toThrow('Schema configuration error: Setting default values for array items is not allowed but "contributors" is an array.');
});
