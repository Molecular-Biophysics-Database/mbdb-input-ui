import React from 'react';
import {
    Button as SButton,
    Form as SForm,
    Icon as SIcon,
    Input as SInput,
    TextArea as STextArea,
} from 'semantic-ui-react';
import { ItemLabel } from './label';
import { PathId } from '../path-id';
import { FormContextInstance } from '../../../context';
import { Help } from '../../../schema';
import { Path } from '../../../schema/data';
import { Value } from '../../../schema/value';

function FileName(props: { fileName: string, isValid: boolean }) {
    return (
        <SInput
            type='text'
            value={props.fileName ? props.fileName : '(No file)'}
            error={!props.isValid}
        />
    )
}

type Props = {
    help?: Help,
    label: string,
    isRequired: boolean,
    isDisabled: boolean,
    path: Path,
}
export function FileInput(props: Props) {
    const id = React.useMemo(() => PathId.toId(props.path), [props.path]);
    const { handler } = React.useContext(FormContextInstance);
    const labelRef = React.useRef<HTMLLabelElement>(null);

    const v = handler.getValue(props.path);
    const isEmpty = Value.isEmpty(v);

    return (
        <>
            <ItemLabel label={props.label} markAsRequired={props.isRequired} help={props.help} id={id} />
            <div className='mbdbi-file-input-controls'>
                {/* File selection section */}
                <input
                    style={{ display: 'none' }}
                    id={id}
                    type='file'
                    multiple={false}
                    onChange={(ev) => {
                        const f = ev.currentTarget.files?.[0];

                        if (!f) {
                            handler.set(props.path, Value.empty(!props.isRequired));
                        } else {
                            const metadata = isEmpty ? '' : Value.toFile(v).metadata;
                            handler.set(props.path, Value.file(f, metadata, true));
                        }
                    }}
                />
                <FileName fileName={isEmpty ? '' : Value.toFile(v).file!.name} isValid={v.isValid} />
                <label
                    style={{ display: 'none' }}
                    htmlFor={id}
                    ref={labelRef}
                />
                <SButton
                    onClick={() => {
                        const c = labelRef.current;
                        if (c) {
                            c.dispatchEvent(new MouseEvent('click'));
                        }
                    }}
                    color='green'
                    fluid
                >
                    <SIcon name='file' />
                    Set
                </SButton>
                <SButton
                    onClick={() => {
                        handler.set(props.path, Value.empty(!props.isRequired));
                    }}
                    color='red'
                    fluid
                >
                    <SIcon name='cancel' />
                    Clear
                </SButton>
                <div />

                {/* File description section*/}
                <div className='mbdbi-file-input-controls-wide'>File description:</div>
                <SForm
                    className='mbdbi-file-input-controls-wide'
                >
                    <STextArea
                        disabled={props.isDisabled || isEmpty}
                        value={isEmpty ? '' : Value.toFile(v).metadata}
                        onChange={(ev, data) => {
                            if (!isEmpty) {
                                const f = Value.toFile(v);
                                handler.set(props.path, Value.file(f.file, data.value as string, v.isValid));
                            }
                        }}
                    />
                </SForm>
            </div>
        </>
    );
}
