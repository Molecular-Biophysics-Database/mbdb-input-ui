const ConfigObj = {
    baseUrl: '',
};

function apply(cfg: { [key: string]: any }) {
    for (const k in ConfigObj) {
        const item = cfg[k as keyof typeof cfg];
        if (item === undefined) continue;

        if (typeof item === typeof ConfigObj[k as keyof typeof ConfigObj]) {
            ConfigObj[k as keyof typeof ConfigObj] = item;
        }
    }
}

export const Config = {
    get(k: keyof typeof ConfigObj) {
        return ConfigObj[k];
    },

    async load() {
        const req = await fetch('config.json');
        const cfg = await req.json();

        apply(cfg);
    },
}
