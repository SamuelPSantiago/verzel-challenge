import { Module } from "@nestjs/common";

import { CredentialsNotValidUsecaseExceptionFilterProvider } from "./credentials-not-valid-usecase-exception.filter";
import { EmailAlreadyExistUsecaseExceptionFilterProvider } from "./email-already-exist-usecase-exception.filter";

@Module({
    providers: [
        CredentialsNotValidUsecaseExceptionFilterProvider,
        EmailAlreadyExistUsecaseExceptionFilterProvider,
    ],
})
export class AuthFilterModule {}

