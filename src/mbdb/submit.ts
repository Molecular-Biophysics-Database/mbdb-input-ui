import { MbdbData } from './data';
import { DepositedFile } from '../schema';
import { ErrorResult, OkResult, Result } from '../util/result';

function _badTypeFromApi(expected: string, got: string) {
    throw new Error(`Invalid API response, expected a ${expected} got ${got}`);
}

const JsonRequestParams: Partial<RequestInit> = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    cache: 'no-cache',
};

const OctetRequestParams: Partial<RequestInit> = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/octet-stream',
    },
    cache: 'no-cache',
};

const PlainRequestParams: Partial<RequestInit> = {
    method: 'POST',
    cache: 'no-cache',
};

export type MbdbSubmissionResult = Result<
    {
        draftErrors: string[],
        recordId: string,
    },
    {
        code: number,
        errors: string[]
    }
>;

function getErrors(data: Record<string, any>) {
    const errors = data['errors'];
    if (errors === undefined || !Array.isArray(errors)) return [];

    const _errors = new Array<string>();
    // Check errors type
    for (const e of errors) {
        if (typeof e !== 'object') _badTypeFromApi('object', typeof e);
        const field = e.field;
        const messages = e.messages;

        if (typeof field !== 'string') _badTypeFromApi('string', typeof field);
        if (!Array.isArray(messages)) _badTypeFromApi('array', typeof messages);
        // Check messages type
        for (const msg of messages) {
            if (typeof msg !== 'string') _badTypeFromApi('string̈́', typeof msg);
        }

        _errors.push(`${field}: ${messages.join(', ')}`);
    }

    return _errors;
}

function getMetadataResponseInfo(data: Record<string, any>): { recordId: string, filesUrl: string } {
    const recordId = data['id'];
    const filesUrl = data['links']?.['files'];

    if (typeof recordId !== 'string') _badTypeFromApi('string', typeof recordId);
    if (typeof filesUrl !== 'string') _badTypeFromApi('string̈́', typeof filesUrl);

    return { recordId, filesUrl };
}

async function submitFiles(submissionUrl: string, files: DepositedFile[]): Promise<Result<undefined, { code: number, errors: string [] }>> {
    if (files.length === 0) return OkResult(void 0);

    // 1) Submit the list of the names of the files to be stored with the metadata
    const names = files.map((x) => ({ 'key': x.file!.name }));
    let resp = await fetch(
        submissionUrl,
        {
            ...JsonRequestParams,
            body: JSON.stringify(names),
        }
    );
    if (!resp.ok) return ErrorResult({ code: resp.status, errors: [`Failed to submit the list of accompanying files: ${resp.statusText}`] });

    // 2) Upload the file content and the metadata
    for (const f of files) {
        const fh = f.file!;
        const fileUploadUrl = `${submissionUrl.endsWith('/') ? submissionUrl.substring(0, submissionUrl.length - 1) : submissionUrl}/${fh.name}`;

        // 2a) Upload the content
        const buf = await fh.arrayBuffer();
        const bytes = new Uint8Array(buf);
        let resp = await fetch(
            `${fileUploadUrl}/content`,
            {
                ...OctetRequestParams,
                body: bytes,
            }
        );
        if (!resp.ok) return ErrorResult({ code: resp.status, errors: [`Failed to upload content of accompanying file "${fh.name}": ${resp.statusText}`] });

        // 2b) Upload the metadata
        resp = await fetch(
            fileUploadUrl,
            {
                ...JsonRequestParams,
                method: 'PUT',
                body: JSON.stringify({ description: f.metadata }), // NOTE: This should be more elaborate
            }
        );
        if (!resp.ok) return ErrorResult({ code: resp.status, errors: [`Failed to upload metadata for accompanying file "${fh.name}": ${resp.statusText}`] });

        // 2c) Commit the result
        resp = await fetch(
            `${fileUploadUrl}/commit`,
            PlainRequestParams,
        );
        if (!resp.ok) return ErrorResult({ code: resp.status, errors: [`Failed to commit uploaded accompanying file "${fh.name}": ${resp.statusText}`] });
    }

    return OkResult(void 0);
}

async function submitMetadata(baseUrl: string, apiEndpoint: string, metadata: MbdbData, asDraft: boolean): Promise<
    Result<
        {
            draftErrors: string[],
            filesUrl: string,
            recordId: string,
        },
        {
            code: number,
            errors: string[],
        }
    >
> {
    // BEWARE, BEWARE, BEWARE
    // The inconsistency, or rather lack of thereof, is about the hit you in the face.
    // This URL *must* end with a trailing slash, otherwise the API request will fail.
    let ep = apiEndpoint.startsWith('/') ? apiEndpoint.substring(1) : apiEndpoint;
    ep = ep.endsWith('/') ? ep.substring(0, ep.length - 1) : ep;

    const url = `${baseUrl}/${ep}/`;

    try {
        const resp = await fetch(
            url,
            {
                ...JsonRequestParams,
                body: JSON.stringify(metadata),
            }
        );

        if (!resp.ok) {
            try {
                const json = await resp.json();
                const errors = getErrors(json);
                if (errors === null) {
                    return ErrorResult({ code: resp.status, errors: [resp.statusText] });
                } else {
                    return ErrorResult({ code: resp.status, errors });
                }
            } catch (e) {
                return ErrorResult({ code: resp.status, errors: [resp.statusText] });
            }
        } else {
            try {
                const json = await resp.json();

                let draftErrors = new Array<string>();
                if (asDraft) {
                    // Errors are reported as "okayish" if we deposit a draft
                    draftErrors = getErrors(json);
                }

                const { recordId, filesUrl } = getMetadataResponseInfo(json);
                return OkResult({ draftErrors, filesUrl, recordId });
            } catch (e) {
                return ErrorResult({ code: 0, errors: [`API reported a success but returned an unexpected response (${e})`] });
            }
        }
    } catch (e) {
        return ErrorResult({ code: 0, errors: [`API error: ${(e as Error).message}`] });
    }
}

export async function submitToMbdb(
    baseUrl: string,
    apiEndpoint: string,
    payload : {
        metadata: MbdbData,
        files: DepositedFile[]
    },
    options?: Partial<{ asDraft: boolean }>
): Promise<MbdbSubmissionResult> {
    const metadataRes = await submitMetadata(baseUrl, apiEndpoint, payload.metadata, !!options?.asDraft);
    if (Result.isError(metadataRes)) return ErrorResult({ code: metadataRes.error.code, errors: metadataRes.error.errors });

    const filesRes = await submitFiles(metadataRes.data.filesUrl, payload.files);
    if (Result.isError(filesRes)) return ErrorResult({ code: filesRes.error.code, errors: filesRes.error.errors });

    return OkResult({
        draftErrors: metadataRes.data.draftErrors,
        recordId: metadataRes.data.recordId,
    });
}
