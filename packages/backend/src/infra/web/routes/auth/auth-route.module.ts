import { Module } from "@nestjs/common";
import { UsecaseModule } from "src/usecases/usecase.module";

import { RegisterRoute } from "./register/register.route";
import { LoginUserRoute } from "./login/login-user.route";
import { RefreshAuthTokenRoute } from "./refresh-auth-token/refresh-auth-token.route";

@Module({
    imports: [UsecaseModule],
    controllers: [
        RegisterRoute,
        LoginUserRoute,
        RefreshAuthTokenRoute,
    ],
})
export class AuthModule {}

