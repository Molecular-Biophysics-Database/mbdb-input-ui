import { Config } from '../config';
import { Net } from '../util/net';
import { Json } from '../util/types';

export type VocabularyEntry = {
    id: string,
    type: string,
    title: {
        [key: string]: string,
        en: string
    },
    props: Json,
} & Json;
export type Vocabulary = VocabularyEntry[];

const Cache = new Map<string, Vocabulary>;

async function getTotalHits(type: string) {
    const url = makeUrl(type);
    const pending = issueRequest(url);

    const resp = await Net.resolveFetch(pending);
    if (!resp.ok) {
        throw new Error(`"Error ${resp.status}" response to vocabulary request for "${type}" vocabulary type.`);
    }

    const payload = await resp.json();
    const totalHits = payload['hits']?.['total'];
    if (typeof totalHits !== 'number' || totalHits < 0) {
        throw new Error(`Unexpected response to vocabulary request for "${type}" vocabulary type. Invalid number of total hits.`);
    }

    return totalHits;
}

async function getVocabularyItems(type: string, totalHits: number) {
    const url = makeUrl(type, totalHits);
    const pending = issueRequest(url);

    const resp = await Net.resolveFetch(pending);
    if (!resp.ok) {
        throw new Error(`"Error ${resp.status}" response to vocabulary request for "${type}" vocabulary type.`);
    }

    const payload = await resp.json();
    const voc = payload['hits']?.['hits'];
    if (!voc) {
        throw new Error(`Unexpected response to vocabulary request for "${type}" vocabulary type.`);
    }
    if (!isVocabulary(voc)) {
        throw new Error(`Vocabulary "${type}" does not conform to the expected schema.`)
    }

    return voc;
}

function issueRequest(url: string) {
    return Net.fetchWithTimeout(
        url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        },
        15000
    );
}

function makeUrl(type: string, size?: number) {
    if (!Config.get('vocabulariesApiEndpoint')) {
        throw new Error('Cannot make a URL for vocabulary API query because the application is misconfigured.');
    }

    // BEWARE, BEWARE, BEWARE:
    // The inconsistency, or rather lack of thereof, is about the hit you in the face.
    // This URL shall *not* end with a trailing slash, otherwise the API request will fail.
    let url =`${Config.get('baseUrl')}/api/${Config.get('vocabulariesApiEndpoint')}/${type}`;
    if (size) {
        url = `${url}?page=1&size=${size}`;
    }

    return url;
}

function isVocabulary(obj: any): obj is Vocabulary {
    if (!Array.isArray(obj)) return false;

    for (const elem of obj) {
        if (!isVocabularyEntry(elem)) return false;
    }

    return true;
}

export function isVocabularyEntry(obj: any): obj is VocabularyEntry {
    if (typeof obj !== 'object') return false;
    if (typeof obj['id'] !== 'string' || typeof obj['id'] !== 'string') return false;

    const title = obj['title'];
    if (!title) return false;
    if (!title['en']) return false;
    for (const prop in title) {
        if (typeof title[prop] !== 'string') return false;
    }

    const props = obj['props'];
    if (!props || typeof props !== 'object') return false;

    return true;
}

export const Vocabulary = {
    async get(type: string, forceRefresh = false): Promise<Vocabulary> {
        if (!forceRefresh && Cache.has(type)) return Cache.get(type)!;

        // This needs to be done in double pass because the backend
        // returns only limited number of item unless we explicitly
        // ask for the number of vocabulary items to return.

        const totalHits = await getTotalHits(type);
        const voc = await getVocabularyItems(type, totalHits);

        Cache.set(type, voc);

        return voc;
    },

    getCached(type: string) {
        return Cache.get(type);
    },
};
