import React from 'react';
import {
    Button as SButton,
    Header as SHeader,
    Icon as SIcon,
    Modal as SModal
} from 'semantic-ui-react';
import { SectionLabel } from './label';
import { VariantInput } from './variant';
import { PathId } from '../path-id';
import { component, scalarComponent } from '../render';
import { niceLabel } from '../util';
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


type CannotDeleteItemModalProps = {
    isDisplayed: boolean,
    message: string | null,
    onDismissed: () => void,
}
function _CannotDeleteItemModal(props: CannotDeleteItemModalProps) {
    return (
        <SModal
            basic
            open={props.isDisplayed}
        >
            <SHeader icon>
                <SIcon name='warning sign' />
                Cannot delete item
            </SHeader>
            <SModal.Content>
                {props.message ?? '(No specific error message was provided)'}
            </SModal.Content>
            <SModal.Actions>
                <SButton
                    color='blue'
                    inverted
                    onClick={props.onDismissed}
                >Got it</SButton>
            </SModal.Actions>
        </SModal>
    );
}

function CannotDeleteItemModal(props: CannotDeleteItemModalProps) {
    return (
        props.isDisplayed
            ? <_CannotDeleteItemModal {...props} />
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
            <div className='mbdb-array-complex-header-title'>{props.title}: {props.idx + 1}</div>
            <div className='mbdb-array-complex-header-line' />
        </div>
    );
}

export type Props = {
    item: Item,
    path: Path,
};
export function ArrayContainer({ item, path }: Props) {
    const _niceLabel = React.useMemo(() => niceLabel(item.label), [item]);
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
            <SButton
                color='green'
                onClick={() => {
                    const innerPath = Data.Path.index(array.length, path);
                    const value = {};
                    FormContext.makeData(item.input, value, handler.refs.get());

                    handler.set(innerPath, value);
                }}
                key='b+'
            >+ {_niceLabel}</SButton>
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
            <SButton
                color='green'
                onClick={() => {
                    const variantData = {};
                    FormContext.makeVariantData(item, variantData, handler.refs.get());
                    handler.set(Data.Path.index(array.length, path), variantData);
                }}
                key='b+'
            >+ {_niceLabel}</SButton>
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
            <SButton
                color='green'
                style={{ gridColumn: 'span 3' }}
                key='b+'
                onClick={() => {
                    const initialValue = Schema.hasOptionsInput(item)
                        ? Schema.initialOptionsValue(item.choices, Schema.hasOptionsWithOtherInput(item))
                        : Value.defaultForItem(item)
                    handler.set(Data.Path.index(array.length, path), initialValue);
                }}
            >+ {_niceLabel}</SButton>
        );
    } else if (Schema.hasIgnoredInput(item)) {
        return null;
    } else {
        throw new Error(`Do not know how to create array input for item "${item.tag}" with input type "${item.input}"`);
    }

    if (arrayIsSimple) {
        return (
            <>
                <CannotDeleteItemModal
                    isDisplayed={deletionError !== null}
                    message={deletionError}
                    onDismissed={() => setDeletionError(null)}
                />

                <div className='mbdb-section mbdb-array-tainer' id={tainerId}>
                    <SectionLabel label={niceLabel(item.label)} help={item.help} />
                    <div style={{ ...GridInArrayStyle }}>
                        {components}
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <CannotDeleteItemModal
                    isDisplayed={deletionError !== null}
                    message={deletionError}
                    onDismissed={() => setDeletionError(null)}
                />

                <div className='mbdb-section mbdb-array-tainer' id={tainerId}>
                    <SectionLabel label={niceLabel(item.label)} help={item.help} />
                    {components}
                </div>
            </>
        );
    }
}
