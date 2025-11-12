import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Query } from "@nestjs/common";
import { GetPopularMoviesRequest, SearchMoviesResponse } from "./get-popular-movies.dto";
import { GetPopularMoviesInput, GetPopularMoviesUseCase } from "src/usecases/movies/get-popular-movies/get-popular-movies.usecase";
import { GetPopularMoviesPresenter } from "./get-popular-movies.presenter";
import { IsPublic } from "src/infra/web/auth/decorators/is-public.decorator";

@ApiTags('movies')
@Controller('movies')
export class GetPopularMoviesRoute {
    public constructor(private readonly getPopularMoviesUseCase: GetPopularMoviesUseCase) {}

    @IsPublic()
    @Get('popular')
    @ApiOperation({ summary: 'Get popular movies' })
    @ApiResponse({ status: 200, description: 'Popular movies retrieved successfully', type: SearchMoviesResponse })
    public async handle(@Query() request: GetPopularMoviesRequest): Promise<SearchMoviesResponse> {
        const input: GetPopularMoviesInput = {
            page: request.page,
        };
        const output = await this.getPopularMoviesUseCase.execute(input);
        return GetPopularMoviesPresenter.toHttp(output);
    }
}

