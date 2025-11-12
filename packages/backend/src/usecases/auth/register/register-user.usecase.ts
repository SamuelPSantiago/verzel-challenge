import { User } from "src/domain/entities/user/user.entity";
import { UserGateway } from "src/domain/repositories/user.gateway";
import { MovieListGateway } from "src/domain/repositories/movie-list.gateway";
import { MovieList } from "src/domain/entities/movie-list/movie-list.entity";
import { UseCase } from "src/usecases/usecase";
import { EmailAlreadyExistUsecaseException } from "../../exceptions/auth/email-already-exist.exception";
import { Injectable } from "@nestjs/common";

export type RegisterUserInput = {
    name: string;
    email: string;
    password: string;
}

export type RegisterUserOutput = {
    id: string;
}

@Injectable()
export class RegisterUserUseCase implements UseCase<RegisterUserInput, RegisterUserOutput> {
    public constructor(
        private readonly userGateway: UserGateway,
        private readonly movieListGateway: MovieListGateway,
    ) {}

    public async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
        const existingUser = await this.userGateway.findByEmail(input.email);
        if (existingUser) {
            throw new EmailAlreadyExistUsecaseException(
                `Email already exists while creating user with email: ${input.email} in ${RegisterUserUseCase.name}`,
                `O e-mail já está sendo utilizado`,
                RegisterUserUseCase.name,
            );
        }

        const newUser = User.create(input);

        await this.userGateway.create(newUser);

        // Criar lista de favoritos padrão
        const favoritesList = MovieList.create({
            userId: newUser.getId(),
            name: 'Favoritos',
            isDefault: true,
        });

        await this.movieListGateway.create(favoritesList);

        return { id: newUser.getId() };
    }
}