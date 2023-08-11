import clsx from 'clsx';
import React from 'react';
import { SectionLabel } from './label';
import { PathId } from '../path-id';
import { component } from '../render';
import { subtreeHasErrors, useDarkBlock } from '../util';
import { FormContextInstance } from '../../../context';
import { _FormContextHandler } from '../../../context/handler';
import { Help, Item } from '../../../schema';
import { Data, Path } from '../../../schema/data';
import {objKeys} from '../../../util';

const _GroupContainer = React.memo(function MGroupContainer(props: Props & {
    handler: _FormContextHandler,
    darkBlk: boolean,
    hasErrors: boolean,
    id: string,
}) {
    return (
        <div className={clsx('mbdb-section', 'mbdb-block', props.darkBlk ? 'mbdb-block-dark' : 'mbdb-block-light')} id={props.id}>
            <SectionLabel label={props.label} markAsRequired={props.isRequired} help={props.help} />
            <div className={clsx('mbdb-item-grid', props.hasErrors && 'mbdb-item-grid-bad-data')}>
                {props.input.map((im, idx) => component(im, props.nestLevel + 1, props.path, idx))}
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    for (const k of objKeys(nextProps)) {
        if (k === 'handler') {
            continue;
        } else if (k === 'path') {
            if (!Data.Path.arePathsEqual(prevProps[k], nextProps[k])) return false;
        } else {
            if (!Object.is(prevProps[k], nextProps[k])) return false;
        }
    }

    return true;
});

export type Props = {
    input: Item[],
    label: string,
    isRequired: boolean,
    nestLevel: number,
    help?: Help,
    path: Path,
}
export function GroupContainer(props: Props) {
    const { handler } = React.useContext(FormContextInstance);
    const id = React.useMemo(() => PathId.toId(props.path), [props.path]);
    const hasErrors = subtreeHasErrors(handler.data(), props.path);
    const darkBlk = useDarkBlock(props.nestLevel);

    return <_GroupContainer {...props} handler={handler} darkBlk={darkBlk} hasErrors={hasErrors} id={id} />;
}
