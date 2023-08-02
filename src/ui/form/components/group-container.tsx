import clsx from 'clsx';
import React from 'react';
import { SectionLabel } from './label';
import { PathId } from '../path-id';
import { component } from '../render';
import { FormContextInstance } from '../../../context';
import { _FormContextHandler } from '../../../context/handler';
import { Help, Item } from '../../../schema';
import { Data, DataTree, Path } from '../../../schema/data';
import { Value } from '../../../schema/value';

const _GroupContainer = React.memo(function _GroupContainer(props: Props & { handler: _FormContextHandler }) {
    const id = React.useMemo(() => PathId.toId(props.path), [props.path]);
    const data = Data.getTree(props.handler.data(), props.path);

    let hasErrors = false;
    Data.walk(data as DataTree, (value, _path) => {
        hasErrors = hasErrors || !Value.isValid(value);
    });

    return (
        <div className='mbdb-section' id={id}>
            <SectionLabel label={props.label} help={props.help} />
            <div className={clsx('mbdb-item-grid', hasErrors && 'mbdb-item-grid-bad-data')}>
                {props.input.map((im, idx) => component(im, props.path, idx))}
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    return (
        Object.is(prevProps.input, nextProps.input) &&
        Object.is(prevProps.label, nextProps.label) &&
        Object.is(prevProps.help, nextProps.help) &&
        Data.Path.arePathsEqual(prevProps.path, nextProps.path)
    );
});

export type Props = {
    input: Item[],
    label: string,
    help?: Help,
    path: Path,
}

export function GroupContainer(props: Props) {
    const { handler } = React.useContext(FormContextInstance);
    return <_GroupContainer {...props} handler={handler} />;
}
