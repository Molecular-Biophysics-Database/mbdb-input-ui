import React, { SyntheticEvent } from 'react';
import { Search as SSearch } from 'semantic-ui-react';
import { ItemLabel } from './label';
import { PathId } from '../path-id';
import { niceLabel } from '../util';
import { FormContextInstance } from '../../../context';
import { _FormContextHandler } from '../../../context/handler';
import { Vocabulary, VocabularyEntry } from '../../../mbdb/vocabulary';
import { Help } from '../../../schema';
import { Path } from '../../../schema/data';
import { Value } from '../../../schema/value';
import {objKeys} from '../../../util';

// The Search component provided by "semantic-ui-react" package has a rather awkward API.
// It gets particulary annoying when the search results need to be rendered by a custom renderer.
// We are dealing with it by piggybacking the found VocabularyEntry objects onto the props
// objects that get passed to the Result rendering function. We need to pick the variable
// names carefully to keep React happy.
//
// If you are reading this, you probably want to throw this away and write your own
// component for vocabulary searches. Have fun...

type Cleared = {
    type: 'cleared',
}
type PrefetchDone = {
    type: 'prefetch-done',
}
type PrefetchFailed = {
    type: 'prefetch-failed',
    error: string,
}
type Searching = {
    type: 'searching',
};
type SearchDone = {
    type: 'search-done',
    results: SearchResult[],
};
type SearchFailed = {
    type: 'search-failed',
    error: string,
};
type Transition = Cleared | PrefetchDone | PrefetchFailed | Searching | SearchDone | SearchFailed;

type SearchResult = {
    title: string, // This needs to be here to keep in line with the props expected by the custom rendering function
    __vocabularyentry: VocabularyEntry; // Don't ask and don't rename...
};


const InitialState = {
    loading: true as boolean,
    results: [] as SearchResult[],
    error: '' as string,
};

function doReduce(state: typeof InitialState, trans: Transition) {
    if (trans.type === 'cleared') {
        return { ...state, loading: false, results: [], error: '' };
    } else if (trans.type === 'prefetch-done') {
        return { ...state, loading: false, results: [], error: '' };
    } else if (trans.type === 'prefetch-failed') {
        return { ...state, loading: false, results: [], error: trans.error };
    } else if (trans.type === 'search-done') {
        return { ...state, loading: false, results: trans.results, error: '' };
    } else if (trans.type === 'search-failed') {
        return { ...state, loading: false, results: [], error: trans.error };
    } else if (trans.type === 'searching' ) {
        return { ...state, loading: true, error: '' };
    } else {
        return state;
    }
}

function Result(props: any) {
    const ve = props['__vocabularyentry'] as Vocabulary[number];
    const details = [];
    let key = 0;
    for (const prop in ve.props) {
        const v = ve.props[prop];
        if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
            details.push(
                <div className='mbdbi-voc-entry-detail-name' key={key++}>{niceLabel(prop)}</div>,
                <div key={key++}>{niceLabel(v.toString())}</div>
            );
        }
    }
    return (
        <div>
            <div className='mbdbi-voc-entry-title'>{ve.title.en}</div>
            <div style={{ height: 'var(--mbdbi-v2gap)' }} />
            <div className='mbdbi-voc-entry-details'>
                {details}
            </div>
        </div>
    );
}

const MVocabularyInput = React.memo(function _VocabularyInput(props: {
    id: string,
    label: string,
    isRequired: boolean,
    help?: Help,
    loading: boolean,
    value: string,
    results: SearchResult[],
    error: string,
    onSearch: (ev: SyntheticEvent, data: object) => void,
    onSelected: (ev: SyntheticEvent, data: object) => void,
    handler: _FormContextHandler
}) {
    return (
        <>
            <ItemLabel id={props.id} label={props.label} markAsRequired={props.isRequired} help={props.help} />
            <div style={{ alignItems: 'center', display: 'flex', gap: 'var(--mbdbi-hgap)' }}>
                <SSearch
                    id={props.id}
                    loading={props.loading}
                    value={props.value}
                    results={props.results}
                    onResultSelect={props.onSelected}
                    onSearchChange={props.onSearch}
                    resultRenderer={Result}
                />
                {props.error ? <div className='mbdbi-strong ' style={{ color: 'red' }}>Error: {props.error}</div> : null }
            </div>
        </>
    );
}, (prevProps, nextProps) => {
    for (const k of objKeys(nextProps)) {
        if (k === 'handler') continue;

        if (!Object.is(prevProps[k], nextProps[k])) return false;
    }

    return true;
});

export type Props = {
    label: string,
    isRequired: boolean,
    help?: Help,
    path: Path,
    vocabularyType: string,
};
export function VocabularyInput(props: Props) {
    const id = React.useMemo(() => PathId.toId(props.path), [props.path]);
    const { handler } = React.useContext(FormContextInstance);
    const [state, dispatch] = React.useReducer(doReduce, InitialState);

    const onSearch = React.useMemo(() => (_ev: SyntheticEvent, data: Record<string, any>) => {
        // Block user input if there is a vocabulary lookup operation in progress.
        // A better solution would be to cancel the current operation and start a new one.
        // However, having cancellable vocabulary requests would require another level
        // of complexity.
        // We may need to revisit this if it turns out to be too annoying in practice.
        if (state.loading) return;

        handler.set(props.path, Value.emptyVocabularyEntry(false));

        if (!data['value'] || typeof data['value'] !== 'string') {
            dispatch({ type: 'cleared' });

            // User has cleared the field, invalidate the data
            handler.set(props.path, Value.emptyVocabularyEntry(!props.isRequired));
        } else {
            // User has changed the input field. Let's create an invalid value
            // with the title that matches the user input. Otherwise we'd mess up the display
            const emptyish = Value.emptyVocabularyEntry(false);
            emptyish.payload.title = data.value;
            handler.set(props.path, emptyish);

            dispatch({ type: 'searching' });

            Vocabulary.search(props.vocabularyType, data.value).then((entries) => {
                const results = entries.map((x) => ({ title: x.title.en, __vocabularyentry: x }));

                dispatch({ type: 'search-done', results });
            }).catch((e) => {
                dispatch({ type: 'search-failed', error: e.message });
            });
        }
    }, [state, props.path]);

    const onSelected = React.useMemo(() => {
        return (_ev: SyntheticEvent, data: Record<string, any>) => {
            const ve = data.result.__vocabularyentry as VocabularyEntry;
            const v = Value.vocabularyEntry(ve.id, ve.title.en, ve, true);

            handler.set(props.path, v);
        }
    }, [props.path]);

    React.useEffect(() => {
        // TODO: We do not handle the case where the component can be unmounted
        //       before the vocabulary fetch operation completes. This might
        //       trigger a warning in React because this function will attempts
        //       to change the state of an unmounted component.
        Vocabulary.prefetch(props.vocabularyType).then(() => {
            dispatch({ type: 'prefetch-done' });
        }).catch((e) => dispatch({ type: 'prefetch-failed', error: e.message }));
    }, [props.vocabularyType]);

    const v = Value.toVocabularyEntry(handler.getValue(props.path));

    return (
        <MVocabularyInput
            id={id}
            label={props.label}
            isRequired={props.isRequired}
            help={props.help}
            loading={state.loading}
            value={v.title}
            results={state.results}
            error={state.error}
            onSearch={onSearch}
            onSelected={onSelected}
            handler={handler}
        />
    );
}
