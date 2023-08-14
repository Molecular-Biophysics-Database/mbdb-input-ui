import React from 'react';
import { Root } from './root';
import { TopLevelItem } from '../../schema';

export function Input({ schema }: { schema: TopLevelItem }) {
    return (
        <div className='mbdb-input-tainer'>
            <Root schema={schema} />
        </div>
    );
}
