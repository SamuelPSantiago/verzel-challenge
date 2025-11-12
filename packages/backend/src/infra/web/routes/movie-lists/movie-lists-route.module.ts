import { Module } from "@nestjs/common";
import { UsecaseModule } from "src/usecases/usecase.module";
import { CreateMovieListRoute } from "./create-movie-list/create-movie-list.route";
import { AddMovieToListRoute } from "./add-movie-to-list/add-movie-to-list.route";
import { RemoveMovieFromListRoute } from "./remove-movie-from-list/remove-movie-from-list.route";
import { GetUserMovieListsRoute } from "./get-user-movie-lists/get-user-movie-lists.route";
import { GetMovieListItemsRoute } from "./get-movie-list-items/get-movie-list-items.route";
import { DeleteMovieListRoute } from "./delete-movie-list/delete-movie-list.route";

@Module({
    imports: [UsecaseModule],
    controllers: [
        CreateMovieListRoute,
        AddMovieToListRoute,
        RemoveMovieFromListRoute,
        GetUserMovieListsRoute,
        GetMovieListItemsRoute,
        DeleteMovieListRoute,
    ],
})
export class MovieListsModule {}

