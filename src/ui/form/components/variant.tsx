import clsx from 'clsx';
import React from 'react';
import { Dropdown as SDropdown } from 'semantic-ui-react';
import { PathId } from '../path-id';
import { component } from '../render';
import { sectionBgCls, subtreeHasErrors, useDarkBlock } from '../util';
import { ErrorDialog } from '../../error-dialog';
import { FormContextInstance } from '../../../context';
import { _FormContextHandler } from '../../../context/handler';
import { Schema, VariantInput } from '../../../schema';
import { Data, Path } from '../../../schema/data';

function canChangeVariantChoice(handler: _FormContextHandler, path: Path) {
    return !handler.refs.isItemReferenced(path);
}

type CannotChangeVariantErrorDialogProps =  { isOpen: boolean, onDismissed: () => void };
function _CannotChangeVariantErrorDialog({ isOpen, onDismissed }: CannotChangeVariantErrorDialogProps) {
    return (
        <ErrorDialog
            isOpen={isOpen}
            title='Cannot change variant type'
            onDismissed={onDismissed}
        >
            <div>Cannot change this variant type to another type because the currently displayed item is referenced by some other item(s).</div>
        </ErrorDialog>
    );
}

function CannotChangeVariantErrorDialog(props: CannotChangeVariantErrorDialogProps) {
    return (
        props.isOpen
            ? <_CannotChangeVariantErrorDialog {...props} />
            : null
    );
}

const _VariantAnchor = React.memo(function MVariantAnchor({ path }: { path: Path }) {
    const htmlId = PathId.toVariantId(path);
    return (
        <>
            <div style={{ visibility: 'hidden' }} id={htmlId} /><div style={{ visibility: 'hidden' }} />
        </>
    );
}, (prevProps, nextProps) => {
    return Data.Path.arePathsEqual(prevProps.path, nextProps.path);
});

const _VariantInput = React.memo(function MVariantInput({ input, label, nestLevel, path, variantChoice, hasErrors, isDisabled, canParentMarkEmpty, handler }: Props & {
    handler: _FormContextHandler,
    hasErrors: boolean,
    variantChoice: string,
}) {
    const variants = React.useMemo(() => Object.keys(input), [input]);
    const opts = React.useMemo(
        () => variants.map((k, idx) => ({
            key: idx,
            text: k,
            value: k,
        })
    ), [input]);
    const [cannotChangeError, setCannotChangeError] = React.useState(false);
    const darkBlk = useDarkBlock(nestLevel);

    const varInput = input[variantChoice];
    const varComponent = component(varInput, nestLevel + 1, isDisabled, hasErrors, canParentMarkEmpty, path, Schema.itemHasReferenceable(varInput), void 0, true);
    return (
        <>
            <CannotChangeVariantErrorDialog
                isOpen={cannotChangeError}
                onDismissed={() => setCannotChangeError(false)}
            />

            <div className={clsx(
                'mbdb-section', hasErrors && 'mbdb-section-has-errors',
                'mbdb-block', sectionBgCls(darkBlk, isDisabled))}>
                <_VariantAnchor path={Data.Path.path(variantChoice, path)} />
                <div className='mbdb-variant-selection-tainer mbdb-right-offset'>
                    <div className='mbdb-section-label-text'>Type</div>
                    <SDropdown
                        value={variantChoice}
                        onChange={(_ev, data) => {
                            if (canChangeVariantChoice(handler, path)) {
                                handler.setVariantChoice(path, data.value as string);
                            } else {
                                setCannotChangeError(true);
                            }
                        }}
                        options={opts}
                        className='mbdb-section-label-text'
                        disabled={isDisabled}
                        selection
                        fluid
                    />
                </div>
                {varComponent}
            </div>
        </>
    );
}, (prevProps, nextProps) => {
    return (
        Object.is(prevProps.input, nextProps.input) &&
        Object.is(prevProps.label, nextProps.label) &&
        Object.is(prevProps.nestLevel, nextProps.nestLevel) &&
        Data.Path.arePathsEqual(prevProps.path, nextProps.path) &&
        Object.is(prevProps.variantChoice, nextProps.variantChoice) &&
        Object.is(prevProps.isDisabled, nextProps.isDisabled) &&
        Object.is(prevProps.hasErrors, nextProps.hasErrors)
    );
});

export type Props = {
    input: VariantInput,
    label: string,
    nestLevel: number,
    isDisabled: boolean,
    checkForErrors: boolean,
    canParentMarkEmpty: boolean,
    path: Path,
};
export function VariantInput(props: Props) {
    const { handler } = React.useContext(FormContextInstance);
    const variantChoice = handler.getVariantChoice(props.path);
    const hasErrors = (!props.checkForErrors|| props.isDisabled) ? false : subtreeHasErrors(handler.data(), props.path, handler.schema());

    return <_VariantInput {...props} variantChoice={variantChoice} hasErrors={hasErrors} handler={handler} />;
}
