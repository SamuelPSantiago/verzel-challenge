import { UseCase } from "src/usecases/usecase";
import { MovieListGateway } from "src/domain/repositories/movie-list.gateway";
import { Injectable } from "@nestjs/common";

export type GetMovieListItemsInput = {
    movieListId: string;
    userId: string;
}

export type GetMovieListItemsOutput = {
    items: Array<{
        id: string;
        movieId: number;
        title: string;
        posterPath: string | null;
        releaseDate: string | null;
        overview: string | null;
    }>;
}

@Injectable()
export class GetMovieListItemsUseCase implements UseCase<GetMovieListItemsInput, GetMovieListItemsOutput> {
    public constructor(private readonly movieListGateway: MovieListGateway) {}

    public async execute(input: GetMovieListItemsInput): Promise<GetMovieListItemsOutput> {
        // Verificar se a lista pertence ao usuário
        const movieList = await this.movieListGateway.findById(input.movieListId);
        if (!movieList) {
            throw new Error('Lista não encontrada');
        }
        if (movieList.getUserId() !== input.userId) {
            throw new Error('Você não tem permissão para visualizar esta lista');
        }

        const items = await this.movieListGateway.findItemsByMovieListId(input.movieListId);

        return {
            items: items.map(item => ({
                id: item.getId(),
                movieId: item.getMovieId(),
                title: item.getTitle(),
                posterPath: item.getPosterPath(),
                releaseDate: item.getReleaseDate(),
                overview: item.getOverview(),
            })),
        };
    }
}

