import { Config } from '../config';
import { assert } from '../assert';
import { Net } from '../util/net';
import { Result } from '../util/result';
import { Json } from '../util/types';

// The backend may have a cap on how many hits it returns
// regardless of how many items it actually stores.
// Unless specified otherwise, use this value as the cap.
const DefaultMaximumHitsCap = 10000;

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

type CachedVocabulary = {
    isComplete: boolean,
    data: Vocabulary,
};
const Cache = new Map<string, CachedVocabulary>;

function getCached(type: string) {
    assert(isCached(type), `Vocabulary "${type}" has not been loaded yet`);

    return Cache.get(type)!;
}

async function getTotalHits(type: string) {
    const url = makeUrl(type);
    const pending = issueRequest(url);

    const r = await Net.resolveFetchNothrow(pending);
    if (Result.isOk(r)) {
        if (!r.data.ok) {
            throw new Error(`"Error ${r.data.status}" response to vocabulary request for "${type}" vocabulary type.`);
        }

        const payload = await r.data.json();
        const totalHits = payload['hits']?.['total'];
        if (typeof totalHits !== 'number' || totalHits < 0) {
            throw new Error(`Unexpected response to vocabulary request for "${type}" vocabulary type. Invalid number of total hits.`);
        }

        return totalHits;
    } else if (Result.isError(r)) {
        if (r.error.type === 'timeout') {
            return 0;
        } else if (r.error.type === 'error') {
            throw r.error.e;
        } else {
            assert(false, 'Unreachable');
        }
    } else {
        assert(false, 'Unreachable');
    }
}

async function getVocabularyItems(type: string, totalHits: number) {
    const url = makeUrl(type, { size: totalHits });
    const pending = issueRequest(url);

    const r = await Net.resolveFetchNothrow(pending);
    if (Result.isOk(r)) {
        if (!r.data.ok) {
            throw new Error(`"Error ${r.data.status}" response to vocabulary request for "${type}" vocabulary type.`);
        }

        const payload = await r.data.json();
        try {
            return vocabularyFromPayload(payload);
        } catch (e) {
            throw new Error(`Failed to fetch vocabulary "${type}": ${e}`);
        }
    } else if (Result.isError(r)) {
        if (r.error.type === 'timeout') {
            return [];
        } else if (r.error.type === 'error') {
            throw r.error.e;
        } else {
            assert(false, 'Unreachable');
        }
    } else {
        assert(false, 'Unreachable');
    }
}

async function fetchById(type: string, id: string): Promise<VocabularyEntry | undefined> {
    const url = makeUrl(type, { id });
    const pending = issueRequest(url);

    const resp = await Net.resolveFetch(pending);
    if (!resp.ok) {
        if (resp.status === 404) {
            return void 0; // Entry with the given ID does not exist
        }

        throw new Error(`"Error ${resp.status}" response to vocabulary id lookup request for "${type}" vocabulary type.`);
    }

    const payload = await resp.json();
    if (!isVocabularyEntry(payload)) {
        throw new Error(`Unexpected response to vocabulary id lookup request for "${type}" vocabulary type.`);
    }

    return payload;
}

async function fetchSuggestions(type: string, query: string) {
    const url = makeUrl(type, { suggest: query });
    const pending = issueRequest(url);

    const resp = await Net.resolveFetch(pending);
    if (!resp.ok) {
        throw new Error(`"Error ${resp.status}" response to vocabulary suggestion request for "${type}" vocabulary type.`);
    }

    const payload = await resp.json();
    try {
        return vocabularyFromPayload(payload);
    } catch (e) {
        throw new Error(`Failed to fetch vocabulary "${type}": ${e}`);
    }
}

async function fetchVocabulary(type: string) {
    const cap = Config.get('vocabulariesApiMaximumHitsCap') ?? DefaultMaximumHitsCap;

    const totalHits = await getTotalHits(type);

    let data: Vocabulary = [];
    if (totalHits > 0) {
        data = await getVocabularyItems(type, totalHits);
    }

    // Tolerate timeouts.
    // If a vocabulary fetch times out, pretend that we got an empty incomplete vocabulary
    // This will force the search function to use suggest requests.
    Cache.set(type, { data, isComplete: totalHits < cap && data.length > 0 });
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

function makeUrl(type: string, parameters?: { size?: number, suggest?: string, id?: string }) {
    if (!Config.get('vocabulariesApiEndpoint')) {
        throw new Error('Cannot make a URL for vocabulary API query because the application is misconfigured.');
    }

    // BEWARE, BEWARE, BEWARE:
    // The inconsistency, or rather lack of thereof, is about the hit you in the face.
    // This URL shall *not* end with a trailing slash, otherwise the API request will fail.
    let url =`${Config.get('baseUrl')}/api/${Config.get('vocabulariesApiEndpoint')}/${type}`;
    if (parameters?.size) {
        url = `${url}?page=1&size=${parameters.size}`;
    } else if (parameters?.suggest) {
        url = `${url}?suggest=${parameters.suggest}`;
    } else if (parameters?.id) {
        url = `${url}/${parameters.id}`;
    }

    return url;
}

function isCached(type: string) {
    return Cache.has(type);
}

function isVocabulary(obj: any): obj is Vocabulary {
    if (!Array.isArray(obj)) return false;

    for (const elem of obj) {
        if (!isVocabularyEntry(elem)) return false;
    }

    return true;
}

function vocabularyFromPayload(payload: any) {
    const voc = payload['hits']?.['hits'];
    if (!voc) {
        throw new Error(`Unexpected response to vocabulary request.`);
    }
    if (!isVocabulary(voc)) {
        throw new Error(`Payload does not conform to the expected schema.`)
    }

    return voc;
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
    getCached(type: string) {
        return getCached(type).data;
    },

    async getById(type: string, id: string, forceReload = false) {
        await this.prefetch(type, forceReload);
        const voc = getCached(type);

        let e = voc.data.find((x) => x.id === id);
        if (e) {
            return e;
        }

        e = await fetchById(type, id);
        if (e) {
            voc.data.push(e);
        }

        return e;
    },

    async prefetch(type: string, forceReload = false) {
        if (!isCached(type) || forceReload) {
            await fetchVocabulary(type);
        }
    },

    async search(type: string, query: string, forceReload = false): Promise<VocabularyEntry[]> {
        await this.prefetch(type, forceReload);
        const voc = getCached(type);

        const queryLwr = query.toLowerCase();
        const hits = voc.data.filter((x) => x.title.en.toLowerCase().startsWith(queryLwr));

        if (voc.isComplete) {
            return hits;
        } else {
            if (hits.length === 0) {
                const suggestionHits = await fetchSuggestions(type, query);

                for (const h of suggestionHits) {
                    // Check that we are not duplicating entries
                    if (!voc.data.find((x) => x.id === h.id))
                        voc.data.push(h);
                }

                return suggestionHits;
            } else {
                return hits;
            }
        }
    },
};
