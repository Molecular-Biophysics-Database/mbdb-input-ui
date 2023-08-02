import React from 'react';
import { Dropdown as SDropdown } from 'semantic-ui-react';
import {
    Button as SButton,
    Header as SHeader,
    Icon as SIcon,
    Modal as SModal
} from 'semantic-ui-react';
import { PathId } from '../path-id';
import { component } from '../render';
import { FormContextInstance } from '../../../context';
import { _FormContextHandler } from '../../../context/handler';
import { VariantInput } from '../../../schema';
import { Data, Path } from '../../../schema/data';

function canChangeVariantChoice(handler: _FormContextHandler, path: Path) {
    return !handler.refs.isItemReferenced(path);
}

type CannotChangeVariantErrorProps =  { isDisplayed: boolean, onDismissed: () => void };
function _CannotChangeVariantError({ isDisplayed, onDismissed }: CannotChangeVariantErrorProps) {
    return (
        <SModal
            basic
            open={isDisplayed}
        >
            <SHeader icon>
                <SIcon name='warning sign' />
                Cannot change variant type
            </SHeader>
            <SModal.Content>
                Cannot change this variant type to another type because the currently displayed item is referenced by some other item(s).
            </SModal.Content>
            <SModal.Actions>
                <SButton
                    color='blue'
                    inverted
                    onClick={onDismissed}
                >Got it</SButton>
            </SModal.Actions>
        </SModal>
    );
}

function CannotChangeVariantError(props: CannotChangeVariantErrorProps) {
    return (
        props.isDisplayed
            ? <_CannotChangeVariantError {...props} />
            : null
    );
}

const VariantAnchor = React.memo(function _VariantAnchor({ path }: { path: Path }) {
    const htmlId = PathId.toVariantId(path);
    return (
        <>
            <div style={{ visibility: 'hidden' }} id={htmlId} /><div style={{ visibility: 'hidden' }} />
        </>
    );
}, (prevProps, nextProps) => {
    return Data.Path.arePathsEqual(prevProps.path, nextProps.path);
});

const _VariantInput = React.memo(function _VariantInput({ input, label, path, variantChoice, handler }: Props & { handler: _FormContextHandler, variantChoice: string }) {
    const variants = React.useMemo(() => Object.keys(input), [input]);
    const opts = React.useMemo(
        () => variants.map((k, idx) => ({
            key: idx,
            text: k,
            value: k,
        })
    ), [input]);
    const [cannotChangeError, setCannotChangeError] = React.useState(false);

    console.log('rr');

    const varComponent = component(input[variantChoice], path);
    return (
        <>
            <CannotChangeVariantError
                isDisplayed={cannotChangeError}
                onDismissed={() => setCannotChangeError(false)}
            />

            <div className='mbdb-section'>
                <VariantAnchor path={Data.Path.path(variantChoice, path)} />
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
                    selection
                    fluid
                />
                {varComponent}
            </div>
        </>
    );
}, (prevProps, nextProps) => {
    return (
        Object.is(prevProps.input, nextProps.input) &&
        Object.is(prevProps.label, nextProps.label) &&
        Data.Path.arePathsEqual(prevProps.path, nextProps.path) &&
        Object.is(prevProps.variantChoice, nextProps.variantChoice)
    );
});

export type Props = {
    input: VariantInput,
    label: string,
    path: Path,
};
export function VariantInput(props: Props) {
    const { handler } = React.useContext(FormContextInstance);
    const variantChoice = handler.getVariantChoice(props.path);

    return <_VariantInput {...props} variantChoice={variantChoice} handler={handler} />;
}
