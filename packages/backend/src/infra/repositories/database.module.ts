import { Module } from "@nestjs/common";
import { userPrismaRepositoryProvider } from "./prisma/user/user.prisma.repository.provider";
import { movieListPrismaRepositoryProvider } from "./prisma/movie-list/movie-list.prisma.repository.provider";

@Module({
    imports: [],
    providers: [
        userPrismaRepositoryProvider,
        movieListPrismaRepositoryProvider,
    ],
    exports: [
        userPrismaRepositoryProvider,
        movieListPrismaRepositoryProvider,
    ],
})
export class DatabaseModule {}