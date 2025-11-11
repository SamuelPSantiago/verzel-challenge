import { UserGateway } from "src/domain/repositories/user.gateway";
import { prismaClient } from "../client.prisma";
import { User } from "src/domain/entities/user/user.entity";
import { UserMapper } from "./model/user.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserPrismaRepository extends UserGateway {
    public constructor() {
        super();
    }

    public override async findByEmail(email: string): Promise<User | null> {
        const aModel = await prismaClient.user.findUnique({
            where: { email },
        });
        return aModel ? UserMapper.toEntity(aModel) : null;
    }

    public async findById(id: string): Promise<User | null> {
        const aModel = await prismaClient.user.findUnique({
            where: { id },
        });
        return aModel ? UserMapper.toEntity(aModel) : null;
    }

    public async create(user: User): Promise<void> {
        const aModel = UserMapper.toPrismaModel(user);
        await prismaClient.user.create({
            data: aModel,
        });
    }
}