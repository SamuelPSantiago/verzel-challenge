import { User } from "src/domain/entities/user/user.entity";
import { UserGateway } from "src/domain/repositories/user.gateway";
import { JwtService } from "src/infra/services/jwt/jwt.service";
import { RefreshAuthTokenUserUseCase, RefreshAuthTokenInput } from "./refresh-auth-token-user.usecase";
import { CredentialsNotValidUsecaseException } from "../../exceptions/auth/credentials-not-valid.exception";

describe('UseCase > Auth > RefreshAuthTokenUserUseCase', () => {
    let refreshAuthTokenUserUseCase: RefreshAuthTokenUserUseCase;
    let jwtServiceMock: jest.Mocked<JwtService>;
    let userGatewayMock: jest.Mocked<UserGateway>;

    beforeEach(() => {
        jwtServiceMock = {
            generateAuthToken: jest.fn(),
            generateRefreshToken: jest.fn(),
            generateAuthTokenFromRefreshToken: jest.fn(),
            verifyAuthToken: jest.fn(),
        } as jest.Mocked<JwtService>;

        userGatewayMock = {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
        } as jest.Mocked<UserGateway>;

        refreshAuthTokenUserUseCase = new RefreshAuthTokenUserUseCase(jwtServiceMock, userGatewayMock);
    });

    describe('execute', () => {
        it('should refresh auth token successfully with valid refresh token', async () => {
            const input: RefreshAuthTokenInput = {
                refreshToken: 'valid-refresh-token-123',
            };

            const mockUserId = '123e4567-e89b-12d3-a456-426614174000';
            const mockAuthToken = 'new-auth-token-456';

            const mockUser = User.create({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '12345678',
            });

            jwtServiceMock.generateAuthTokenFromRefreshToken.mockReturnValue({
                authToken: mockAuthToken,
                userId: mockUserId,
            });

            userGatewayMock.findById.mockResolvedValue(mockUser);

            const result = await refreshAuthTokenUserUseCase.execute(input);

            expect(result).toEqual({ authToken: mockAuthToken });
            expect(jwtServiceMock.generateAuthTokenFromRefreshToken).toHaveBeenCalledWith(input.refreshToken);
            expect(userGatewayMock.findById).toHaveBeenCalledWith(mockUserId);
        });

        it('should throw when user does not exist', async () => {
            const input: RefreshAuthTokenInput = {
                refreshToken: 'valid-refresh-token',
            };

            const userId = 'nonexistent-user-id';

            jwtServiceMock.generateAuthTokenFromRefreshToken.mockReturnValue({
                authToken: 'auth-token',
                userId,
            });

            userGatewayMock.findById.mockResolvedValue(null);

            await expect(refreshAuthTokenUserUseCase.execute(input)).rejects.toThrow(
                CredentialsNotValidUsecaseException
            );

            expect(jwtServiceMock.generateAuthTokenFromRefreshToken).toHaveBeenCalledWith(input.refreshToken);
            expect(userGatewayMock.findById).toHaveBeenCalledWith(userId);
        });

        it('should throw when refresh token is invalid', async () => {
            const input: RefreshAuthTokenInput = {
                refreshToken: 'invalid-refresh-token',
            };

            jwtServiceMock.generateAuthTokenFromRefreshToken.mockImplementation(() => {
                throw new Error('Invalid refresh token');
            });

            await expect(refreshAuthTokenUserUseCase.execute(input)).rejects.toThrow(
                CredentialsNotValidUsecaseException
            );

            expect(jwtServiceMock.generateAuthTokenFromRefreshToken).toHaveBeenCalledWith(input.refreshToken);
            expect(userGatewayMock.findById).not.toHaveBeenCalled();
        });

    });
});