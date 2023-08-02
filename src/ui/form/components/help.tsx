import React from 'react';
import { Popup as SPopup } from 'semantic-ui-react';
import { Help } from '../../../schema';

export function HelpPopup({ help }: { help?: Help }) {
    // TODO: Do the language thing

    const helpText = help?.['en'];
    if (!helpText) return null;

    return (
        <SPopup
            content={helpText}
            trigger={<div className='mbdb-help-popup-trigger'>(?)</div>}
        />
    );
}
