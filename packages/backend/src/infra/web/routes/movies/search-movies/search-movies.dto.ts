import { ApiProperty } from "@nestjs/swagger";

export class SearchMoviesRequest {
    @ApiProperty({ description: 'Search query', example: 'The Matrix' })
    query: string;

    @ApiProperty({ description: 'Page number', example: 1, required: false })
    page?: number;
}

export class TmdbMovieResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty({ nullable: true })
    poster_path: string | null;

    @ApiProperty({ nullable: true })
    release_date: string | null;

    @ApiProperty({ nullable: true })
    overview: string | null;

    @ApiProperty({ nullable: true })
    backdrop_path: string | null;

    @ApiProperty()
    vote_average: number;

    @ApiProperty()
    vote_count: number;
}

export class SearchMoviesResponse {
    @ApiProperty()
    page: number;

    @ApiProperty({ type: [TmdbMovieResponse] })
    results: TmdbMovieResponse[];

    @ApiProperty()
    total_pages: number;

    @ApiProperty()
    total_results: number;
}

