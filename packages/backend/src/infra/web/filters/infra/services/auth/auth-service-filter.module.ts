import { Module } from "@nestjs/common";

import { AuthTokenNotValidServiceExceptionFilterProvider } from "./auth-token-not-valid-service-exception.filter";
import { RefreshTokenNotValidServiceExceptionFilterProvider } from "./refresh-token-not-valid-service-exception.filter";

@Module({
    providers: [
        AuthTokenNotValidServiceExceptionFilterProvider,
        RefreshTokenNotValidServiceExceptionFilterProvider,
    ],
})
export class AuthServiceFilterModule {}

