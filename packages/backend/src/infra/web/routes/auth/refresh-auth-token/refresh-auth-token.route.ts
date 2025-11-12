import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { RefreshAuthTokenInput, RefreshAuthTokenUserUseCase } from "src/usecases/auth/refresh-auth-token/refresh-auth-token-user.usecase";
import { RefreshAuthTokenRequest, RefreshAuthTokenResponse } from "./refresh-auth-token.dto";
import { RefreshAuthTokenPresenter } from "./refresh-auth-token.presenter";
import { IsPublic } from "src/infra/web/auth/decorators/is-public.decorator";

@ApiTags('auth')
@Controller('auth')
export class RefreshAuthTokenRoute {
    public constructor(private readonly refreshAuthTokenUseCase: RefreshAuthTokenUserUseCase) {}

    @IsPublic()
    @Post('refresh')
    @HttpCode(200)
    @ApiOperation({ summary: 'Refresh the authentication token' })
    @ApiResponse({ status: 200, description: 'The authentication token has been refreshed', type: RefreshAuthTokenResponse })
    @ApiResponse({ status: 400, description: 'The request is invalid' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    public async handle(@Body() request: RefreshAuthTokenRequest): Promise<RefreshAuthTokenResponse> {
        const input: RefreshAuthTokenInput = {
            refreshToken: request.refreshToken,
        };

        const output = await this.refreshAuthTokenUseCase.execute(input);
        return RefreshAuthTokenPresenter.toHttp(output);
    }
}

