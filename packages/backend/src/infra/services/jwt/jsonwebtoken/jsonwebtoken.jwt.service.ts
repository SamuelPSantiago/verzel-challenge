import jwt from 'jsonwebtoken';
import { Injectable } from "@nestjs/common";
import { ServiceException } from "../../exceptions/service.exception";
import { JwtService, JwtAuthPayload, JwtRefreshPayload, GenerateAuthTokenWithRefreshTokenOutput } from "../jwt.service";
import { RefreshTokenNotValidServiceException } from "../../exceptions/refresh-token-not-valid.service.exception";
import { AuthTokenNotValidServiceException } from "../../exceptions/auth-token-not-valid.service.exception";

@Injectable()
export class JsonwebtokenJwtService extends JwtService {
    private authSecret: string;
    private refreshSecret: string;

    public constructor() {
        super();

        if (!process.env.JWT_AUTH_SECRET || !process.env.JWT_REFRESH_SECRET) {
            throw new ServiceException(
                `JWT_AUTH_SECRET or JWT_REFRESH_SECRET is not set in the environment variables while initializing ${JsonwebtokenJwtService.name}`,
                `Houve um erro interno, tente novamente mais tarde.`,
                JsonwebtokenJwtService.name,
            );
        }

        this.authSecret = process.env.JWT_AUTH_SECRET;
        this.refreshSecret = process.env.JWT_REFRESH_SECRET;
    }

    public generateAuthToken(userId: string): string {
        const payload = this.generateAuthTokenPayload(userId);
        return jwt.sign(payload, this.authSecret, { expiresIn: '1h' });
    }

    private generateAuthTokenPayload(userId: string): JwtAuthPayload {
        const payload: JwtAuthPayload = {
            userId
        };

        return payload;
    }

    public generateRefreshToken(userId: string): string {
        const payload = this.generateRefreshTokenPayload(userId);
        return jwt.sign(payload, this.refreshSecret, { expiresIn: '7d' });
    }

    private generateRefreshTokenPayload(userId: string): JwtRefreshPayload {
        const payload: JwtRefreshPayload = {
            userId
        };

        return payload;
    }

    public generateAuthTokenFromRefreshToken(refreshToken: string): GenerateAuthTokenWithRefreshTokenOutput {
        try {
            const payload = jwt.verify(refreshToken, this.refreshSecret) as JwtRefreshPayload;

            const userId = payload.userId;
            const authToken = this.generateAuthToken(userId);

            return {
                authToken,
                userId
            };
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new RefreshTokenNotValidServiceException(
                    `Refresh token ${refreshToken} expired while refreshing auth token in ${JsonwebtokenJwtService.name}`,
                    `Credenciais inválidas, faça login novamente.`,
                    JsonwebtokenJwtService.name,
                );
            }

            throw new RefreshTokenNotValidServiceException(
                `Refresh token ${refreshToken} not valid while refreshing auth token in ${JsonwebtokenJwtService.name}`,
                `Credenciais inválidas, faça login novamente.`,
                JsonwebtokenJwtService.name,
            );
        }
    }

    public verifyAuthToken(authToken: string): JwtAuthPayload {
        try {
            const payload = jwt.verify(authToken, this.authSecret) as JwtAuthPayload;
            return payload;
        } catch (error) {
            throw new AuthTokenNotValidServiceException(
                `Auth token ${authToken} not valid while verifying in ${JsonwebtokenJwtService.name}`,
                `Credenciais inválidas, faça login novamente.`,
                JsonwebtokenJwtService.name,
            );
        }
    }
}