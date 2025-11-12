import { JwtService } from "src/infra/services/jwt/jwt.service";
import { UseCase } from "src/usecases/usecase";
import { UserGateway } from "src/domain/repositories/user.gateway";
import { CredentialsNotValidUsecaseException } from "../../exceptions/auth/credentials-not-valid.exception";
import { Injectable } from "@nestjs/common";

export type RefreshAuthTokenInput = {
    refreshToken: string;
}

export type RefreshAuthTokenOutput = {
    authToken: string;
}

@Injectable()
export class RefreshAuthTokenUserUseCase implements UseCase<RefreshAuthTokenInput, RefreshAuthTokenOutput> {
    public constructor(
        private readonly jwtService: JwtService,
        private readonly userGateway: UserGateway
    ) {}

    public async execute(input: RefreshAuthTokenInput): Promise<RefreshAuthTokenOutput> {
        try {
        	const { authToken, userId } = this.jwtService.generateAuthTokenFromRefreshToken(input.refreshToken);

        	const user = await this.userGateway.findById(userId);
        	if (!user) {
        		throw new CredentialsNotValidUsecaseException(
        			`User with id ${userId} not found while refreshing auth token with refresh token: ${input.refreshToken} in ${RefreshAuthTokenUserUseCase.name}`,
        			`Usuário não encontrado`,
        			RefreshAuthTokenUserUseCase.name,
        		);
        	}

        	return { authToken };
        } catch (error) {
        	throw new CredentialsNotValidUsecaseException(
        		`Invalid refresh token while refreshing auth token with refresh token: ${input.refreshToken} in ${RefreshAuthTokenUserUseCase.name}`,
        		`Token de atualização inválido`,
        		RefreshAuthTokenUserUseCase.name,
        	);
        }
    }
}