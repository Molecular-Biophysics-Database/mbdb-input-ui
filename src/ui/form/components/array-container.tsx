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

function cannotDeleteItemErrorContent(path: Path) {
    return (<div>{`Cannot delete item on path "${Data.Path.toString(path)}". The item is referenced by some other items.`}</div>);
}

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

type AddItemButtonProps = {
    title: string,
    onClick: () => void,
    isDisabled: boolean,
};
function AddItemButton(props: AddItemButtonProps) {
    return (
        <div
            className='mbdbi-array-add-item-button-tainer'
            style={{ gridColumn: 'span 3' }}
        >
            <SButton
                className='mbdbi-array-add-item-button'
                key='b+'
                onClick={props.onClick}
                disabled={props.isDisabled}
            >
                <div className='mbdbi-array-add-item-button-inner'>
                    <span className='mbdbi-array-add-item-button-plus'>+</span>
                    <span className='mbdbi-array-add-item-button-title'>{props.title}</span>
                </div>
            </SButton>
        </div>
    );
}

type CollapsibleElementProps = {
    content: JSX.Element | (JSX.Element | null)[],
    idx: number,
    path: Path,
    title: string,
    isDisabled: boolean,
    handler: _FormContextHandler,
};
function CollapsibleElement(props: CollapsibleElementProps) {
    const handler = props.handler;
    const dataItem = handler.getItem(Data.Path.index(props.idx, props.path));
    const isCollapsed = handler.navigation.isCollapsed(dataItem);

    return (
        <Collapsible
            header={<ComplexArrayHeader title={props.title} idx={props.idx} path={props.path} isDisabled={props.isDisabled} />}
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
    isDisabled: boolean,
}
function ComplexArrayHeader(props: ComplexArrayHeaderProps) {
    const { handler } = React.useContext(FormContextInstance);

    return (
        <div className='mbdbi-array-complex-header mbdbi-right-offset'>
            <div className='mbdbi-array-complex-header-title'>{props.title}: {props.idx + 1}</div>
            <div className='mbdbi-array-complex-header-line' />
            <SButton
                color='red'
                onClick={() => {
                    const delPath = Data.Path.index(props.idx, props.path);
                    if (!handler.canDelete(delPath)) {
                        ErrorDialog.show({
                            title: 'This action cannot be done right now',
                            content: cannotDeleteItemErrorContent(delPath),
                        });
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
    checkForErrors: boolean,
    canParentMarkEmpty: boolean,
    path: Path,
};
export function ArrayContainer({ item, nestLevel, isDisabled, checkForErrors, canParentMarkEmpty, path }: Props) {
    const _niceLabel = React.useMemo(() => niceLabel(item.label, !!item.dontTransformLabels), [item]);
    const { handler } = React.useContext(FormContextInstance);
    const tainerId = React.useMemo(() => PathId.toId(path), [path]);
    const array = handler.getArray(path);
    const darkBlk = useDarkBlock(nestLevel);
    const hasErrors = (!checkForErrors|| isDisabled) ? false : subtreeHasErrors(handler.data(), path, handler.schema());
    const tainerCls = clsx(
        'mbdbi-section', hasErrors && 'mbdbi-section-has-errors',
        'mbdbi-array-tainer',
        'mbdbi-block',
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
                                checkForErrors={checkForErrors}
                                canParentMarkEmpty={canParentMarkEmpty}
                                help={item.help}
                                path={Data.Path.index(idx, path)}
                                headerless
                            />
                        }
                        isDisabled={isDisabled}
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
                        content={<VariantInput input={item.input} label={item.label} nestLevel={nestLevel + 1} isDisabled={isDisabled} checkForErrors={checkForErrors} canParentMarkEmpty={canParentMarkEmpty} path={Data.Path.index(idx, path)} />}
                        isDisabled={isDisabled}
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
    } else if (Schema.hasTextualInput(item) || Schema.hasBooleanInput(item) || Schema.hasOptionsInput(item) || Schema.hasVocabularyInput(item) || Schema.hasFileInput(item) || Schema.hasUrlInput(item) || Schema.hasReferenceableIdInput(item) ) {
        arrayIsSimple = true;

        for (let idx = 0; idx < array.length; idx++) {
            components.push(
                <React.Fragment key={idx}>
                    {scalarComponent(item, true, nestLevel, isDisabled, checkForErrors, canParentMarkEmpty, Data.Path.index(idx, path), false, void 0, true)}
                    <SButton
                        style={{ marginLeft: '1rem' }}
                        color='red'
                        onClick={() => {
                            const delPath = Data.Path.index(idx, path);
                            if (!handler.canDelete(delPath)) {
                                ErrorDialog.show({
                                    title: 'This action cannot be done right now',
                                    content: cannotDeleteItemErrorContent(delPath),
                                });
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
        arrayIsSimple
            ? (
                <div className={tainerCls} id={tainerId}>
                    <SectionLabel label={niceLabel(item.label, !!item.dontTransformLabels)} markAsRequired={item.isRequired} help={item.help} />
                    <div className='mbdbi-right-offset' style={ GridInArrayStyle }>
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
    );
}
