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
import { _FormContextHandler } from '../../../context/handler';
import { Help } from '../../../schema';
import { Path } from '../../../schema/data';
import { CommonValidators, Validator } from '../../../schema/validators';
import { Value } from '../../../schema/value';

function initialState(handler: _FormContextHandler, path: Path) {
    const value = handler.getValue(path);

    return { text: Value.toTextual(value), isValid: value.isValid };
}

const _TextualInput = React.memo(function MTextualInput({ label, isDisabled, isRequired, validator, path, handler, help, noRightOffset, alwaysUpdate }: {
    label: string,
    isDisabled: boolean,
    isRequired: boolean,
    validator: Validator<string>,
    path: Path,
    handler: _FormContextHandler,
    help?: Help,
    noRightOffset?: boolean,
    alwaysUpdate?: boolean
}) {
    // BEWARE, BEWARE:
    // The code below is something of a React antipattern.
    // Instead of using the data from the model directly, we create a local copy and use that
    // to exchange between us and the SInput element.
    // We also write the data back to the model too but we do not ask the model to trigger an update.
    // A model update triggers a re-render of the entire form and if the form contains too much data,
    // the re-render is very slow. Re-rendering of the entire form whenever a value of a single text box
    // changes is unnecessary unless the validity of the input changes. If the validity does change,
    // we trigger a model update.
    const [localValue, setLocalValue] = React.useState(initialState(handler, path));
    const onChange: SOnChange<SInputProps> = (_ev, data) => {
        const newValue = Value.textual(data.value, validator ? validator(data.value) : true);
        handler.set(path, newValue, newValue.isValid === localValue.isValid && !alwaysUpdate);
        setLocalValue({ text: data.value, isValid: newValue.isValid });
    };
    const id = React.useMemo(() => PathId.toId(path), [path]);
    React.useEffect(() => {
        const value = handler.getValue(path);
        const text = Value.toTextual(value);
        if (text !== localValue.text || value.isValid !== localValue.isValid) {
            setLocalValue({ text, isValid: value.isValid });
        }
    }, [path]);

    return (
        <>
            <ItemLabel label={label} markAsRequired={isRequired} help={help} id={id} />
            <SInput
                className={clsx(!noRightOffset && 'mbdb-right-offset')}
                id={id}
                type='text'
                value={localValue.text}
                error={!localValue.isValid}
                onChange={onChange}
                disabled={isDisabled}
                fluid
            />
        </>
    );
}, (prevProps, nextProps) => {
    return (
        Object.is(prevProps.label, nextProps.label) &&
        Object.is(prevProps.isDisabled, nextProps.isDisabled) &&
        Object.is(prevProps.isRequired, nextProps.isRequired) &&
        Object.is(prevProps.noRightOffset, nextProps.noRightOffset) &&
        Object.is(prevProps.validator, nextProps.validator) &&
        Object.is(prevProps.path, nextProps.path) // We cannot safely check just for path equality here because that would break re-rendering if we were inside an array
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
    alwaysUpdate?: boolean,
};
export function TextualInput(props: Props) {
    const { handler } = React.useContext(FormContextInstance);

    return (
        <>
            <_TextualInput
                label={props.label}
                isDisabled={props.isDisabled}
                isRequired={props.isRequired}
                noRightOffset={props.noRightOffset}
                validator={props.validator}
                path={props.path}
                handler={handler}
                help={props.help}
                alwaysUpdate={props.alwaysUpdate}
            />
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
