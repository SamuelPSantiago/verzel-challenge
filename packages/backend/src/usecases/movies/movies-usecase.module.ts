import { Module } from "@nestjs/common";
import { ServiceModule } from "src/infra/services/service.module";
import { SearchMoviesUseCase } from "./search-movies/search-movies.usecase";
import { GetPopularMoviesUseCase } from "./get-popular-movies/get-popular-movies.usecase";
import { GetMovieDetailsUseCase } from "./get-movie-details/get-movie-details.usecase";

@Module({
    imports: [ServiceModule],
    providers: [
        SearchMoviesUseCase,
        GetPopularMoviesUseCase,
        GetMovieDetailsUseCase,
    ],
    exports: [
        SearchMoviesUseCase,
        GetPopularMoviesUseCase,
        GetMovieDetailsUseCase,
    ],
})
export class MoviesUsecaseModule {}

