import clsx from 'clsx';
import React from 'react';
import {
    Checkbox as SCheckbox
} from 'semantic-ui-react';
import { SectionLabel } from './label';
import { PathId } from '../path-id';
import { component } from '../render';
import { sectionBgCls, subtreeHasErrors, useDarkBlock } from '../util';
import { FormContextInstance } from '../../../context';
import { _FormContextHandler } from '../../../context/handler';
import { Help, Item } from '../../../schema';
import { Data, Path } from '../../../schema/data';
import { objKeys } from '../../../util';

function arePropsEqual<P extends Record<string, any>>(prevProps: P, nextProps: P) {
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
}

const _GroupContainerHeader = React.memo(function MGroupContainerHeader({ handler, label, help, canMarkEmpty, isDisabled, isMarkedEmpty, isRequired, path} : {
    handler: _FormContextHandler,
    canMarkEmpty: boolean,
    label: string,
    isDisabled: boolean,
    isMarkedEmpty: boolean,
    isRequired: boolean,
    path: Path,
    help?: Help,
}) {
    return (
        <div className='mbdb-group-container-header'>
            <SectionLabel label={label} markAsRequired={isRequired} help={help} />
            {!isRequired
                ? (
                    <>
                        <SCheckbox
                            checked={isMarkedEmpty}
                            onChange={(_ev, data) => {
                                handler.markGroupEmpty(!!data.checked, path);
                                handler.update();
                            }}
                            disabled={isDisabled || !canMarkEmpty}
                        />
                        {!canMarkEmpty ? '(This section contains data that could be referenced elsewhere and cannot be omitted)' : '(Do not provide this data)'}
                    </>
                )
                : null
            }
        </div>
    );
}, arePropsEqual);

const _GroupContainerContent = React.memo(function MGroupContainer(props: Props & {
    handler: _FormContextHandler,
    darkBlk: boolean,
    hasErrors: boolean,
    isMarkedEmpty: boolean,
}) {
    return (
        <div className='mbdb-item-grid'>
            {props.input.map((im, idx) => component(im, props.nestLevel + 1, props.isMarkedEmpty || props.isDisabled, props.path, idx))}
        </div>
    );
}, arePropsEqual);

export type Props = {
    input: Item[],
    label: string,
    isRequired: boolean,
    nestLevel: number,
    isDisabled: boolean,
    headerless?: boolean,
    help?: Help,
    path: Path,
}
export function GroupContainer(props: Props) {
    const { handler } = React.useContext(FormContextInstance);
    const id = React.useMemo(() => PathId.toId(props.path), [props.path]);
    const isMarkedEmpty = handler.isGroupMarkedEmpty(props.path);
    const hasErrors = props.isDisabled ? false : subtreeHasErrors(handler.data(), props.path, handler.schema());

    const darkBlk = useDarkBlock(props.nestLevel);
    const canMarkEmpty = handler.canMarkEmpty(props.path);

    return (
        <div className={clsx(
            'mbdb-section',
            hasErrors && !isMarkedEmpty && 'mbdb-section-has-errors',
            'mbdb-block',
            sectionBgCls(darkBlk, props.isDisabled || isMarkedEmpty)
        )} id={id}>
            {!props.headerless
                ? <_GroupContainerHeader
                    handler={handler}
                    canMarkEmpty={canMarkEmpty}
                    label={props.label}
                    isDisabled={props.isDisabled}
                    isMarkedEmpty={isMarkedEmpty}
                    isRequired={props.isRequired}
                    path={props.path}
                    help={props.help}
                />
                : null
            }
            <_GroupContainerContent {...props} handler={handler} darkBlk={darkBlk} hasErrors={hasErrors} isMarkedEmpty={isMarkedEmpty} />
        </div>
    );
}
