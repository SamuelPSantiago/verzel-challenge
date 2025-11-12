import { UseCase } from "src/usecases/usecase";
import { UserGateway } from "src/domain/repositories/user.gateway";
import { JwtService } from "src/infra/services/jwt/jwt.service";
import { CredentialsNotValidUsecaseException } from "../../exceptions/auth/credentials-not-valid.exception";
import { Injectable } from "@nestjs/common";

export type LoginUserInput = {
    email: string;
    password: string;
}

export type LoginUserOutput = {
    authToken: string;
    refreshToken: string;
}

@Injectable()
export class LoginUserUseCase implements UseCase<LoginUserInput, LoginUserOutput> {
    public constructor(
        private readonly userGateway: UserGateway,
        private readonly jwtService: JwtService
    ) {}

    public async execute(input: LoginUserInput): Promise<LoginUserOutput> {
        const user = await this.userGateway.findByEmail(input.email);
        if (!user) {
            throw new CredentialsNotValidUsecaseException(
                `User not found while logging in with email ${input.email} in ${LoginUserUseCase.name}`,
                `Credenciais inválidas`,
                LoginUserUseCase.name,
            );
        }

        const isPasswordValid = user.comparePassword(input.password);
        if (!isPasswordValid) {
            throw new CredentialsNotValidUsecaseException(
                `Passoword: ${input.password} is not valid for user with email ${input.email} and id ${user.getId()} in ${LoginUserUseCase.name}`,
                `Credenciais inválidas`,
                LoginUserUseCase.name,
            );
        }

        const authToken = this.jwtService.generateAuthToken(user.getId());
        const refreshToken = this.jwtService.generateRefreshToken(user.getId());

        return { authToken, refreshToken };
    }
}