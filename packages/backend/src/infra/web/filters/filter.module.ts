import { Module } from "@nestjs/common";

import { DomainExceptionFilterProvider } from "./domain/domain-exception.filter";
import { ValidatorDomainExceptionFilterProvider } from "./domain/validator-domain-exception.filter";
import { UsecaseExceptionFilterProvider } from "./usecases/usecase-exception.filter";
import { ServiceExceptionFilterProvider } from "./infra/services/service-exception.filter";

import { AuthFilterModule } from "./usecases/auth/auth-filter.module";
import { UsersFilterModule } from "./usecases/users/users-filter.module";
import { AuthServiceFilterModule } from "./infra/services/auth/auth-service-filter.module";

@Module({
    imports: [
        AuthFilterModule,
        UsersFilterModule,
        AuthServiceFilterModule,
    ],
    providers: [
        DomainExceptionFilterProvider,
        ValidatorDomainExceptionFilterProvider,
        UsecaseExceptionFilterProvider,
        ServiceExceptionFilterProvider,
    ],
})
export class FilterModule {}

