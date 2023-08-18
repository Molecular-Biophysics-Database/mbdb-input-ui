import React from 'react';
import {
    Checkbox as SCheckbox,
} from 'semantic-ui-react';
import { CustomComponent, DataError } from '../';
import { PathId } from '../../path-id';
import { ItemLabel } from '../../components/label';
import { FloatInput } from '../../components/num-text';
import { FormContextInstance } from '../../../../context';
import { MbdbData } from '../../../../mbdb/data';
import { Data, DataTree, Path } from '../../../../schema/data';
import { Value } from '../../../../schema/value';
import { CommonValidators } from '../../../../schema/validators';

const Cell = { display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--mbdb-hgap)' };

function checkValue(data: DataTree, path: Path) {
    const v = Data.getValue(data, path);
    return v.isValid;
}

function validator(v: string) {
    return v === '' || CommonValidators.isFloat(v);
}

function setMbdbValueData(mbdbValue: Record<string, string | boolean>, data: DataTree, name: keyof ValueErrorData, parentPath: Path) {
    const v = Data.getValue(data, Data.Path.path(name, parentPath));
    if ((Value.isTextual(v) && v.payload !== '') || Value.isBoolean(v)) {
        mbdbValue[name] = v.payload;
    }
}

function setErrorData(mbdbData: MbdbData, name: keyof Omit<ValueErrorData, 'errors_are_relative'>, data: DataTree) {
    const err = mbdbData[name];
    if (err === undefined) {
        data[name] = Value.empty();
    } else {
        if (typeof err !== 'string') {
            throw new Error(`Value of "${name}" field in ValueError custom component was expected to be a string.`);
        }

        data[name] = Value.textual(err, false);
    }
}

export type ValueErrorData = {
    lower_error: Value,
    upper_error: Value,
    error_level: Value,
    errors_are_relative: Value,
};

export const ValueError: CustomComponent<ValueErrorData> = {
    applyInitialData(inData: DataTree) {
        const data: Partial<ValueErrorData> = {};

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

        if (Value.isValue(inData['errors_are_relative']) && Value.isBoolean(inData['errors_are_relative'])) {
            data.errors_are_relative = inData.errors_are_relative;
        } else {
            throw new Error('"errors_are_relative" value is invalid');
        }

        return data;
    },

    emptyData(): Partial<ValueErrorData> {
        return {
            lower_error: Value.empty(true),
            upper_error: Value.empty(true),
            error_level: Value.empty(true),
            errors_are_relative: Value.boolean(false),
        };
    },

    fromMbdb(mbdbData: MbdbData) {
        const out = {} as DataTree;

        setErrorData(mbdbData, 'lower_error', out);
        setErrorData(mbdbData, 'upper_error', out);
        setErrorData(mbdbData, 'error_level', out);

        // Yeah, I know...
        out['errors_are_relative'] = Value.boolean(!!mbdbData['errors_are_relative']);

        return out;
    },

    toMbdb(data: DataTree, path: Path, errors: DataError[]) {
        let bad = false;

        for (const name of ['lower_error', 'upper_error', 'error_level', 'errors_are_relative'] as (keyof ValueErrorData)[]) {
            let vPath = Data.Path.path(name, path)
            if (!checkValue(data, vPath)) {
                errors.push(DataError(vPath, 'Item has an invalid value. Check that the input is numeric and sensible.'));
                bad = false;
            }
        }

        if (bad) return {};

        const mbdbValue = {};
        setMbdbValueData(mbdbValue, data, 'lower_error', path);
        setMbdbValueData(mbdbValue, data, 'upper_error', path);
        setMbdbValueData(mbdbValue, data, 'error_level', path);
        setMbdbValueData(mbdbValue, data, 'errors_are_relative', path);

        return mbdbValue;
    },

    validateData(data: Partial<ValueErrorData>) {
        if (data.lower_error) data.lower_error.isValid = validator(Value.toTextual(data.lower_error));

        if (data.upper_error) data.upper_error.isValid = validator(Value.toTextual(data.upper_error));

        if (data.error_level) data.error_level.isValid = validator(Value.toTextual(data.error_level));
    },

    Component({ path, reactKey }) {
        const id = React.useMemo(() => PathId.toId(path), [path]);
        const idIsRel = React.useMemo(() => id + '_isRel', [path]);
        const { handler } = React.useContext(FormContextInstance);

        return (
            <React.Fragment key={reactKey}>
                <ItemLabel label='Value error' markAsRequired={false} id={id} />
                <div style={{ alignItems: 'center', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto 1fr', gap: 'var(--mbdb-hgap)', width: '100%'}}>
                    <div style={Cell}>
                        <FloatInput
                            label='Min'
                            help={{ en: 'TODO' }}
                            path={Data.Path.path('lower_error', path)}
                            validator={validator}
                            isRequired={false}
                        />
                    </div>
                    <div style={Cell}>
                        <FloatInput
                            label='Max'
                            help={{ en: 'TODO' }}
                            path={Data.Path.path('upper_error', path)}
                            validator={validator}
                            isRequired={false}
                        />
                    </div>
                    <div style={Cell}>
                        <FloatInput
                            label='Error level'
                            help={{ en: 'TODO' }}
                            path={Data.Path.path('error_level', path)}
                            validator={validator}
                            isRequired={false}
                        />
                    </div>
                    <ItemLabel id={idIsRel} markAsRequired={false} label='Errors are relative' />
                    <SCheckbox
                        id={idIsRel}
                        checked={Value.toBoolean(handler.getValue(Data.Path.path('errors_are_relative', path)))}
                        onChange={(_ev, data) => {
                            const checked = !!data.checked;
                            handler.set(Data.Path.path('errors_are_relative', path), Value.boolean(checked));
                        }}
                    />
                </div>
            </React.Fragment>
        );
    },
}
