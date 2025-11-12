import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Provider } from "@nestjs/common";
import { CredentialsNotValidUsecaseException } from "src/usecases/exceptions/auth/credentials-not-valid.exception";
import { Response } from "express";
import { APP_FILTER } from "@nestjs/core";
import { LogUtils } from "src/shared/utils/log-utils";
import { ExceptionResponse, ExceptionsUtils } from "src/shared/utils/exceptions-utils";

@Catch(CredentialsNotValidUsecaseException)
export class CredentialsNotValidUsecaseExceptionFilter implements ExceptionFilter {
    public catch(exception: CredentialsNotValidUsecaseException, host: ArgumentsHost): void {
        LogUtils.logException(exception);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = HttpStatus.BAD_REQUEST;
        const responseBody: ExceptionResponse = ExceptionsUtils.buildErrorResponse(exception, status);
    
        response.status(status).json(responseBody);
    }
}

export const CredentialsNotValidUsecaseExceptionFilterProvider: Provider<ExceptionFilter> = {
    provide: APP_FILTER,
    useClass: CredentialsNotValidUsecaseExceptionFilter,
};