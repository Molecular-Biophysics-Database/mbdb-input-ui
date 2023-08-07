import { objKeys } from '../util';

const ConfigObj = {
    baseUrl: '',
    isDevel: false as boolean,
};

function apply(cfg: { [key: string]: any }) {
    for (const k of objKeys(ConfigObj)) {
        const item = cfg[k as keyof typeof cfg];
        if (item === undefined) continue;

        const ref = ConfigObj[k];
        if (typeof item === typeof ref) {
            (ConfigObj[k] as typeof ref) = item;
        }
    }
}

export const Config = {
    get<K extends keyof typeof ConfigObj>(k: K): (typeof ConfigObj)[K]  {
        return ConfigObj[k];
    },

    async load() {
        const req = await fetch('config.json');
        const cfg = await req.json();

        apply(cfg);
    },
}
