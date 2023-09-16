import clsx from 'clsx';
import React from 'react';
import {
    Icon as SIcon,
} from 'semantic-ui-react';
import { PathId } from './path-id';
import { niceLabel, subtreeHasErrors } from './util';
import { assert } from '../../assert';
import { FormContextInstance } from '../../context';
import { _FormContextHandler } from '../../context/handler';
import { Item, Schema, TopLevelItem } from '../../schema';
import { Data } from '../../schema/data';

const TopCorrection = 5;
const MaximumNesting = 10;

type Rect = { top: number, bottom: number };

function elementTopOffset(id: string) {
    const elem = document.getElementById(id);
    if (elem) {
        return elem.getBoundingClientRect().top;
    }

    // console.warn(`${id} is not in DOM`);
    return -1;
}

function isBoundingRectEmpty(bRect: DOMRect) {
    return bRect.width === 0 && bRect.height === 0;
}

function isNavigationAnchor(item: Item) {
    return (
        Schema.hasComplexInput(item) ||
        (item.isArray && !(Schema.hasIgnoredInput(item) || Schema.hasUnknownInput(item)))
    );
}

function isItemMarkedEmpty(item: Item, htmlId: string, ctxHandler: _FormContextHandler) {
    if (!item.isArray && Schema.hasComplexInput(item)) {
        const path = PathId.toPath(htmlId);
        return ctxHandler.isGroupMarkedEmpty(path);
    } else {
        return false;
    }
}

function isNavItemVisible(bRect: DOMRect, htmlId: string) {
    const topOffset = elementTopOffset(htmlId);

    return isVisible(bRect, topOffset);
}

function isVisible(bRect: Rect, topOffset: number) {
    return topOffset >= bRect.top - TopCorrection && topOffset < bRect.bottom;
}

function navigationList(item: Item, ctxHandler: _FormContextHandler, parentHtmlId: string, level: number, isParentMarkedEmpty: boolean, checkForErrors: boolean, tainerRect: DOMRect) {
    if (level === MaximumNesting) return null;

    const data = ctxHandler.data();
    const schema = ctxHandler.schema();

    let ctr = 0;
    let listItems = [];

    if (Schema.hasVariantInput(item)) {
        const path = PathId.toPath(parentHtmlId);
        const choice = ctxHandler.getVariantChoice(path);
        const choicePath = Data.Path.path(choice, path);

        if (Data.has(ctxHandler.data(), choicePath)) {
            const htmlId = PathId.extendId(choice, parentHtmlId);
            const hasErrors = (!checkForErrors || isParentMarkedEmpty) ? false : subtreeHasErrors(data, path, schema);
            const innerList = navigationList(item.input[choice], ctxHandler, htmlId, level + 1, isParentMarkedEmpty, hasErrors, tainerRect);

            listItems.push(
                <NavigationListItem label={niceLabel(choice, !!item.input[choice].dontTransformLabels)} targetId={htmlId} tainerRect={tainerRect} level={level} hasErrors={hasErrors} key={ctr} isVariant>
                    {innerList}
                </NavigationListItem>
            );
        }
    } else if (Schema.hasComplexInput(item)) {
        const isMarkedEmpty = isParentMarkedEmpty || isItemMarkedEmpty(item, parentHtmlId, ctxHandler);

        for (const innerItem of item.input) {
            if (isNavigationAnchor(innerItem)) {
                const htmlId = PathId.extendId(innerItem.tag, parentHtmlId);
                const path = PathId.toPath(htmlId);
                const label = niceLabel(innerItem.label, !!innerItem.dontTransformLabels);
                const innerIsMarkedEmpty = isMarkedEmpty || isItemMarkedEmpty(innerItem, htmlId, ctxHandler);
                const hasErrors = (!checkForErrors || innerIsMarkedEmpty) ? false : subtreeHasErrors(data, path, schema);

                if (Data.has(ctxHandler.data(), path)) {
                    if (innerItem.isArray) {
                        const data = Data.getArray(ctxHandler.data(), path);

                        if (data.length === 0) {
                            listItems.push(
                                <NavigationListItem label={label} targetId={htmlId} tainerRect={tainerRect} level={level} hasErrors={hasErrors} key={ctr} />
                            );
                            ctr++;
                        } else {
                            for (let idx = 0; idx < data.length; idx++) {
                                // Array items can be collapsed. If they are, do not list their content.
                                const isCollapsed = ctxHandler.navigation.isCollapsed(ctxHandler.getItem(Data.Path.index(idx, path)));

                                const itemHtmlId = PathId.extendId(idx, htmlId, true);
                                const innerList = isCollapsed ? null : navigationList(innerItem, ctxHandler, itemHtmlId, level + 1, innerIsMarkedEmpty, hasErrors, tainerRect);
                                listItems.push(
                                    <NavigationListItem label={`${label}: ${idx + 1}`} targetId={itemHtmlId} tainerRect={tainerRect} level={level} hasErrors={hasErrors} key={ctr}>
                                        {innerList}
                                    </NavigationListItem>
                                );
                                ctr++;
                            }
                        }
                    } else {
                        const innerList = navigationList(innerItem, ctxHandler, htmlId, level + 1, innerIsMarkedEmpty, hasErrors, tainerRect);
                        listItems.push(
                            <NavigationListItem label={label} targetId={htmlId} tainerRect={tainerRect} level={level} hasErrors={hasErrors} key={ctr}>
                                {innerList}
                            </NavigationListItem>
                        );
                        ctr++;
                    }
                }
            }
        }
    }

    return listItems.length === 0 ? null : listItems;
}

function scrollIntoView(elemId: string) {
    const elem = document.getElementById(elemId);
    assert(!!elem, `Element "${elemId}" is not present in the DOM`);

    elem.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
}

const _NavigationListItem = React.memo(function MNavigationListItem(props: NavigationListItemProps & {
    actualTargetId: string,
    isHighlighted: boolean,
    onClick: () => void,
}) {
    return (
        <div className='mbdbi-form-nav-list-item'>
            <div className={clsx('mbdbi-form-nav-list-item-title', props.isHighlighted && 'mbdbi-form-nav-list-item-title-highlighted')} style={{ paddingLeft: `calc(${props.level} * var(--mbdbi-2hgap))` }}>
                <SIcon
                    onClick={() => scrollIntoView(props.actualTargetId)}
                    name={props.hasErrors ? 'warning sign' : 'chevron right'}
                    color={props.hasErrors ? 'red' : 'black'}
                />
                <a className={'mbdbi-form-nav-link'} onClick={() => scrollIntoView(props.actualTargetId)}>{props.label}</a>
            </div>
            <div>
                {props.children ?? null}
            </div>
        </div>
    );
});

type NavigationListItemProps = {
    label: string,
    targetId: string,
    tainerRect: DOMRect,
    level: number,
    hasErrors: boolean,
    isVariant?: boolean,
    children?: JSX.Element | JSX.Element[] | null
};
function NavigationListItem(props: NavigationListItemProps) {
    const actualTargetId = props.isVariant ? PathId.tagAsVariant(props.targetId) : props.targetId;
    const onClick = React.useMemo(() => {
        return () => scrollIntoView(actualTargetId);
    }, [actualTargetId]);
    const [highlighted, setHighlighted] = React.useState(isNavItemVisible(props.tainerRect, props.targetId));

    // All right, fellas, what are we doing here?
    // We want to highlight ourselves in the navigation bar if our corresponding block
    // given by targetId is visible in the input form. This mostly works just fine but there is a catch.
    // If the input form is extended by a new array element, its item will not be available
    // in the DOM by the time we set the initial "highlighted" state. This means that we might
    // incorrectly not highlight ourselves in the bar. To work around this, use this effect.
    React.useEffect(() => {
        const visible = isNavItemVisible(props.tainerRect, actualTargetId);
        if (visible !== highlighted) {
            setHighlighted(visible);
        }
    });

    return (
        <_NavigationListItem
            {...props}
            actualTargetId={actualTargetId}
            isHighlighted={highlighted}
            onClick={onClick}
        />
    );
}

// We need to force a re-render whenever the input form is scrolled
// or the window is resized in order to correctly mark which parts
// of the input form are currently visible. To do that, let us
// use a class component here which does not require "clever"
// hacks to force a re-render.

export type NavigationProps = {
    inputRef: React.RefObject<HTMLDivElement>,
    schema: TopLevelItem,
};
export class Navigation extends React.Component<NavigationProps> {
    static contextType = FormContextInstance;
    _refreshFunc = () => {
        const input = this.props.inputRef?.current;
        if (input) {
            input.removeEventListener('scroll', this._refreshFunc!);
            this.scrollHandlerRegistered = false;

            this.boundingRect = input.getBoundingClientRect();

            this.forceUpdate();
        }
    };
    resizeHandlerRegistered = false;
    scrollHandlerRegistered = false;
    boundingRect: DOMRect = new DOMRect();

    componentDidMount() {
        const input = this.props.inputRef?.current;
        if (!input) {
            // Force a re-render because we need for input to be valid to render anything useful
            this.forceUpdate();
        }
    }

    componentDidUpdate() {
        const input = this.props.inputRef?.current;

        if (!input) {
            // We are guaranteed to get the ref at some point
            // so let's just keep hammering ourselves until the ref becomes valid
            this.forceUpdate();
        } else {
            if (!this.resizeHandlerRegistered) {
                window.addEventListener('resize', this._refreshFunc);
                this.resizeHandlerRegistered = true;
            }
            if (!this.scrollHandlerRegistered) {
                input.addEventListener('scroll', this._refreshFunc);
                this.scrollHandlerRegistered= true;
            }

            if (isBoundingRectEmpty(this.boundingRect)) {
                this.boundingRect = input.getBoundingClientRect();
                this.forceUpdate();
            }
        }
    }

    componentWillUnmount() {
        const input = this.props.inputRef?.current;
        if (input) {
            input.removeEventListener('scroll', this._refreshFunc!);
        }
        window.removeEventListener('resize', this._refreshFunc!);
    }

    render() {
        const { handler } = this.context as { handler: _FormContextHandler }; // What the hell is up with this?

        return navigationList(this.props.schema as Item, handler, '', 0, false, true, this.boundingRect);
    }
}
