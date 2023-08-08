import React from 'react';
import {
    Button as SButton,
    Header as SHeader,
    Icon as SIcon,
    Modal as SModal,
} from 'semantic-ui-react';

export type Props = {
    isOpen: boolean,
    onDismissed: () => void,
    title: string,
    children: JSX.Element | JSX.Element[],
};
export function ErrorDialog(props: Props) {
    return (
        <SModal
            basic
            open={props.isOpen}
        >
            <SHeader icon>
                <SIcon name='warning' />
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
