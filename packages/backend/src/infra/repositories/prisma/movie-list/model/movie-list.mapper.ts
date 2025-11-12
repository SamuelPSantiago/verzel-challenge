import { MovieList } from "src/domain/entities/movie-list/movie-list.entity";
import PrismaMovieListModel from "./movie-list.prisma.model";

export class MovieListMapper {
    public static toPrismaModel(movieList: MovieList): PrismaMovieListModel {
        return {
            id: movieList.getId(),
            userId: movieList.getUserId(),
            name: movieList.getName(),
            isDefault: movieList.getIsDefault(),
            createdAt: movieList.getCreatedAt(),
            updatedAt: movieList.getUpdatedAt(),
        };
    }

    public static toEntity(prismaMovieListModel: PrismaMovieListModel): MovieList {
        return MovieList.with({
            id: prismaMovieListModel.id,
            userId: prismaMovieListModel.userId,
            name: prismaMovieListModel.name,
            isDefault: prismaMovieListModel.isDefault,
            createdAt: prismaMovieListModel.createdAt,
            updatedAt: prismaMovieListModel.updatedAt,
        });
    }
}

