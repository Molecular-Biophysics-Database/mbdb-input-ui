import React from 'react';
import { component } from './render';
import { TopLevelItem } from '../../schema';

export function Root({ schema }: { schema: TopLevelItem }) {
    const components = React.useMemo(() => schema.input.map((im, key) => component(im, 0, false, true, false, [], true, key)), [schema]);

    return (
        <div className='mbdbi-form-root'>
            {components}
        </div>
    );
}
