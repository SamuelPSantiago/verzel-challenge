import { Injectable } from "@nestjs/common";
import { ServiceException } from "../../exceptions/service.exception";
import { TmdbService, TmdbMovie, TmdbSearchResponse, TmdbMovieDetails } from "../tmdb.service";

@Injectable()
export class TmdbApiService extends TmdbService {
    private readonly baseUrl = 'https://api.themoviedb.org/3';
    private readonly apiKey: string;

    public constructor() {
        super();

        if (!process.env.TMDB_API_KEY) {
            throw new ServiceException(
                `TMDB_API_KEY is not set in the environment variables while initializing ${TmdbApiService.name}`,
                `Houve um erro interno, tente novamente mais tarde.`,
                TmdbApiService.name,
            );
        }

        this.apiKey = process.env.TMDB_API_KEY;
    }

    private async fetchFromTmdb<T>(endpoint: string): Promise<T> {
        const url = `${this.baseUrl}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${this.apiKey}`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new ServiceException(
                    `TMDB API returned status ${response.status} for endpoint ${endpoint} in ${TmdbApiService.name}`,
                    `Erro ao buscar informações dos filmes. Tente novamente mais tarde.`,
                    TmdbApiService.name,
                );
            }

            return await response.json();
        } catch (error) {
            if (error instanceof ServiceException) {
                throw error;
            }
            
            throw new ServiceException(
                `Error fetching from TMDB API: ${error instanceof Error ? error.message : 'Unknown error'} in ${TmdbApiService.name}`,
                `Erro ao buscar informações dos filmes. Tente novamente mais tarde.`,
                TmdbApiService.name,
            );
        }
    }

    public async searchMovies(query: string, page: number = 1): Promise<TmdbSearchResponse> {
        const encodedQuery = encodeURIComponent(query);
        return this.fetchFromTmdb<TmdbSearchResponse>(`/search/movie?query=${encodedQuery}&page=${page}`);
    }

    public async getPopularMovies(page: number = 1): Promise<TmdbSearchResponse> {
        return this.fetchFromTmdb<TmdbSearchResponse>(`/movie/popular?page=${page}`);
    }

    public async getMovieDetails(movieId: number): Promise<TmdbMovieDetails> {
        return this.fetchFromTmdb<TmdbMovieDetails>(`/movie/${movieId}`);
    }
}

