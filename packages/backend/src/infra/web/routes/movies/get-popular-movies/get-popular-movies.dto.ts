import { ApiProperty } from "@nestjs/swagger";
import { TmdbMovieResponse, SearchMoviesResponse } from "../search-movies/search-movies.dto";

export class GetPopularMoviesRequest {
    @ApiProperty({ description: 'Page number', example: 1, required: false })
    page?: number;
}

export { SearchMoviesResponse, TmdbMovieResponse };

