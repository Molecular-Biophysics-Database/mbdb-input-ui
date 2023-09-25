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

export type KeptData = { schemaName: keyof typeof MbdbModels, data: FormContext };
const _data = new Map<string, KeptData>();

const Keeper = {
    /**
     * Retrieves data based on its `id`.
     *
     * @param {string} id - `id` of the data to retrieve
     * @return {KeptData | undefined} The data or `undefined` if data with the given `id` does not exist
     */
    get(id: string) {
        return _data.get(id)!;
    },

    /**
     * Checks if the data with  the given `id` exists.
     *
     * @param {string} id - `id` of the data to check
     * @return {boolean} True if the data exists, false otherwise
     */
    has(id: string) {
        return _data.has(id);
    },

    /**
     * Removes data with the `id` from the storage.
     *
     * @param {string} id - `id` of the data to remove
     * @return {void}
     */
    remove(id: string) {
        _data.delete(id);
    },

    /**
     * Stores new data under the given `id` in the storage.
     * If there already is data stored under the given `id`, it is overwritten by by the new data.
     *
     * @param {string} id - `id` of the data to store
     * @param {KeptData} newData - Data to store
     * @return {void}
     */
    set(id: string, newData: KeptData) {
        _data.set(id, newData);
    },
};

/**
 * Retrieves the `Keeper` instance
 *
 * @return {Keeper} The `Keeper` instance
 */
export function getKeeper() {
    return Keeper;
}
