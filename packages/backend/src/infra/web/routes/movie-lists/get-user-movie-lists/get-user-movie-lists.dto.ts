import { ApiProperty } from "@nestjs/swagger";

export class MovieListResponse {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    isDefault: boolean;

    @ApiProperty()
    createdAt: Date;
}

export class GetUserMovieListsResponse {
    @ApiProperty({ type: [MovieListResponse] })
    lists: MovieListResponse[];
}

