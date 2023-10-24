import React from 'react';
import {
    Checkbox as SCheckbox,
} from 'semantic-ui-react';
import { CustomComponent, DataError } from '../';
import { PathId } from '../../path-id';
import { ItemLabel } from '../../components/label';
import { FloatInput } from '../../components/num-text';
import { YesNoUnset } from '../../components/yes-no';
import { FormContextInstance } from '../../../../context';
import { MbdbData } from '../../../../mbdb/data';
import { Options } from '../../../../mbdb/deserialize';
import { Help, Schema } from '../../../../schema';
import { Data, DataTree, Path } from '../../../../schema/data';
import { Tristate } from '../../../../schema/tristate';
import { Value } from '../../../../schema/value';
import { CommonValidators } from '../../../../schema/validators';

const Cell = { display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--mbdbi-hgap)' };

const Required: { [key in keyof Omit<ValueErrorData, '__mbdb_group_marked_empty'>]: boolean } = {
    lower_error: true,
    upper_error: true,
    error_level: true,
    errors_are_relative: false
};

function checkValue(data: DataTree, path: Path) {
    const v = Data.getValue(data, path);
    return v.isValid;
}

function getHelp(help: Help | undefined, key: string): Help | undefined {
    // We must know what the help structure in the UI schema definition looks like so we can afford these shortcuts
    if (!help) return void 0;

    return help?.[key] as Record<string, string>;
}

function validatorRequired(v: string) {
    return CommonValidators.isFloat(v);
}

function setMbdbValueData(mbdbValue: Record<string, number | boolean>, data: DataTree, name: keyof ValueErrorData, parentPath: Path) {
    const v = Data.getValue(data, Data.Path.path(name, parentPath));
    if (Value.isTextual(v) && v.payload !== '') {
        mbdbValue[name] = parseFloat(v.payload);
    } else if (Value.isTristate(v)) {
        const ts = Value.toTristate(v);
        if (ts !== Tristate.NotSet)
            mbdbValue[name] = ts === Tristate.True ? true : false;
    }
}

function setErrorData(mbdbData: MbdbData, name: keyof Omit<ValueErrorData, 'errors_are_relative' | '__mbdb_group_marked_empty'>, data: DataTree, options: Options) {
    const err = mbdbData[name];
    if (err === undefined) {
        if (options?.allowPartials || !Required[name])
            data[name] = Value.empty();
        else
            throw new Error(`Value of "${name}" field in ValueError custom component cannot be empty.`);
    } else {
        if (typeof err !== 'number') {
            throw new Error(`Value of "${name}" field in ValueError custom component was expected to be a number.`);
        }

        data[name] = Value.textual(err.toString(), false);
    }
}

export type ValueErrorData = {
    __mbdb_group_marked_empty: boolean,
    lower_error: Value,
    upper_error: Value,
    error_level: Value,
    errors_are_relative: Value,
};

export const ValueError: CustomComponent<ValueErrorData> = {
    applyInitialData(inData: DataTree) {
        const data: Partial<ValueErrorData> = {};

        data.__mbdb_group_marked_empty = !!inData.__mbdb_group_marked_empty;

        if (Value.isValue(inData['lower_error']) && Value.isTextual(inData['lower_error'])) {
            data.lower_error = inData.lower_error;
        } else {
            throw new Error('"lower_error" value is invalid');
        }

        if (Value.isValue(inData['upper_error']) && Value.isTextual(inData['upper_error'])) {
            data.upper_error = inData.upper_error;
        } else {
            throw new Error('"upper_error" value is invalid');
        }

        if (Value.isValue(inData['error_level']) && Value.isTextual(inData['error_level'])) {
            data.error_level = inData.error_level;
        } else {
            throw new Error('"error_level" value is invalid');
        }

        if (Value.isValue(inData['errors_are_relative']) && Value.isTristate(inData['errors_are_relative'])) {
            data.errors_are_relative = inData.errors_are_relative;
        } else {
            throw new Error('"errors_are_relative" value is invalid');
        }

        return data;
    },

    emptyData(markAsEmpty: boolean): Partial<ValueErrorData> {
        return {
            [Schema.GroupMarkedEmpty]: markAsEmpty,
            lower_error: Value.empty(!Required.lower_error),
            upper_error: Value.empty(!Required.upper_error),
            error_level: Value.empty(!Required.error_level),
            errors_are_relative: Value.tristate(Tristate.NotSet, !Required.errors_are_relative),
        };
    },

    hasErrors(data: DataTree) {
        if (!!data.__mbdb_group_marked_empty) return false;

        if (!Value.isValue(data.lower_error) || !data.lower_error.isValid) return true;
        if (!Value.isValue(data.upper_error) || !data.upper_error.isValid) return true;
        if (!Value.isValue(data.error_level) || !data.error_level.isValid) return true;

        return false;
    },

    fromMbdb(mbdbData: MbdbData, options: Options) {
        const out = {} as DataTree;

        setErrorData(mbdbData, 'lower_error', out, options);
        setErrorData(mbdbData, 'upper_error', out, options);
        setErrorData(mbdbData, 'error_level', out, options);

        const errRel = mbdbData['errors_are_relative'];
        if (errRel === undefined) {
            out['errors_are_relative'] = Value.tristate(Tristate.NotSet, true);
        } else {
            if (typeof errRel !== 'boolean') {
                throw new Error(`Value of "errors_are_relative" field in ValueError custom component was expected to be a number.`);
            }
            out['errors_are_relative'] = Value.tristate(errRel ? Tristate.True : Tristate.False, true);
        }

        return out;
    },

    toMbdb(data: DataTree, path: Path, errors: DataError[]) {
        let bad = false;

        const _data = Data.getTree(data, path);
        if (!!_data.__mbdb_group_marked_empty) return void 0;

        for (const name of ['lower_error', 'upper_error', 'error_level', 'errors_are_relative'] as (keyof ValueErrorData)[]) {
            let vPath = Data.Path.path(name, path)
            if (!checkValue(data, vPath)) {
                errors.push(DataError(vPath, 'Item has an invalid value. Check that the input is numeric and sensible.'));
                bad = true;
            }
        }

        if (bad) return void 0;

        const mbdbValue = {};
        setMbdbValueData(mbdbValue, data, 'lower_error', path);
        setMbdbValueData(mbdbValue, data, 'upper_error', path);
        setMbdbValueData(mbdbValue, data, 'error_level', path);
        setMbdbValueData(mbdbValue, data, 'errors_are_relative', path);

        return mbdbValue;
    },

    validateData(data: Partial<ValueErrorData>) {
        if (data.lower_error) data.lower_error.isValid = validatorRequired(Value.toTextual(data.lower_error));

        if (data.upper_error) data.upper_error.isValid = validatorRequired(Value.toTextual(data.upper_error));

        if (data.error_level) data.error_level.isValid = validatorRequired(Value.toTextual(data.error_level));
    },

    Component({ path, isDisabled, help, reactKey }) {
        const id = React.useMemo(() => PathId.toId(path), [path]);
        const idIsRel = React.useMemo(() => id + '_isRel', [path]);
        const { handler } = React.useContext(FormContextInstance);
        const isMarkedEmpty = handler.isGroupMarkedEmpty(path);

        return (
            <React.Fragment key={reactKey}>
                <ItemLabel label='Value error' markAsRequired={false} id={id} />
                <div style={{ alignItems: 'center', display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr auto 1fr', gap: 'var(--mbdbi-hgap)', width: '100%'}}>
                    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 'var(--mbdbi-hgap)' }}>
                        <SCheckbox
                            checked={isMarkedEmpty}
                            onChange={(_ev, data) => {
                                handler.markGroupEmpty(!!data.checked, path);
                                handler.update();
                            }}
                        />
                        <div>(Do not provide this data)</div>
                    </div>
                    <div style={Cell}>
                        <FloatInput
                            label='Min'
                            help={getHelp(help, 'lower_error')}
                            path={Data.Path.path('lower_error', path)}
                            validator={(v) => isMarkedEmpty || isDisabled ? true : validatorRequired(v)}
                            isRequired={Required.lower_error}
                            isDisabled={isMarkedEmpty || isDisabled}
                        />
                    </div>
                    <div style={Cell}>
                        <FloatInput
                            label='Max'
                            help={getHelp(help, 'upper_error')}
                            path={Data.Path.path('upper_error', path)}
                            validator={(v) => isMarkedEmpty || isDisabled ? true : validatorRequired(v)}
                            isRequired={Required.upper_error}
                            isDisabled={isMarkedEmpty || isDisabled}
                        />
                    </div>
                    <div style={Cell}>
                        <FloatInput
                            label='Error level'
                            help={getHelp(help, 'error_level')}
                            path={Data.Path.path('error_level', path)}
                            validator={(v) => isMarkedEmpty || isDisabled ? true : validatorRequired(v)}
                            isRequired={Required.upper_error}
                            isDisabled={isMarkedEmpty || isDisabled}
                        />
                    </div>
                    <ItemLabel id={idIsRel} markAsRequired={false} help={getHelp(help, 'errors_are_relative')} label='Errors are relative' />
                    <YesNoUnset
                        id={idIsRel}
                        isDisabled={isMarkedEmpty || isDisabled}
                        isRequired={Required.errors_are_relative}
                        path={Data.Path.path('errors_are_relative', path)}
                        handler={handler}
                    />
                </div>
            </React.Fragment>
        );
    },
}
