import React from 'react';
import { Navigation } from './navigation';
import { Input } from './input';
import { Item } from '../../schema';

export function Form({ schema }: { schema: Item[] }) {
    const inputRef = React.useRef(null);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 'var(--mbdb-2hgap)', overflow: 'hidden' }}>
            <div style={{ overflow: 'scroll' }}>
                <Navigation schema={schema} inputRef={inputRef} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', columnGap: 'var(--mbdb-2hgap)', overflow: 'hidden' }}>
                <div style={{ overflow: 'scroll' }} ref={inputRef}>
                    <Input schema={schema} />
                </div>
            </div>
        </div>
    );
}
