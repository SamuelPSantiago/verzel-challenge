import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Provider } from "@nestjs/common";
import { Response } from "express";
import { APP_FILTER } from "@nestjs/core";
import { LogUtils } from "src/shared/utils/log-utils";
import { ExceptionResponse, ExceptionsUtils } from "src/shared/utils/exceptions-utils";
import { EmailAlreadyExistUsecaseException } from "src/usecases/exceptions/auth/email-already-exist.exception";

@Catch(EmailAlreadyExistUsecaseException)
export class EmailAlreadyExistUsecaseExceptionFilter implements ExceptionFilter {
    public catch(exception: EmailAlreadyExistUsecaseException, host: ArgumentsHost): void {
        LogUtils.logException(exception);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = HttpStatus.BAD_REQUEST;
        const responseBody: ExceptionResponse = ExceptionsUtils.buildErrorResponse(exception, status);
    
        response.status(status).json(responseBody);
    }
}

export const EmailAlreadyExistUsecaseExceptionFilterProvider: Provider<ExceptionFilter> = {
    provide: APP_FILTER,
    useClass: EmailAlreadyExistUsecaseExceptionFilter,
};