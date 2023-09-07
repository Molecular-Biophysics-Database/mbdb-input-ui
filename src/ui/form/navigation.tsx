import clsx from 'clsx';
import PropTypes from 'prop-types';
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

function isNavItemVisible(bRect: Rect | null, htmlId: string) {
    if (!bRect) return false;
    const topOffset = elementTopOffset(htmlId);

    return isVisible(bRect, topOffset);
}

function isVisible(bRect: Rect, topOffset: number) {
    return topOffset >= bRect.top - TopCorrection && topOffset < bRect.bottom;
}

function navigationList(item: Item, ctxHandler: _FormContextHandler, parentHtmlId: string, level: number, isParentMarkedEmpty: boolean, tainerRect: Rect | null) {
    if (level === MaximumNesting) return null;

    let ctr = 0;
    let listItems = [];

    if (Schema.hasVariantInput(item)) {
        const path = PathId.toPath(parentHtmlId);
        const choice = ctxHandler.getVariantChoice(path);
        const choicePath = Data.Path.path(choice, path);

        if (Data.has(ctxHandler.data(), choicePath)) {
            const htmlId = PathId.extendId(choice, parentHtmlId);
            const innerList = navigationList(item.input[choice], ctxHandler, htmlId, level + 1, isParentMarkedEmpty, tainerRect);
            listItems.push(
                <NavigationListItem label={niceLabel(choice, !!item.input[choice].dontTransformLabels)} targetId={htmlId} tainerRect={tainerRect} level={level} isMarkedEmpty={isParentMarkedEmpty} key={ctr} isVariant>
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

                if (Data.has(ctxHandler.data(), path)) {
                    if (innerItem.isArray) {
                        const data = Data.getArray(ctxHandler.data(), path);

                        if (data.length === 0) {
                            listItems.push(
                                <NavigationListItem label={label} targetId={htmlId} tainerRect={tainerRect} level={level} isMarkedEmpty={innerIsMarkedEmpty} key={ctr} />
                            );
                            ctr++;
                        } else {
                            for (let idx = 0; idx < data.length; idx++) {
                                // Array items can be collapsed. If they are, do not list their content.
                                const isCollapsed = ctxHandler.navigation.isCollapsed(ctxHandler.getItem(Data.Path.index(idx, path)));

                                const itemHtmlId = PathId.extendId(idx, htmlId, true);
                                const innerList = isCollapsed ? null : navigationList(innerItem, ctxHandler, itemHtmlId, level + 1, innerIsMarkedEmpty, tainerRect);
                                listItems.push(
                                    <NavigationListItem label={`${label}: ${idx + 1}`} targetId={itemHtmlId} tainerRect={tainerRect} level={level} isMarkedEmpty={innerIsMarkedEmpty} key={ctr}>
                                        {innerList}
                                    </NavigationListItem>
                                );
                                ctr++;
                            }
                        }
                    } else {
                        const innerList = navigationList(innerItem, ctxHandler, htmlId, level + 1, innerIsMarkedEmpty, tainerRect);
                        listItems.push(
                            <NavigationListItem label={label} targetId={htmlId} tainerRect={tainerRect} level={level} isMarkedEmpty={innerIsMarkedEmpty} key={ctr}>
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

type NavigationListItemProps = {
    label: string,
    targetId: string,
    tainerRect: Rect | null,
    level: number,
    isMarkedEmpty: boolean,
    isVariant?: boolean,
    children?: JSX.Element | JSX.Element[] | null
};
function NavigationListItem(props: NavigationListItemProps) {
    const { handler } = React.useContext(FormContextInstance);
    const path = PathId.toPath(props.targetId);
    const actualTargetId = props.isVariant ? PathId.tagAsVariant(props.targetId) : props.targetId;
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

    const hasErrors = props.isMarkedEmpty ? false : subtreeHasErrors(handler.data(), path, handler.schema());

    return (
        <div className='mbdb-form-nav-list-item'>
            <div className={clsx('mbdb-form-nav-list-item-title', highlighted && 'mbdb-form-nav-list-item-title-highlighted')} style={{ paddingLeft: `calc(${props.level} * var(--mbdb-2hgap))` }}>
                <SIcon
                    onClick={() => scrollIntoView(actualTargetId)}
                    name={hasErrors ? 'warning sign' : 'chevron right'}
                    color={hasErrors ? 'red' : 'black'}
                />
                <a className={'mbdb-form-nav-link'} onClick={() => scrollIntoView(actualTargetId)}>{props.label}</a>
            </div>
            <div>
                {props.children ?? null}
            </div>
        </div>
    );
}
NavigationListItem.propTypes = {
    children: PropTypes.node,
    isVariant: PropTypes.bool,
    label: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    tainerRect: PropTypes.object,
    targetId: PropTypes.string.isRequired,
};

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

            this.forceUpdate();
        }
    };
    resizeHandlerRegistered = false;
    scrollHandlerRegistered = false;

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
        const input = this.props.inputRef?.current;

        return navigationList(this.props.schema as Item, handler, '', 0, false, input ? input.getBoundingClientRect() : null);
    }
}
