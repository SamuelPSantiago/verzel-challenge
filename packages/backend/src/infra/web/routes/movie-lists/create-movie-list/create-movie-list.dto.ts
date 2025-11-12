import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieListRequest {
    @ApiProperty({ description: 'List name', example: 'Minha Lista' })
    name: string;
}

export class CreateMovieListResponse {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    isDefault: boolean;
}

