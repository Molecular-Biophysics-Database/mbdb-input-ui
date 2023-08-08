import React from 'react';
import { Icon as SIcon } from 'semantic-ui-react';

export type CollapsibleProps = {
    header: JSX.Element | JSX.Element[];
    content: JSX.Element | (JSX.Element | null)[] | null;
    isCollapsed: boolean,
    onCollapsedExpanded: (isCollapsed: boolean) => void;
};
export function Collapsible(props: CollapsibleProps) {
    return (
        <div className='mbdb-collapsible-tainer'>
            <div className='mbdb-collapsible-header-tainer'>
                <span
                    onClick={() => {
                        props.onCollapsedExpanded(!props.isCollapsed);
                    }}
                >{props.isCollapsed
                    ? <SIcon name='angle right' size='big' fitted />
                    : <SIcon name='angle down' size='big' fitted />
                }</span>
                <div style={{ flex: 1 }}>{props.header}</div>
            </div>
            <div style={{ display: props.isCollapsed ? 'none' : 'block' }}>
                {props.content}
            </div>
        </div>
    );
}


export type CollapsibleWithStateProps = {
    header: JSX.Element | JSX.Element[];
    content: JSX.Element | (JSX.Element | null)[] | null;
    onCollapsedExpanded?: (isCollapsed: boolean) => void;
};
export function CollapsibleWithState(props: CollapsibleWithStateProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
        <Collapsible
            {...props}
            isCollapsed={isCollapsed}
            onCollapsedExpanded={(isColl) => {
                setIsCollapsed(isColl);
                if (props.onCollapsedExpanded) {
                    props.onCollapsedExpanded(isColl);
                }
            }}
        />
    );
}
