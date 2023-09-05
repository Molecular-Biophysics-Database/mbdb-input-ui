import { Choice, Item, Schema } from './';
import { Uuid } from './uuid';
import { CalendarDate, Option, Value, VocabularyEntry } from './value';
import { assert } from '../assert';
import { Vocabulary } from '../mbdb/vocabulary';
import { daysInMonth, isUrl } from '../util';

const Zero = '0'.charCodeAt(0);
const Nine = '9'.charCodeAt(0);
const Plus = '+'.charCodeAt(0);
const Minus = '-'.charCodeAt(0);
const Period = '.'.charCodeAt(0);
const SmallE = 'e'.charCodeAt(0);
const CapitalE = 'E'.charCodeAt(0);

function validateFloat(v: string, min: number | undefined, max: number | undefined) {
    if (!CommonValidators.isFloat(v)) {
        return false;
    }

    return CommonValidators.isInRange(parseFloat(v), min, max);
}

function validateInt(v: string, min: number | undefined, max: number | undefined) {
    if (!CommonValidators.isInt(v)) {
        return false;
    }

    return CommonValidators.isInRange(parseInt(v), min, max);
}

function validateOptions(v: Option, choices: Choice[], isRequired: boolean): boolean {
    if (v.tag === Schema.EmptyChoice) return !isRequired;

    return (choices.find((c) => c.tag === v.tag) !== undefined) || (v.tag === Schema.OtherChoice && v.other !== undefined);
}

function validateVocabulary(v: VocabularyEntry, vocabularyType: string, isRequired: boolean) {
    const { id, title, data } = v;
    if (Value.isEmptyVocabularyEntry(Value.vocabularyEntry(id, title, data, false))) {
        return !isRequired;
    } else {
        const voc = Vocabulary.getCached(vocabularyType);
        if (!voc) return true; // If we do not have a vocabulary to check against, optimistically assume that the value is okay

        return !!voc.find((e) => e.id === v.id);
    }
}

export const CommonValidators = {
    alwaysValid(_v: any) {
        return true;
    },

    isCalendarDate(v: CalendarDate) {
        const { year, month, day } = v;
        if (year < 1600 || year > 3000 || month < 1 || month > 12 || day < 1 || day > 31) {
            return false;
        }

        const dim = daysInMonth(month, year);
        return dim >= day;
    },

    isEmpty(v: string) {
        return !CommonValidators.isSet(v);
    },

    isFloat(v: string) {
        if (v.length < 1) return false;

        let idx = 0;
        if (v.charCodeAt(0) === Plus || v.charCodeAt(0) === Minus) {
            if (v.length === 1) return false;
            idx++;
        }

        let doDecimal = false;
        let doExp = false;

        // Integer part
        for (; idx < v.length; idx++) {
            const cc = v.charCodeAt(idx);
            if (cc >= Zero && cc <= Nine) {
                continue;
            } else if (cc === Period) {
                idx++;
                doDecimal = true;
                break;
            } else if (cc === SmallE || cc === CapitalE) {
                idx++;
                doExp = true;
                break;
            } else {
                return false;
            }
        }

        // Decimal part
        if (doDecimal) {
            for (; idx < v.length; idx++) {
                const cc = v.charCodeAt(idx);
                if (cc >= Zero && cc <= Nine) {
                    continue;
                } else if (cc === SmallE || cc === CapitalE) {
                    idx++;
                    doExp = true;
                    break;
                } else {
                    return false;
                }
            }
        }

        // Exponential part
        if (doExp) {
            if (v.charCodeAt(idx) === Plus || v.charCodeAt(idx) === Minus) {
                if (v.length === idx - 1) return false;
                idx++;
            }

            for (; idx < v.length; idx++) {
                const cc = v.charCodeAt(idx);
                if (cc < Zero || cc > Nine)
                    return false;
            }
        }

        return true;
    },

    isInRange(v: number, min: number | undefined, max: number | undefined) {
        if (min !== undefined && min > v) return false;
        if (max !== undefined && max < v) return false;

        return true;
    },

    isInt(v: string) {
        if (v.length < 1) return false;

        let idx = 0;
        if (v.charCodeAt(0) === Plus || v.charCodeAt(0) === Minus) {
            if (v.length < 1) return false;
            idx++;
        }

        for (; idx < v.length; idx++) {
            const cc = v.charCodeAt(idx);
            if (cc < Zero || cc > Nine)
                return false;
        }

        return true;
    },

    isSet(v: string) {
        return v !== '';
    },

    isUrl(v: string) {
        return isUrl(v);
    },
};

export type Validator<T extends Value['payload']> = (v: T) => boolean;

export const Validators = {
    commonForItem(item: Item, isRequiredOverride?: boolean) {
        const isRequired = isRequiredOverride !== undefined ? isRequiredOverride : item.isRequired;

        if (Schema.hasBooleanInput(item)) {
            return CommonValidators.alwaysValid;
        } else if (Schema.hasCalendarDateInput(item)) {
            return CommonValidators.isCalendarDate;
        } else if (Schema.hasUuidInput(item)) {
            return Uuid.check;
        } else if (Schema.hasReferenceableIdInput(item)) {
            return Uuid.check;
        } else if (Schema.hasRelatedToInput(item)) {
            return CommonValidators.alwaysValid;
        } else if (Schema.hasInternalIdInput(item)) {
            // Treat this a a string
            return isRequired ? CommonValidators.isSet : CommonValidators.alwaysValid;
        } else if (Schema.hasTextualInput(item)) {
            if (Schema.hasNumericInput(item)) {
                if (item.input === 'int') {
                    return isRequired
                        ? (v: string) => { return CommonValidators.isSet(v) && validateInt(v, item.minimum, item.maximum); }
                        : (v: string) => { return validateInt(v, item.minimum, item.maximum) || CommonValidators.isEmpty(v); };
                } else if (item.input === 'float') {
                    return isRequired
                        ? (v: string) => { return CommonValidators.isSet(v) && validateFloat(v, item.minimum, item.maximum); }
                        : (v: string) => { return validateFloat(v, item.minimum, item.maximum) || CommonValidators.isEmpty(v); };
                } else {
                    assert(false, `Unknown textual-like input "${item.input}"`);
                }
            } else {
                return isRequired ? CommonValidators.isSet : CommonValidators.alwaysValid;
            }
        } else if (Schema.hasOptionsInput(item)) {
            return (v: Option) => validateOptions(v, item.choices, isRequired);
        } else if (Schema.hasVocabularyInput(item)) {
            return (v: VocabularyEntry) => validateVocabulary(v, item.vocabularyType, item.isRequired);
        } else if (Schema.hasUrlInput(item)) {
            return isRequired
                ? isUrl
                : (v: string) => { return CommonValidators.isEmpty(v) || CommonValidators.isUrl(v) };
        }

        throw new Error(`No common validator is defined for item ${item.tag} of input type ${item.input}`);
    },

    validateCommon<T extends Value['payload']>(item: Item, value: T) {
        const v = this.commonForItem(item);
        return v(value as any);
    }
};
