import { assert } from '../assert';
import { Option, Value, TValue } from './value';

const TextualInput = [
    'float', 'int', 'string'
] as const;
export type TextualInput = typeof TextualInput[number];

export type ComplexInput = TItem<any, any>[];
export type VariantInput = Record<string, Item>;
export type Input = ComplexInput | TextualInput | VariantInput |
    'boolean' | 'calendar-date' | 'custom' |
    'options' | 'options-with-other' |
    'referenceable-id' | 'related-to' |
    'ignore' | 'uuid' |
    'variant-discriminator' |
    'vocabulary' |
    'unknown';

export type Choice = {
    tag: string,
    title: string,
};
export type Help = Record<string, string>;

type BaseItem = {
    tag: string,
    label: string,
    isArray: boolean,
    isRequired: boolean,
    mbdbPath: string,
    help?: Record<string, string>,
    dontDisplay?: boolean,
    dontTransformContent?: boolean,
    dontTransformLabels?: boolean,
    minItems?: number,
};
export type AnyItem = Item | TopLevelItem;
export type Item = BaseItem & { input: Input };
export type TItem<T extends Item['input'], DefaultValue = never> = BaseItem & { input: T, defaultValue?: DefaultValue, };

export type AutogeneratedItem = ReferenceableIdItem | TItem<'uuid'>;
export type ComplexItem = TItem<ComplexInput>;
export type CustomItem = BaseItem & {
    input: 'custom',
    component: string,
};
export type NumericItem = (TItem<'int', number> | TItem<'float', number>) & {
    minimum?: number,
    maximum?: number,
};
export type OptionsItem = TItem<'options' | 'options-with-other', string> & { choices: Choice[], };
export type ReferenceableIdItem = TItem<'referenceable-id'> & { referenceAs: string };
export type RelatedToItem = TItem<'related-to'> & { relatesTo: string, relatedKeys: string[] };
export type VariantItem = TItem<VariantInput> & { discriminator: string };
export type VocabularyItem = TItem<'vocabulary'> & {
    vocabularyType: string,
    vocabularyKeys: string[],
};
export type TopLevelItem = {
    input: ComplexInput,
    tag: string,
};
export function TopLevelItem(input: ComplexInput): TopLevelItem {
    return { tag: '__MBDB_Top_Level_Item', input };
}

export const Schema = {
    hasAutogeneratedInput(item: Item): item is AutogeneratedItem {
        return this.isAutogeneratedInput(item.input);
    },

    hasBooleanInput(item: Item): item is TItem<'boolean', boolean> {
        return this.isBooleanInput(item.input);
    },

    hasCalendarDateInput(item: Item): item is TItem<'calendar-date'>{
        return this.isCalendarDateInput(item.input);
    },

    hasComplexInput(item: Item): item is ComplexItem {
        return this.isComplexInput(item.input);
    },

    hasCustomInput(item: Item): item is CustomItem {
        return this.isCustomInput(item.input);
    },

    hasIgnoredInput(item: Item): item is TItem<'ignore'> {
        return this.isIgnoredInput(item.input);
    },

    hasNumericInput(item: Item): item is NumericItem {
        return this.isNumericInput(item.input);
    },

    hasOptionsInput(item: Item): item is OptionsItem {
        return this.isOptionsInput(item.input);
    },

    hasOptionsWithOtherInput(item: Item): item is TItem<'options-with-other'> {
        return this.isOptionsWithOtherInput(item.input);
    },

    hasReferenceableIdInput(item: Item): item is ReferenceableIdItem {
        return this.isReferenceableIdInput(item.input);
    },

    hasRelatedToInput(item: Item): item is RelatedToItem {
        return this.isRelatedToInput(item.input);
    },

    hasTextualInput(item: Item): item is TItem<TextualInput, string> {
        return this.isTextualInput(item.input);
    },

    hasUnknownInput(item: Item): item is TItem<'unknown'> {
        return this.isUnknownInput(item.input);
    },

    hasUuidInput(item: Item): item is TItem<'uuid'> {
        return this.isUuidInput(item.input);
    },

    hasVariantInput(item: Item): item is VariantItem {
        return this.isVariantInput(item.input);
    },

    hasVocabularyInput(item: Item): item is VocabularyItem {
        return this.isVocabularyInput(item.input);
    },

    initialOptionsValue(choices: OptionsItem['choices'], isRequired: boolean, hasOther: boolean) {
        if (!isRequired) {
            return Value.emptyOption();
        } else {
            const firstChoice = choices?.[0];
            assert(firstChoice !== undefined, 'Attempted to get first item from a list of choices but the list was empty');

            return Value.option(firstChoice.tag, hasOther ? '' : undefined);
        }
    },

    isAutogeneratedInput(input: Input): input is 'uuid' | 'referenceable-id' {
        return (this.isUuidInput(input) || this.isReferenceableIdInput(input));
    },

    isBooleanInput(input: Input): input is 'boolean' {
        return input === 'boolean';
    },

    isCalendarDateInput(input: Input): input is 'calendar-date' {
        return input === 'calendar-date';
    },

    isComplexInput(input: Input): input is ComplexInput {
        return Array.isArray(input);
    },

    isCustomInput(input: Input): input is 'custom' {
        return input === 'custom';
    },

    isIgnoredInput(input: Input): input is 'ignore' {
        return this.isVariantDiscriminatorInput(input) || input === 'ignore';
    },

    isNumericInput(input: Input): input is 'int' | 'float' {
        return input === 'int' || input === 'float';
    },

    isOptionsInput(input: Input): input is 'options' | 'options-with-other' {
        return input === 'options' || input  === 'options-with-other';
    },

    isOptionsWithOtherInput(input: Input): input is 'options-with-other' {
        return input  === 'options-with-other';
    },

    isOtherChoice(value: TValue<Option>) {
        return value.payload.tag === Schema.OtherChoice;
    },

    isReferenceableIdInput(input: Input): input is 'referenceable-id' {
        return input === 'referenceable-id';
    },

    isRelatedToInput(input: Input): input is 'related-to' {
        return input === 'related-to';
    },

    isReservedKey(key: string) {
        return key.startsWith('__mbdb');
    },

    isTextualInput(input: Input): input is TextualInput {
        return typeof input === 'string' && TextualInput.includes(input as TextualInput);
    },

    isTopLevelItem(item: AnyItem): item is TopLevelItem {
        return Schema.isComplexInput(item.input) && item.tag === '__MBDB_Top_Level_Item';
    },

    isUnknownInput(input: Input): input is 'unknown' {
        return input === 'unknown';
    },

    isUuidInput(input: Input): input is 'uuid' {
        return input === 'uuid';
    },

    isVariantInput(input: Input): input is VariantInput {
        return typeof input === 'object' && !Array.isArray(input);
    },

    isVariantDiscriminatorInput(input: Input): input is 'variant-discriminator' {
        return input === 'variant-discriminator';
    },

    isVocabularyInput(input: Input): input is 'vocabulary' {
        return input === 'vocabulary';
    },

    optionsPayload(tag: string, other: string) {
        return { tag, other };
    },

    variantDiscriminatorOptions(item: OptionsItem) {
        return item.choices.map((c) => c.tag);
    },

    EmptyOptionValue: '__mbdb_empty_option',
    OtherChoice: '__mbdb_other_choice',
    ReferenceableId: '__mbdb_referenceable_id',
    VariantChoice: '__mbdb_variant_choice',
};
