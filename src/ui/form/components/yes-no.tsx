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

const Checkbox = React.memo(function _Checkbox({ id, checked, onChange }: { id: string, checked: boolean, onChange: SOnChange<SCheckboxProps> }) {
    return (
        <SCheckbox
            id={id}
            checked={checked}
            onChange={onChange}
        />
    );
}, (prevProps, nextProps) => {
    return (
        Object.is(prevProps.id, nextProps.id) &&
        Object.is(prevProps.checked, nextProps.checked)
    );
});


export type Props = {
    label: string,
    help?: Help,
    path: Path,
}

export function BooleanInput({ label, help, path }: Props) {
    const id = React.useMemo(() => PathId.toId(path), [path]);
    const { handler } = React.useContext(FormContextInstance);
    const onChange: SOnChange<SCheckboxProps> = (_ev, data) => {
        handler.set(path, Value.boolean(!!data.checked));
    };

    const checked = Value.toBoolean(handler.getValue(path, Value.boolean(false)));
    return (
        <>
            <ItemLabel label={label} help={help} id={id} />
            <Checkbox id={id} checked={checked} onChange={onChange} />
        </>
    );
}

const TristateOptions = [
    { value: 'true' as Tristate, text: 'Yes' },
    { value: 'false' as Tristate, text: 'No' },
    { value: 'not-set' as Tristate, text: '(Not set)' },
];
const YesNoUnset = React.memo(function _YesNoUnset({ id, value, onChange }: { id: string, value: Tristate, onChange: SOnChange<SDropdownProps> }) {
    return (
        <SDropdown
            id={id}
            value={value}
            options={TristateOptions}
            onChange={onChange}
            selection
            fluid
        />
    );
});

export function TristateInput({ label, help, path }: Props) {
    const id = React.useMemo(() => PathId.toId(path), [path]);
    const { handler } = React.useContext(FormContextInstance);
    const onChange: SOnChange<SDropdownProps> = React.useMemo(() => (_ev, data) => {
        handler.set(path, Value.tristate(data.value as Tristate));
    }, [path]);

    const v = Value.toTristate(handler.getValue(path, Value.tristate('not-set')));
    return (
        <>
            <ItemLabel label={label} help={help} id={id} />
            <YesNoUnset id={id} value={v} onChange={onChange} />
        </>
    );
}
