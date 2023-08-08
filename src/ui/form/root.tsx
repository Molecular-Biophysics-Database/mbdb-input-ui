import React from 'react';
import { component } from './render';
import { Item } from '../../schema';

export function Root({ schema }: { schema: Item[] }) {
    const components = React.useMemo(() => schema.map((im, key) => component(im, [], key)), [schema]);

    return (
        <div className='mbdb-form-root'>
            {components}
        </div>
    );

}
