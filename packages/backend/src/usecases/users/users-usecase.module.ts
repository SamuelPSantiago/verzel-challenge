import { Module } from "@nestjs/common";

import { DatabaseModule } from "src/infra/repositories/database.module";
import { ServiceModule } from "src/infra/services/service.module";

import { FindUserUseCase } from "./find-by-id/find-user.usecase";

@Module({
    imports: [
        DatabaseModule,
        ServiceModule,
    ],
    providers: [
        FindUserUseCase,
    ],
    exports: [
        FindUserUseCase,
    ],
})
export class UsersUsecaseModule {}