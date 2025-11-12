import { Module } from "@nestjs/common";
import { UsecaseModule } from "src/usecases/usecase.module";
import { SearchMoviesRoute } from "./search-movies/search-movies.route";
import { GetPopularMoviesRoute } from "./get-popular-movies/get-popular-movies.route";

@Module({
    imports: [UsecaseModule],
    controllers: [
        SearchMoviesRoute,
        GetPopularMoviesRoute,
    ],
})
export class MoviesModule {}

