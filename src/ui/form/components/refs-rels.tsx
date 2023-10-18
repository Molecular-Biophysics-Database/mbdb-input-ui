import React from 'react';
import { Dropdown as SDropdown } from 'semantic-ui-react';
import { ItemLabel } from './label';
import { PathId } from '../path-id';
import { assert } from '../../../assert';
import { FormContextInstance } from '../../../context';
import { Help } from '../../../schema';
import { Data, Path } from '../../../schema/data';
import { References } from '../../../schema/references';
import { Uuid } from '../../../schema/uuid';
import { RelatedTo, Value } from '../../../schema/value';

export function ReferenceableIdInput({ referenceAs, path }: { referenceAs: string, path: Path }) {
    const { handler } = React.useContext(FormContextInstance);

    React.useEffect(() => {
        const refId = Value.toRefId(handler.getValue(path));
        if (!(handler.refs.hasAnchor(referenceAs) && handler.refs.has(referenceAs, refId))) {
            // The referenceable may have been already added if the context was loaded from a file.
            // In that case we would not take this if-branch
            handler.refs.add(Data.Path.parent(path), referenceAs, refId);
        }

        return () => {
            // We are explicitly checking if the reference anchor exists and if we exist in the list of
            // referenceables for that anchor.
            // We need to handle cases where the entire form context is replaced to allow schema changes
            // in runtime. Since React re-renders the form only after the context has been replaced,
            // we might be trying to remove stale data created by the previous context.
            //
            // We are doing something similar but more heavy-handed for "related-to" items.
            if (handler.refs.hasAnchor(referenceAs) && handler.refs.has(referenceAs, refId)) {
                handler.refs.remove(referenceAs, refId);
            } else {
                // We will probably want to remove this warning later
                console.warn(`Attempted to remove non-existing reference "${refId}" for referenceable "${referenceAs}"`);
            }
        };
    }, [handler]);

    return null;
}

export type RelatedToProps = {
    help?: Help,
    label: string,
    isRequired: boolean,
    relatesTo: string,
    relatedKeys: string[],
    path: Path
};
export function RelatedToInput({ label, relatesTo, relatedKeys, isRequired, path }: RelatedToProps) {
    const htmlId = React.useMemo(() =>  PathId.toId(path), [path]);
    const { handler } = React.useContext(FormContextInstance);
    const referenceables = References.list(handler.refs.get(), relatesTo);
    const refingId = React.useMemo(() => Uuid.get(), []);
    const value = handler.getValue(path);
    const relToValue = Value.toRelTo(value);

    React.useEffect(() => {
        if (relToValue.id !== '') {
            References.ref(handler.refs.get(), relatesTo, relToValue.id, refingId, value);
        }

        return () => {
            const relToId = relToValue.id;
            const refs = handler.refs.get();
            // We are explicitly checking if the anchor we are referencing is present and if we are
            // actually referenced by that anchor.
            // An attempt to remove a "related-to" item that is not referenced by anything is an invariant
            // violation and triggers an assertion failure.
            // We need to handle cases where the entire form context is replaced to allow schema changes
            // in runtime. Since React re-renders the form only after the context has been replaced,
            // we might be trying to remove stale data created by the previous context.
            //
            // We are doing something similar when ReferenceableIdInput unmounts.
            if (
                References.hasAnchor(refs, relatesTo) && // Does the anchor exist?
                relToId && // Is the ID of the item we are referencing non-null?
                References.has(refs, relatesTo, relToId) && // Does the item we are referencing exist?
                References.isReferencedBy(refs, relatesTo, relToId, refingId) // Does the item reference us?
            ) {
                References.unref(handler.refs.get(), relatesTo, relToId, refingId);
            }
        };
    }, []);

    // EXCERISE CAUTION:
    // We are currently relying on the fact that all referenceable items in the schema
    // have and "id" and "name" fields. "id" is the unique identifier of the referenceable item,
    // "name" is the "human-readable" name. The underlying data model should guarantee that these
    // this fields will always be present and have sensible values. Until we can impose a strong
    // guarantee that this is, in fact, always the case, expect that things may break here...
    const opts = [
        {
            key: '',
            text: '(None)',
            value: '',
        },
        ...referenceables.map((r, idx) => {
            assert(Data.isDataTree(r.data), 'Expected a DataTree.');
            const name = r.data['name'];
            assert(Value.isValue(name), 'Expected the "name" field to be a value.');

            return {
                key: idx,
                text: r.data?.['name'] ? Value.toTextual(name) : 'NO-NAME-FIELD',
                value: r.refId,
            };
        })
    ];
    const [referenceId, setReferenceId] = React.useState(relToValue.id);

    return (
        <>
            <ItemLabel label={label} markAsRequired={isRequired} id={htmlId} />
            <SDropdown
                className='mbdbi-right-offset'
                placeholder={`Select ${label}, if applicable`}
                id={htmlId}
                value={referenceId}
                onChange={(_ev, data) => {
                    const newRelToId = data.value as string;

                    if (newRelToId) {
                        // relToId has changed, create a new RelatedTo value
                        const referenceable = referenceables.find((r) => r.refId === newRelToId);
                        assert(referenceable !== undefined, `Item related to "${relatesTo}" attempted to get a referenceable with ID "${newRelToId}" but referenceable with such ID does not exist.`);

                        const data: RelatedTo['data'] = {};

                        for (const relKey of relatedKeys) {
                            if (relKey !== 'id') {
                                const referencedValue = referenceable.data[relKey];
                                assert(referencedValue !== undefined, `Item related to "${relatesTo}" attempted to get referenced value "${relKey}" but the value does not exist.`);
                                assert(Value.isValue(referencedValue), '"referencedValue" is not a Value');
                                assert(Value.isTextual(referencedValue) || Value.isBoolean(referencedValue) || Value.isTristate(referencedValue), '"referencedValue has a wrong type.');

                                data[relKey] = referencedValue;
                            }
                        }

                        const newValue = Value.relTo(newRelToId, data, true);
                        handler.set(path, newValue, true);

                        if (referenceId) {
                            References.unref(handler.refs.get(), relatesTo, referenceId, refingId);
                        }

                        References.ref(handler.refs.get(), relatesTo, newRelToId, refingId, newValue);
                    } else {
                        // relToId is empty, set empty value
                        handler.set(path, Value.relTo('', null, !isRequired));

                        if (referenceId) {
                            References.unref(handler.refs.get(), relatesTo, referenceId, refingId);
                        }
                    }

                    handler.update();
                    setReferenceId(newRelToId);
                }}
                options={opts}
                error={referenceId === '' && isRequired}
                selection
            />
        </>
    );
}
