import { MovieList } from "../entities/movie-list/movie-list.entity";
import { MovieListItem } from "../entities/movie-list-item/movie-list-item.entity";

export abstract class MovieListGateway {
    abstract create(movieList: MovieList): Promise<void>;
    abstract findById(id: string): Promise<MovieList | null>;
    abstract findByUserId(userId: string): Promise<MovieList[]>;
    abstract findDefaultByUserId(userId: string): Promise<MovieList | null>;
    abstract createItem(item: MovieListItem): Promise<void>;
    abstract findItemByMovieListIdAndMovieId(movieListId: string, movieId: number): Promise<MovieListItem | null>;
    abstract findItemsByMovieListId(movieListId: string): Promise<MovieListItem[]>;
    abstract deleteItem(itemId: string): Promise<void>;
    abstract delete(id: string): Promise<void>;
}

