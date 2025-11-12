import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindByIdUserResponse } from "./find-by-id-user.dto";
import { FindByIdUserPresenter } from "./find-by-id-user.presenter";
import { FindUserInput, FindUserUseCase } from "src/usecases/users/find-by-id/find-user.usecase";
import { UserId } from "src/infra/web/auth/decorators/user-id.decorator";

@ApiTags('users')
@Controller('users')
export class FindByIdUserRoute {
    public constructor(private readonly findUserUseCase: FindUserUseCase) {}

    @Get('me')
    @ApiBearerAuth('auth-token')
    @ApiOperation({ summary: 'Find a user by id' })
    @ApiResponse({ status: 200, description: 'User found successfully', type: FindByIdUserResponse })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    public async handle(@UserId() userId: string): Promise<FindByIdUserResponse> {
        const input: FindUserInput = { id: userId };
        const output = await this.findUserUseCase.execute(input);
        return FindByIdUserPresenter.toHttp(output);
    }
}