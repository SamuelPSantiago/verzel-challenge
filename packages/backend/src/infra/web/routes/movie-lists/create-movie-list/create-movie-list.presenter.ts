import { CreateMovieListOutput } from "src/usecases/movie-lists/create-movie-list/create-movie-list.usecase";
import { CreateMovieListResponse } from "./create-movie-list.dto";

export class CreateMovieListPresenter {
    public static toHttp(input: CreateMovieListOutput): CreateMovieListResponse {
        return {
            id: input.id,
            name: input.name,
            isDefault: input.isDefault,
        };
    }
}

