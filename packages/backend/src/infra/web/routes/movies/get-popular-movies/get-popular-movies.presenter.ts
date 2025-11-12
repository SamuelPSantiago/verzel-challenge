import { GetPopularMoviesOutput } from "src/usecases/movies/get-popular-movies/get-popular-movies.usecase";
import { SearchMoviesResponse } from "../search-movies/search-movies.dto";

export class GetPopularMoviesPresenter {
    public static toHttp(input: GetPopularMoviesOutput): SearchMoviesResponse {
        return {
            page: input.page,
            results: input.results,
            total_pages: input.total_pages,
            total_results: input.total_results,
        };
    }
}

