import React from 'react';
import {
    Button as SButton,
} from 'semantic-ui-react';
import { SectionLabel } from './label';
import { VariantInput } from './variant';
import { PathId } from '../path-id';
import { component, scalarComponent } from '../render';
import { niceLabel } from '../util';
import { ErrorDialog } from '../../error-dialog';
import { FormContext, FormContextInstance } from '../../../context';
import { Item, Schema } from '../../../schema';
import { Data, Path } from '../../../schema/data';
import { Value } from '../../../schema/value';

const GridInArrayStyle = { display: 'grid', rowGap: '0.5rem', gridTemplateColumns: '0 1fr auto' };

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

type ComplexArrayHeaderProps = {
    title: string,
    idx: number,
    path: Path,
    setDeletionError: (err: string) => void,
}
function ComplexArrayHeader(props: ComplexArrayHeaderProps) {
    const { handler } = React.useContext(FormContextInstance);

    return (
        <div className='mbdb-array-complex-header'>
            <div className='mbdb-array-complex-header-title'>{props.title}: {props.idx + 1}</div>
            <div className='mbdb-array-complex-header-line' />
            <SButton
                color='red'
                onClick={() => {
                    const delPath = Data.Path.index(props.idx, props.path);
                    if (!handler.canDelete(delPath)) {
                        props.setDeletionError(`Cannot delete item on path "${Data.Path.toString(delPath)}". The item is referenced by some other items."`);
                    } else {
                        handler.delete(delPath);
                    }
                }}>-</SButton>
        </div>
    );
}

export type Props = {
    item: Item,
    path: Path,
};
export function ArrayContainer({ item, path }: Props) {
    const _niceLabel = React.useMemo(() => niceLabel(item.label, !!item.dontTransformLabels), [item]);
    const { handler } = React.useContext(FormContextInstance);
    const tainerId = React.useMemo(() => PathId.toId(path), [path]);
    const [deletionError, setDeletionError] = React.useState<string | null>(null);
    const array = handler.getArray(path);

    const components = [];
    let arrayIsSimple = false;

    if (Schema.hasComplexInput(item)) {
        for (let idx = 0; idx < array.length; idx++) {
            const blockComponents = [];
            for (let jdx = 0; jdx < item.input.length; jdx++) {
                const innerItem = item.input[jdx];
                blockComponents.push(
                    component(innerItem, Data.Path.index(idx, path), `${idx}-${jdx}`)
                );
            }

            components.push(
                <div className='mbdb-item-grid' key={idx}>
                    <ArrayAnchor path={path} idx={idx} />
                    <ComplexArrayHeader title={_niceLabel} idx={idx} path={path} setDeletionError={(err) => setDeletionError(err)} />
                    {blockComponents}
                </div>
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
                key='b+'
            />
        );
    } else if (Schema.hasVariantInput(item)) {
        for (let idx = 0; idx < array.length; idx++) {
            components.push(
                <div key={idx}>
                    <ArrayAnchor path={path} idx={idx} />
                    <ComplexArrayHeader title={_niceLabel} idx={idx} path={path} setDeletionError={(err) => setDeletionError(err)} />
                    <VariantInput input={item.input} label={item.label} path={Data.Path.index(idx, path)} />
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
                key='b+'
            />
        );
    } else if (Schema.hasTextualInput(item) || Schema.hasBooleanInput(item) || Schema.hasOptionsInput(item)) {
        arrayIsSimple = true;

        for (let idx = 0; idx < array.length; idx++) {
            components.push(
                <React.Fragment key={idx}>
                    {scalarComponent(item, true, Data.Path.index(idx, path), undefined, true)}
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
                        }}>-</SButton>
                </React.Fragment>
            );
        }

        components.push(
            <AddItemButton
                title={_niceLabel}
                onClick={() => {
                    const initialValue = Schema.hasOptionsInput(item)
                        ? Schema.initialOptionsValue(item.choices, Schema.hasOptionsWithOtherInput(item))
                        : Value.defaultForItem(item)
                    handler.set(Data.Path.index(array.length, path), initialValue);
                }}
                key='b+'
            />
        );
    } else if (Schema.hasIgnoredInput(item)) {
        return null;
    } else {
        throw new Error(`Do not know how to create array input for item "${item.tag}" with input type "${item.input}"`);
    }

    if (arrayIsSimple) {
        return (
            <>
                <CannotDeleteItemErrorDialog
                    isOpen={deletionError !== null}
                    message={deletionError}
                    onDismissed={() => setDeletionError(null)}
                />

                <div className='mbdb-section mbdb-array-tainer' id={tainerId}>
                    <SectionLabel label={niceLabel(item.label, !!item.dontTransformLabels)} help={item.help} />
                    <div style={{ ...GridInArrayStyle }}>
                        {components}
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <CannotDeleteItemErrorDialog
                    isOpen={deletionError !== null}
                    message={deletionError}
                    onDismissed={() => setDeletionError(null)}
                />

                <div className='mbdb-section mbdb-array-tainer' id={tainerId}>
                    <SectionLabel label={niceLabel(item.label, !!item.dontTransformLabels)} help={item.help} />
                    {components}
                </div>
            </>
        );
    }
}
