import clsx from 'clsx';
import React from 'react';
import {
    Checkbox as SCheckbox,
    CheckboxProps as SCheckboxProps,
    Dropdown as SDropdown,
    DropdownProps as SDropdownProps
} from 'semantic-ui-react';
import { ItemLabel } from './label';
import { PathId } from '../path-id';
import { SOnChange } from '../typedefs';
import { FormContextInstance } from '../../../context';
import { Help } from '../../../schema';
import { Path } from '../../../schema/data';
import { Tristate } from '../../../schema/tristate';
import { Value } from '../../../schema/value';

const Checkbox = React.memo(function _Checkbox({ id, checked, onChange, isDisabled, noRightOffset }: {
    id: string,
    checked: boolean,
    onChange: SOnChange<SCheckboxProps>,
    isDisabled: boolean,
    noRightOffset?: boolean,
}) {
    return (
        <SCheckbox
            className={clsx(!noRightOffset && 'mbdb-right-offset')}
            id={id}
            checked={checked}
            onChange={onChange}
            disabled={isDisabled}
        />
    );
}, (prevProps, nextProps) => {
    return (
        Object.is(prevProps.id, nextProps.id) &&
        Object.is(prevProps.checked, nextProps.checked) &&
        Object.is(prevProps.isDisabled, nextProps.isDisabled)
    );
});


export type Props = {
    label: string,
    path: Path,
    isDisabled: boolean,
    help?: Help,
    noRightOffset?: boolean,
}

export function BooleanInput({ label, help, isDisabled, path }: Props) {
    const id = React.useMemo(() => PathId.toId(path), [path]);
    const { handler } = React.useContext(FormContextInstance);
    const onChange: SOnChange<SCheckboxProps> = (_ev, data) => {
        handler.set(path, Value.boolean(!!data.checked));
    };

    const checked = Value.toBoolean(handler.getValue(path, Value.boolean(false)));
    return (
        <>
            <ItemLabel label={label} help={help} markAsRequired={true} id={id} />
            <Checkbox id={id} checked={checked} onChange={onChange} isDisabled={isDisabled} />
        </>
    );
}

const TristateOptions = [
    { value: 'true' as Tristate, text: 'Yes' },
    { value: 'false' as Tristate, text: 'No' },
    { value: 'not-set' as Tristate, text: '(Not set)' },
];
const YesNoUnset = React.memo(function _YesNoUnset({ id, value, onChange, isDisabled, noRightOffset }: {
    id: string,
    value: Tristate,
    onChange: SOnChange<SDropdownProps>,
    isDisabled: boolean,
    noRightOffset?: boolean,
}) {
    return (
        <SDropdown
            className={clsx(!noRightOffset && 'mbdb-right-offset')}
            id={id}
            value={value}
            options={TristateOptions}
            onChange={onChange}
            disabled={isDisabled}
            selection
        />
    );
});

export function TristateInput({ label, help, isDisabled, path }: Props) {
    const id = React.useMemo(() => PathId.toId(path), [path]);
    const { handler } = React.useContext(FormContextInstance);
    const onChange: SOnChange<SDropdownProps> = React.useMemo(() => (_ev, data) => {
        handler.set(path, Value.tristate(data.value as Tristate));
    }, [path]);

    const v = Value.toTristate(handler.getValue(path, Value.tristate('not-set')));
    return (
        <>
            <ItemLabel label={label} help={help} markAsRequired={false} id={id} />
            <YesNoUnset id={id} value={v} onChange={onChange} isDisabled={isDisabled} />
        </>
    );
}
