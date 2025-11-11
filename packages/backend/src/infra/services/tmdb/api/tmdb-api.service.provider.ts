import { TmdbService } from "../tmdb.service";
import { TmdbApiService } from "./tmdb-api.service";

export const TmdbApiServiceProvider = {
    provide: TmdbService,
    useClass: TmdbApiService,
};

