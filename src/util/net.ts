const StringEncoder = new TextEncoder();

export type NullableAbrtCtrl = AbortController | null;

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
    abortFetch(aborter: AbortController | null) {
        if (aborter !== null) {
            if (aborter.signal.aborted === false)
                aborter.abort();
        }
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

    serveFile(mimeType: string, data: string, filename: string) {
        const blob = new Blob([StringEncoder.encode(data)], { type: mimeType });
        serveBlob(blob, filename);
    },

    serveFileRaw(mimeType: string, data: Uint8Array, filename: string) {
        const blob = new Blob([data], { type: mimeType });
        serveBlob(blob, filename);
    },
};
