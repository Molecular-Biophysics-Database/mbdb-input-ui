export type Tristate = 'true' | 'false' | 'not-set';

export function isTristate(v: any): v is Tristate {
    return typeof v === 'string' && (v === 'true' || v === 'false' || v === 'not-set');
}
