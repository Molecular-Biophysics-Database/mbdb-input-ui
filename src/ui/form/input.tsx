import React from 'react';
import { Root } from './root';
import { Item } from '../../schema';

export function Input({ schema }: { schema: Item[] }) {
    return (
        <div className='mbdb-input-tainer'>
            <Root schema={schema} />
        </div>
    );
}
