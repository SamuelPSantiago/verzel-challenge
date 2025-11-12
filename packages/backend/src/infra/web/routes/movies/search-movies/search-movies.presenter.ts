import { SearchMoviesOutput } from "src/usecases/movies/search-movies/search-movies.usecase";
import { SearchMoviesResponse } from "./search-movies.dto";

export class SearchMoviesPresenter {
    public static toHttp(input: SearchMoviesOutput): SearchMoviesResponse {
        return {
            page: input.page,
            results: input.results,
            total_pages: input.total_pages,
            total_results: input.total_results,
        };
    }
}

