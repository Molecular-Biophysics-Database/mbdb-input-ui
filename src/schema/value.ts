import { Item, Schema } from './';
import { Tristate, isTristate } from './tristate';
import { Uuid } from './uuid';
import { assert } from '../assert';

type BaseValue = {
    __mbdb_value: true,
};

export type CalendarDate = {
    year: number,
    month: number,
    day: number,
};

export type Option = {
    tag: string;
    other?: string;
};

export type Value = BaseValue & {
    payload: boolean | string | CalendarDate | Option | Tristate,
    isValid: boolean,
};
export type TValue<T extends Value['payload']> = BaseValue & {
    payload: T,
    isValid: boolean,
};

export const Value = {
    autogeneratedForItem(item: Item): TValue<string> {
        if (Schema.hasUuidInput(item)) {
            return this.uuid();
        } else if (Schema.hasReferenceableIdInput(item)) {
            return this.refId();
        }

        assert(false,`Attempted to get autogenerated value for item "${item.tag}" that does not have automatically generated input`);
    },

    boolean(tf: boolean): TValue<boolean> {
        return this.value(tf, true);
    },

    calendarDate(year: number, month: number, day: number, isValid = true): TValue<CalendarDate> {
        return this.value({ year, month, day }, isValid);
    },

    defaultForItem(item: Item) {
        if (Schema.hasBooleanInput(item)) {
            return item.isRequired ? this.boolean(false) : this.tristate('not-set');
        } else if (Schema.hasCalendarDateInput(item)) {
            const now = new Date();
            return this.calendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
        } else if (Schema.hasTextualInput(item)) {
            return this.empty(!item.isRequired);
        }

        assert(false, `Attempted to get default value for item "${item.tag}" with input "${item.input}" but no default value is available`);
    },

    empty(isValid = false) {
        const v = this.value('');
        v.isValid = isValid;

        return v;
    },

    isBoolean(value: Value): value is TValue<boolean> {
        return typeof value.payload === 'boolean';
    },

    isCalendarDate(value: Value): value is TValue<CalendarDate> {
        if (typeof value.payload !== 'object') {
            return false;
        }

        const date = value.payload as Record<string, any>;
        if (typeof date !== 'object' || date['year'] === undefined || date['month'] === undefined || date['day'] === undefined) {
            return false;
        }

        return typeof date.year === 'number' && typeof date.month === 'number' && typeof date.day === 'number';
    },

    isEmpty(value: Value) {
        if (typeof value.payload === 'string') {
            return value.payload === '';
        } else {
            return false;
        }
    },

    isOption(value: Value): value is TValue<Option> {
        if (typeof value.payload !== 'object') {
            return false;
        }

        const opt = value.payload as Record<string, any>;
        return opt['tag'] !== undefined && (opt['other'] !== undefined ? typeof opt['other'] === 'string' : true);
    },

    isRefId(value: Value): value is TValue<string> {
        return this.isUuid(value);
    },

    isRelToId(value: Value): value is TValue<string> {
        if (typeof value.payload !== 'string') {
            return false;
        }

        return value.payload === '' || Uuid.check(value.payload);
    },

    isTextual(value: Value): value is TValue<string> {
        return typeof value.payload === 'string';
    },

    isTristate(value: Value): value is TValue<Tristate> {
        return isTristate(value.payload);
    },

    isUuid(value: Value): value is TValue<string> {
        return typeof value.payload === 'string' && Uuid.check(value.payload);
    },

    isValid(value: Value) {
        return value.isValid;
    },

    isValidDiscriminator(value: TValue<'string'>, choices: string[]) {
        return choices.includes(value.payload);
    },

    isValue(obj: Record<string, any>): obj is Value {
        return obj['__mbdb_value'] === true;
    },

    option(tag: string, other?: string) {
        return Value.value({ tag, other }, true);
    },

    refId(): TValue<string> {
        return Value.value(Uuid.get(), true);
    },

    toBoolean(value: Value) {
        if (!this.isBoolean(value)) {
            throw new Error(`Value with payload ${value.payload} is not a boolean.`);
        }

        return value.payload;
    },

    toCalendarDate(value: Value) {
        if (!this.isCalendarDate(value)) {
            throw new Error(`Value with payload ${value.payload} is not a calendar date.`);
        }

        return value.payload;
    },

    toOtherOption(value: Value) {
        if (!this.isOption(value)) {
            throw new Error(`Value with payload ${value.payload} is not an Option.`);
        }
        if (typeof value.payload.other !== 'string') {
            throw new Error(`Value with payload ${value.payload} is not an Option with other choice`);
        }

        return value.payload.other;
    },

    toOption(value: Value) {
        if (!this.isOption(value)) {
            throw new Error(`Value with payload ${value.payload} is not an Option.`);
        }

        return value.payload.tag;
    },

    toRefId(value: Value) {
        if (!this.isRefId(value)) {
            throw new Error(`Value with payload ${value.payload} is not a referenceable ID`);
        }

        return value.payload;
    },

    toRelToId(value: Value) {
        if (!this.isRelToId(value)) {
            throw new Error(`Value with payload ${value.payload} is not a related-to ID`);
        }

        return value.payload;
    },

    toTextual(value: Value) {
        if (!this.isTextual(value)) {
            throw new Error(`Value with payload ${value.payload} is not a string`);
        }

        return value.payload;
    },

    toTristate(value: Value) {
        if (!this.isTristate(value)) {
            throw new Error(`Value with payload ${value.payload} is not a tristate value`);
        }

        return value.payload;
    },

    tristate(tfn: Tristate) {
        assert(isTristate(tfn), `Value ${tfn} is not a valid tristate value`);

        return Value.value(tfn, true);
    },

    uuid(): TValue<string> {
        return Value.value(Uuid.get(), true);
    },

    value<T>(payload: T, isValid = false) {
        return { __mbdb_value: true as true, payload, isValid };
    }
};
