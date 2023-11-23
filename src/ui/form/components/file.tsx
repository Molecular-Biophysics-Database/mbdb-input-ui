import clsx from 'clsx';
import React from 'react';
import {
    Button as SButton,
    Icon as SIcon,
    TextArea as STextArea,
} from 'semantic-ui-react';
import { ItemLabel, SectionLabel } from './label';
import { PathId } from '../path-id';
import { sectionBgCls, subtreeHasErrors, useDarkBlock } from '../util';
import { FormContextInstance } from '../../../context';
import { Help } from '../../../schema';
import { Path } from '../../../schema/data';
import { Value } from '../../../schema/value';
import OriginatesFrom from './originates-from';
import { LoadFileButton } from '../../load-file-button';

function FileName(props: { file: File | undefined | null }) {
    if (!props.file?.name) {
        return <></>;
    } else {
      return <span>{props.file.name}</span>;
    }
}

type Props = {
    help?: Help;
    label: string;
    isRequired: boolean;
    isDisabled: boolean;
    path: Path;
    checkForErrors: boolean;
    nestLevel: number;
};
export function FileInput(props: Props) {
    const id = React.useMemo(() => PathId.toId(props.path), [props.path]);
    const fiId = React.useMemo(() => id + '_fileinput', [id]);
    const { handler } = React.useContext(FormContextInstance);
    const labelRef = React.useRef<HTMLLabelElement>(null);
    const hasErrors = props.isDisabled ? false : subtreeHasErrors(handler.data(), props.path, handler.schema());
    const darkBlk = useDarkBlock(props.nestLevel);

    const v = handler.getValue(props.path);
    const isEmpty = Value.isEmpty(v);

    console.log('value', v, Value.toFile(v));
    return (
        <div className={clsx(
            'mbdbi-section',
            hasErrors && 'mbdbi-section-has-errors',
            'mbdbi-block',
            sectionBgCls(darkBlk, props.isDisabled)
        )} id={id}>
            <SectionLabel
                label={props.label}
                markAsRequired={props.isRequired}
                help={props.help}
            />

            <div className='mbdbi-item-grid'>
                <ItemLabel label='File' markAsRequired={false} id='file' />
                <div className='mbdbi-file-input-controls'>
                    {/* File selection section */}

                    <LoadFileButton
                        title='Upload file'
                        onLoaded={(f) => {
                            if (!f) {
                                handler.set(props.path, Value.empty(!props.isRequired));
                            } else {
                                const metadata = isEmpty ? {} : Value.toFile(v).metadata;
                                handler.set(props.path, Value.file(f, metadata, true));
                            }
                        }}
                    />
                    <FileName file={Value.toFile(v).file} />
                    {Value.toFile(v).file
                        ? (
                            <SButton
                                onClick={() => {
                                    const metadata = isEmpty ? {} : Value.toFile(v).metadata;
                                    handler.set(props.path, Value.file(null, metadata, true));
                                }}
                                color='red'
                                fluid
                            >
                                <SIcon name='cancel' />
                                Clear
                            </SButton>
                        )
                        : (<></>)
                    }
                    <label id={id} htmlFor={fiId} ref={labelRef} />
                </div>

                <ItemLabel label='Originates from' markAsRequired={true} id='originates-from' />
                <div className='mbdbi-right-offset'>
                    <OriginatesFrom
                        isDisabled={props.isDisabled || isEmpty}
                        isEmpty={isEmpty}
                        value={v}
                        onChange={(ev, data) => {
                            if (!isEmpty) {
                                const f = Value.toFile(v);
                                handler.set(
                                    props.path,
                                    Value.file(
                                        f.file,
                                        {
                                            ...f.metadata,
                                            originates_from: data.value as string,
                                        },
                                        v.isValid
                                    )
                                );
                            }
                        }}
                    />
                </div>

                <ItemLabel label='Description' markAsRequired={false} id='description' />
                <STextArea
                    className='mbdbi-right-offset'
                    disabled={props.isDisabled || isEmpty}
                    value={Value.toFile(v)?.metadata?.description || ''}
                    onChange={(ev, data) => {
                        if (!isEmpty) {
                            const f = Value.toFile(v);
                            handler.set(
                                props.path,
                                Value.file(
                                    f.file,
                                    {
                                        ...f.metadata,
                                        description: data.value as string,
                                    },
                                    v.isValid
                                )
                            );
                        }
                    }}
                />
                <ItemLabel label='Recommended software' markAsRequired={false} id='recommended-software' />
                <STextArea
                    className='mbdbi-right-offset'
                    disabled={props.isDisabled || isEmpty}
                    value={Value.toFile(v)?.metadata?.recommended_software || ''}
                    onChange={(ev, data) => {
                        if (!isEmpty) {
                            const f = Value.toFile(v);
                            handler.set(
                                props.path,
                                Value.file(
                                    f.file,
                                    {
                                        ...f.metadata,
                                        recommended_software: data.value as string,
                                    },
                                    v.isValid
                                )
                            );
                        }
                    }}
                />
                <ItemLabel label='Processing steps' markAsRequired={false} id='processing-steps' />
                <STextArea
                    className='mbdbi-right-offset'
                    disabled={props.isDisabled || isEmpty}
                    value={Value.toFile(v)?.metadata?.processing_steps || ''}
                    onChange={(ev, data) => {
                        if (!isEmpty) {
                            const f = Value.toFile(v);
                            handler.set(
                                props.path,
                                Value.file(
                                    f.file,
                                    {
                                        ...f.metadata,
                                        processing_steps: data.value as string,
                                    },
                                    v.isValid
                                )
                            );
                        }
                    }}
                />
            </div>
        </div>
    );
}
