import React from 'react';
import {
    Popup as SPopup
} from 'semantic-ui-react';
import { HelpPopup } from './help';
import { Help } from '../../../schema';

function RequiredMark({ trigger }: { trigger: JSX.Element }) {
    return (
        <SPopup
            content='This field is required and cannot be left blank or unset'
            trigger={trigger}
        />
    );
}

export type Props = {
    label: string,
    markAsRequired: boolean,
    help?: Help,
};

export const ItemLabel = React.memo(function _ItemLabel({ label, markAsRequired, help, id }: Props & { id: string }) {
    if (!label) return <div />;

    return (
        <div className='mbdbi-item-label'>
            <label className='mbdbi-item-label-text' htmlFor={id}>
                <span>{label}</span>
                {markAsRequired ? <RequiredMark trigger={<span className='mbdbi-field-is-required-marker mbdbi-field-is-required-marker-item'>{'\u25A0'}</span>} /> : null}
            </label>
            <HelpPopup help={help} />
        </div>
    );
});

export const SectionLabel = React.memo(function _SectionLabel({ label, markAsRequired, help }: Props) {
    if (!label) return <div />;

    return (
        <div className='mbdbi-section-label'>
            <label className='mbdbi-section-label-text'>
                {label}
                {markAsRequired ? <RequiredMark trigger={<span className='mbdbi-field-is-required-marker mbdbi-field-is-required-marker-section'>{'\u25A0'}</span>} /> : null}
            </label>
            <HelpPopup help={help} />
        </div>
    );
});
