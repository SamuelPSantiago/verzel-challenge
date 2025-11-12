import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param } from "@nestjs/common";
import { GetMovieListItemsResponse } from "./get-movie-list-items.dto";
import { GetMovieListItemsInput, GetMovieListItemsUseCase } from "src/usecases/movie-lists/get-movie-list-items/get-movie-list-items.usecase";
import { GetMovieListItemsPresenter } from "./get-movie-list-items.presenter";
import { UserId } from "src/infra/web/auth/decorators/user-id.decorator";

@ApiTags('movie-lists')
@Controller('movie-lists')
export class GetMovieListItemsRoute {
    public constructor(private readonly getMovieListItemsUseCase: GetMovieListItemsUseCase) {}

    @Get(':movieListId/movies')
    @ApiBearerAuth('auth-token')
    @ApiOperation({ summary: 'Get movies from a list' })
    @ApiResponse({ status: 200, description: 'Movies retrieved successfully', type: GetMovieListItemsResponse })
    public async handle(
        @Param('movieListId') movieListId: string,
        @UserId() userId: string,
    ): Promise<GetMovieListItemsResponse> {
        const input: GetMovieListItemsInput = {
            movieListId,
            userId,
        };
        const output = await this.getMovieListItemsUseCase.execute(input);
        return GetMovieListItemsPresenter.toHttp(output);
    }
}

