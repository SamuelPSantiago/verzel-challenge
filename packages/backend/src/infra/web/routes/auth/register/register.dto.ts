import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
    @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
    name: string;

    @ApiProperty({ description: 'The email of the user', example: 'john.doe@example.com' })
    email: string;

    @ApiProperty({ description: 'The password of the user', example: '12345678' })
    password: string;
}

export class RegisterResponse {
    @ApiProperty({ description: 'Created user id', example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;
}

