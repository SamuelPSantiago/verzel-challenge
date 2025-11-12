import { UseCase } from "src/usecases/usecase";
import { MovieListGateway } from "src/domain/repositories/movie-list.gateway";
import { Injectable } from "@nestjs/common";

export type RemoveMovieFromListInput = {
    movieListId: string;
    movieId: number;
    userId: string;
}

export type RemoveMovieFromListOutput = {
    success: boolean;
}

@Injectable()
export class RemoveMovieFromListUseCase implements UseCase<RemoveMovieFromListInput, RemoveMovieFromListOutput> {
    public constructor(private readonly movieListGateway: MovieListGateway) {}

    public async execute(input: RemoveMovieFromListInput): Promise<RemoveMovieFromListOutput> {
        // Verificar se a lista pertence ao usuário
        const movieList = await this.movieListGateway.findById(input.movieListId);
        if (!movieList) {
            throw new Error('Lista não encontrada');
        }
        if (movieList.getUserId() !== input.userId) {
            throw new Error('Você não tem permissão para remover filmes desta lista');
        }

        // Buscar o item
        const item = await this.movieListGateway.findItemByMovieListIdAndMovieId(
            input.movieListId,
            input.movieId
        );
        if (!item) {
            throw new Error('Filme não encontrado na lista');
        }

        // Remover o item
        await this.movieListGateway.deleteItem(item.getId());

        return { success: true };
    }
}

