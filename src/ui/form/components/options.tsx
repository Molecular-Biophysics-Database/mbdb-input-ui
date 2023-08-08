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
import { Choice, Help, OptionsItem, Schema } from '../../../schema';
import { Path } from '../../../schema/data';
import { Value } from '../../../schema/value';
import { CommonValidators } from '../../../schema/validators';

type Option = {
    key: number,
    text: string,
    value: string,
};

const BorderStyle = { border: '1px solid #ccc' };
const PadStyle = { padding: '10px' };

function mkOptions(choices: OptionsItem['choices'], dontTransform: boolean, emptyOption: boolean) {
    const opts = choices.map((choice, idx) => ({
        key: idx,
        text: niceLabel(choice.title, dontTransform),
        value: choice.tag,
    }));
    if (emptyOption) opts.push({ key: opts.length, text: '(Not set)', value: Schema.EmptyOptionValue });

    return opts;
};

const Selection = React.memo(function _Selection({ id, onChange, options, value }: { id: string, onChange: SOnChange<SDropdownProps>, options: Option[], value: string }) {
    return (
        <SDropdown
            id={id}
            value={value}
            onChange={onChange}
            options={options}
            selection
            fluid
        />
    );
}, (prevProps, nextProps) => {
    return (
        Object.is(prevProps.id, nextProps.id) &&
        Object.is(prevProps.options, nextProps.options) &&
        Object.is(prevProps.value, nextProps.value)
    );
});

export type Props = {
    choices: Choice[],
    label: string,
    help?: Help,
    path: Path,
    dontTransformContent?: boolean,
    isRequired: boolean,
}

export function OptionsInput(props: Props) {
    const id = React.useMemo(() => PathId.toId(props.path), [props.path]);
    const opts = React.useMemo(() => {
        return mkOptions(props.choices, !!props.dontTransformContent, !props.isRequired);
    }, [props.choices]);
    const { handler } = React.useContext(FormContextInstance);
    const onChange: SOnChange<SDropdownProps> = (_ev, data) => {
        const tag = data.value as string;
        const choice = props.choices.find((c) => c.tag === tag);
        assert(choice !== undefined || (tag === Schema.EmptyOptionValue && !props.isRequired), `No choice with tag "${tag}"`);

        handler.set(props.path, tag === Schema.EmptyOptionValue ? Value.emptyOption() : Value.option(tag));
    };

    const v = handler.getValue(props.path);
    return (
        <>
            <ItemLabel label={props.label} help={props.help} id={id} />
            <Selection
                id={id}
                options={opts}
                value={Value.toOption(v)}
                onChange={onChange}
            />
        </>
    );
}

export function OptionsWithOtherInput(props: Props) {
    const id = React.useMemo(() => PathId.toId(props.path), [props.path]);
    const opts = React.useMemo(() => {
        return mkOptions(props.choices, !!props.dontTransformContent, !props.isRequired);
    }, [props.choices]);
    const { handler } = React.useContext(FormContextInstance);

    const value = handler.getValue(props.path);
    assert(Value.isOption(value), 'Expected an Option value');

    const onChangeOptions: SOnChange<SDropdownProps> = (_ev, data) => {
        const tag = data.value as string;
        const choice = props.choices.find((c) => c.tag === tag);
        assert(choice !== undefined || (tag === Schema.EmptyOptionValue && !props.isRequired), `No choice with tag "${tag}"`);

        handler.set(props.path, tag === Schema.EmptyOptionValue ? Value.emptyOption() : Value.option(tag));
    };
    const onChangeText: SOnChange<SInputProps> = (_ev, data) => {
        const v = data.value as string;
        handler.set(props.path, Value.option(Schema.OtherChoice, v), CommonValidators.isSet(v));
    };

    return (
        <>
            <ItemLabel label={props.label} help={props.help} id={id} />
            <Selection
                id={id}
                options={opts}
                value={value.payload.tag}
                onChange={onChangeOptions}
            />
            {Schema.isOtherChoice(value)
                ? (
                    <div style={{ ...BorderStyle, ...PadStyle }}>
                        <SInput
                            id={id}
                            type='text'
                            value={Value.toOtherOption(value)}
                            error={false}
                            onChange={onChangeText}
                            fluid
                        />
                    </div>
                )
                : null
            }
        </>
    );
}
