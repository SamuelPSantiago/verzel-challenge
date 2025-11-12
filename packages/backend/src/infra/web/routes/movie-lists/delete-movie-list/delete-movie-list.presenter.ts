import { DeleteMovieListOutput } from "src/usecases/movie-lists/delete-movie-list/delete-movie-list.usecase";
import { DeleteMovieListResponse } from "./delete-movie-list.dto";

export class DeleteMovieListPresenter {
    public static toHttp(input: DeleteMovieListOutput): DeleteMovieListResponse {
        return {
            success: input.success,
        };
    }
}

