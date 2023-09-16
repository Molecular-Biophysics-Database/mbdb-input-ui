import React from 'react';
import {
    Header as SHeader,
    Icon as SIcon,
} from 'semantic-ui-react';
import { Button, StandardButtons, Dialog } from './dialog';
import { HPadded } from './padded';

const Noop = () => {};

export type Props = {
    title: string,
    content: JSX.Element,
    icons?: JSX.Element | JSX.Element[],
    extraButtons?: Button[],
    onButton?: (id: number, flags: number) => void,
};
export const ErrorDialog = {
    show(props: Props) {
        Dialog.create({
            title: (
                <SHeader icon>
                    <HPadded padding='center'>
                    {props.icons
                        ? (
                            <div className='mbdbi-icon-list'>
                                {props.icons}
                            </div>
                        )
                        : <SIcon name='warning' />
                    }
                    </HPadded>
                    {props.title}
                </SHeader>
            ),
            buttons: [StandardButtons.Ok, ...props.extraButtons ?? []],
            content: props.content,
            onButton: props.onButton ?? Noop,
        });
    }
};
