import { SyntheticEvent } from "react";

export type SOnChange<T> = (event: SyntheticEvent, data: T) => void;
