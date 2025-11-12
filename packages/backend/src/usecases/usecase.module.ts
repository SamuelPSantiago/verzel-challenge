import { Module } from "@nestjs/common";

import { AuthUsecaseModule } from "./auth/auth-usecase.module";
import { UsersUsecaseModule } from "./users/users-usecase.module";
import { MoviesUsecaseModule } from "./movies/movies-usecase.module";
import { MovieListsUsecaseModule } from "./movie-lists/movie-lists-usecase.module";

@Module({
    imports: [
        AuthUsecaseModule,
        UsersUsecaseModule,
        MoviesUsecaseModule,
        MovieListsUsecaseModule,
    ],
    exports: [
        AuthUsecaseModule,
        UsersUsecaseModule,
        MoviesUsecaseModule,
        MovieListsUsecaseModule,
    ],
})
export class UsecaseModule {}