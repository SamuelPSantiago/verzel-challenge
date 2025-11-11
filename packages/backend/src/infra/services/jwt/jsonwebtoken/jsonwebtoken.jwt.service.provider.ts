import { JwtService } from "../jwt.service";
import { JsonwebtokenJwtService } from "./jsonwebtoken.jwt.service";

export const JsonWebTokenJwtServiceProvider = {
    provide: JwtService,
    useClass: JsonwebtokenJwtService,
};