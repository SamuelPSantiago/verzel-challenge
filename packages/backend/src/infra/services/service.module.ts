import { Module } from "@nestjs/common";
import { JsonWebTokenJwtServiceProvider } from "./jwt/jsonwebtoken/jsonwebtoken.jwt.service.provider";
import { TmdbApiServiceProvider } from "./tmdb/api/tmdb-api.service.provider";

@Module({
    providers: [
        JsonWebTokenJwtServiceProvider,
        TmdbApiServiceProvider,
    ],
    exports: [
        JsonWebTokenJwtServiceProvider,
        TmdbApiServiceProvider,
    ],
})
export class ServiceModule {}