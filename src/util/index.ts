import { assert } from '../assert';
import { clone as _justClone } from './just-clone';

const SchemeRegex = new RegExp('^([A-Za-z]){1}([A-Za-z0-9+-.])*$');
const IpV4AddressRegex = new RegExp('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$');
// https://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses/53499
const IpV6AddressRegex = new RegExp('(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))');
const HostnameRegex = new RegExp('^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])(\\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9]))*$');

export function clamp(v: number, min: number, max: number) {
    return v < min
        ? min
        : v > max
            ? max
            : v;
}

export function clrToRgb(clr: number): [r: number, g: number, b: number] {
    const r = clr >> 16 & 0xFF;
    const g = clr >>  8 & 0xFF;
    const b = clr       & 0xFF;

    return [r, g, b];
}

const LongMonths = [1, 3, 5, 7, 8, 10, 12];
export function daysInMonth(month: number, year: number) {
    if (LongMonths.includes(month)) return 31;
    else if (month === 2) return isLeapYear(year) ? 29 : 28;
    return 30;
}

export function deepCopy<T>(obj: T): T {
    return _justClone(obj);
}

export function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function isUrl(s: string, allowNoScheme = false) {
    // Scheme
    let idx = s.indexOf(':');
    if (idx === 0 || (idx < 0 && !allowNoScheme)) return false; // Empty or no scheme
    else if (idx > 0) {
        const scheme = s.substring(0, idx);
        if (!SchemeRegex.test(scheme)) return false;
        s = s.substring(idx + 1);
    }

    // Authority
    if (s.startsWith('//')) {
        s = s.substring(2);

        // Userinfo
        idx = s.indexOf('@');
        if (idx === 0) return false; // Empty userinfo
        else if (idx > 0) {
            s = s.substring(idx + 1);
        }

        idx = s.indexOf('/');
        const hostname = s.substring(0, idx !== -1 ? idx : void 0);
        if (!hostname && idx !== 0) return false; // Empty hostname and not absolute path
        const valid = idx === 0 || IpV4AddressRegex.test(hostname) || IpV6AddressRegex.test(hostname) || HostnameRegex.test(hostname);
        if (!valid) return false;

        // This does not do anything right now but let's keep it here in case we'd like to process the path
        // or something after it
        if (idx !== -1) {
            s = s.substring(idx + 1);
        }
    }

    // At the moment we do not care about query and fragment parts

    return true;
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

export function unique<T>(seq: T[], areEqual?: (a: T, b: T) => boolean) {
    const uniqued = new Array<T>();

    for (const item of seq) {
        let has = false;
        for (const uitem of uniqued) {
            if ((areEqual && areEqual(uitem, item)) || (item === uitem)) {
                has = true;
                break;
            }
        }

        if (!has) {
            uniqued.push(item);
        }
    }

    return uniqued;
}

