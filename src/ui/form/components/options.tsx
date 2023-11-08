import clsx from 'clsx';
import React from 'react';
import {
    Dropdown as SDropdown,
    Input as SInput,
    InputProps as SInputProps,
} from 'semantic-ui-react';
import { ItemLabel } from './label';
import { PathId } from '../path-id';
import { niceLabel } from '../util';
import { SOnChange } from '../typedefs';
import { assert } from '../../../assert';
import { FormContextInstance } from '../../../context';
import { _FormContextHandler } from '../../../context/handler';
import { Choice, Help, OptionsItem, Schema } from '../../../schema';
import { Path } from '../../../schema/data';
import { Value } from '../../../schema/value';
import { CommonValidators } from '../../../schema/validators';

// BEWARE, BEWARE:
// This code uses a "pseudocontrolled" component to display and accept user input.
// This is done for performance reasons.
// See "num-text.ts" for details about why this works and why it is necessary.

const BorderStyle = { border: '1px solid #ccc' };
const PadStyle = { padding: '10px' };

function initialState(handler: _FormContextHandler, path: Path) {
    const value = handler.getValue(path);
    return { tag: Value.toOption(value), isValid: value.isValid };
}

type Option = { key: number, text: string, value: string };
function mkOptions(choices: OptionsItem['choices'], dontTransform: boolean): Option[] {
    const opts = choices.map((choice, idx) => ({
        key: idx,
        text: niceLabel(choice.title, dontTransform),
        value: choice.tag,
    }));
    opts.push({ key: opts.length, text: '(Not set)', value: Schema.EmptyChoice });

    return opts;
};

const _Selection = React.memo(function MSelection({ id, options, value, isValid, noRightOffset, isDisabled, onChange }: {
    id: string,
    options: Option[],
    value: string,
    isValid: boolean,
    isDisabled: boolean,
    isRequired: boolean,
    onChange: (value: string) => void,
    noRightOffset?: boolean,
    dontTransformContent?: boolean,
}) {
    return (
        <SDropdown
            className={clsx(!noRightOffset && 'mbdbi-right-offset')}
            id={id}
            options={options}
            value={value}
            error={!isValid}
            onChange={(_ev, data) => onChange(data.value as string)}
            disabled={isDisabled}
            selection
        />
    );
}, (prevProps, nextProps) => {
    return (
        Object.is(prevProps.id, nextProps.id) &&
        Object.is(prevProps.options, nextProps.options) &&
        Object.is(prevProps.value, nextProps.value) &&
        Object.is(prevProps.isValid, nextProps.isValid) &&
        Object.is(prevProps.isDisabled, nextProps.isDisabled) &&
        Object.is(prevProps.isRequired, nextProps.isRequired) &&
        Object.is(prevProps.noRightOffset, nextProps.noRightOffset) &&
        Object.is(prevProps.dontTransformContent, nextProps.dontTransformContent) &&
        Object.is(prevProps.onChange, nextProps.onChange)
    );
});

export type Props = {
    choices: Choice[],
    label: string,
    help?: Help,
    path: Path,
    isDisabled: boolean,
    isRequired: boolean,
    dontTransformContent?: boolean,
    noRightOffset?: boolean,
}

export function OptionsInput(props: Props) {
    const id = React.useMemo(() => PathId.toId(props.path), [props.path]);
    const { handler } = React.useContext(FormContextInstance);

    const [localValue, setLocalValue] = React.useState(initialState(handler, props.path));

    const opts = React.useMemo(() => {
        return mkOptions(props.choices, !!props.dontTransformContent);
    }, [props.choices, props.dontTransformContent]);
    const onChange = React.useMemo(() => (tag: string) => {
        const choice = props.choices.find((c) => c.tag === tag);
        assert(choice !== undefined || tag === Schema.EmptyChoice, `No choice with tag "${tag}"`);

        const newValue = tag === Schema.EmptyChoice ? Value.emptyOption(!props.isRequired) : Value.option(tag);
        handler.set(props.path, newValue, newValue.isValid === localValue.isValid);
        setLocalValue({ tag, isValid: newValue.isValid });
    }, [props.path, props.choices, props.isRequired]);

    React.useEffect(() => {
        const value = handler.getValue(props.path);
        const tag = Value.toOption(value);
        if (tag !== localValue.tag || value.isValid !== localValue.isValid) {
            setLocalValue({ tag, isValid: value.isValid });
        }
    });

    return (
        <>
            <ItemLabel label={props.label} help={props.help} markAsRequired={props.isRequired} id={id} />
            <_Selection
                id={id}
                options={opts}
                value={localValue.tag}
                isValid={localValue.isValid}
                isDisabled={props.isDisabled}
                isRequired={props.isRequired}
                onChange={onChange}
                noRightOffset={props.noRightOffset}
                dontTransformContent={props.dontTransformContent}
            />
        </>
    );
}

export function OptionsWithOtherInput(props: Props) {
    const id = React.useMemo(() => PathId.toId(props.path), [props.path]);
    const { handler } = React.useContext(FormContextInstance);

    const value = handler.getValue(props.path);
    assert(Value.isOption(value), 'Expected an Option value');

    // Mind that that this localValue stores only the value for the Selection componennt
    // "Other choice" is retrieved and stored directly with no memoization.
    // This might benefit from optimization should the need arise
    const [localValue, setLocalValue] = React.useState(initialState(handler, props.path));

    const opts = React.useMemo(() => {
        return mkOptions(props.choices, !!props.dontTransformContent);
    }, [props.choices, props.dontTransformContent]);

    const onChange = React.useMemo(() => (tag: string) => {
        const choice = props.choices.find((c) => c.tag === tag);
        assert(choice !== undefined || tag === Schema.EmptyChoice, `No choice with tag "${tag}"`);

        const newValue = tag === Schema.EmptyChoice ? Value.emptyOption(!props.isRequired) : Value.option(tag);
        handler.set(props.path, newValue, newValue.isValid === localValue.isValid);
        setLocalValue({ tag, isValid: newValue.isValid });
    }, [opts, props.isRequired, props.path]);

    const onChangeText: SOnChange<SInputProps> = (_ev, data) => {
        const v = data.value as string;
        handler.set(props.path, Value.option(Schema.OtherChoice, v), CommonValidators.isSet(v));
    };

    React.useEffect(() => {
        const value = handler.getValue(props.path);
        const tag = Value.toOption(value);
        if (tag !== localValue.tag || value.isValid !== localValue.isValid) {
            setLocalValue({ tag, isValid: value.isValid });
        }
    });

    return (
        <>
            <ItemLabel label={props.label} help={props.help} markAsRequired={props.isRequired} id={id} />
            <_Selection
                id={id}
                options={opts}
                value={localValue.tag}
                isValid={localValue.isValid}
                isDisabled={props.isDisabled}
                isRequired={props.isRequired}
                onChange={onChange}
                noRightOffset={props.noRightOffset}
                dontTransformContent={props.dontTransformContent}
            />
            {Schema.isOtherChoice(value)
                ? (
                    <div style={{ ...BorderStyle, ...PadStyle }}>
                        <SInput
                            className={clsx(!props.noRightOffset && 'mbdbi-right-offset')}
                            id={id}
                            type='text'
                            value={Value.toOtherOption(value)}
                            error={false}
                            onChange={onChangeText}
                        />
                    </div>
                )
                : null
            }
        </>
    );
}
