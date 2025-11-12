import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateMovieListRequest, CreateMovieListResponse } from "./create-movie-list.dto";
import { CreateMovieListInput, CreateMovieListUseCase } from "src/usecases/movie-lists/create-movie-list/create-movie-list.usecase";
import { CreateMovieListPresenter } from "./create-movie-list.presenter";
import { UserId } from "src/infra/web/auth/decorators/user-id.decorator";

@ApiTags('movie-lists')
@Controller('movie-lists')
export class CreateMovieListRoute {
    public constructor(private readonly createMovieListUseCase: CreateMovieListUseCase) {}

    @Post()
    @ApiBearerAuth('auth-token')
    @ApiOperation({ summary: 'Create a movie list' })
    @ApiResponse({ status: 201, description: 'Movie list created successfully', type: CreateMovieListResponse })
    public async handle(
        @Body() request: CreateMovieListRequest,
        @UserId() userId: string,
    ): Promise<CreateMovieListResponse> {
        const input: CreateMovieListInput = {
            userId,
            name: request.name,
        };
        const output = await this.createMovieListUseCase.execute(input);
        return CreateMovieListPresenter.toHttp(output);
    }
}

