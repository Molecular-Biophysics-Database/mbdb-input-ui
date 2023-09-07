import clsx from 'clsx';
import React from 'react';
import {
    Input as SInput,
    InputProps as SInputProps,
} from 'semantic-ui-react';
import { ItemLabel } from './label';
import { SOnChange } from '../typedefs';
import { PathId } from '../path-id';
import { FormContextInstance } from '../../../context';
import { Help } from '../../../schema';
import { Path } from '../../../schema/data';
import { CommonValidators, Validator } from '../../../schema/validators';
import { Value } from '../../../schema/value';

const _TextualInput = React.memo(function MTextualInput({ id, value, isValid, isDisabled, onChange, noRightOffset }: {
    id: string,
    value: string,
    isValid: boolean,
    isDisabled: boolean,
    onChange: SOnChange<SInputProps>,
    noRightOffset?: boolean,
}) {
    return (
        <SInput
            className={clsx(!noRightOffset && 'mbdb-right-offset')}
            id={id}
            type='text'
            value={value}
            error={!isValid}
            onChange={onChange}
            disabled={isDisabled}
            fluid
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

type Props = {
    help?: Help,
    label: string,
    isRequired: boolean,
    isDisabled: boolean,
    path: Path,
    validator: Validator<string>,
    noRightOffset?: boolean,
};
export function TextualInput({ label, isRequired, isDisabled, help, path, validator, noRightOffset }: Props) {
    const id = React.useMemo(() => PathId.toId(path), [path]);
    const { handler } = React.useContext(FormContextInstance);
    const onChange: SOnChange<SInputProps> = React.useMemo(() => (_ev, data) => {
        const newValue = data.value;
        handler.set(path, Value.textual(newValue, validator ? validator(newValue) : true));
    }, [path]);

    const value = handler.getValue(path);
    return (
        <>
            <ItemLabel label={label} markAsRequired={isRequired} help={help} id={id} />
            <_TextualInput id={id} value={Value.toTextual(value)} isValid={value.isValid} isDisabled={isDisabled} noRightOffset={noRightOffset} onChange={onChange} />
        </>
    );
}

export function FloatInput(props: Props) {
    return <TextualInput {...props } />;
}

export function IntInput(props: Props) {
    return <TextualInput {...props } />;
}

export function StringInput(props: Props) {
    return <TextualInput {...props} />;
}

export function UrlInput(props: Omit<Props, 'validator'>) {
    return <TextualInput {...props} validator={CommonValidators.isUrl} />;
}
