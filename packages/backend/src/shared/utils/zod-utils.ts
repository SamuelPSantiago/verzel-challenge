import { ZodError } from "zod";

export type ValidationError = {
    field: string;
    message: string;
};

export class ZodUtils {
    public static formatZodErrors(errors: ZodError): string {
        const message = errors.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; \n");
        return message;
    }

    public static extractValidationErrors(errors: ZodError): ValidationError[] {
        return errors.issues.map((issue) => {
            const fieldName = issue.path.join(".");
            const translatedMessage = this.translateZodMessage(fieldName, issue.message);
            return {
                field: fieldName,
                message: translatedMessage,
            };
        });
    }

    private static translateZodMessage(fieldName: string, zodMessage: string): string {
        const fieldTranslations: Record<string, string> = {
            name: "nome",
            email: "e-mail",
            password: "senha",
        };

        const translatedFieldName = fieldTranslations[fieldName] || fieldName;

        if (zodMessage.includes("Too small") && zodMessage.includes("expected string to have >=")) {
            const match = zodMessage.match(/>=(\d+)/);
            const minLength = match ? match[1] : "3";
            if (fieldName === "password") return `A senha deve conter mais que ${minLength} caracteres`;
            return `O ${translatedFieldName} deve ter pelo menos ${minLength} caracteres`;
        }

        if (zodMessage.includes("Invalid email")) return `O ${translatedFieldName} fornecido é inválido`;

        if (zodMessage.includes("Required")) return `O campo ${translatedFieldName} é obrigatório`;

        return `${translatedFieldName}: ${zodMessage}`;
    }
}