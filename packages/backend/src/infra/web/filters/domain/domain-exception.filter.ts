import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Provider } from "@nestjs/common";
import { DomainException } from "src/domain/shared/exceptions/domain.exception";
import { Response } from "express";
import { APP_FILTER } from "@nestjs/core";
import { LogUtils } from "src/shared/utils/log-utils";
import { ExceptionResponse, ExceptionsUtils } from "src/shared/utils/exceptions-utils";

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
    public catch(exception: DomainException, host: ArgumentsHost): void {
        LogUtils.logException(exception);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = HttpStatus.INTERNAL_SERVER_ERROR;
        const responseBody: ExceptionResponse = ExceptionsUtils.buildErrorResponse(exception, status);
    
        response.status(status).json(responseBody);
    }
}

export const DomainExceptionFilterProvider: Provider<ExceptionFilter> = {
    provide: APP_FILTER,
    useClass: DomainExceptionFilter,
};