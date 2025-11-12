import { Controller, Post, Body } from "@nestjs/common";
import { RegisterUserUseCase } from "src/usecases/auth/register/register-user.usecase";
import { RegisterRequest, RegisterResponse } from "./register.dto";
import { RegisterPresenter } from "./register.presenter";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { IsPublic } from "src/infra/web/auth/decorators/is-public.decorator";

@ApiTags('auth')
@Controller('auth')
export class RegisterRoute {
    public constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

    @IsPublic()
    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully', type: RegisterResponse })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    public async handle(@Body() request: RegisterRequest): Promise<RegisterResponse> {
        const result = await this.registerUserUseCase.execute(request);
        return RegisterPresenter.toHttp(result);
    }
}

