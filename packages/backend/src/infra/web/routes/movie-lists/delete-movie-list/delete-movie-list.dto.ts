import { ApiProperty } from "@nestjs/swagger";

export class DeleteMovieListResponse {
    @ApiProperty()
    success: boolean;
}

