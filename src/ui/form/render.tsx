import React from 'react';
import { niceLabel } from './util';
import { ArrayContainer } from './components/array-container';
import { CalendarDateInput } from './components/date';
import { FileInput } from './components/file';
import { GroupContainer } from './components/group-container';
import { FloatInput, IntInput, StringInput, UrlInput } from "./components/num-text";
import { OptionsInput, OptionsWithOtherInput } from './components/options';
import { RelatedToInput, ReferenceableIdInput } from './components/refs-rels';
import { VariantInput } from './components/variant';
import { VocabularyInput } from './components/vocabulary';
import { TristateInput } from './components/yes-no';
import { Register } from './custom-components/register';
import { assert } from '../../assert';
import { Item, Schema } from '../../schema';
import { Data, Path } from '../../schema/data';
import { Validators } from '../../schema/validators';

export function component(item: Item, nestLevel: number, isDisabled: boolean, checkForErrors: boolean, canParentMarkEmpty: boolean, path: Path, inReferenceableContext: boolean, key?: string | number, noLabel = false) {
    if (item.isArray) {
        return <ArrayContainer item={item} nestLevel={nestLevel} isDisabled={isDisabled} checkForErrors={checkForErrors} canParentMarkEmpty={canParentMarkEmpty} path={Data.Path.path(item.tag, path)} key={key} />
    } else {
        return scalarComponent(item, !!item.isRequired, nestLevel, isDisabled, checkForErrors, canParentMarkEmpty, Data.Path.path(item.tag, path), inReferenceableContext, key, noLabel);
    }
}

export function scalarComponent(item: Item, isRequired: boolean, nestLevel: number, isDisabled: boolean, checkForErrors: boolean, canParentMarkEmpty: boolean, path: Path, inReferenceableContext: boolean, key: string | number | undefined, noLabel = false, noRightOffset = false) {
    const label = noLabel ? '' : niceLabel(item.label, !!item.dontTransformLabels);

    if (item.dontDisplay) return null;

    if (Schema.hasComplexInput(item)) {
        return (
            <GroupContainer
                input={item.input}
                label={label}
                help={item.help}
                isRequired={isRequired}
                nestLevel={nestLevel}
                isDisabled={isDisabled}
                checkForErrors={checkForErrors}
                canParentMarkEmpty={canParentMarkEmpty}
                path={path}
                key={key}
            />
        );
    } else if (Schema.hasVariantInput(item)) {
        return (
            <VariantInput
                input={item.input}
                label={label}
                nestLevel={nestLevel}
                isDisabled={isDisabled}
                checkForErrors={checkForErrors}
                canParentMarkEmpty={canParentMarkEmpty}
                path={path}
                key={key}
            />
        );
    } else if (Schema.hasTextualInput(item)) {
        if (Schema.hasNumericInput(item)) {
            if (item.input === 'int') {
                return (
                    <IntInput
                        label={label}
                        help={item.help}
                        isRequired={isRequired}
                        isDisabled={isDisabled}
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
                        isDisabled={isDisabled}
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
                    isDisabled={isDisabled}
                    path={path}
                    validator={Validators.commonForItem(item, isRequired)}
                    noRightOffset={noRightOffset}
                    key={key}
                    alwaysUpdate={item.tag === 'name' && inReferenceableContext} // This needs a more robust solution. Right now we assume that a text input tagged "name" is the only field that identifies a referenceable. This may not hold up.
                />
            );
        }
    } else if (Schema.hasUrlInput(item)) {
        return (
            <UrlInput
                label={label}
                help={item.help}
                isRequired={isRequired}
                isDisabled={isDisabled}
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
                    isDisabled={isDisabled}
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
                    isDisabled={isDisabled}
                    dontTransformContent={!!item.dontTransformContent}
                    noRightOffset={noRightOffset}
                    key={key}
                />
            );
        }
    } else if (Schema.hasBooleanInput(item)) {
        return (
            <TristateInput label={label} isDisabled={isDisabled} isRequired={isRequired} path={path} help={item.help} noRightOffset={noRightOffset} key={key} />
        );
    } else if (Schema.hasCalendarDateInput(item)) {
        return <CalendarDateInput label={label} isRequired={isRequired} isDisabled={isDisabled} path={path} help={item.help} key={key} />;
    } else if (Schema.hasRelatedToInput(item)) {
        return <RelatedToInput label={label} relatesTo={item.relatesTo} relatedKeys={item.relatedKeys} help={item.help} isRequired={isRequired} path={path} key={key} />;
    } else if (Schema.hasReferenceableIdInput(item)) {
        return <ReferenceableIdInput referenceAs={item.referenceAs} path={path} key={key} />;
    } else if (Schema.hasAutogeneratedInput(item) || Schema.hasIgnoredInput(item) || Schema.hasUnknownInput(item)) {
        return null;
    } else if (Schema.hasInternalIdInput(item)) {
        // TODO: What do we want to do with internal IDs?
        return null;
    } else if (Schema.hasVocabularyInput(item)) {
        return <VocabularyInput label={label} help={item.help} path={path} isRequired={isRequired} vocabularyType={item.vocabularyType} key={key} />;
    } else if (Schema.hasFileInput(item)) {
        return (
            <FileInput
                label={label}
                help={item.help}
                path={path}
                isRequired={isRequired}
                nestLevel={nestLevel}
                isDisabled={isDisabled}
                checkForErrors={checkForErrors}
            />
        );
    } else if (Schema.hasCustomInput(item)) {
        const Maker = Register.get(item.component).Component;
        assert(!!Maker, `No custom component "${item.component}"`);

        return React.createElement(Maker, { path, isDisabled, help: item.help, key });
    }

    throw new Error(`Unknown input type "${item.input}"`);
}
