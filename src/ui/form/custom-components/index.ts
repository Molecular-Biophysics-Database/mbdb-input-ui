import { MbdbData } from "../../../mbdb/data";
import { DataTree, Path } from '../../../schema/data';

export type CustomComponent<CustomData> = {
    applyInitialData: (inData: DataTree) => Partial<CustomData>,
    emptyData: () => Partial<CustomData>,
    fromMbdb: (mbdbData: MbdbData) => DataTree,
    toMbdb: (data: DataTree, path: Path, errors: string[]) => MbdbData,
    validateData: (data: Partial<CustomData>) => void,

    Component: (props: { path: Path, reactKey?: string | number }) => React.ReactElement,
};
