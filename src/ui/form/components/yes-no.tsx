import clsx from 'clsx';
import React from 'react';
import {
    Dropdown as SDropdown,
} from 'semantic-ui-react';
import { ItemLabel } from './label';
import { PathId } from '../path-id';
import { FormContextInstance } from '../../../context';
import { _FormContextHandler } from '../../../context/handler';
import { Help } from '../../../schema';
import { Path } from '../../../schema/data';
import { Tristate } from '../../../schema/tristate';
import { Value } from '../../../schema/value';

// BEWARE, BEWARE:
// This code uses a "pseudocontrolled" component to display and accept user input.
// This is done for performance reasons.
// See "num-text.ts" for details about why this works and why it is necessary.

export type Props = {
    label: string,
    path: Path,
    isDisabled: boolean,
    isRequired: boolean,
    help?: Help,
    noRightOffset?: boolean,
}

/*

The form currently uses the Tristate input everywhere to force the user to pick a value.
Let us keep this code around in case we ever change our mind

function booleanInitialState(handler: _FormContextHandler, path: Path) {
    const value = handler.getValue(path);
    return { checked: Value.toBoolean(value), isValid: value.isValid };
}

const _Checkbox = React.memo(function MCheckbox({ id, isDisabled, path, handler, noRightOffset }: {
    id: string,
    isDisabled: boolean,
    path: Path,
    handler: _FormContextHandler,
    noRightOffset?: boolean,
}) {
    const [localValue, setLocalValue] = React.useState(booleanInitialState(handler, path));
    const onChange: SOnChange<SCheckboxProps> = (_ev, data) => {
        const checked = !!data.checked;

        // Here we assume that the boolean value is always valid so we do not have to
        // trigger a model update to recalculate the validity of the form.
        handler.set(path, Value.boolean(checked), true);

        setLocalValue({ checked, isValid: localValue.isValid });
    };

    return (
        <SCheckbox
            className={clsx(!noRightOffset && 'mbdbi-right-offset')}
            id={id}
            checked={localValue.checked}
            onChange={onChange}
            disabled={isDisabled}
        />
    );
}, (prevProps, nextProps) => {
    return (
        Object.is(prevProps.id, nextProps.id) &&
        Object.is(prevProps.isDisabled, nextProps.isDisabled) &&
        Object.is(prevProps.path, nextProps.path) &&
        Object.is(prevProps.noRightOffset, nextProps.noRightOffset)
    );
});

export function BooleanInput({ label, help, isDisabled, path }: Props) {
    const id = React.useMemo(() => PathId.toId(path), [path]);
    const { handler } = React.useContext(FormContextInstance);

    return (
        <>
            <ItemLabel label={label} help={help} markAsRequired={true} id={id} />
            <_Checkbox
                id={id}
                isDisabled={isDisabled}
                path={path}
                handler={handler}
            />
        </>
    );
}
*/

function tristateInitialState(handler: _FormContextHandler, path: Path) {
    const value = handler.getValue(path);
    return { state: Value.toTristate(value), isValid: value.isValid };
}

const TristateOptions = [
    { value: Tristate.True, text: 'Yes' },
    { value: Tristate.False, text: 'No' },
    { value: Tristate.NotSet, text: '(Not set)' },
];
export const YesNoUnset = React.memo(function MYesNoUnset({ id, value, isValid, isDisabled, onChange, noRightOffset }: {
    id: string,
    value: Tristate
    isValid: boolean,
    isDisabled: boolean,
    onChange: (value: Tristate) => void,
    noRightOffset?: boolean,
}) {
    return (
        <SDropdown
            className={clsx(!noRightOffset && 'mbdbi-right-offset')}
            id={id}
            value={value}
            error={!isValid}
            options={TristateOptions}
            onChange={(_ev, data) => onChange(data.value as Tristate)}
            disabled={isDisabled}
            selection
        />
    );
}, (prevProps, nextProps) => {
    return (
        Object.is(prevProps.id, nextProps.id) &&
        Object.is(prevProps.value, nextProps.value) &&
        Object.is(prevProps.isValid, nextProps.isValid) &&
        Object.is(prevProps.isDisabled, nextProps.isDisabled) &&
        Object.is(prevProps.noRightOffset, nextProps.noRightOffset) &&
        Object.is(prevProps.onChange, nextProps.onChange)
    );
});

export function TristateInput({ label, help, isDisabled, isRequired, path }: Props) {
    const id = React.useMemo(() => PathId.toId(path), [path]);
    const { handler } = React.useContext(FormContextInstance);

    const [localValue, setLocalValue] = React.useState(tristateInitialState(handler, path));
    const onChange = React.useMemo(() => (state: Tristate) => {
        const newValue = Value.tristate(state, state === Tristate.NotSet && isRequired ? false : true);

        handler.set(path, newValue, newValue.isValid === localValue.isValid);
        setLocalValue({ state, isValid: newValue.isValid });
    }, [path, isRequired]);

    React.useEffect(() => {
        const value = handler.getValue(path);
        const state = Value.toTristate(value);
        if (state !== localValue.state || value.isValid !== localValue.isValid) {
            setLocalValue({ state, isValid: value.isValid });
        }
    });

    return (
        <>
            <ItemLabel label={label} help={help} markAsRequired={isRequired} id={id} />
            <YesNoUnset
                id={id}
                value={localValue.state}
                isValid={localValue.isValid}
                isDisabled={isDisabled}
                onChange={onChange}
            />
        </>
    );
}
