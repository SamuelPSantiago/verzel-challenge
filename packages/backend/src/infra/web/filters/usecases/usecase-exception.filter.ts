import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Provider } from "@nestjs/common";
import { UsecaseException } from "src/usecases/exceptions/usecase.exception";
import { Response } from "express";
import { APP_FILTER } from "@nestjs/core";
import { LogUtils } from "src/shared/utils/log-utils";
import { ExceptionResponse, ExceptionsUtils } from "src/shared/utils/exceptions-utils";

@Catch(UsecaseException)
export class UsecaseExceptionFilter implements ExceptionFilter {
    public catch(exception: UsecaseException, host: ArgumentsHost): void {
        LogUtils.logException(exception);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = HttpStatus.INTERNAL_SERVER_ERROR;
        const responseBody: ExceptionResponse = ExceptionsUtils.buildErrorResponse(exception, status);
    
        response.status(status).json(responseBody);
    }
}

export const UsecaseExceptionFilterProvider: Provider<ExceptionFilter> = {
    provide: APP_FILTER,
    useClass: UsecaseExceptionFilter,
};