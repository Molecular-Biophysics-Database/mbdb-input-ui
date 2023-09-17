import * as Util from '../src/util';

test('clamp', () => {
    expect(Util.clamp(6, 3, 8)).toBe(6);
    expect(Util.clamp(2, 3, 8)).toBe(3);
    expect(Util.clamp(10, 3, 8)).toBe(8);
});

test('Days in a calendar month', () => {
    expect(Util.daysInMonth(1, 1992)).toBe(31);
    expect(Util.daysInMonth(2, 1993)).toBe(28);
    expect(Util.daysInMonth(4, 2002)).toBe(30);
    expect(Util.daysInMonth(2, 2000)).toBe(29);
});

test('Leap year', () => {
    expect(Util.isLeapYear(1991)).toBe(false);
    expect(Util.isLeapYear(1992)).toBe(true);
    expect(Util.isLeapYear(2004)).toBe(true);
    expect(Util.isLeapYear(2005)).toBe(false);
    expect(Util.isLeapYear(2024)).toBe(true);
});

test('Is URL', () => {
    expect(Util.isUrl('http://xx.yy')).toBe(true);
    expect(Util.isUrl('http//xx.yy')).toBe(false);
    expect(Util.isUrl('http//xx.yy', true)).toBe(true);
    expect(Util.isUrl('xx.yy', true)).toBe(true);
    expect(Util.isUrl(':xx.yy')).toBe(false);
    expect(Util.isUrl('good:/xx.yy')).toBe(true);
    expect(Util.isUrl('good://xx.yy')).toBe(true);
    expect(Util.isUrl('bad://')).toBe(false);
    expect(Util.isUrl('good:///xx.yy')).toBe(true);
    expect(Util.isUrl('bad://@xx.yy')).toBe(false);
    expect(Util.isUrl('good:pepa@xx.yy')).toBe(true);
});

test('Unique array filter', () => {
    const A = [1, 1, 2, 5, 6, 8, 7, 7, 5];
    expect(Util.unique(A)).toEqual([1, 2, 5, 6, 8, 7]);

    const B = ['a', 'c', 'c', 'd', 'e', 'f', 'd'];
    expect(Util.unique(B)).toEqual(['a', 'c', 'd', 'e', 'f']);

    const C = [
        { id: 1, kind: 'pig' },
        { id: 7, kind: 'pig' },
        { id: 8, kind: 'duck' },
        { id: 7, kind: 'chicken' },
        { id: 1, kind: 'fish' },
        { id: 7, kind: 'chicken' },
    ];
    expect(Util.unique(C, (a, b) => a.kind === b.kind)).toEqual([
        {
            id: 1,
            kind: 'pig',
        },
        {
            id: 8,
            kind: 'duck',
        },
        {
            id: 7,
            kind: 'chicken',
        },
        {
            id: 1,
            kind: 'fish',
        }
    ]);
});
