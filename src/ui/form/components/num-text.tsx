import clsx from 'clsx';
import React from 'react';
import {
    Input as SInput,
} from 'semantic-ui-react';
import { ItemLabel } from './label';
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

const _TextualInput = React.memo(function MTextualInput({ id, isDisabled, text, isValid, onChange, noRightOffset }: {
    id: string,
    isDisabled: boolean,
    text: string,
    isValid: boolean,
    onChange: (text: string) => void,
    noRightOffset?: boolean,
}) {
    return (
        <SInput
            className={clsx(!noRightOffset && 'mbdbi-right-offset')}
            id={id}
            type='text'
            value={text}
            error={!isValid}
            onChange={(_ev, data) => {
                onChange(data.value)
            }}
            disabled={isDisabled}
            fluid
        />
    );
}, (prevProps, nextProps) => {
    return (
        Object.is(prevProps.id, nextProps.id) &&
        Object.is(prevProps.isDisabled, nextProps.isDisabled) &&
        Object.is(prevProps.text, nextProps.text) &&
        Object.is(prevProps.isValid, nextProps.isValid) &&
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
    alwaysUpdate?: boolean,
};
export function TextualInput(props: Props) {
    const id = React.useMemo(() => PathId.toId(props.path), [props.path]);
    const { handler } = React.useContext(FormContextInstance);

    // BEWARE, BEWARE:
    // The code below is something of a React antipattern.
    // Instead of using the data from the model directly, we create a local copy and use that
    // to exchange between us and the SInput element.
    // We also write the data back to the model too but we do not ask the model to trigger an update.
    // A model update triggers a re-render of the entire form and if the form contains too much data,
    // the re-render is very slow. Re-rendering of the entire form whenever a value of a single text box
    // changes is unnecessary unless the validity of the input changes. If the validity does change,
    // we trigger a model update.
    // We are effectivelly using a "pseudocontrolled" component that manages its own value but always
    // synchronizes is with the model.
    //
    // WARNING: The text above is referenced in other parts of code. Keep that in mind if you
    //          modify it.
    const [localValue, setLocalValue] = React.useState(initialState(handler, props.path));

    const onChange = React.useMemo(() => (text: string) => {
        const newValue = Value.textual(text, props.validator ? props.validator(text) : true);
        handler.set(props.path, newValue, newValue.isValid === localValue.isValid && !props.alwaysUpdate);
        setLocalValue({ text, isValid: newValue.isValid });
    }, [props.path, props.validator, props.alwaysUpdate]);

    React.useEffect(() => {
        const value = handler.getValue(props.path);
        const text = Value.toTextual(value);
        if (text !== localValue.text || value.isValid !== localValue.isValid) {
            setLocalValue({ text, isValid: value.isValid });
        }
    });

    return (
        <>
            <ItemLabel label={props.label} markAsRequired={props.isRequired} help={props.help} id={id} />
            <_TextualInput
                id={id}
                isDisabled={props.isDisabled}
                text={localValue.text}
                isValid={localValue.isValid}
                onChange={onChange}
                noRightOffset={props.noRightOffset}
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