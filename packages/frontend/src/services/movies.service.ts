import { api } from './api';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const moviesService = {
  async search(query: string, page: number = 1): Promise<MoviesResponse> {
    return api.get<MoviesResponse>(`/movies/search?query=${encodeURIComponent(query)}&page=${page}`);
  },

  async getPopular(page: number = 1): Promise<MoviesResponse> {
    return api.get<MoviesResponse>(`/movies/popular?page=${page}`);
  },
};

