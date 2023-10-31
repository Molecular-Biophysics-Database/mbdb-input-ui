import React from 'react';
import {
    Button as SButton,
    Icon as SIcon,
    Input as SInput,
    Dropdown as SDropdown,
    TextArea as STextArea
} from 'semantic-ui-react';
import { ItemLabel } from './label';
import { PathId } from '../path-id';
import { FormContextInstance } from '../../../context';
import { Help } from '../../../schema';
import { Path } from '../../../schema/data';
import { Value } from '../../../schema/value';

function FileName(props: { fileName: string, isValid: boolean, onClick: any }) {
    return (
        <SInput
            type='text'
            value={props.fileName ? props.fileName : '(No file)'}
            error={!props.isValid}
            onClick={props.onClick}
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
    const fiId = React.useMemo(() => id + "_fileinput", [id]);
    const { handler } = React.useContext(FormContextInstance);
    const labelRef = React.useRef<HTMLLabelElement>(null);

    const v = handler.getValue(props.path);
    const isEmpty = Value.isEmpty(v);

    return (
        <>
            <ItemLabel label={props.label} markAsRequired={props.isRequired} help={props.help} id={id} />
            <div className="mbdbi-item-grid mbdbi-file-input-controls-wide">
                <div className="mbdbi-item-label">
                    File
                </div>
                <div className='mbdbi-file-input-controls'>
                    {/* File selection section */}
                    <input
                        style={{ display: 'none' }}
                        id={fiId}
                        type='file'
                        multiple={false}
                        onChange={(ev) => {
                            const f = ev.currentTarget.files?.[0];

                            if (!f) {
                                handler.set(props.path, Value.empty(!props.isRequired));
                            } else {
                                const metadata = isEmpty ? {} : Value.toFile(v).metadata;
                                handler.set(props.path, Value.file(f, metadata, true));
                            }
                        }}
                    />

                    <FileName fileName={isEmpty ? '' : Value.toFile(v).file!.name} isValid={v.isValid}
                              onClick={() => {
                                  const c = labelRef.current;
                                  if (c) {
                                      c.dispatchEvent(new MouseEvent('click'));
                                  }
                              }}
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
                    <label
                        id={id}
                        htmlFor={fiId}
                        ref={labelRef}
                    />
                </div>
                <div className="mbdbi-item-label">
                    Originates from
                </div>
                <SDropdown
                    selection
                    options={[{
                        text: 'Instrument software',
                        value: 'Instrument software'
                    },{
                        text: 'User',
                        value: 'User'
                    },{
                        text: 'MBDB',
                        value: 'MBDB'
                    }]}
                    disabled={props.isDisabled || isEmpty}
                    value={isEmpty ? '' : Value.toFile(v).metadata.originates_from}
                    onChange={
                        (ev, data) => {
                            if (!isEmpty) {
                                const f = Value.toFile(v);
                                handler.set(props.path, Value.file(f.file, {
                                    ...f.metadata,
                                    originates_from: data.value as string
                                }, v.isValid));
                            }
                        }
                    }
                ></SDropdown>
                <div className="mbdbi-item-label">
                    Description
                </div>
                <STextArea
                    disabled={props.isDisabled || isEmpty}
                    value={isEmpty ? '' : Value.toFile(v).metadata.description}
                    onChange={(ev, data) => {
                        if (!isEmpty) {
                            const f = Value.toFile(v);
                            handler.set(props.path, Value.file(f.file, {
                                ...f.metadata,
                                description: data.value as string
                            }, v.isValid));
                        }
                    }}
                />

            </div>
        </>
    );
}
