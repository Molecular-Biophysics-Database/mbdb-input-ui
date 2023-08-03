import { MbdbData } from './';

export async function submitToMbdb(baseUrl: string, apiEndpoint: string, data: MbdbData) {
    if (baseUrl === '') {
        throw new Error('No base URL of the MBDB database was set in the configuration file.');
    }

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
