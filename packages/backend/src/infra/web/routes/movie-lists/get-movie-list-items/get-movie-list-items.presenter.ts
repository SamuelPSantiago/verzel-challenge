import { GetMovieListItemsOutput } from "src/usecases/movie-lists/get-movie-list-items/get-movie-list-items.usecase";
import { GetMovieListItemsResponse } from "./get-movie-list-items.dto";

export class GetMovieListItemsPresenter {
    public static toHttp(input: GetMovieListItemsOutput): GetMovieListItemsResponse {
        return {
            items: input.items,
        };
    }
}

