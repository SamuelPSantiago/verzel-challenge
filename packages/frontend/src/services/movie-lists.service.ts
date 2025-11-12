import { api } from './api';

export interface MovieList {
  id: string;
  name: string;
  isDefault: boolean;
  createdAt: string;
}

export interface MovieListItem {
  id: string;
  movieId: number;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  overview: string | null;
}

export const movieListsService = {
  async getLists(): Promise<{ lists: MovieList[] }> {
    return api.get<{ lists: MovieList[] }>('/movie-lists');
  },

  async createList(name: string): Promise<{ id: string; name: string; isDefault: boolean }> {
    return api.post<{ id: string; name: string; isDefault: boolean }>('/movie-lists', { name });
  },

  async getListItems(movieListId: string): Promise<{ items: MovieListItem[] }> {
    return api.get<{ items: MovieListItem[] }>(`/movie-lists/${movieListId}/movies`);
  },

  async addMovieToList(movieListId: string, movieId: number): Promise<{ id: string; movieId: number; title: string }> {
    return api.post<{ id: string; movieId: number; title: string }>(`/movie-lists/${movieListId}/movies`, { movieId });
  },

  async removeMovieFromList(movieListId: string, movieId: number): Promise<{ success: boolean }> {
    return api.delete<{ success: boolean }>(`/movie-lists/${movieListId}/movies/${movieId}`);
  },

  async deleteList(movieListId: string): Promise<{ success: boolean }> {
    return api.delete<{ success: boolean }>(`/movie-lists/${movieListId}`);
  },
};

