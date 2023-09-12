import { DataError } from '../../../mbdb';
import { MbdbData } from '../../../mbdb/data';
import { Options } from '../../../mbdb/deserialize';
import { Help } from '../../../schema';
import { DataTree, Path } from '../../../schema/data';

export { DataError };

export type CustomComponent<CustomData> = {
    applyInitialData: (inData: DataTree) => Partial<CustomData>,
    emptyData: () => Partial<CustomData>,
    fromMbdb: (mbdbData: MbdbData, options: Options) => DataTree,
    hasErrors: (data: DataTree) => boolean,
    toMbdb: (data: DataTree, path: Path, errors: DataError[]) => MbdbData | undefined
    validateData: (data: Partial<CustomData>) => void,

    Component: (props: { isDisabled: boolean, path: Path, help?: Help, reactKey?: string | number }) => React.ReactElement,
};
