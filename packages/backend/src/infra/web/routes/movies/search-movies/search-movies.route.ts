import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Query } from "@nestjs/common";
import { SearchMoviesRequest, SearchMoviesResponse } from "./search-movies.dto";
import { SearchMoviesInput, SearchMoviesUseCase } from "src/usecases/movies/search-movies/search-movies.usecase";
import { SearchMoviesPresenter } from "./search-movies.presenter";
import { IsPublic } from "src/infra/web/auth/decorators/is-public.decorator";

@ApiTags('movies')
@Controller('movies')
export class SearchMoviesRoute {
    public constructor(private readonly searchMoviesUseCase: SearchMoviesUseCase) {}

    @IsPublic()
    @Get('search')
    @ApiOperation({ summary: 'Search movies' })
    @ApiResponse({ status: 200, description: 'Movies found successfully', type: SearchMoviesResponse })
    public async handle(@Query() request: SearchMoviesRequest): Promise<SearchMoviesResponse> {
        const input: SearchMoviesInput = {
            query: request.query,
            page: request.page,
        };
        const output = await this.searchMoviesUseCase.execute(input);
        return SearchMoviesPresenter.toHttp(output);
    }
}

