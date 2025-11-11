import { User } from "../entities/user/user.entity";
import { Validator } from "../shared/validators/validator";
import { UserZodValidator } from "../validator/user.zod.validator";

export class UserValidatorFactory {
    public static create(): Validator<User> {
        return UserZodValidator.create();
    }
}