import { ApiProperty } from "@nestjs/swagger";

export class AddMovieToListRequest {
    @ApiProperty({ description: 'Movie ID from TMDb', example: 550 })
    movieId: number;
}

export class AddMovieToListResponse {
    @ApiProperty()
    id: string;

    @ApiProperty()
    movieId: number;

    @ApiProperty()
    title: string;
}

