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

const MTextualInput = React.memo(function MTextualInput({ id, value, isValid, onChange }: { id: string, value: string, isValid: boolean, onChange: SOnChange<SInputProps> }) {
    return (
        <SInput
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
        Object.is(prevProps.isValid, nextProps.isValid)
    );
});

type Props = {
    help?: Help,
    label: string,
    path: Path,
    validator: Validator,
};
export function TextualInput({ label, help, path, validator }: Props) {
    const id = React.useMemo(() => PathId.toId(path), [path]);
    const { handler } = React.useContext(FormContextInstance);
    const onChange: SOnChange<SInputProps> = (_ev, data) => {
        const newValue = data.value;
        handler.set(path, Value.value(newValue, validator ? validator(newValue) : true));
    };

    const value = handler.getValue(path);
    return (
        <>
            <ItemLabel label={label} help={help} id={id} />
            <MTextualInput id={id} value={Value.toTextual(value)} isValid={value.isValid} onChange={onChange} />
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
