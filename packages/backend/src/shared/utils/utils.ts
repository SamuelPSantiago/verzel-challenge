import { createHash, randomUUID } from "crypto";
import bcrypt from "bcrypt";

export class Utils {
    public static generateUUID = (): string => randomUUID();

    public static encryptPassword = (password: string): string => {
        const salt = this.generateSalt();
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }
    
    public static comparePassword = (password: string, hashedPassword: string): boolean => {
        return bcrypt.compareSync(password, hashedPassword);
    }
    
    private static generateSalt(): string {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return salt;
    }

    public static hash(value: string): string {
        return createHash("sha256").update(value).digest("hex");
    }
}