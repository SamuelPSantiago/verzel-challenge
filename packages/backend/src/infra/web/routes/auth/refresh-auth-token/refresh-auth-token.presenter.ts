import { RefreshAuthTokenOutput } from "src/usecases/auth/refresh-auth-token/refresh-auth-token-user.usecase";
import { RefreshAuthTokenResponse } from "./refresh-auth-token.dto";

export class RefreshAuthTokenPresenter {
    public static toHttp(input: RefreshAuthTokenOutput): RefreshAuthTokenResponse {
        const response: RefreshAuthTokenResponse = {
            authToken: input.authToken,
        };

        return response;
    }
}

