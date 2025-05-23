export interface RequestBody {
    [key: string]: any;
}

export interface ResponseData {
    message: string;
    data?: any;
}

export interface ErrorResponse {
    error: string;
    statusCode: number;
}