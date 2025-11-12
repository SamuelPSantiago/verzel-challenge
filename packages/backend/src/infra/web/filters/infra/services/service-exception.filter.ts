import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Provider } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { Response } from "express";
import { ServiceException } from "src/infra/services/exceptions/service.exception";
import { ExceptionResponse, ExceptionsUtils } from "src/shared/utils/exceptions-utils";
import { LogUtils } from "src/shared/utils/log-utils";

@Catch(ServiceException)
export class ServiceExceptionFilter implements ExceptionFilter {
    public catch(exception: ServiceException, host: ArgumentsHost): void {
        LogUtils.logException(exception);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = HttpStatus.INTERNAL_SERVER_ERROR;
        const responseBody: ExceptionResponse = ExceptionsUtils.buildErrorResponse(exception, status);
    
        response.status(status).json(responseBody);
    }
}

export const ServiceExceptionFilterProvider: Provider<ExceptionFilter> = {
    provide: APP_FILTER,
    useClass: ServiceExceptionFilter,
};