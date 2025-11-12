import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Provider } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { Response } from "express";
import { AuthTokenNotValidServiceException } from "src/infra/services/exceptions/auth-token-not-valid.service.exception";
import { ExceptionResponse, ExceptionsUtils } from "src/shared/utils/exceptions-utils";
import { LogUtils } from "src/shared/utils/log-utils";

@Catch(AuthTokenNotValidServiceException)
export class AuthTokenNotValidServiceExceptionFilter implements ExceptionFilter {
    public catch(exception: AuthTokenNotValidServiceException, host: ArgumentsHost): void {
        LogUtils.logException(exception);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = HttpStatus.BAD_REQUEST;
        const responseBody: ExceptionResponse = ExceptionsUtils.buildErrorResponse(exception, status);
    
        response.status(status).json(responseBody);
    }
}

export const AuthTokenNotValidServiceExceptionFilterProvider: Provider<ExceptionFilter> = {
    provide: APP_FILTER,
    useClass: AuthTokenNotValidServiceExceptionFilter,
};

