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
import { Validator } from '../../../schema/validators';
import { Value } from '../../../schema/value';

const _TextualInput = React.memo(function MTextualInput({ id, value, isValid, onChange, noRightOffset }: {
    id: string,
    value: string,
    isValid: boolean,
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
            fluid
        />
    );
}, (prevProps, nextProps) => {
    return (
        Object.is(prevProps.id, nextProps.id) &&
        Object.is(prevProps.value, nextProps.value) &&
        Object.is(prevProps.isValid, nextProps.isValid) &&
        Object.is(prevProps.noRightOffset, nextProps.noRightOffset) &&
        Object.is(prevProps.onChange, nextProps.onChange)
    );
});

type Props = {
    help?: Help,
    label: string,
    isRequired: boolean,
    path: Path,
    validator: Validator<string>,
    noRightOffset?: boolean,
};
export function TextualInput({ label, isRequired, help, path, validator, noRightOffset }: Props) {
    const id = React.useMemo(() => PathId.toId(path), [path]);
    const { handler } = React.useContext(FormContextInstance);
    const onChange: SOnChange<SInputProps> = React.useMemo(() => (_ev, data) => {
        const newValue = data.value;
        handler.set(path, Value.value(newValue, validator ? validator(newValue) : true));
    }, [path]);

    const value = handler.getValue(path);
    return (
        <>
            <ItemLabel label={label} markAsRequired={isRequired} help={help} id={id} />
            <_TextualInput id={id} value={Value.toTextual(value)} isValid={value.isValid} noRightOffset={noRightOffset} onChange={onChange} />
        </>
    );
}

export function FloatInput(props: Props) {
    return <TextualInput {...props }/>;
}

export function IntInput(props: Props) {
    return <TextualInput {...props }/>;
}

export function StringInput(props: Props) {
    return <TextualInput {...props} />;
}
