import { Module } from "@nestjs/common";

import { UserNotFoundUsecaseExceptionFilterProvider } from "./user-not-found-exception.filter";

@Module({
    providers: [
        UserNotFoundUsecaseExceptionFilterProvider,
    ],
})
export class UsersFilterModule {}