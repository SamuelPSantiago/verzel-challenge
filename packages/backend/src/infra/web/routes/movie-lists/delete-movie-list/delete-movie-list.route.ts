import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Delete, Param } from "@nestjs/common";
import { DeleteMovieListResponse } from "./delete-movie-list.dto";
import { DeleteMovieListInput, DeleteMovieListUseCase } from "src/usecases/movie-lists/delete-movie-list/delete-movie-list.usecase";
import { DeleteMovieListPresenter } from "./delete-movie-list.presenter";
import { UserId } from "src/infra/web/auth/decorators/user-id.decorator";

@ApiTags('movie-lists')
@Controller('movie-lists')
export class DeleteMovieListRoute {
    public constructor(private readonly deleteMovieListUseCase: DeleteMovieListUseCase) {}

    @Delete(':movieListId')
    @ApiBearerAuth('auth-token')
    @ApiOperation({ summary: 'Delete a movie list' })
    @ApiResponse({ status: 200, description: 'Movie list deleted successfully', type: DeleteMovieListResponse })
    public async handle(
        @Param('movieListId') movieListId: string,
        @UserId() userId: string,
    ): Promise<DeleteMovieListResponse> {
        const input: DeleteMovieListInput = {
            movieListId,
            userId,
        };
        const output = await this.deleteMovieListUseCase.execute(input);
        return DeleteMovieListPresenter.toHttp(output);
    }
}

