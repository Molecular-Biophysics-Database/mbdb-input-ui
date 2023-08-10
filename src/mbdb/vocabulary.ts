import { Config } from '../config';
import { Json } from '../util/types';

export type Vocabulary = (
    {
        id: string,
        type: string,
        title: {
            [key: string]: string,
            en: string
        },
        props: Json,
    } & Json
)[];
const Cache = new Map<string, Vocabulary>;

function makeUrl(type: string) {
    if (!Config.get('vocabulariesApiEndpoint')) {
        throw new Error('Cannot make a URL for vocabulary API query because the application is misconfigured.');
    }

    // BEWARE, BEWARE, BEWARE:
    // The inconsistency, or rather lack of thereof, is about the hit you in the face.
    // This URL shall *not* end with a trailing slash, otherwise the API request will fail.
    return `${Config.get('baseUrl')}/api/${Config.get('vocabulariesApiEndpoint')}/${type}`;
}

function isVocabulary(obj: any): obj is Vocabulary {
    if (!Array.isArray(obj)) return false;

    for (const elem of obj) {
        if (typeof elem !== 'object') return false;
        if (typeof elem['id'] !== 'string' || typeof elem['id'] !== 'string') return false;

        const title = elem['title'];
        if (!title) return false;
        if (!title['en']) return false;
        for (const prop in title) {
            if (typeof title[prop] !== 'string') return false;
        }

        const props = elem['props'];
        if (!props || typeof props !== 'object') return false;
    }

    return true;
}

export const Vocabulary = {
    async get(type: string, forceRefresh = false): Promise<Vocabulary> {
        if (!forceRefresh && Cache.has(type)) return Cache.get(type)!;

        const url = makeUrl(type);
        const req = await fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-cache',
            }
        );
        if (!req.ok) {
            throw new Error(`"Error ${req.status}" response to vocabulary request for "${type}" vocabulary type.`);
        }

        const resp = await req.json();
        const voc = resp['hits']?.['hits'];
        if (!voc) {
            throw new Error(`Unexpected response to vocabulary request for "${type}" vocabulary type.`);
        }
        if (!isVocabulary(voc)) {
            throw new Error(`Vocabulary "${type}" does not conform to the expected schema.`)
        }

        Cache.set(type, voc);

        return voc;
    },
};
