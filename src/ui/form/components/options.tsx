import clsx from 'clsx';
import React from 'react';
import {
    Dropdown as SDropdown,
    DropdownProps as SDropdownProps,
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

const BorderStyle = { border: '1px solid #ccc' };
const PadStyle = { padding: '10px' };

function initialState(handler: _FormContextHandler, path: Path) {
    const value = handler.getValue(path);
    return { tag: Value.toOption(value), isValid: value.isValid };
}

function mkOptions(choices: OptionsItem['choices'], dontTransform: boolean) {
    const opts = choices.map((choice, idx) => ({
        key: idx,
        text: niceLabel(choice.title, dontTransform),
        value: choice.tag,
    }));
    opts.push({ key: opts.length, text: '(Not set)', value: Schema.EmptyChoice });

    return opts;
};

const _Selection = React.memo(function MSelection({ id, choices, noRightOffset, isDisabled, isRequired, path, handler, dontTransformContent }: {
    id: string,
    choices: Choice[],
    isDisabled: boolean,
    isRequired: boolean,
    path: Path,
    handler: _FormContextHandler,
    noRightOffset?: boolean,
    dontTransformContent?: boolean,
}) {
    const opts = React.useMemo(() => {
        return mkOptions(choices, !!dontTransformContent);
    }, [choices, dontTransformContent]);
    const [localValue, setLocalValue] = React.useState(initialState(handler, path));
    const onChange: SOnChange<SDropdownProps> = (_ev, data) => {
        const tag = data.value as string;
        const choice = choices.find((c) => c.tag === tag);
        assert(choice !== undefined || tag === Schema.EmptyChoice, `No choice with tag "${tag}"`);

        const newValue = tag === Schema.EmptyChoice ? Value.emptyOption(!isRequired) : Value.option(tag);
        handler.set(path, newValue, newValue.isValid === localValue.isValid);
        setLocalValue({ tag, isValid: newValue.isValid });
    };
    React.useEffect(() => {
        const value = handler.getValue(path);
        const tag = Value.toOption(value);
        if (tag !== localValue.tag || value.isValid !== localValue.isValid) {
            setLocalValue({ tag, isValid: value.isValid });
        }
    }, [path]);

    return (
        <SDropdown
            className={clsx(!noRightOffset && 'mbdb-right-offset')}
            id={id}
            value={localValue.tag}
            onChange={onChange}
            options={opts}
            error={!localValue.isValid}
            disabled={isDisabled}
            selection
        />
    );
}, (prevProps, nextProps) => {
    return (
        Object.is(prevProps.id, nextProps.id) &&
        Object.is(prevProps.choices, nextProps.choices) &&
        Object.is(prevProps.isDisabled, nextProps.isDisabled) &&
        Object.is(prevProps.isRequired, nextProps.isRequired) &&
        Object.is(prevProps.path, nextProps.path) &&
        Object.is(prevProps.noRightOffset, nextProps.noRightOffset) &&
        Object.is(prevProps.dontTransformContent, nextProps.dontTransformContent)
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

    return (
        <>
            <ItemLabel label={props.label} help={props.help} markAsRequired={props.isRequired} id={id} />
            <_Selection
                id={id}
                choices={props.choices}
                isDisabled={props.isDisabled}
                isRequired={props.isRequired}
                handler={handler}
                path={props.path}
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

    const onChangeText: SOnChange<SInputProps> = (_ev, data) => {
        const v = data.value as string;
        handler.set(props.path, Value.option(Schema.OtherChoice, v), CommonValidators.isSet(v));
    };

    return (
        <>
            <ItemLabel label={props.label} help={props.help} markAsRequired={props.isRequired} id={id} />
            <_Selection
                id={id}
                choices={props.choices}
                isDisabled={props.isDisabled}
                isRequired={props.isRequired}
                handler={handler}
                path={props.path}
                noRightOffset={props.noRightOffset}
                dontTransformContent={props.dontTransformContent}
            />
            {Schema.isOtherChoice(value)
                ? (
                    <div style={{ ...BorderStyle, ...PadStyle }}>
                        <SInput
                            className={clsx(!props.noRightOffset && 'mbdb-right-offset')}
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
