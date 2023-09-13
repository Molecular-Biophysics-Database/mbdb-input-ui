import React from 'react';
import {
    Button as SButton,
    Header as SHeader,
    Icon as SIcon,
    Modal as SModal,
} from 'semantic-ui-react';
import { HPadded } from './padded';

export type Props = {
    isOpen: boolean,
    onDismissed: () => void,
    title: string,
    children: JSX.Element | JSX.Element[],
    icons?: JSX.Element | JSX.Element[],
};
export function ErrorDialog(props: Props) {
    return (
        <SModal
            basic
            open={props.isOpen}
        >
            <SHeader icon>
                <HPadded padding='center'>
                    {props.icons ? props.icons : <SIcon name='warning' />}
                </HPadded>
                {props.title}
            </SHeader>
            <SModal.Content>
                {props.children}
            </SModal.Content>
            <SModal.Actions>
                <SButton
                    color='blue'
                    inverted
                    onClick={props.onDismissed}
                >OK</SButton>
            </SModal.Actions>
        </SModal>
    );
}
