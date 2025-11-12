import { UseCase } from "src/usecases/usecase";
import { MovieListGateway } from "src/domain/repositories/movie-list.gateway";
import { MovieListItem } from "src/domain/entities/movie-list-item/movie-list-item.entity";
import { Injectable } from "@nestjs/common";
import { TmdbService } from "src/infra/services/tmdb/tmdb.service";

export type AddMovieToListInput = {
    movieListId: string;
    movieId: number;
    userId: string;
}

export type AddMovieToListOutput = {
    id: string;
    movieId: number;
    title: string;
}

@Injectable()
export class AddMovieToListUseCase implements UseCase<AddMovieToListInput, AddMovieToListOutput> {
    public constructor(
        private readonly movieListGateway: MovieListGateway,
        private readonly tmdbService: TmdbService,
    ) {}

    public async execute(input: AddMovieToListInput): Promise<AddMovieToListOutput> {
        // Verificar se a lista pertence ao usuário
        const movieList = await this.movieListGateway.findById(input.movieListId);
        if (!movieList) {
            throw new Error('Lista não encontrada');
        }
        if (movieList.getUserId() !== input.userId) {
            throw new Error('Você não tem permissão para adicionar filmes a esta lista');
        }

        // Verificar se o filme já está na lista
        const existingItem = await this.movieListGateway.findItemByMovieListIdAndMovieId(
            input.movieListId,
            input.movieId
        );
        if (existingItem) {
            throw new Error('Este filme já está na lista');
        }

        // Buscar detalhes do filme na TMDb
        const movieDetails = await this.tmdbService.getMovieDetails(input.movieId);

        // Criar o item da lista
        const item = MovieListItem.create({
            movieListId: input.movieListId,
            movieId: input.movieId,
            title: movieDetails.title,
            posterPath: movieDetails.poster_path,
            releaseDate: movieDetails.release_date,
            overview: movieDetails.overview,
        });

        await this.movieListGateway.createItem(item);

        return {
            id: item.getId(),
            movieId: item.getMovieId(),
            title: item.getTitle(),
        };
    }
}

