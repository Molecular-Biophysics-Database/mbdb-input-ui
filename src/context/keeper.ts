import { FormContext } from './';

const Keeper = {
    _data: {} as Record<string, FormContext>,

    get(id: string) {
        return this._data[id];
    },

    remove(id: string) {
        delete this._data[id];
    },

    set(id: string, data: FormContext) {
        this._data[id] = data;
    },
};

export function getKeeper() {
    return Keeper;
}
