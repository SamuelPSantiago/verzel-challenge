import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Param, Post } from "@nestjs/common";
import { AddMovieToListRequest, AddMovieToListResponse } from "./add-movie-to-list.dto";
import { AddMovieToListInput, AddMovieToListUseCase } from "src/usecases/movie-lists/add-movie-to-list/add-movie-to-list.usecase";
import { AddMovieToListPresenter } from "./add-movie-to-list.presenter";
import { UserId } from "src/infra/web/auth/decorators/user-id.decorator";

@ApiTags('movie-lists')
@Controller('movie-lists')
export class AddMovieToListRoute {
    public constructor(private readonly addMovieToListUseCase: AddMovieToListUseCase) {}

    @Post(':movieListId/movies')
    @ApiBearerAuth('auth-token')
    @ApiOperation({ summary: 'Add a movie to a list' })
    @ApiResponse({ status: 201, description: 'Movie added to list successfully', type: AddMovieToListResponse })
    public async handle(
        @Param('movieListId') movieListId: string,
        @Body() request: AddMovieToListRequest,
        @UserId() userId: string,
    ): Promise<AddMovieToListResponse> {
        const input: AddMovieToListInput = {
            movieListId,
            movieId: request.movieId,
            userId,
        };
        const output = await this.addMovieToListUseCase.execute(input);
        return AddMovieToListPresenter.toHttp(output);
    }
}

