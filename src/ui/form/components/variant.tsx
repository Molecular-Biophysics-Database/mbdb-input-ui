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
    const darkBlk = useDarkBlock(nestLevel);

    const varInput = input[variantChoice];
    const varComponent = component(varInput, nestLevel + 1, isDisabled, hasErrors, canParentMarkEmpty, path, Schema.itemHasReferenceable(varInput), void 0, true);
    return (
        <div className={clsx(
            'mbdbi-section', hasErrors && 'mbdbi-section-has-errors',
            'mbdbi-block', sectionBgCls(darkBlk, isDisabled))}>
            <_VariantAnchor path={Data.Path.path(variantChoice, path)} />
            <div className='mbdbi-variant-selection-tainer mbdbi-right-offset'>
                <div className='mbdbi-section-label-text'>Type</div>
                <SDropdown
                    value={variantChoice}
                    onChange={(_ev, data) => {
                        if (canChangeVariantChoice(handler, path)) {
                            handler.setVariantChoice(path, data.value as string);
                        } else {
                            ErrorDialog.show({
                                title: 'This action cannot be done right now',
                                content: <div>'Cannot change this variant type to another type because the currently displayed item is referenced by some other item(s)'</div>
                            });
                        }
                    }}
                    options={opts}
                    className='mbdbi-section-label-text'
                    disabled={isDisabled}
                    selection
                    fluid
                />
            </div>
            {varComponent}
        </div>
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
