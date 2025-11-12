import { AddMovieToListOutput } from "src/usecases/movie-lists/add-movie-to-list/add-movie-to-list.usecase";
import { AddMovieToListResponse } from "./add-movie-to-list.dto";

export class AddMovieToListPresenter {
    public static toHttp(input: AddMovieToListOutput): AddMovieToListResponse {
        return {
            id: input.id,
            movieId: input.movieId,
            title: input.title,
        };
    }
}

