import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";
import { GetUserMovieListsResponse } from "./get-user-movie-lists.dto";
import { GetUserMovieListsInput, GetUserMovieListsUseCase } from "src/usecases/movie-lists/get-user-movie-lists/get-user-movie-lists.usecase";
import { GetUserMovieListsPresenter } from "./get-user-movie-lists.presenter";
import { UserId } from "src/infra/web/auth/decorators/user-id.decorator";

@ApiTags('movie-lists')
@Controller('movie-lists')
export class GetUserMovieListsRoute {
    public constructor(private readonly getUserMovieListsUseCase: GetUserMovieListsUseCase) {}

    @Get()
    @ApiBearerAuth('auth-token')
    @ApiOperation({ summary: 'Get user movie lists' })
    @ApiResponse({ status: 200, description: 'Movie lists retrieved successfully', type: GetUserMovieListsResponse })
    public async handle(@UserId() userId: string): Promise<GetUserMovieListsResponse> {
        const input: GetUserMovieListsInput = {
            userId,
        };
        const output = await this.getUserMovieListsUseCase.execute(input);
        return GetUserMovieListsPresenter.toHttp(output);
    }
}

