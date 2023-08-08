import React from 'react';
import { Icon as SIcon } from 'semantic-ui-react';

export type Props = {
    header: JSX.Element | JSX.Element[];
    content: JSX.Element | (JSX.Element | null)[] | null;
};
export function Collapsible(props: Props) {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
        <div className='mbdb-collapsible-tainer'>
            <div className='mbdb-collapsible-header-tainer'>
                <span
                    onClick={() => setIsCollapsed(v => !v)}
                >{isCollapsed
                    ? <SIcon name='angle right' size='big' fitted />
                    : <SIcon name='angle down' size='big' fitted />
                }</span>
                <div style={{ flex: 1 }}>{props.header}</div>
            </div>
            <div style={{ display: isCollapsed ? 'none' : 'block' }}>
                {props.content}
            </div>
        </div>
    );
}
