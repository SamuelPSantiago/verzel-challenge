import { UseCase } from "src/usecases/usecase";
import { TmdbService, TmdbSearchResponse } from "src/infra/services/tmdb/tmdb.service";
import { Injectable } from "@nestjs/common";

export type SearchMoviesInput = {
    query: string;
    page?: number;
}

export type SearchMoviesOutput = TmdbSearchResponse;

@Injectable()
export class SearchMoviesUseCase implements UseCase<SearchMoviesInput, SearchMoviesOutput> {
    public constructor(private readonly tmdbService: TmdbService) {}

    public async execute(input: SearchMoviesInput): Promise<SearchMoviesOutput> {
        return await this.tmdbService.searchMovies(input.query, input.page ?? 1);
    }
}

