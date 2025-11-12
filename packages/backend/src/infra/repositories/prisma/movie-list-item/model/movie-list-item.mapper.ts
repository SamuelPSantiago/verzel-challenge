import { MovieListItem } from "src/domain/entities/movie-list-item/movie-list-item.entity";
import PrismaMovieListItemModel from "./movie-list-item.prisma.model";

export class MovieListItemMapper {
    public static toPrismaModel(item: MovieListItem): PrismaMovieListItemModel {
        return {
            id: item.getId(),
            movieListId: item.getMovieListId(),
            movieId: item.getMovieId(),
            title: item.getTitle(),
            posterPath: item.getPosterPath(),
            releaseDate: item.getReleaseDate(),
            overview: item.getOverview(),
            createdAt: item.getCreatedAt(),
            updatedAt: item.getUpdatedAt(),
        };
    }

    public static toEntity(prismaMovieListItemModel: PrismaMovieListItemModel): MovieListItem {
        return MovieListItem.with({
            id: prismaMovieListItemModel.id,
            movieListId: prismaMovieListItemModel.movieListId,
            movieId: prismaMovieListItemModel.movieId,
            title: prismaMovieListItemModel.title,
            posterPath: prismaMovieListItemModel.posterPath,
            releaseDate: prismaMovieListItemModel.releaseDate,
            overview: prismaMovieListItemModel.overview,
            createdAt: prismaMovieListItemModel.createdAt,
            updatedAt: prismaMovieListItemModel.updatedAt,
        });
    }
}

