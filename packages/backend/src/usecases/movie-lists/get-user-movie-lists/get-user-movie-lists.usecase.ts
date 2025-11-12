import { UseCase } from "src/usecases/usecase";
import { MovieListGateway } from "src/domain/repositories/movie-list.gateway";
import { Injectable } from "@nestjs/common";

export type GetUserMovieListsInput = {
    userId: string;
}

export type GetUserMovieListsOutput = {
    lists: Array<{
        id: string;
        name: string;
        isDefault: boolean;
        createdAt: Date;
    }>;
}

@Injectable()
export class GetUserMovieListsUseCase implements UseCase<GetUserMovieListsInput, GetUserMovieListsOutput> {
    public constructor(private readonly movieListGateway: MovieListGateway) {}

    public async execute(input: GetUserMovieListsInput): Promise<GetUserMovieListsOutput> {
        const lists = await this.movieListGateway.findByUserId(input.userId);

        return {
            lists: lists.map(list => ({
                id: list.getId(),
                name: list.getName(),
                isDefault: list.getIsDefault(),
                createdAt: list.getCreatedAt(),
            })),
        };
    }
}

