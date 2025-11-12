import { Module } from "@nestjs/common";

import { ServiceModule } from "../services/service.module";
import { UserModule } from "./routes/users/users-route.module";
import { AuthModule } from "./routes/auth/auth-route.module";
import { MoviesModule } from "./routes/movies/movies-route.module";
import { MovieListsModule } from "./routes/movie-lists/movie-lists-route.module";
import { DatabaseModule } from "../repositories/database.module";

import { AuthGuardProvider } from "./auth/auth.guard";

import { FilterModule } from "./filters/filter.module";

@Module({
    imports: [
        ServiceModule,
        DatabaseModule,
        UserModule,
        AuthModule,
        MoviesModule,
        MovieListsModule,
        FilterModule,
    ],
    providers: [
        AuthGuardProvider,
    ],
})
export class WebModule {}