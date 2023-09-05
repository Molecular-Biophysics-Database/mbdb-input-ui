import React from 'react';
import { niceLabel } from './util';
import { ArrayContainer } from './components/array-container';
import { CalendarDateInput } from './components/date';
import { GroupContainer } from './components/group-container';
import { FloatInput, IntInput, StringInput, UrlInput } from "./components/num-text";
import { OptionsInput, OptionsWithOtherInput } from './components/options';
import { RelatedToInput, ReferenceableIdInput } from './components/refs-rels';
import { VariantInput } from './components/variant';
import { VocabularyInput } from './components/vocabulary';
import { BooleanInput, TristateInput } from './components/yes-no';
import { Register } from './custom-components/register';
import { assert } from '../../assert';
import { Item, Schema } from '../../schema';
import { Data, Path } from '../../schema/data';
import { Validators } from '../../schema/validators';

export function component(item: Item, nestLevel: number, path: Path, key?: string | number, noLabel = false) {
    if (item.isArray) {
        return <ArrayContainer item={item} nestLevel={nestLevel} path={Data.Path.path(item.tag, path)} key={key} />
    } else {
        return scalarComponent(item, !!item.isRequired, nestLevel, Data.Path.path(item.tag, path), key, noLabel);
    }
}

export function scalarComponent(item: Item, isRequired: boolean, nestLevel: number, path: Path, key: string | number | undefined, noLabel = false, noRightOffset = false) {
    const label = noLabel ? '' : niceLabel(item.label, !!item.dontTransformLabels);

    if (item.dontDisplay) return null;

    if (Schema.hasComplexInput(item)) {
        return <GroupContainer input={item.input} label={label} help={item.help} isRequired={isRequired} nestLevel={nestLevel} path={path} key={key} />
    } else if (Schema.hasVariantInput(item)) {
        return <VariantInput input={item.input} label={label} nestLevel={nestLevel} path={path} key={key} />;
    } else if (Schema.hasTextualInput(item)) {
        if (Schema.hasNumericInput(item)) {
            if (item.input === 'int') {
                return (
                    <IntInput
                        label={label}
                        help={item.help}
                        isRequired={isRequired}
                        path={path}
                        validator={Validators.commonForItem(item)}
                        noRightOffset={noRightOffset}
                        key={key}
                    />
                );
            } else if (item.input === 'float') {
                return (
                    <FloatInput
                        label={label}
                        help={item.help}
                        isRequired={isRequired}
                        path={path}
                        validator={Validators.commonForItem(item)}
                        noRightOffset={noRightOffset}
                        key={key}
                    />
                );
            }
            assert(false, `Unhandled numeric input "${item.input}"`);
        } else {
            return (
                <StringInput
                    label={label}
                    help={item.help}
                    isRequired={isRequired}
                    path={path}
                    validator={Validators.commonForItem(item, isRequired)}
                    noRightOffset={noRightOffset}
                    key={key}
                />
            );
        }
    } else if (Schema.hasUrlInput(item)) {
        return (
            <UrlInput
                label={label}
                help={item.help}
                isRequired={isRequired}
                path={path}
                noRightOffset={noRightOffset}
                key={key}
            />
        );
    } else if (Schema.hasOptionsInput(item)) {
        if (Schema.hasOptionsWithOtherInput(item)) {
            return (
                <OptionsWithOtherInput
                    choices={item.choices}
                    label={label}
                    help={item.help}
                    path={path}
                    isRequired={isRequired}
                    dontTransformContent={!!item.dontTransformContent}
                    key={key}
                    noRightOffset={noRightOffset}
                />
            );
        } else {
            return (
                <OptionsInput
                    choices={item.choices}
                    label={label}
                    help={item.help}
                    path={path}
                    isRequired={isRequired}
                    dontTransformContent={!!item.dontTransformContent}
                    noRightOffset={noRightOffset}
                    key={key}
                />
            );
        }
    } else if (Schema.hasBooleanInput(item)) {
        return (
            isRequired
                ? <BooleanInput label={label} path={path} help={item.help} noRightOffset={noRightOffset} key={key} />
                : <TristateInput label={label} path={path} help={item.help} noRightOffset={noRightOffset} key={key} />
        );
    } else if (Schema.hasCalendarDateInput(item)) {
        return <CalendarDateInput label={label} isRequired={isRequired} path={path} help={item.help} key={key} />;
    } else if (Schema.hasRelatedToInput(item)) {
        return <RelatedToInput label={label} relatesTo={item.relatesTo} relatedKeys={item.relatedKeys} help={item.help} isRequired={isRequired} path={path} key={key} />;
    } else if (Schema.hasReferenceableIdInput(item)) {
        return <ReferenceableIdInput referenceAs={item.referenceAs} path={path} key={key} />;
    } else if (Schema.hasAutogeneratedInput(item) || Schema.hasIgnoredInput(item) || Schema.hasUnknownInput(item)) {
        return null;
    } else if (Schema.hasVocabularyInput(item)) {
        return <VocabularyInput label={label} help={item.help} path={path} isRequired={isRequired} vocabularyType={item.vocabularyType} key={key} />;
    } else if (Schema.hasInternalIdInput(item)) {
        return null; // TODO: is this really what we want?
    } else if (Schema.hasCustomInput(item)) {
        const Maker = Register.get(item.component).Component;
        assert(!!Maker, `No custom component "${item.component}"`);

        return React.createElement(Maker, { path, key });
    }

    throw new Error(`Unknown input type "${item.input}"`);
}
