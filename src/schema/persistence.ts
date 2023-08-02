import { DataTree } from './data';

export const Persistence = {
    async fromFile(file: File) {
        const txt = await file.text();
        return JSON.parse(txt);
    },

    toJson(data: DataTree, compact = false) {
        return JSON.stringify(data, void 0, compact ? 0 : 2);
    },
};
