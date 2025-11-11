import { z } from "zod";
import { Validator } from "../shared/validators/validator";
import { User } from "../entities/user/user.entity";
import { ZodUtils } from "../../shared/utils/zod-utils";
import { ValidatorDomainException } from "../shared/exceptions/validator-domain.exception";
import { DomainException } from "../shared/exceptions/domain.exception";

export class UserZodValidator implements Validator<User> {
    private constructor() {}

    public static create(): UserZodValidator {
        return new UserZodValidator();
    }

    public validate(input: User): void {
        try {
            const userData = {
                id: input.getId(),
                name: input.getName(),
                email: input.getEmail(),
                password: input.getPassword(),
                createdAt: input.getCreatedAt(),
                updatedAt: input.getUpdatedAt(),
            };
            this.getZodSchema().parse(userData);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const message = ZodUtils.formatZodErrors(error);
                const validationErrors = ZodUtils.extractValidationErrors(error);
                throw new ValidatorDomainException(
                    `Erro while validating user ${input.getId()}: ${message}`,
                    `Os dados para a criação do usuário são inválidos.`,
                    UserZodValidator.name,
                    validationErrors,
                );
            }

            const err = error as Error;

            throw new DomainException(
                `Erro while validating user ${input.getId()}: ${err.message}`,
                `Houve um erro inesperado ao validar os dados do usuário.`,
                UserZodValidator.name,
            );
        }
    }

    private getZodSchema() {
        const zodSchema = z.object({
            id: z.string().uuid(),
            name: z.string().min(3).describe("The name of the user"),
            email: z.string().email().describe("The email of the user"),
            password: z.string().describe("The password of the user (always encrypted: user password or providerId for OAuth users)"),
            createdAt: z.date().describe("The date and time the user was created"),
            updatedAt: z.date().describe("The date and time the user was last updated")
        });

        return zodSchema;
    }
}