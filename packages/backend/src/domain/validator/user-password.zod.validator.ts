import { z } from "zod";
import { Validator } from "../shared/validators/validator";
import { ZodUtils } from "../../shared/utils/zod-utils";  
import { ValidatorDomainException } from "../shared/exceptions/validator-domain.exception";
import { DomainException } from "../shared/exceptions/domain.exception";

export class UserPasswordZodValidator implements Validator<string> {
    private constructor() {}

    public static create =(): UserPasswordZodValidator => new UserPasswordZodValidator();

    public validate(input: string): void {
        try {
            this.getZodSchema().parse(input);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const message = ZodUtils.formatZodErrors(error);
                const validationErrors = ZodUtils.extractValidationErrors(error);
                const passwordErrors = validationErrors.map(err => {
                    const fieldName = err.field || "password";
                    let errorMessage = err.message;
                    if (!errorMessage.includes("senha")) {
                        errorMessage = errorMessage.replace(/^(O |A )?[^:]+: /, "");
                        if (errorMessage.includes("Too small") || errorMessage.includes("expected string to have >=")) {
                            const match = errorMessage.match(/>=(\d+)/);
                            const minLength = match ? match[1] : "8";
                            errorMessage = `A senha deve conter mais que ${minLength} caracteres`;
                        }
                    }
                    return {
                        field: "password",
                        message: errorMessage,
                    };
                });
                throw new ValidatorDomainException(
                    `Erro while validating user password: ${message}`,
                    `Senha inválida`,
                    UserPasswordZodValidator.name,
                    passwordErrors,
                );
            }

            const err = error as Error;

            throw new DomainException(
                `Erro while validating user password: ${err.message}`,
                `Houve um erro inesperado ao validar a senha do usuário.`,
                UserPasswordZodValidator.name,
            );
        }
    }

    public getZodSchema = (): z.ZodSchema<string> => z.string().min(8).describe('The password of the user');
}