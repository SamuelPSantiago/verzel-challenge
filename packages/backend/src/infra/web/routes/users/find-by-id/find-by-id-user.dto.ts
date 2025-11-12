import { ApiProperty } from "@nestjs/swagger";

export class FindByIdUserResponse {
    @ApiProperty({ description: 'The user id', example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ description: 'The user name', example: 'John Doe' })
    name: string;

    @ApiProperty({ description: 'The user email', example: 'john.doe@example.com' })
    email: string;

    @ApiProperty({ description: 'The user created at', example: '2021-01-01T00:00:00.000Z' })
    createdAt: Date;

    @ApiProperty({ description: 'The user updated at', example: '2021-01-01T00:00:00.000Z' })
    updatedAt: Date;
}