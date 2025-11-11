import { MovieListGateway } from "src/domain/repositories/movie-list.gateway";
import { prismaClient } from "../client.prisma";
import { MovieList } from "src/domain/entities/movie-list/movie-list.entity";
import { MovieListItem } from "src/domain/entities/movie-list-item/movie-list-item.entity";
import { MovieListMapper } from "./model/movie-list.mapper";
import { MovieListItemMapper } from "../movie-list-item/model/movie-list-item.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MovieListPrismaRepository extends MovieListGateway {
    public constructor() {
        super();
    }

    public override async create(movieList: MovieList): Promise<void> {
        const aModel = MovieListMapper.toPrismaModel(movieList);
        await prismaClient.movieList.create({
            data: aModel,
        });
    }

    public async findById(id: string): Promise<MovieList | null> {
        const aModel = await prismaClient.movieList.findUnique({
            where: { id },
        });
        return aModel ? MovieListMapper.toEntity(aModel) : null;
    }

    public async findByUserId(userId: string): Promise<MovieList[]> {
        const models = await prismaClient.movieList.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        return models.map(model => MovieListMapper.toEntity(model));
    }

    public async findDefaultByUserId(userId: string): Promise<MovieList | null> {
        const aModel = await prismaClient.movieList.findFirst({
            where: { 
                userId,
                isDefault: true,
            },
        });
        return aModel ? MovieListMapper.toEntity(aModel) : null;
    }

    public async createItem(item: MovieListItem): Promise<void> {
        const aModel = MovieListItemMapper.toPrismaModel(item);
        await prismaClient.movieListItem.create({
            data: aModel,
        });
    }

    public async findItemByMovieListIdAndMovieId(movieListId: string, movieId: number): Promise<MovieListItem | null> {
        const aModel = await prismaClient.movieListItem.findUnique({
            where: {
                movieListId_movieId: {
                    movieListId,
                    movieId,
                },
            },
        });
        return aModel ? MovieListItemMapper.toEntity(aModel) : null;
    }

    public async findItemsByMovieListId(movieListId: string): Promise<MovieListItem[]> {
        const models = await prismaClient.movieListItem.findMany({
            where: { movieListId },
            orderBy: { createdAt: 'desc' },
        });
        return models.map(model => MovieListItemMapper.toEntity(model));
    }

    public async deleteItem(itemId: string): Promise<void> {
        await prismaClient.movieListItem.delete({
            where: { id: itemId },
        });
    }

    public async delete(id: string): Promise<void> {
        // Primeiro deleta todos os itens da lista (devido à constraint de foreign key)
        await prismaClient.movieListItem.deleteMany({
            where: { movieListId: id },
        });
        // Depois deleta a lista
        await prismaClient.movieList.delete({
            where: { id },
        });
    }
}

