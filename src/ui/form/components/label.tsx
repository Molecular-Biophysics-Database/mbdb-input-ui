import React from 'react';
import { HelpPopup } from './help';
import { Help } from '../../../schema';

export type Props = {
    label: string,
    help?: Help,
};

export const ItemLabel = React.memo(function _ItemLabel({ label, help, id }: Props & { id: string }) {
    return (
        <div className='mbdb-item-label'>
            <label className='mbdb-item-label-text' htmlFor={id}>{label}</label>
            <HelpPopup help={help} />
        </div>
    );
});

export const SectionLabel = React.memo(function _SectionLabel({ label, help }: Props) {
    return (
        <div className='mbdb-section-label'>
            <label className='mbdb-section-label-text'>{label}</label>
            <HelpPopup help={help} />
        </div>
    );
});
