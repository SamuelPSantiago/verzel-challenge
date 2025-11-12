import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Provider } from "@nestjs/common";
import { ValidatorDomainException } from "src/domain/shared/exceptions/validator-domain.exception";
import { Response } from "express";
import { APP_FILTER } from "@nestjs/core";
import { LogUtils } from "src/shared/utils/log-utils";

export type ValidationErrorResponse = {
    statusCode: number;
    message: string;
    errors: Array<{
        field: string;
        message: string;
    }>;
};

@Catch(ValidatorDomainException)
export class ValidatorDomainExceptionFilter implements ExceptionFilter {
    public catch(exception: ValidatorDomainException, host: ArgumentsHost): void {
        LogUtils.logException(exception);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = HttpStatus.BAD_REQUEST;
        const validationErrors = exception.getValidationErrors();
        
        if (validationErrors.length > 0) {
            const responseBody: ValidationErrorResponse = {
                statusCode: status,
                message: exception.getExternalMessage(),
                errors: validationErrors,
            };
            response.status(status).json(responseBody);
        } else {
            const responseBody = {
                statusCode: status,
                message: exception.getExternalMessage(),
            };
            response.status(status).json(responseBody);
        }
    }
}

export const ValidatorDomainExceptionFilterProvider: Provider<ExceptionFilter> = {
    provide: APP_FILTER,
    useClass: ValidatorDomainExceptionFilter,
};