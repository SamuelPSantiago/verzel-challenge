import { UseCase } from "src/usecases/usecase";
import { TmdbService, TmdbMovieDetails } from "src/infra/services/tmdb/tmdb.service";
import { Injectable } from "@nestjs/common";

export type GetMovieDetailsInput = {
    movieId: number;
}

export type GetMovieDetailsOutput = TmdbMovieDetails;

@Injectable()
export class GetMovieDetailsUseCase implements UseCase<GetMovieDetailsInput, GetMovieDetailsOutput> {
    public constructor(private readonly tmdbService: TmdbService) {}

    public async execute(input: GetMovieDetailsInput): Promise<GetMovieDetailsOutput> {
        return await this.tmdbService.getMovieDetails(input.movieId);
    }
}

