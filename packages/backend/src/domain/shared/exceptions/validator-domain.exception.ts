import { DomainException } from "./domain.exception";
import { ValidationError } from "../../../shared/utils/zod-utils";

export class ValidatorDomainException extends DomainException {
    private readonly validationErrors: ValidationError[];

    public constructor(
        internalMessage: string,
        externalMessage?: string,
        context?: string,
        validationErrors?: ValidationError[],
    ) {
        super(internalMessage, externalMessage, context);
        this.name = ValidatorDomainException.name;
        this.validationErrors = validationErrors || [];
    }

    public getValidationErrors(): ValidationError[] {
        return this.validationErrors;
    }
}