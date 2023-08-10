import clsx from 'clsx';
import React from 'react';
import { SectionLabel } from './label';
import { PathId } from '../path-id';
import { component } from '../render';
import { subtreeHasErrors } from '../util';
import { FormContextInstance } from '../../../context';
import { _FormContextHandler } from '../../../context/handler';
import { Help, Item } from '../../../schema';
import { Path } from '../../../schema/data';

export type Props = {
    input: Item[],
    label: string,
    help?: Help,
    path: Path,
}

export function GroupContainer(props: Props) {
    const { handler } = React.useContext(FormContextInstance);
    const id = React.useMemo(() => PathId.toId(props.path), [props.path]);
    const hasErrors = subtreeHasErrors(handler.data(), props.path);

    return (
        <div className='mbdb-section' id={id}>
            <SectionLabel label={props.label} help={props.help} />
            <div className={clsx('mbdb-item-grid', hasErrors && 'mbdb-item-grid-bad-data')}>
                {props.input.map((im, idx) => component(im, props.path, idx))}
            </div>
        </div>
    );
}
