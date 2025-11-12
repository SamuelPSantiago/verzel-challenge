import { ApiProperty } from "@nestjs/swagger";

export class LoginUserRequest {
    @ApiProperty({ description: 'The email of the user', example: 'john.doe@example.com' })
    email: string;

    @ApiProperty({ description: 'The password of the user', example: '12345678' })
    password: string;
}

export class LoginUserResponse {
    @ApiProperty({ description: 'The authentication token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' })
    authToken: string;

    @ApiProperty({ description: 'The refresh token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' })
    refreshToken: string;
}

