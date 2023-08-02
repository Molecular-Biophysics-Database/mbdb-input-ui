import { v4, validate, version } from 'uuid';

export const Uuid = {
    check(id: string) {
        return validate(id) && version(id) === 4;
    },

    get() {
        return v4();
    },
}
