import { UseCase } from "src/usecases/usecase";
import { MovieListGateway } from "src/domain/repositories/movie-list.gateway";
import { MovieList } from "src/domain/entities/movie-list/movie-list.entity";
import { Injectable } from "@nestjs/common";

export type CreateMovieListInput = {
    userId: string;
    name: string;
}

export type CreateMovieListOutput = {
    id: string;
    name: string;
    isDefault: boolean;
}

@Injectable()
export class CreateMovieListUseCase implements UseCase<CreateMovieListInput, CreateMovieListOutput> {
    public constructor(private readonly movieListGateway: MovieListGateway) {}

    public async execute(input: CreateMovieListInput): Promise<CreateMovieListOutput> {
        const movieList = MovieList.create({
            userId: input.userId,
            name: input.name,
            isDefault: false,
        });

        await this.movieListGateway.create(movieList);

        return {
            id: movieList.getId(),
            name: movieList.getName(),
            isDefault: movieList.getIsDefault(),
        };
    }
}

