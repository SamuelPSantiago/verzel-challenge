import { UsecaseException } from "../usecase.exception";

export class OAuthUserAlreadyExistsUsecaseException extends UsecaseException {
    public constructor(internalMessage: string, externalMessage: string, context: string) {
        super(internalMessage, externalMessage, context);
        this.name = OAuthUserAlreadyExistsUsecaseException.name;
    }
}