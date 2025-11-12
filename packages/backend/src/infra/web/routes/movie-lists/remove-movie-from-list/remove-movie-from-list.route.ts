import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Delete, Param } from "@nestjs/common";
import { RemoveMovieFromListResponse } from "./remove-movie-from-list.dto";
import { RemoveMovieFromListInput, RemoveMovieFromListUseCase } from "src/usecases/movie-lists/remove-movie-from-list/remove-movie-from-list.usecase";
import { RemoveMovieFromListPresenter } from "./remove-movie-from-list.presenter";
import { UserId } from "src/infra/web/auth/decorators/user-id.decorator";

@ApiTags('movie-lists')
@Controller('movie-lists')
export class RemoveMovieFromListRoute {
    public constructor(private readonly removeMovieFromListUseCase: RemoveMovieFromListUseCase) {}

    @Delete(':movieListId/movies/:movieId')
    @ApiBearerAuth('auth-token')
    @ApiOperation({ summary: 'Remove a movie from a list' })
    @ApiResponse({ status: 200, description: 'Movie removed from list successfully', type: RemoveMovieFromListResponse })
    public async handle(
        @Param('movieListId') movieListId: string,
        @Param('movieId') movieId: string,
        @UserId() userId: string,
    ): Promise<RemoveMovieFromListResponse> {
        const input: RemoveMovieFromListInput = {
            movieListId,
            movieId: parseInt(movieId, 10),
            userId,
        };
        const output = await this.removeMovieFromListUseCase.execute(input);
        return RemoveMovieFromListPresenter.toHttp(output);
    }
}

