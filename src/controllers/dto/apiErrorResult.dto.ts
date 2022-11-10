export type APIErrorResultModel = {
    errorsMessages: FieldError[];
}

export type FieldError = {
    message: string;
    field: string;
}