import React from 'react';
import { Breadcrumb } from './breadcrumb';
import { Navigation } from './navigation';
import { Input } from './input';
import { TopLevelItem } from '../../schema';

export function Form({ schema }: { schema: TopLevelItem }) {
    const inputRef = React.useRef(null);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: '0', overflow: 'hidden' }}>
            <div className='mbdbi-navigation-tainer'>
                <Navigation schema={schema} inputRef={inputRef} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', columnGap: 'var(--mbdbi-2hgap)', overflow: 'hidden' }}>
                <Breadcrumb inputRef={inputRef} />
                <div style={{ overflow: 'scroll' }} ref={inputRef}>
                    <Input schema={schema} />
                </div>
            </div>
        </div>
    );
}
