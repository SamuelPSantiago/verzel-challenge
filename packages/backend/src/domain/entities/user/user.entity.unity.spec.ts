import { ValidatorDomainException } from '../../shared/exceptions/validator-domain.exception';
import { User } from './user.entity';

describe('Domain > Entities > UserEntity', () => {
    it('should create a user when passed valid data', () => {
        const data = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '12345678',
        };

        const user = User.create(data);

        expect(user).toBeInstanceOf(User);
        expect(user.getName()).toBe(data.name);
        expect(user.getEmail()).toBe(data.email);
        expect(user.comparePassword(data.password)).toBe(true);
        expect(user.getId()).toBeDefined();
        expect(user.getCreatedAt()).toBeInstanceOf(Date);
        expect(user.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should throw an error when passing a invalid email', () => {
        const data = {
            name: 'John Doe',
            email: 'invalid-email',
            password: '12345678',
        };

        expect(() => User.create(data)).toThrow(ValidatorDomainException);
    });

    it('should throw an error when passing a name with less than 3 characters', () => {
        const data = {
            name: 'Jo',
            email: 'john.doe@example.com',
            password: '12345678',
        };

        expect(() => User.create(data)).toThrow(ValidatorDomainException);
    });

    it('should throw an error when passing a password with less than 8 characters', () => {
        const data = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '1234567',
        };

        expect(() => User.create(data)).toThrow(ValidatorDomainException);
    });

    it('should hash the password when creating a user', () => {
        const data = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '12345678',
        };

        const user = User.create(data);

        expect(user.getPassword()).not.toBe(data.password);
        expect(user.getPassword()).toBeDefined();
        expect(user.comparePassword(data.password)).toBe(true);
    });

    it('should generate a valid UUID for the user id', () => {
        const data = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '12345678',
        };

        const user = User.create(data);
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        expect(user.getId()).toMatch(uuidRegex);
    });

    it('should set createdAt and updatedAt with the same value on creation', () => {
        const data = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '12345678',
        };

        const user = User.create(data);

        expect(user.getCreatedAt().getTime()).toBe(user.getUpdatedAt().getTime());
    });
});

describe('comparePassword', () => {
    it('should return true when the informed password matches the hashed password', () => {
        const password = '12345678';
        const user = User.create({name: 'John Doe', email: 'john.doe@example.com', password: password});

        expect(user.getPassword()).not.toBe(password);
        expect(user.comparePassword(password)).toBe(true);
    });

    it('should return false when the informed password does not match the hashed password', () => {
        const password = '12345678';
        const user = User.create({name: 'John Doe', email: 'john.doe@example.com', password: password});

        expect(user.getPassword()).not.toBe(password);
        expect(user.comparePassword('wrong-password')).toBe(false);
    });
});