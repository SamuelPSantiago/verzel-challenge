import { GetUserMovieListsOutput } from "src/usecases/movie-lists/get-user-movie-lists/get-user-movie-lists.usecase";
import { GetUserMovieListsResponse } from "./get-user-movie-lists.dto";

export class GetUserMovieListsPresenter {
    public static toHttp(input: GetUserMovieListsOutput): GetUserMovieListsResponse {
        return {
            lists: input.lists,
        };
    }
}

