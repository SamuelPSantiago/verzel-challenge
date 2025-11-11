import { Exception } from "../exceptions/exception";
import { Logger } from "@nestjs/common";

export class LogUtils {
    public static logException(exception: Exception): void {
        const logger = new Logger(exception.getContext());
        logger.error(exception.getInternalMessage());
        logger.warn(exception.stack);
    }
}