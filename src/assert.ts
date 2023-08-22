export function assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}

export function warning(condition: boolean, message: string): asserts condition {
    if (!condition) {
        console.warn(`Invariant violation: ${message}`);
    }
}

