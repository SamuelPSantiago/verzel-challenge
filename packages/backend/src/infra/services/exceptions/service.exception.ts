import { Exception } from "../../../shared/exceptions/exception";

export class ServiceException extends Exception {
    public constructor(internalMessage: string, externalMessage?: string, context?: string) {
        super(internalMessage, externalMessage, context);
        this.name = ServiceException.name;
    }
}