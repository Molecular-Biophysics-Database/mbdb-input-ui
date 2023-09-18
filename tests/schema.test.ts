import { AnyItem, Item, Schema, TopLevelItem } from '../src/schema';
import { Register as SchemaRegister } from '../src/schema/schemas/register';
import {objKeys} from '../src/util';

function _badSchema(message: string) {
    throw new Error(`Schema is invalid: ${message}`);
}

function arraysInMbdbPath(path: string) {
    const toks = path.split('/');
    let count = 0;
    for (const tok of toks) {
        count += tok.endsWith('[]') ? 1 : 0;
    }

    return count;
}

function checkSchemaItem(item: Item, arrayNestLevel: number) {
    if (!item.tag) _badSchema('Item has empty tag');

    if (item.minItems !== undefined) {
        if (!item.isArray) _badSchema(`Item "${item.tag}" defines "minItems" but its "isArray" flag is set to "false".`);
        if (item.minItems < 0) _badSchema(`minItems value "${item.minItems}" in item "${item.tag}" is not allowed.`);
    }

    if (Schema.hasNumericInput(item)) {
        const min = item.minimum !== undefined ? item.minimum : -Number.MAX_VALUE
        const max = item.maximum !== undefined ? item.maximum : +Number.MAX_VALUE

        if (min >= max) _badSchema(`Item "${item.tag}" has invalid range ${min} - ${max}.`);
    }

    const mbdbArrayNestLevel = arraysInMbdbPath(item.mbdbPath);
    arrayNestLevel += item.isArray ? 1 : 0;
    if (mbdbArrayNestLevel !== arrayNestLevel) _badSchema(`Item "${item.tag}" is nested in ${arrayNestLevel} array(s) in internal schema but in ${mbdbArrayNestLevel} array(s) in MBDB schema. Such a mismatch is not allowed.`);
}

function checkSchema(item: AnyItem, arrayNestLevel = 0) {
    if (Schema.isTopLevelItem(item)) {
        for (const innerItem of item.input) {
            checkSchema(innerItem, arrayNestLevel);
        }
    } else if (Schema.hasComplexInput(item)) {
        checkSchemaItem(item, arrayNestLevel);

        arrayNestLevel = arrayNestLevel + (item.isArray ? 1 : 0);
        for (const innerItem of item.input) {
            checkSchema(innerItem, arrayNestLevel);
        }
    } else if (Schema.hasVariantInput(item)) {
        arrayNestLevel = arrayNestLevel + (item.isArray ? 1 : 0);

        const keys = objKeys(item.input);
        if (keys.length === 0) _badSchema(`VariantInput item "${item.tag}" has no variants to choose from.`);

        for (const k of keys) {
            const varItem = item.input[k];
            checkSchema(varItem, arrayNestLevel);
        }
    } else {
        checkSchemaItem(item, arrayNestLevel);
    }
}

test('BLI schema', () => {
    const bli = SchemaRegister.bli;

    expect(() => checkSchema(bli.schema)).not.toThrow();
});

test('MST schema', () => {
    const mst = SchemaRegister.mst;

    expect(() => checkSchema(mst.schema)).not.toThrow();
});

test('SPR schema', () => {
    const spr = SchemaRegister.spr;

    expect(() => checkSchema(spr.schema)).not.toThrow();
});

test('Invalid schemas', () => {
    let BadSchema = TopLevelItem([
        {
            tag: 'bad_range',
            label: 'Something',
            input: 'int',
            isRequired: false,
            isArray: false,
            mbdbPath: 'something',
            minimum: 10,
            maximum: 8
        } as Item
    ]);
    expect(() => checkSchema(BadSchema)).toThrowError('Schema is invalid: Item "bad_range" has invalid range 10 - 8.');

    BadSchema = TopLevelItem([
        {
            tag: 'bad_minItems',
            label: 'Something',
            input: 'string',
            isRequired: false,
            isArray: true,
            mbdbPath: 'something',
            minItems: -1,
        } as Item
    ]);
    expect(() => checkSchema(BadSchema)).toThrowError('Schema is invalid: minItems value "-1" in item "bad_minItems" is not allowed.');

    BadSchema = TopLevelItem([
        {
            tag: 'bad_variant',
            label: 'Something',
            input: {},
            isRequired: false,
            mbdbPath: 'something',
        } as Item
    ]);
    expect(() => checkSchema(BadSchema)).toThrowError('Schema is invalid: VariantInput item "bad_variant" has no variants to choose from.');

    BadSchema = TopLevelItem([
        {
            tag: 'level_1',
            label: 'Something',
            isRequired: false,
            isArray: true,
            mbdbPath: 'something[]',
            input: [
                {
                    tag: 'level_2',
                    label: 'Something inside',
                    isRequired: false,
                    isArray: true,
                    input: 'string',
                    mbdbPath: 'something[]/something_else',
                }
            ]
        } as Item
    ]);
    expect(() => checkSchema(BadSchema)).toThrowError('Schema is invalid: Item "level_2" is nested in 2 array(s) in internal schema but in 1 array(s) in MBDB schema. Such a mismatch is not allowed.');
});
