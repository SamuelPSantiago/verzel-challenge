import { RegisterUserOutput } from "src/usecases/auth/register/register-user.usecase";
import { RegisterResponse } from "./register.dto";

export class RegisterPresenter {
    public static toHttp(output: RegisterUserOutput): RegisterResponse {
        const response: RegisterResponse = {
            id: output.id,
        };
        
        return response;
    }
}

