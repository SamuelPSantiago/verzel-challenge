import { ApiProperty } from "@nestjs/swagger";

export class RemoveMovieFromListResponse {
    @ApiProperty()
    success: boolean;
}

