import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/repositories/database.module";
import { ServiceModule } from "src/infra/services/service.module";
import { CreateMovieListUseCase } from "./create-movie-list/create-movie-list.usecase";
import { AddMovieToListUseCase } from "./add-movie-to-list/add-movie-to-list.usecase";
import { RemoveMovieFromListUseCase } from "./remove-movie-from-list/remove-movie-from-list.usecase";
import { GetUserMovieListsUseCase } from "./get-user-movie-lists/get-user-movie-lists.usecase";
import { GetMovieListItemsUseCase } from "./get-movie-list-items/get-movie-list-items.usecase";
import { DeleteMovieListUseCase } from "./delete-movie-list/delete-movie-list.usecase";

@Module({
    imports: [DatabaseModule, ServiceModule],
    providers: [
        CreateMovieListUseCase,
        AddMovieToListUseCase,
        RemoveMovieFromListUseCase,
        GetUserMovieListsUseCase,
        GetMovieListItemsUseCase,
        DeleteMovieListUseCase,
    ],
    exports: [
        CreateMovieListUseCase,
        AddMovieToListUseCase,
        RemoveMovieFromListUseCase,
        GetUserMovieListsUseCase,
        GetMovieListItemsUseCase,
        DeleteMovieListUseCase,
    ],
})
export class MovieListsUsecaseModule {}

