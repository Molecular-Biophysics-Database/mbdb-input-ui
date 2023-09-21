import { objKeys } from '../util';

const ConfigObj = {
    baseUrl: '',
    isDevel: false as boolean,
    vocabulariesApiEndpoint: '',
};
export type AppConfig = typeof ConfigObj;

function apply(cfg: { [key: string]: any }) {
    for (const k of objKeys(ConfigObj)) {
        const item = cfg[k as keyof typeof cfg];
        if (item === undefined) continue;

        const ref = ConfigObj[k];
        if (typeof item === typeof ref) {
            (ConfigObj[k] as typeof ref) = item;
        }
    }

    fixup();
}

function fixup() {
    ConfigObj.baseUrl = cleanUrlSlashes(ConfigObj.baseUrl);
    ConfigObj.vocabulariesApiEndpoint = cleanUrlSlashes(ConfigObj.vocabulariesApiEndpoint);
}

function cleanUrlSlashes(url: string) {
    let idxT = url.length - 1;
    while (idxT >= 0 && url[idxT] === '/') idxT--;

    let idxH = 0;
    while (idxH < idxT && url[idxH] === '/') idxH++;

    return url.substring(idxH, idxT + 1);
}

export const Config = {
    get<K extends keyof AppConfig>(k: K): AppConfig[K]  {
        return ConfigObj[k];
    },

    async load() {
        const req = await fetch('config.json');
        const cfg = await req.json();

        apply(cfg);
    },

    set(cfg: Partial<AppConfig>) {
        apply(cfg);
    },
}
