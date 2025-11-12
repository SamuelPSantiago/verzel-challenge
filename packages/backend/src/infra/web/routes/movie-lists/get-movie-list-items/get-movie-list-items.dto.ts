import { ApiProperty } from "@nestjs/swagger";

export class MovieListItemResponse {
    @ApiProperty()
    id: string;

    @ApiProperty()
    movieId: number;

    @ApiProperty()
    title: string;

    @ApiProperty({ nullable: true })
    posterPath: string | null;

    @ApiProperty({ nullable: true })
    releaseDate: string | null;

    @ApiProperty({ nullable: true })
    overview: string | null;
}

export class GetMovieListItemsResponse {
    @ApiProperty({ type: [MovieListItemResponse] })
    items: MovieListItemResponse[];
}

