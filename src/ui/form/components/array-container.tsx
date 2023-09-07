import clsx from 'clsx';
import React from 'react';
import {
    Button as SButton,
} from 'semantic-ui-react';
import { GroupContainer } from './group-container';
import { SectionLabel } from './label';
import { VariantInput } from './variant';
import { PathId } from '../path-id';
import { scalarComponent } from '../render';
import { niceLabel, sectionBgCls, subtreeHasErrors, useDarkBlock } from '../util';
import { Collapsible } from '../../collapsible';
import { ErrorDialog } from '../../error-dialog';
import { FormContext, FormContextInstance } from '../../../context';
import { _FormContextHandler } from '../../../context/handler';
import { Item, Schema } from '../../../schema';
import { Data, DataTreeItem, Path } from '../../../schema/data';
import { Value } from '../../../schema/value';

const GridInArrayStyle = { display: 'grid', rowGap: '0.5rem', gridTemplateColumns: '0 1fr auto' };

function deepRemoveCollapsed(item: DataTreeItem, handler: _FormContextHandler) {
    Data.walkTree(item, (inItem) => {
        handler.navigation.removeItem(inItem);
    });
    handler.navigation.removeItem(item);
}

const ArrayAnchor = React.memo(function _ArrayAnchor({ path, idx }: { path: Path, idx: number }) {
    const htmlId = PathId.toId(Data.Path.index(idx, path));
    return (
        <>
            <div style={{ visibility: 'hidden' }} id={htmlId} /><div style={{ visibility: 'hidden' }} />
        </>
    );
});


type CannotDeleteItemErrorDialogProps = {
    isOpen: boolean,
    message: string | null,
    onDismissed: () => void,
}
function _CannotDeleteItemErrorDialog(props: CannotDeleteItemErrorDialogProps) {
    return (
        <ErrorDialog
            isOpen={props.isOpen}
            title='Cannot delete item'
            onDismissed={props.onDismissed}
        >
            <div>{props.message ?? '(No specific error message was provided)'}</div>
        </ErrorDialog>
    );
}

type AddItemButtonProps = {
    title: string,
    onClick: () => void,
    isDisabled: boolean,
};
function AddItemButton(props: AddItemButtonProps) {
    return (
        <div
            className='mbdb-array-add-item-button-tainer'
            style={{ gridColumn: 'span 3' }}
        >
            <SButton
                color='green'
                className='mbdb-array-add-item-button'
                key='b+'
                onClick={props.onClick}
                disabled={props.isDisabled}
            >
                <div className='mbdb-array-add-item-button-inner'>
                    <span className='mbdb-array-add-item-button-plus'>+</span>
                    <span className='mbdb-array-add-item-button-title'>{props.title}</span>
                </div>
            </SButton>
        </div>
    );
}

function CannotDeleteItemErrorDialog(props: CannotDeleteItemErrorDialogProps) {
    return (
        props.isOpen
            ? <_CannotDeleteItemErrorDialog {...props} />
            : null
    );
}

type CollapsibleElementProps = {
    content: JSX.Element | (JSX.Element | null)[],
    idx: number,
    path: Path,
    title: string,
    isDisabled: boolean,
    setDeletionError: (err: string) => void,
    handler: _FormContextHandler,
};
function CollapsibleElement(props: CollapsibleElementProps) {
    const handler = props.handler;
    const dataItem = handler.getItem(Data.Path.index(props.idx, props.path));
    const isCollapsed = handler.navigation.isCollapsed(dataItem);

    return (
        <Collapsible
            header={<ComplexArrayHeader title={props.title} idx={props.idx} path={props.path} isDisabled={props.isDisabled} setDeletionError={(err) => props.setDeletionError(err)} />}
            content={props.content}
            onCollapsedExpanded={(isCollapsed) => {
                handler.navigation.setCollapsed(dataItem, isCollapsed);
            }}
            isCollapsed={isCollapsed}
        />
    );
}

type ComplexArrayHeaderProps = {
    title: string,
    idx: number,
    path: Path,
    setDeletionError: (err: string) => void,
    isDisabled: boolean,
}
function ComplexArrayHeader(props: ComplexArrayHeaderProps) {
    const { handler } = React.useContext(FormContextInstance);

    return (
        <div className='mbdb-array-complex-header mbdb-right-offset'>
            <div className='mbdb-array-complex-header-title'>{props.title}: {props.idx + 1}</div>
            <div className='mbdb-array-complex-header-line' />
            <SButton
                color='red'
                onClick={() => {
                    const delPath = Data.Path.index(props.idx, props.path);
                    if (!handler.canDelete(delPath)) {
                        props.setDeletionError(`Cannot delete item on path "${Data.Path.toString(delPath)}". The item is referenced by some other items."`);
                    } else {
                        const toDelete = handler.getItem(Data.Path.index(props.idx, props.path));
                        deepRemoveCollapsed(toDelete, handler);

                        handler.delete(delPath);
                    }
                }}
                disabled={props.isDisabled}
            >-</SButton>
        </div>
    );
}

export type Props = {
    item: Item,
    nestLevel: number,
    isDisabled: boolean,
    path: Path,
};
export function ArrayContainer({ item, nestLevel, isDisabled, path }: Props) {
    const _niceLabel = React.useMemo(() => niceLabel(item.label, !!item.dontTransformLabels), [item]);
    const { handler } = React.useContext(FormContextInstance);
    const tainerId = React.useMemo(() => PathId.toId(path), [path]);
    const [deletionError, setDeletionError] = React.useState<string | null>(null);
    const array = handler.getArray(path);
    const darkBlk = useDarkBlock(nestLevel);
    const hasErrors = isDisabled ? false : subtreeHasErrors(handler.data(), path, handler.schema());
    const tainerCls = clsx(
        'mbdb-section', hasErrors && 'mbdb-section-has-errors',
        'mbdb-array-tainer',
        'mbdb-block',
        sectionBgCls(darkBlk, isDisabled)
    );

    const components = [];
    let arrayIsSimple = false;

    if (Schema.hasComplexInput(item)) {
        for (let idx = 0; idx < array.length; idx++) {
            components.push(
                <React.Fragment key={idx}>
                    <ArrayAnchor path={path} idx={idx} />
                    <CollapsibleElement
                        title={_niceLabel}
                        idx={idx}
                        path={path}
                        content={
                            <GroupContainer
                                input={item.input}
                                label=''
                                isRequired={item.isRequired}
                                nestLevel={nestLevel + 1}
                                isDisabled={isDisabled}
                                help={item.help}
                                path={Data.Path.index(idx, path)}
                                headerless
                            />
                        }
                        isDisabled={isDisabled}
                        setDeletionError={setDeletionError}
                        handler={handler}
                    />
                </React.Fragment>
            );
        }

        components.push(
            <AddItemButton
                title={_niceLabel}
                onClick={() => {
                    const innerPath = Data.Path.index(array.length, path);
                    const value = {};
                    FormContext.makeData(item.input, value, handler.refs.get());

                    handler.set(innerPath, value);
                }}
                isDisabled={isDisabled}
                key='b+'
            />
        );
    } else if (Schema.hasVariantInput(item)) {
        for (let idx = 0; idx < array.length; idx++) {
            components.push(
                <div key={idx}>
                    <ArrayAnchor path={path} idx={idx} />
                    <CollapsibleElement
                        title={_niceLabel}
                        idx={idx}
                        path={path}
                        content={<VariantInput input={item.input} label={item.label} nestLevel={nestLevel + 1} isDisabled={isDisabled} path={Data.Path.index(idx, path)} />}
                        isDisabled={isDisabled}
                        setDeletionError={setDeletionError}
                        handler={handler}
                    />
                </div>
            );
        }

        components.push(
            <AddItemButton
                title={_niceLabel}
                onClick={() => {
                    const variantData = {};
                    FormContext.makeVariantData(item, variantData, handler.refs.get());
                    handler.set(Data.Path.index(array.length, path), variantData);
                }}
                isDisabled={isDisabled}
                key='b+'
            />
        );
    } else if (Schema.hasTextualInput(item) || Schema.hasBooleanInput(item) || Schema.hasOptionsInput(item) || Schema.hasVocabularyInput(item)) {
        arrayIsSimple = true;

        for (let idx = 0; idx < array.length; idx++) {
            components.push(
                <React.Fragment key={idx}>
                    {scalarComponent(item, true, nestLevel, isDisabled, Data.Path.index(idx, path), void 0, true, true)}
                    <SButton
                        style={{ marginLeft: '1rem' }}
                        color='red'
                        onClick={() => {
                            const delPath = Data.Path.index(idx, path);
                            if (!handler.canDelete(delPath)) {
                                setDeletionError(`Cannot delete item on path "${Data.Path.toString(delPath)}". The item is referenced by some other items."`);
                            } else {
                                handler.delete(delPath);
                            }
                        }}
                        disabled={isDisabled}
                    >-</SButton>
                </React.Fragment>
            );
        }

        components.push(
            <AddItemButton
                title={_niceLabel}
                onClick={() => {
                    handler.set(Data.Path.index(array.length, path), Value.defaultForItem(item, true));
                }}
                isDisabled={isDisabled}
                key='b+'
            />
        );
    } else if (Schema.hasIgnoredInput(item)) {
        return null;
    } else {
        throw new Error(`Do not know how to create array input for item "${item.tag}" with input type "${item.input}"`);
    }

    return (
        <>
            <CannotDeleteItemErrorDialog
                isOpen={deletionError !== null}
                message={deletionError}
                onDismissed={() => setDeletionError(null)}
            />

            {arrayIsSimple
                ? (
                    <div className={tainerCls} id={tainerId}>
                        <SectionLabel label={niceLabel(item.label, !!item.dontTransformLabels)} markAsRequired={item.isRequired} help={item.help} />
                        <div className='mbdb-right-offset' style={ GridInArrayStyle }>
                            {components}
                        </div>
                    </div>
                )
                : (
                    <div className={tainerCls} id={tainerId}>
                        <SectionLabel label={niceLabel(item.label, !!item.dontTransformLabels)} markAsRequired={item.isRequired} help={item.help} />
                        {components}
                    </div>
                )
            }
        </>
    );
}
