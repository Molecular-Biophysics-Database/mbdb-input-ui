import React from "react"
import { FormContextInstance } from "../../context";
import { AnyItem, Schema } from "../../schema";
import { _FormContextHandler } from "../../context/handler";
import { PathId } from "./path-id";
import { Data } from "../../schema/data";
import { Traverse } from "../../schema/traverse";
import { niceLabel } from "./util";

type BreadcrumbProps = {
    inputRef: React.RefObject<HTMLDivElement>,
}

function pickCandidateItem(htmlIdOne:string, htmlIdTwo:string, containerRect:DOMRect): [string, boolean] {
    const elemOne = htmlIdOne ? document.getElementById(htmlIdOne) : void 0;
    const elemTwo = htmlIdTwo ? document.getElementById(htmlIdTwo) : void 0;
    const elemOneRect = elemOne?.getBoundingClientRect();
    const elemTwoRect = elemTwo?.getBoundingClientRect();
    const elemOneOffset = elemOneRect ? elemOneRect.y - containerRect.y : -Number.MAX_SAFE_INTEGER;
    const elemTwoOffset = elemTwoRect ? elemTwoRect.y - containerRect.y : -Number.MAX_SAFE_INTEGER;

    if (elemTwoOffset < elemOneOffset) {
        return [htmlIdOne, elemOneOffset <= 10]
    } else {
        return [htmlIdTwo, elemTwoOffset <= 10];
    }
}

function findTopMostVisibleItem(item: AnyItem, ctxHandler: _FormContextHandler, parentHtmlId: string, currentRect:DOMRect, topMostHtmlId: string) {
    if (Schema.isTopLevelItem(item)) {
        for (const innerItem of item.input) {
            topMostHtmlId = findTopMostVisibleItem(innerItem, ctxHandler, '', currentRect, topMostHtmlId);
        }
    } else if (Schema.hasComplexInput(item)) {
        if (item.isArray) {
            const path = Data.Path.path(item.tag, PathId.toPath(parentHtmlId));
            const a = ctxHandler.getArray(path);

            for (let i = 0; i < a.length; i++) {
                const elemPath = Data.Path.index(i, path);
                const htmlId = PathId.toId(elemPath);
                const [winner, isAbove] = pickCandidateItem(htmlId, topMostHtmlId, currentRect);

                if (isAbove) {
                    topMostHtmlId = winner;
                }

                for (const innerItem of item.input) {
                    topMostHtmlId = findTopMostVisibleItem(innerItem, ctxHandler, htmlId, currentRect, topMostHtmlId);
                }
            }
        } else {
            const htmlId = PathId.extendId(item.tag, parentHtmlId);
            const [winner, isAbove] = pickCandidateItem(htmlId, topMostHtmlId, currentRect);

            if (isAbove) {
                topMostHtmlId = winner;
            }

            for (const innerItem of item.input) {
                topMostHtmlId = findTopMostVisibleItem(innerItem, ctxHandler, htmlId, currentRect, topMostHtmlId);
            }
        }
    } else if (Schema.hasVariantInput(item)) {
        const path = Data.Path.path(item.tag, PathId.toPath(parentHtmlId));

        if (item.isArray) {
            const a = ctxHandler.getArray(path);

            for (let i = 0; i < a.length; i++) {
                const elemPath = Data.Path.index(i, path);
                const choice = ctxHandler.getVariantChoice(elemPath);
                const htmlId = PathId.toId(elemPath);
                const [winner, isAbove] = pickCandidateItem(htmlId, topMostHtmlId, currentRect);

                if (isAbove) {
                    topMostHtmlId = winner;
                }

                topMostHtmlId = findTopMostVisibleItem(item.input[choice], ctxHandler, htmlId, currentRect, topMostHtmlId);
            }

        } else {
            const choice = ctxHandler.getVariantChoice(path);
            const htmlId = PathId.toId(path);
            const [winner, isAbove] = pickCandidateItem(htmlId, topMostHtmlId, currentRect);

            if (isAbove) {
                topMostHtmlId = winner;
            }

            topMostHtmlId = findTopMostVisibleItem(item.input[choice], ctxHandler, htmlId, currentRect, topMostHtmlId);
        }
    }

    return topMostHtmlId;
}

function getTitles(htmlId: string, schema: AnyItem) {

    if (htmlId === '') {
        return '';
    }

    const dataPath = PathId.toPath(htmlId);
    const objPath = Traverse.objPathFromDataPath(dataPath);
    const tokens = objPath.split('/');

    if (tokens.length < 1) {
        return '';
    }

    let tokenPath = '';

    const niceLabels = [];

    for (const tok of tokens) {
        tokenPath = Traverse.objPath(tok, tokenPath);
        const item = Traverse.itemFromSchema(tokenPath, schema);
        niceLabels.push(<><div>{niceLabel(item.label)}</div><div className="inline">/</div></>);
    }

    return niceLabels;
}

export function Breadcrumb(props: BreadcrumbProps) {
    const [topMost, setTopMost] = React.useState('');
    const [displayBreacrumb, setDisplayBreadcrumb] = React.useState(false);

    const { handler } = React.useContext(FormContextInstance);

    React.useEffect( ()=> {
        const current = props.inputRef.current;

        if (current === null) {
            return;
        } 

        const currentRect = current.getBoundingClientRect()

        const onScrollEvent = () => {
            const topMostHtmlId = findTopMostVisibleItem(handler.schema(), handler, '', currentRect, '');

            setTopMost(topMostHtmlId);
            setDisplayBreadcrumb(true);
        }
        current.addEventListener('scroll', onScrollEvent);

        return () => {
            current.removeEventListener('scroll', onScrollEvent);
        }

    }, [props.inputRef])

    return <div className={`${displayBreacrumb ? 'breadcrumb-active' : 'breadcrumb'}`}>{getTitles(topMost, handler.schema())}</div>
}