import React from 'react';
import {
    Button as SButton,
    ButtonProps as SButtonProps,
    Icon as SIcon,
} from 'semantic-ui-react';
import { v4 } from 'uuid';
import { FileTypes } from '../util/download';

const Reserved = ['title', 'onLoaded'] as (keyof Props)[];
function sbtnProps(props: Props) {
    const sprops: Omit<Props, 'title' | 'onLoaded'> =  {};
    for (const p in props) {
        if (!Reserved.includes(p)) sprops[p] = props[p];
    }

    return sprops;
}

export type Props = {
    title: string,
    onLoaded: (file: File) => void,
} & SButtonProps;
export function LoadFileButton(props: Props) {
    const id = React.useMemo(() => v4(), []);
    const labelRef = React.useRef<HTMLLabelElement>(null);

    return (
        <label htmlFor={id} style={{ display: 'flex' }} ref={labelRef}>
            <input
                type='file'
                id={id}
                accept={FileTypes.json.mimeType}
                style={{ display: 'none' }}
                onChange={(ev) => {
                    if (ev.currentTarget.files) props.onLoaded(ev.currentTarget.files[0]);
                }}
            />
            <SButton
                {...sbtnProps(props)}
                onClick={() => {
                    const lbl = labelRef.current;
                    if (lbl) lbl.click();
                }}
            >
                <SIcon name='upload' />
                {props.title}
            </SButton>
        </label>
    );
}
