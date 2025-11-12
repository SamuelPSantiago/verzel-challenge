import { User } from "src/domain/entities/user/user.entity";
import PrismaUserModel from "./user.prisma.model";

export class UserMapper {
    public static toPrismaModel(user: User): PrismaUserModel {
        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt(),
        };
    }

    public static toEntity(prismaUserModel: PrismaUserModel): User {
        return User.with({
            id: prismaUserModel.id,
            name: prismaUserModel.name,
            email: prismaUserModel.email,
            password: prismaUserModel.password,
            createdAt: prismaUserModel.createdAt,
            updatedAt: prismaUserModel.updatedAt,
        });
    }
}