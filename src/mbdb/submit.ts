import { MbdbData } from './data';

export async function submitToMbdb(baseUrl: string, apiEndpoint: string, data: MbdbData) {
    // BEWARE, BEWARE, BEWARE:
    // The inconsistency, or rather lack of thereof, is about the hit you in the face.
    // This URL *must* end with a trailing slash, otherwise the API request will fail.
    const url = `${baseUrl}/${apiEndpoint}/`;

    try {
        return await fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-cache',
                body: JSON.stringify(data),
            }
        );
    } catch (e) {
        throw new Error(`API error: ${(e as Error).message}`);
    }
}
