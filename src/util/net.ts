import { assert } from '../assert';

const StringEncoder = new TextEncoder();

export type NullableAbrtCtrl = AbortController | null;

type AbortableFetch = {
    response: Promise<Response>,
    aborter: AbortController | null,
    timeoutTimer?: ReturnType<typeof setTimeout>,
    timedOutAfter?: number,
}

function serveBlob(blob: Blob, filename: string) {
    const objUrl = URL.createObjectURL(blob);

    try {
        const e = document.createElement('a');
        e.href = objUrl;
        e.download = filename;

        document.body.appendChild(e);
        e.click();
        document.body.removeChild(e);
    } catch (e) {
        // This is unlikely to throw but since we can create very large memory leaks here
        // if we do not release the objUrl, we better wrap this in try-catch just in case.
    } finally {
        URL.revokeObjectURL(objUrl);
    }
}

export const Net = {
    abortableFetch(info: URL | RequestInfo, init?: RequestInit): AbortableFetch {
        const aborter = new AbortController();

        return {
            response: fetch(info, { ...init, signal: aborter.signal }),
            aborter
        };
    },

    abortFetch(aborter: AbortController | null) {
        if (aborter !== null) {
            if (aborter.signal.aborted === false)
                aborter.abort();
        }
    },

    fetchWithTimeout(info: URL | RequestInfo, init: RequestInit | undefined, timeoutMs: number): AbortableFetch {
        assert(timeoutMs > 0, `Fetch timeout must be a positive number but got ${timeoutMs}`);

        const pending = this.abortableFetch(info, init);
        pending.timeoutTimer = setTimeout(() => {
            Net.abortFetch(pending.aborter);
            pending.timedOutAfter = timeoutMs;
        }, timeoutMs);

        return pending;
    },

    isAbortError(e: Error) {
        return e.name === 'AbortError';
    },

    isFetchAborted(aborter: AbortController | null) {
        return aborter === null ? false : aborter.signal.aborted;
    },

    openLink(url: string, newTab = false) {
        if (!newTab) {
            window.location.href = url;
        } else {
            window.open(url, '_blank')?.focus();
        }
    },

    paramsFromUrl<K extends string, T extends Record<K, string>>(schema: T, search: string): Partial<T> {
        const urlParams = new URLSearchParams(search);

        const params: Partial<T> = {};
        for (const prop in schema) {
            const v = urlParams.get(prop);
            if (v !== null)
                (params[prop] as string) = v;
        }

        return params;
    },

    async resolveFetch(fetch: AbortableFetch) {
        try {
            const resp = await fetch.response;

            if (fetch.timeoutTimer) clearTimeout(fetch.timeoutTimer);
            return resp;
        } catch (e) {
            if (fetch.timeoutTimer) clearTimeout(fetch.timeoutTimer);

            if (Net.isAbortError(e as Error) && fetch.timedOutAfter) {
                throw new Error(`Request has timed out after ${fetch.timedOutAfter} ms`);
            } else {
                throw e;
            }
        }
    },

    serveFile(mimeType: string, data: string, filename: string) {
        const blob = new Blob([StringEncoder.encode(data)], { type: mimeType });
        serveBlob(blob, filename);
    },

    serveFileRaw(mimeType: string, data: Uint8Array, filename: string) {
        const blob = new Blob([data], { type: mimeType });
        serveBlob(blob, filename);
    },
};
