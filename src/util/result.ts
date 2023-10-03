export type ErrorResult<Error> = {
    isOk: false,
    error: Error,
};
export function ErrorResult<Error>(error: Error): ErrorResult<Error> {
    return { isOk: false, error };
}

export type OkResult<Data> = {
    isOk: true,
    data: Data,
};
export function OkResult<Data>(data: Data): OkResult<Data> {
    return { isOk: true, data };
}

export type Result<Data, Error> = ErrorResult<Error> | OkResult<Data>;
export const Result = {
    isError(result: Result<any, any>): result is ErrorResult<any> {
        return !result.isOk;
    },

    isOk(result: Result<any, any>): result is OkResult<any> {
        return result.isOk;
    },
};
