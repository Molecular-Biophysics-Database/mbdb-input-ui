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
import { Value } from '../../../schema/value';

export function ReferenceableIdInput({ referenceAs, path }: { referenceAs: string, path: Path }) {
    const { handler } = React.useContext(FormContextInstance);

    React.useEffect(() => {
        const refId = Value.toRefId(handler.getValue(path));
        if (!(handler.refs.hasAnchor(referenceAs) && handler.refs.has(referenceAs, refId))) {
            // The referenceable may have been already added if the context was loaded from a file
            handler.refs.add(Data.Path.parent(path), referenceAs, refId);
        }

        return () => {
            // We are only checking for the anchor. If the anchor is gone, it most likely means that
            // the data model has been replaced. This will still get us an assertion of the anchor
            // exists but does not have the specific "refId".
            // We need to handle cases where the entire data model is replaced to allow schema changes
            // in runtime.
            if (handler.refs.hasAnchor(referenceAs)) {
                handler.refs.remove(referenceAs, refId)
            } else {
                // We will probably want to remove this warning later
                console.warn(`Attempted to remove non-existing reference "${refId}" for referenceable "${referenceAs}"`);
            }
        };
    }, []);

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
    const data = handler.getTree(path);
    const referenceables = References.list(handler.refs.get(), relatesTo);
    const refingId = React.useMemo(() => Uuid.get(), []);
    const id = data['id'];

    assert(id !== undefined, `Data for RelatedTo input on path "${Data.Path.toString(path)}" does not have an "id" field, which is required.`);
    assert(Value.isValue(id) && Value.isRelToId(id), '"id" field is not a Value');

    React.useEffect(() => {
        if (!Value.isEmpty(id)) {
            References.ref(handler.refs.get(), relatesTo, id.payload, refingId, data);
        }

        return () => {
            assert(Value.isValue(data['id']), '"id" field is not a Value');
            const refId = Value.toRelToId(data['id']);
            // We are only checking for the anchor. If the anchor is gone, it most likely means that
            // the data model has been replaced. This will still get us an assertion of the anchor
            // exists but does not have the specific "refId".
            // We need to handle cases where the entire data model is replaced to allow schema changes
            // in runtime.
            // We are doing the same thing when ReferenceableIdInput unmounts.
            if (handler.refs.hasAnchor(relatesTo) && refId) {
                References.unref(handler.refs.get(), relatesTo, refId, refingId);
            }
        }
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
    const [referenceId, setReferenceId] = React.useState(Value.toRelToId(id));

    return (
        <>
            <ItemLabel label={label} markAsRequired={isRequired} id={htmlId} />
            <SDropdown
                placeholder={`Select ${label}, if applicable`}
                id={htmlId}
                value={referenceId}
                onChange={(_ev, data) => {
                    const newRefId = data.value as string;

                    if (newRefId) {
                        const referenceable = referenceables.find((r) => r.refId === newRefId);
                        assert(referenceable !== undefined, `Item related to "${relatesTo}" attempted to get a referenceable with ID "${newRefId}" but referenceable with such ID does not exist.`);

                        for (const relKey of relatedKeys) {
                            const innerPath = Data.Path.path(relKey, path);
                            const relatedValue = referenceable.data[relKey];
                            assert(relatedValue !== undefined, `Item related to "${relatesTo}" attempted to get related value "${relKey}" but the value does not exist.`);
                            assert(Value.isValue(relatedValue), '"relatedValue" is not a Value');

                            handler.set(innerPath, relatedValue, true);
                        }
                    } else {
                        for (const relKey of relatedKeys) {
                            const innerPath = Data.Path.path(relKey, path);
                            if (relKey === 'id') {
                                handler.set(innerPath, Value.empty(!isRequired));
                            } else {
                                handler.unset(innerPath, true);
                            }
                        }
                    }

                    if (referenceId) {
                        References.unref(handler.refs.get(), relatesTo, referenceId, refingId);
                    }
                    if (newRefId) {
                        References.ref(handler.refs.get(), relatesTo, newRefId, refingId, data);
                    }

                    handler.update();
                    setReferenceId(newRefId);
                }}
                options={opts}
                selection
                fluid
            />
        </>
    );
}
