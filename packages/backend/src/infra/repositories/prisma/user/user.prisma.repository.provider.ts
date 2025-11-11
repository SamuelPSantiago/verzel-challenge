import { UserGateway } from "src/domain/repositories/user.gateway";
import { UserPrismaRepository } from "./user.prisma.repository";

export const userPrismaRepositoryProvider = {
    provide: UserGateway,
    useClass: UserPrismaRepository,
};