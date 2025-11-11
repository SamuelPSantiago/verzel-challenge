import { UsecaseException } from "../usecase.exception";

export class EmailAlreadyExistUsecaseException extends UsecaseException {
    public constructor(internalMessage: string, externalMessage: string, context: string) {
        super(internalMessage, externalMessage, context);
        this.name = EmailAlreadyExistUsecaseException.name;
    }
}