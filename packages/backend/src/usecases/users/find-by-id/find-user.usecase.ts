import { UseCase } from "../../usecase";
import { UserGateway } from "src/domain/repositories/user.gateway";
import { UserNotFoundUsecaseException } from "../../exceptions/users/user-not-found.exception";
import { Injectable } from "@nestjs/common";

export type FindUserInput = {
    id: string;
}

export type FindUserOutput = {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

@Injectable()
export class FindUserUseCase implements UseCase<FindUserInput, FindUserOutput> {
    public constructor(private readonly userGateway: UserGateway) {}

    public async execute({ id }: FindUserInput): Promise<FindUserOutput> {
        const user = await this.userGateway.findById(id);
        if (!user) {
            throw new UserNotFoundUsecaseException(
                `User not found while finding user with id: ${id} in ${FindUserUseCase.name}`,
                `Usuário não encontrado`,
                FindUserUseCase.name,
            );
        }

        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt(),
        }
    }
}