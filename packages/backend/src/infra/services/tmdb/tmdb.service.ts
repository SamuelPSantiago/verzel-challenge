export type TmdbMovie = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string | null;
    overview: string | null;
    backdrop_path: string | null;
    vote_average: number;
    vote_count: number;
}

export type TmdbSearchResponse = {
    page: number;
    results: TmdbMovie[];
    total_pages: number;
    total_results: number;
}

export type TmdbMovieDetails = TmdbMovie & {
    genres: Array<{ id: number; name: string }>;
    runtime: number | null;
    budget: number;
    revenue: number;
}

export abstract class TmdbService {
    public abstract searchMovies(query: string, page?: number): Promise<TmdbSearchResponse>;
    public abstract getPopularMovies(page?: number): Promise<TmdbSearchResponse>;
    public abstract getMovieDetails(movieId: number): Promise<TmdbMovieDetails>;
}

