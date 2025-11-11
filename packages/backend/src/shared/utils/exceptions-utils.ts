import { Exception } from "../exceptions/exception";

export type ExceptionResponse = {
    statusCode: number;
    timestamp: string;
    message: string;
}

export class ExceptionsUtils {
    public static buildErrorResponse(exception: Exception, statusCode: number): ExceptionResponse {    
        const aResponse: ExceptionResponse = {
            statusCode: statusCode,
            timestamp: new Date().toISOString(),
            message: exception.getExternalMessage(),
        };

        return aResponse;
    }
}