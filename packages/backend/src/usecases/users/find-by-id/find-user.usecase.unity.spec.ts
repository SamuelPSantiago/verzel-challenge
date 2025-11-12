import { User } from "src/domain/entities/user/user.entity";
import { UserGateway } from "src/domain/repositories/user.gateway";
import { FindUserUseCase, FindUserInput } from "./find-user.usecase";
import { UserNotFoundUsecaseException } from "../../exceptions/users/user-not-found.exception";

describe('UseCase > User > FindUserUseCase', () => {
    let findUserUseCase: FindUserUseCase;
    let userGatewayMock: jest.Mocked<UserGateway>;

    beforeEach(() => {
        userGatewayMock = {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByProvider: jest.fn(),
        } as jest.Mocked<UserGateway>;

        findUserUseCase = new FindUserUseCase(userGatewayMock);
    });

    describe('execute', () => {
        it('should find a user successfully when user exists', async () => {
            const input: FindUserInput = {
                id: '123e4567-e89b-12d3-a456-426614174000',
            };

            const mockUser = User.create({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '12345678',
            });

            userGatewayMock.findById.mockResolvedValue(mockUser);

            const result = await findUserUseCase.execute(input);

            expect(result).toBeDefined();
            expect(result.id).toBe(mockUser.getId());
            expect(result.name).toBe(mockUser.getName());
            expect(result.email).toBe(mockUser.getEmail());
            expect(result.createdAt).toBe(mockUser.getCreatedAt());
            expect(result.updatedAt).toBe(mockUser.getUpdatedAt());
            expect(userGatewayMock.findById).toHaveBeenCalledWith(input.id);
        });

        it('should throw when user does not exist', async () => {
            const input: FindUserInput = {
                id: 'non-existent-id',
            };

            userGatewayMock.findById.mockResolvedValue(null);

            await expect(findUserUseCase.execute(input)).rejects.toThrow(
                UserNotFoundUsecaseException
            );
        });

        it('should not expose user password in the output', async () => {
            const input: FindUserInput = {
                id: 'secure-user-id',
            };

            const mockUser = User.create({
                name: 'Secure User',
                email: 'secure@example.com',
                password: 'secretPassword123',
            });

            userGatewayMock.findById.mockResolvedValue(mockUser);

            const result = await findUserUseCase.execute(input);

            expect(result).not.toHaveProperty('password');
        });
    });
});

