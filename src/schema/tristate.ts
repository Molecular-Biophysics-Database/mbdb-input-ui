export type Tristate = -1 | 0 | 1;
export const Tristate = {
    NotSet: -1 as Tristate,
    False: 0 as Tristate,
    True: 1 as Tristate,
};

export function isTristate(v: any): v is Tristate {
    return typeof v === 'number' && (v === -1 || v === 0 || v === 1);
}
