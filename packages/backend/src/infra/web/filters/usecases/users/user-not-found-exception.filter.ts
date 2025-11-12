import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Provider } from "@nestjs/common";
import { Response } from "express";
import { APP_FILTER } from "@nestjs/core";
import { LogUtils } from "src/shared/utils/log-utils";
import { ExceptionResponse, ExceptionsUtils } from "src/shared/utils/exceptions-utils";
import { UserNotFoundUsecaseException } from "src/usecases/exceptions/users/user-not-found.exception";

@Catch(UserNotFoundUsecaseException)
export class UserNotFoundUsecaseExceptionFilter implements ExceptionFilter {
    public catch(exception: UserNotFoundUsecaseException, host: ArgumentsHost): void {
        LogUtils.logException(exception);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = HttpStatus.NOT_FOUND;
        const responseBody: ExceptionResponse = ExceptionsUtils.buildErrorResponse(exception, status);
    
        response.status(status).json(responseBody);
    }
}

export const UserNotFoundUsecaseExceptionFilterProvider: Provider<ExceptionFilter> = {
    provide: APP_FILTER,
    useClass: UserNotFoundUsecaseExceptionFilter,
};