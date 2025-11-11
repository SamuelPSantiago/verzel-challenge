import { Entity } from "../../shared/entities/entity";
import { Utils } from "../../../shared/utils/utils";

export type MovieListItemCreateDto = {
    movieListId: string;
    movieId: number;
    title: string;
    posterPath?: string | null;
    releaseDate?: string | null;
    overview?: string | null;
}

export type MovieListItemWithDto = {
    id: string;
    movieListId: string;
    movieId: number;
    title: string;
    posterPath?: string | null;
    releaseDate?: string | null;
    overview?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export class MovieListItem extends Entity {
    private constructor(
        id: string,
        private movieListId: string,
        private movieId: number,
        private title: string,
        private posterPath: string | null,
        private releaseDate: string | null,
        private overview: string | null,
        createdAt: Date,
        updatedAt: Date,
    ) {
        super(id, createdAt, updatedAt);
        this.validate();
    }

    public static create(dto: MovieListItemCreateDto): MovieListItem {
        const id = Utils.generateUUID();

        return new MovieListItem(
            id,
            dto.movieListId,
            dto.movieId,
            dto.title,
            dto.posterPath ?? null,
            dto.releaseDate ?? null,
            dto.overview ?? null,
            new Date(),
            new Date(),
        );
    }

    public static with(dto: MovieListItemWithDto): MovieListItem {
        return new MovieListItem(
            dto.id,
            dto.movieListId,
            dto.movieId,
            dto.title,
            dto.posterPath ?? null,
            dto.releaseDate ?? null,
            dto.overview ?? null,
            dto.createdAt,
            dto.updatedAt,
        );
    }

    protected validate(): void {
        if (!this.movieListId || this.movieListId.trim() === '') {
            throw new Error('Movie list ID is required');
        }
        if (!this.movieId || this.movieId <= 0) {
            throw new Error('Movie ID is required and must be positive');
        }
        if (!this.title || this.title.trim() === '') {
            throw new Error('Movie title is required');
        }
    }

    public getMovieListId = (): string => this.movieListId;
    public getMovieId = (): number => this.movieId;
    public getTitle = (): string => this.title;
    public getPosterPath = (): string | null => this.posterPath;
    public getReleaseDate = (): string | null => this.releaseDate;
    public getOverview = (): string | null => this.overview;
}

