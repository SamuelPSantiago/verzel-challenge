import { User } from "src/domain/entities/user/user.entity";
import { UserGateway } from "src/domain/repositories/user.gateway";
import { JwtService } from "src/infra/services/jwt/jwt.service";
import { LoginUserUseCase, LoginUserInput } from "./login-user.usecase";
import { CredentialsNotValidUsecaseException } from "../../exceptions/auth/credentials-not-valid.exception";

describe('UseCase > Auth > LoginUserUseCase', () => {
    let loginUserUseCase: LoginUserUseCase;
    let userGatewayMock: jest.Mocked<UserGateway>;
    let jwtServiceMock: jest.Mocked<JwtService>;

    beforeEach(() => {
        userGatewayMock = {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByProvider: jest.fn(),
        } as jest.Mocked<UserGateway>;

        jwtServiceMock = {
            generateAuthToken: jest.fn(),
            generateRefreshToken: jest.fn(),
            generateAuthTokenFromRefreshToken: jest.fn(),
            verifyAuthToken: jest.fn(),
            verifyAppleToken: jest.fn(),
        } as jest.Mocked<JwtService>;

        loginUserUseCase = new LoginUserUseCase(userGatewayMock, jwtServiceMock);
    });

    describe('execute', () => {
        it('should login successfully with valid credentials', async () => {
            const input: LoginUserInput = {
                email: 'john.doe@example.com',
                password: '12345678',
            };

            const mockUser = User.create({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '12345678',
            });

            const mockAuthToken = 'mock-auth-token-123';
            const mockRefreshToken = 'mock-refresh-token-456';

            userGatewayMock.findByEmail.mockResolvedValue(mockUser);
            jwtServiceMock.generateAuthToken.mockReturnValue(mockAuthToken);
            jwtServiceMock.generateRefreshToken.mockReturnValue(mockRefreshToken);

            const result = await loginUserUseCase.execute(input);

            expect(result).toBeDefined();
            expect(result.authToken).toBe(mockAuthToken);
            expect(result.refreshToken).toBe(mockRefreshToken);
            expect(userGatewayMock.findByEmail).toHaveBeenCalledWith(input.email);
            expect(jwtServiceMock.generateAuthToken).toHaveBeenCalledWith(mockUser.getId());
            expect(jwtServiceMock.generateRefreshToken).toHaveBeenCalledWith(mockUser.getId());
        });

        it('should return both authToken and refreshToken', async () => {
            const input: LoginUserInput = {
                email: 'jane.smith@example.com',
                password: 'securePass123',
            };

            const mockUser = User.create({
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                password: 'securePass123',
            });

            userGatewayMock.findByEmail.mockResolvedValue(mockUser);
            jwtServiceMock.generateAuthToken.mockReturnValue('auth-token');
            jwtServiceMock.generateRefreshToken.mockReturnValue('refresh-token');

            const result = await loginUserUseCase.execute(input);

            expect(result).toHaveProperty('authToken');
            expect(result).toHaveProperty('refreshToken');
            expect(typeof result.authToken).toBe('string');
            expect(typeof result.refreshToken).toBe('string');
            expect(result.authToken).toBeTruthy();
            expect(result.refreshToken).toBeTruthy();
        });

        it('should throw when user does not exist', async () => {
            const input: LoginUserInput = {
                email: 'nonexistent@example.com',
                password: '12345678',
            };

            userGatewayMock.findByEmail.mockResolvedValue(null);

            await expect(loginUserUseCase.execute(input)).rejects.toThrow(
                CredentialsNotValidUsecaseException
            );

            expect(userGatewayMock.findByEmail).toHaveBeenCalledWith(input.email);
            expect(jwtServiceMock.generateAuthToken).not.toHaveBeenCalled();
            expect(jwtServiceMock.generateRefreshToken).not.toHaveBeenCalled();
        });

        it('should throw when password is incorrect', async () => {
            const input: LoginUserInput = {
                email: 'john.doe@example.com',
                password: 'wrongPassword',
            };

            const mockUser = User.create({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '12345678',
            });

            userGatewayMock.findByEmail.mockResolvedValue(mockUser);

            await expect(loginUserUseCase.execute(input)).rejects.toThrow(
                CredentialsNotValidUsecaseException
            );

            expect(userGatewayMock.findByEmail).toHaveBeenCalledWith(input.email);
            expect(jwtServiceMock.generateAuthToken).not.toHaveBeenCalled();
            expect(jwtServiceMock.generateRefreshToken).not.toHaveBeenCalled();
        });

        it('should not generate tokens if password validation fails', async () => {
            const input: LoginUserInput = {
                email: 'user@example.com',
                password: 'wrongpassword',
            };

            const mockUser = User.create({
                name: 'Test User',
                email: 'user@example.com',
                password: 'correctpassword',
            });

            userGatewayMock.findByEmail.mockResolvedValue(mockUser);

            await expect(loginUserUseCase.execute(input)).rejects.toThrow(
                CredentialsNotValidUsecaseException
            );

            expect(jwtServiceMock.generateAuthToken).not.toHaveBeenCalled();
            expect(jwtServiceMock.generateRefreshToken).not.toHaveBeenCalled();
        });
    });
});