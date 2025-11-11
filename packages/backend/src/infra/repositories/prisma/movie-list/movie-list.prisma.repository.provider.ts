import { MovieListGateway } from "src/domain/repositories/movie-list.gateway";
import { MovieListPrismaRepository } from "./movie-list.prisma.repository";

export const movieListPrismaRepositoryProvider = {
    provide: MovieListGateway,
    useClass: MovieListPrismaRepository,
};

