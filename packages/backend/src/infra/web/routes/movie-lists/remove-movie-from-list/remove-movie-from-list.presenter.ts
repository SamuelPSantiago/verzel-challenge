import { RemoveMovieFromListOutput } from "src/usecases/movie-lists/remove-movie-from-list/remove-movie-from-list.usecase";
import { RemoveMovieFromListResponse } from "./remove-movie-from-list.dto";

export class RemoveMovieFromListPresenter {
    public static toHttp(input: RemoveMovieFromListOutput): RemoveMovieFromListResponse {
        return {
            success: input.success,
        };
    }
}

