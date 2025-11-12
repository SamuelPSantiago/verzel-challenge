import { Module } from "@nestjs/common";

import { DatabaseModule } from "src/infra/repositories/database.module";
import { ServiceModule } from "src/infra/services/service.module";

import { RegisterUserUseCase } from "./register/register-user.usecase";
import { LoginUserUseCase } from "./login/login-user.usecase";
import { RefreshAuthTokenUserUseCase } from "./refresh-auth-token/refresh-auth-token-user.usecase";

@Module({
    imports: [
        DatabaseModule,
        ServiceModule,
    ],
    providers: [
        RegisterUserUseCase,
        LoginUserUseCase,
        RefreshAuthTokenUserUseCase,
    ],
    exports: [
        RegisterUserUseCase,
        LoginUserUseCase,
        RefreshAuthTokenUserUseCase,
    ],
})
export class AuthUsecaseModule {}

