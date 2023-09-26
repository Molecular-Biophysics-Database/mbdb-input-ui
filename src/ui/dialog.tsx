import React from 'react';
import ReactDOM from 'react-dom';
import {
    Button as SButton,
    SemanticCOLORS
} from 'semantic-ui-react';
import { clrToRgb, unique } from '../util';

const CloseBit  = 0x1 as const;
const ApplyBit  = 0x2 as const;
const RejectBit = 0x4 as const;
const UserBit   = 0x100 as const;
const ButtonFlags = [ CloseBit, ApplyBit, RejectBit, UserBit ] as const;

const _StandardButtons = {
    Ok: { flags: CloseBit | ApplyBit, label: 'Ok', id: 0, color: 'green' },
    Cancel: { flags: CloseBit | RejectBit, label: 'Cancel', id: 1, color: 'red' },
    Apply: { flags: ApplyBit , label: 'Apply', id: 2, color: 'yellow' },
    Reset: { flags: RejectBit, label: 'Reset', id: 3, color: 'orange' },
} as const;
const _StandardButtonsMap = {
    [_StandardButtons.Ok.id]: _StandardButtons.Ok,
    [_StandardButtons.Cancel.id]: _StandardButtons.Cancel,
    [_StandardButtons.Apply.id]: _StandardButtons.Apply,
    [_StandardButtons.Reset.id]: _StandardButtons.Reset,
} as const;
// The lower the number, the more to the left will the button be
const _StandardButtonsOrder = {
    [_StandardButtons.Ok.id]: 0,
    [_StandardButtons.Cancel.id]: 1,
    [_StandardButtons.Apply.id]: 2,
    [_StandardButtons.Reset.id]: 3,
};

export const StandardButtons = {
    Ok: _StandardButtons.Ok.id,
    Cancel: _StandardButtons.Cancel.id,
    Apply: _StandardButtons.Apply.id,
    Reset: _StandardButtons.Reset.id,
} as const;
export type StandardButtonIds = typeof StandardButtons[keyof typeof StandardButtons];
export type ButtonFlags = typeof ButtonFlags[number];
export type Button = {
    flags: number,
    label: string,
    id: number,
    color?: SemanticCOLORS | number;
}

function buttonColor(color: number): string {
    const [r, g, b] = clrToRgb(color);
    return `rgb(${r}, ${g}, ${b})`;
}

function fixupButtons(buttons: (StandardButtonIds | Button)[]) {
    let standard = new Array<StandardButtonIds>();
    const user = [];
    for (const b of buttons) {
        if (typeof b === 'number') standard.push(b);
        else user.push({ ...b, flags: b.flags | UserBit });
    }

    standard = unique(standard);
    standard.sort((a, b) => {
        const ordA = _StandardButtonsOrder[a];
        const ordB = _StandardButtonsOrder[b];

        return ordB - ordA;
    });

    return [...user, ...standard];
}

function makeButton(button: typeof StandardButtons[keyof typeof StandardButtons] | Button, onButton: (id: number, flags: number) => void, idx: number) {
    if (typeof button === 'number') {
        const sb = _StandardButtonsMap[button];

        return (
            <SButton
                color={sb.color! as SemanticCOLORS}
                onClick={() => onButton(sb.id, sb.flags)}
                key={idx}
            >
                {sb.label}
            </SButton>
        );
    } else {
        return (
            <SButton
                onClick={() => onButton(button.id, button.flags)}
                color={ typeof button.color === 'string' ? button.color : void 0 }
                style={ typeof button.color === 'number' ? { color: buttonColor(button.color) } : void 0 }
                key={idx}
            >
                {button.label}
            </SButton>
        );
    }
}

function _Dialog(props: Props & { parentElement: HTMLElement, children?: JSX.Element }) {
    const innerRef = React.useRef<HTMLDivElement>(null);
    const [topOffset, setTopOffset] = React.useState(0);
    React.useEffect(() => {
        const onKey = (ev: KeyboardEvent) => {
            ev.preventDefault(); ev.stopPropagation();

            if (ev.key === 'Enter') props.onButton(_StandardButtons.Ok.id, _StandardButtons.Ok.flags);
            else if (ev.key === 'Escape') props.onButton(_StandardButtons.Cancel.id, _StandardButtons.Cancel.flags);
        };
        props.parentElement.addEventListener('keydown', onKey);

        () => {
            props.parentElement.removeEventListener('keydown', onKey);
        };
    }, []);
    React.useLayoutEffect(() => {
        if (!innerRef.current) return;

        const parentRect = props.parentElement.getBoundingClientRect();
        const innerRect = innerRef.current.getBoundingClientRect();
        const tainerHeight = parentRect.height === 0 ? window.innerHeight : parentRect.height;

        setTopOffset((tainerHeight - innerRect.height) / 2);
    }, []);

    const onButton = (id: number, flags: number) => {
        props.onButton(id, flags);
        if (flags & CloseBit) {
            document.body.removeChild(props.parentElement);
        }
    };

    return (
        <div className='mbdbi-dialog'>
            <div className='mbdbi-dialog-inner' ref={innerRef} style={{ top: `${topOffset}px` }}>
                <div className='mbdbi-dialog-title'>
                    {props.title}
                </div>

                <div className='mbdbi-dialog-content'>
                    {props.children}
                </div>

                <div className='mbdbi-line-spacer' />
                <div className='mbdbi-dialog-button-bar'>
                    <div style={{ flex: 1 }} />
                        {props.buttons.map((button, idx) => makeButton(button, onButton, idx))}
                </div>
            </div>
        </div>
    );
}

export type Props = {
    title: string | JSX.Element,
    buttons: (StandardButtonIds | Button)[],
    onButton: (id: number, flags: number) => void,
    content?: JSX.Element,
}
export const Dialog = {
    create(props: Props) {
        const tainer = document.createElement('div');
        document.body.appendChild(tainer);
        const _buttons = fixupButtons(props.buttons);

        // Use the legacy API to retain support for React 16
        ReactDOM.render(
            <_Dialog {...props} buttons={_buttons} parentElement={tainer}>
                {props.content}
            </_Dialog>,
            tainer!
        );
    },

    isUserButton(flags: number) {
        return flags & UserBit;
    },
}
