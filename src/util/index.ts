import { assert } from '../assert';

export function clamp(v: number, min: number, max: number) {
    return v < min
        ? min
        : v > max
            ? max
            : v;
}

const LongMonths = [1, 3, 5, 7, 8, 10, 12];
export function daysInMonth(month: number, year: number) {
    if (LongMonths.includes(month)) return 31;
    else if (month === 2) return isLeapYear(year) ? 29 : 28;
    return 30;
}

export function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function objKeys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
}

export function replaceAll(s: string, replacee: string, replacer: string) {
    let idx = s.indexOf(replacee);
    while (idx >= 0) {
        s = s.replace(replacee, replacer);
        idx = s.indexOf(replacee);
    }

    return s;
}

export function sequence(from: number, to: number) {
    assert(to >= from, `Sequence must be ascending but "from" and "to" values are "${from}" a "${to}", respectively`);

    const seq = new Array(to - from + 1);
    for (let idx = 0; idx <= (to - from); idx++) {
        seq[idx] = idx + from;
    }

    return seq;
}
