import { Module } from "@nestjs/common";
import { UsecaseModule } from "src/usecases/usecase.module";

import { FindByIdUserRoute } from "./find-by-id/find-by-id-user.route";

@Module({
    imports: [UsecaseModule],
    controllers: [
        FindByIdUserRoute,
    ],
})
export class UserModule {}

