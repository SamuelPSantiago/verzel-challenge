import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { LoginUserRequest, LoginUserResponse } from "./login-user.dto";
import { LoginUserInput, LoginUserUseCase } from "src/usecases/auth/login/login-user.usecase";
import { LoginUserPresenter } from "./login-user.presenter";
import { IsPublic } from "src/infra/web/auth/decorators/is-public.decorator";

@ApiTags('auth')
@Controller('auth')
export class LoginUserRoute {
    public constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

    @IsPublic()
    @Post('login')
    @HttpCode(200)
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'User logged in successfully', type: LoginUserResponse })
    @ApiResponse({ status: 400, description: 'Credentials not valid' })
    public async handle(@Body() request: LoginUserRequest): Promise<LoginUserResponse> {
        const input: LoginUserInput = {
            email: request.email,
            password: request.password,
        };
        const output = await this.loginUserUseCase.execute(input);
        return LoginUserPresenter.toHttp(output);
    }
}

