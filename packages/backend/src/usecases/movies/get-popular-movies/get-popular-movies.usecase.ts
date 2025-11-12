import { UseCase } from "src/usecases/usecase";
import { TmdbService, TmdbSearchResponse } from "src/infra/services/tmdb/tmdb.service";
import { Injectable } from "@nestjs/common";

export type GetPopularMoviesInput = {
    page?: number;
}

export type GetPopularMoviesOutput = TmdbSearchResponse;

@Injectable()
export class GetPopularMoviesUseCase implements UseCase<GetPopularMoviesInput, GetPopularMoviesOutput> {
    public constructor(private readonly tmdbService: TmdbService) {}

    public async execute(input: GetPopularMoviesInput): Promise<GetPopularMoviesOutput> {
        return await this.tmdbService.getPopularMovies(input.page ?? 1);
    }
}

