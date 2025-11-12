import { User } from "src/domain/entities/user/user.entity";
import { UserGateway } from "src/domain/repositories/user.gateway";
import { RegisterUserUseCase, RegisterUserInput } from "./register-user.usecase";
import { EmailAlreadyExistUsecaseException } from "../../exceptions/auth/email-already-exist.exception";
import { ValidatorDomainException } from "src/domain/shared/exceptions/validator-domain.exception";

describe('UseCase > Auth > RegisterUserUseCase', () => {
    let registerUserUseCase: RegisterUserUseCase;
    let userGatewayMock: jest.Mocked<UserGateway>;

    beforeEach(() => {
        userGatewayMock = {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByProvider: jest.fn(),
        } as jest.Mocked<UserGateway>;

        registerUserUseCase = new RegisterUserUseCase(userGatewayMock);
    });

    describe('execute', () => {
        it('should create a user successfully when email does not exist', async () => {
            const input: RegisterUserInput = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '12345678',
            };

            userGatewayMock.findByEmail.mockResolvedValue(null);
            userGatewayMock.create.mockResolvedValue(undefined);

            const result = await registerUserUseCase.execute(input);

            expect(result.id).toBeDefined();
            expect(userGatewayMock.findByEmail).toHaveBeenCalledWith(input.email);
            expect(userGatewayMock.create).toHaveBeenCalledWith(expect.any(User));
        });

        it('should fail when email already exists', async () => {
            const input: RegisterUserInput = {
                name: 'John Doe',
                email: 'existing@example.com',
                password: '12345678',
            };

            const existingUser = User.create({
                name: 'Existing User',
                email: 'existing@example.com',
                password: '12345678',
            });

            userGatewayMock.findByEmail.mockResolvedValue(existingUser);

            await expect(registerUserUseCase.execute(input)).rejects.toThrow(
                EmailAlreadyExistUsecaseException
            );

            expect(userGatewayMock.create).not.toHaveBeenCalled();
        });

        it('should fail when email format is invalid', async () => {
            const input: RegisterUserInput = {
                name: 'John Doe',
                email: 'invalid-email',
                password: '12345678',
            };

            await expect(registerUserUseCase.execute(input)).rejects.toThrow(
                ValidatorDomainException
            );

            expect(userGatewayMock.findByEmail).not.toHaveBeenCalled();
            expect(userGatewayMock.create).not.toHaveBeenCalled();
        });

        it('should fail when email is empty', async () => {
            const input: RegisterUserInput = {
                name: 'John Doe',
                email: '',
                password: '12345678',
            };

            await expect(registerUserUseCase.execute(input)).rejects.toThrow(
                ValidatorDomainException
            );

            expect(userGatewayMock.findByEmail).not.toHaveBeenCalled();
            expect(userGatewayMock.create).not.toHaveBeenCalled();
        });

        it('should fail when email does not have @ symbol', async () => {
            const input: RegisterUserInput = {
                name: 'John Doe',
                email: 'johndoeexample.com',
                password: '12345678',
            };

            await expect(registerUserUseCase.execute(input)).rejects.toThrow(
                ValidatorDomainException
            );

            expect(userGatewayMock.findByEmail).not.toHaveBeenCalled();
            expect(userGatewayMock.create).not.toHaveBeenCalled();
        });

        it('should fail when password has less than 8 characters', async () => {
            const input: RegisterUserInput = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '1234567',
            };

            await expect(registerUserUseCase.execute(input)).rejects.toThrow(
                ValidatorDomainException
            );

            expect(userGatewayMock.findByEmail).not.toHaveBeenCalled();
            expect(userGatewayMock.create).not.toHaveBeenCalled();
        });

        it('should fail when password is empty', async () => {
            const input: RegisterUserInput = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '',
            };

            await expect(registerUserUseCase.execute(input)).rejects.toThrow(
                ValidatorDomainException
            );

            expect(userGatewayMock.findByEmail).not.toHaveBeenCalled();
            expect(userGatewayMock.create).not.toHaveBeenCalled();
        });

        it('should accept password with exactly 8 characters', async () => {
            const input: RegisterUserInput = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '12345678',
            };

            userGatewayMock.findByEmail.mockResolvedValue(null);
            userGatewayMock.create.mockResolvedValue(undefined);

            const result = await registerUserUseCase.execute(input);

            expect(result.id).toBeDefined();
            expect(userGatewayMock.create).toHaveBeenCalledTimes(1);
        });

        it('should accept password with more than 8 characters', async () => {
            const input: RegisterUserInput = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '123456789',
            };

            userGatewayMock.findByEmail.mockResolvedValue(null);
            userGatewayMock.create.mockResolvedValue(undefined);

            const result = await registerUserUseCase.execute(input);

            expect(result.id).toBeDefined();
            expect(userGatewayMock.create).toHaveBeenCalledTimes(1);
        });

        it('should fail when name has less than 3 characters', async () => {
            const input: RegisterUserInput = {
                name: 'Jo',
                email: 'john.doe@example.com',
                password: '12345678',
            };

            await expect(registerUserUseCase.execute(input)).rejects.toThrow(
                ValidatorDomainException
            );

            expect(userGatewayMock.findByEmail).not.toHaveBeenCalled();
            expect(userGatewayMock.create).not.toHaveBeenCalled();
        });

        it('should accept name with exactly 3 characters', async () => {
            const input: RegisterUserInput = {
                name: 'Ana',
                email: 'ana@example.com',
                password: '12345678',
            };

            userGatewayMock.findByEmail.mockResolvedValue(null);
            userGatewayMock.create.mockResolvedValue(undefined);

            const result = await registerUserUseCase.execute(input);

            expect(result.id).toBeDefined();
            expect(userGatewayMock.create).toHaveBeenCalledTimes(1);
        });

    });
});