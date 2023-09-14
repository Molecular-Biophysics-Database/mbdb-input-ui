import React from 'react';

function stuff(stuffing: 'begin' | 'end' | 'both', elems: JSX.Element | JSX.Element[]) {
    if (stuffing === 'begin') {
        return (
            <>
                <div style={{ flex: 1 }} />
                <div>
                    {elems}
                </div>
            </>
        );
    } else if (stuffing === 'both') {
        return (
            <>
                <div style={{ flex: 1 }} />
                {elems}
                <div style={{ flex: 1 }} />
            </>
        );
    } else {
        return (
            <>
                {elems}
                <div style={{ flex: 1 }} />
            </>
        );
    }
}

function Padded(props: { direction: 'vertical' | 'horitonzal', children: JSX.Element | JSX.Element[] }) {
    return (
        <div style={{ display: 'flex', flexDirection: props.direction === 'vertical' ? 'column' : 'row' }}>
            {Array.isArray(props.children) ? {...props.children} : props.children}
        </div>
    );
}

export function HPadded(props: { padding: 'left' | 'right' | 'center', children: JSX.Element | JSX.Element[] }) {
    return (
        <Padded direction='horitonzal'>
            {props.padding === 'left'
                ? stuff('begin', props.children)
                : props.padding === 'right'
                    ? stuff('end', props.children)
                    : stuff('both', props.children)
            }
        </Padded>
    );
}

export function VPadded(props: { padding: 'top' | 'bottom' | 'middle', children: JSX.Element | JSX.Element[], gap?: string }) {
    return (
        <Padded direction='vertical'>
            {props.padding === 'top'
                ? stuff('begin', props.children)
                : props.padding === 'bottom'
                    ? stuff('end', props.children)
                    : stuff('both', props.children)
            }
        </Padded>
    );
}
