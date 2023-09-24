import { FormContext } from './';
import { MbdbModels } from '../mbdb/models';

// Yes, this is a global variable that stores all the FormContexts created by the code.
// What the hell, right?
// Here is the issue. When the form's content is manupulated by the user, there are sanity checks
// in place to ensure that the form always stays in a valid state. This works fine, except for one
// corner case - when the schema is replaced with a different one.
// When that happens, all components in the form get unmounted and their unmount handlers get called.
// Since we have no control over the order in which the unmount handlers get called, this may get
// the form into a state that would be considered inconsistent. We do not care about inconsistent
// states because we will throw all the data away and create in from scratch. Unfortunately, since
// the sanity checks will still run, the code will throw errors and fail.
//
// How to get around this?
// We can introduce a simple condition that the sanity checks will not fire if the data is completely empty.
// This alone will not eliminate the problem, though. We need to make sure that React always references the "correct"
// data - in this case it would be the newly recreateated data. To achieve this, the data must live outside of what
// is managed by React. This is why we have this global Keeper. React code only gets the "id" of the data and
// a function to call that picks the data up from the keeper.

const _data = new Map<string, { schemaName: keyof typeof MbdbModels, data: FormContext }>();

const Keeper = {
    get(id: string) {
        return _data.get(id)!;
    },

    has(id: string) {
        return _data.has(id);
    },

    remove(id: string) {
        _data.delete(id);
    },

    set(id: string, content: { schemaName: keyof typeof MbdbModels, data: FormContext }) {
        _data.set(id, content);
    },
};

export function getKeeper() {
    return Keeper;
}
