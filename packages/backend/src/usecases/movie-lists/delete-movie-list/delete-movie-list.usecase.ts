import { UseCase } from "src/usecases/usecase";
import { MovieListGateway } from "src/domain/repositories/movie-list.gateway";
import { Injectable } from "@nestjs/common";

export type DeleteMovieListInput = {
    movieListId: string;
    userId: string;
}

export type DeleteMovieListOutput = {
    success: boolean;
}

@Injectable()
export class DeleteMovieListUseCase implements UseCase<DeleteMovieListInput, DeleteMovieListOutput> {
    public constructor(private readonly movieListGateway: MovieListGateway) {}

    public async execute(input: DeleteMovieListInput): Promise<DeleteMovieListOutput> {
        // Verificar se a lista pertence ao usuário
        const movieList = await this.movieListGateway.findById(input.movieListId);
        if (!movieList) {
            throw new Error('Lista não encontrada');
        }
        if (movieList.getUserId() !== input.userId) {
            throw new Error('Você não tem permissão para deletar esta lista');
        }

        // Verificar se é a lista de favoritos (não pode ser deletada)
        if (movieList.getIsDefault()) {
            throw new Error('Não é possível deletar a lista de favoritos');
        }

        // Deletar a lista (os itens serão deletados automaticamente pelo repository)
        await this.movieListGateway.delete(input.movieListId);

        return { success: true };
    }
}

