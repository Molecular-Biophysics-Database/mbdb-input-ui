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
    if (!label) return null;

    return (
        <div className='mbdb-item-label'>
            <label className='mbdb-item-label-text' htmlFor={id}>
                <span>{label}</span>
                {markAsRequired ? <RequiredMark trigger={<span className='mbdb-field-is-required-marker mbdb-field-is-required-marker-item'>{'\u25A0'}</span>} /> : null}
            </label>
            <HelpPopup help={help} />
        </div>
    );
});

export const SectionLabel = React.memo(function _SectionLabel({ label, markAsRequired, help }: Props) {
    if (!label) return null;

    return (
        <div className='mbdb-section-label'>
            <label className='mbdb-section-label-text'>
                {label}
                {markAsRequired ? <RequiredMark trigger={<span className='mbdb-field-is-required-marker mbdb-field-is-required-marker-section'>{'\u25A0'}</span>} /> : null}
            </label>
            <HelpPopup help={help} />
        </div>
    );
});
