import { Entity } from "../../shared/entities/entity";
import { Utils } from "../../../shared/utils/utils";
import { UserValidatorFactory } from "../../factories/user.validator.factory";
import { UserPasswordValidatorFactory } from "../../factories/user-password.validator.factory";

export type UserCreateDto = {
    name: string;
    email: string;
    password: string;
}

export type UserOAuthCreateDto = {
    name: string;
    email: string;
}

export type UserWithDto = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export class User extends Entity {
    private constructor(
        id: string,
        private name: string,
        private email: string,
        private password: string,   
        createdAt: Date,
        updatedAt: Date,
    ) {
        super(id, createdAt, updatedAt);
        this.validate();
    }

    // Create a user with a password
    public static create(dto: UserCreateDto): User {
        const id = Utils.generateUUID();
        
        UserPasswordValidatorFactory.create().validate(dto.password);
        const hashedPassword = Utils.encryptPassword(dto.password);

        return new User(
            id,
            dto.name,
            dto.email,
            hashedPassword,
            new Date(),
            new Date(),
        );
    }

    // Create a user with a DTO
    public static with(dto: UserWithDto): User {
        return new User(
            dto.id,
            dto.name,
            dto.email,
            dto.password,
            dto.createdAt,
            dto.updatedAt,
        );
    }

    protected validate(): void {
        UserValidatorFactory.create().validate(this);
    }

    public getName = (): string => this.name;
    public getEmail = (): string => this.email;
    public getPassword = (): string => this.password;

    public comparePassword = (password: string): boolean => Utils.comparePassword(password, this.password);
}