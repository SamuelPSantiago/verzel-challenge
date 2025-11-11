import { Entity } from "../../shared/entities/entity";
import { Utils } from "../../../shared/utils/utils";

export type MovieListCreateDto = {
    userId: string;
    name: string;
    isDefault?: boolean;
}

export type MovieListWithDto = {
    id: string;
    userId: string;
    name: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class MovieList extends Entity {
    private constructor(
        id: string,
        private userId: string,
        private name: string,
        private isDefault: boolean,
        createdAt: Date,
        updatedAt: Date,
    ) {
        super(id, createdAt, updatedAt);
        this.validate();
    }

    public static create(dto: MovieListCreateDto): MovieList {
        const id = Utils.generateUUID();

        return new MovieList(
            id,
            dto.userId,
            dto.name,
            dto.isDefault ?? false,
            new Date(),
            new Date(),
        );
    }

    public static with(dto: MovieListWithDto): MovieList {
        return new MovieList(
            dto.id,
            dto.userId,
            dto.name,
            dto.isDefault,
            dto.createdAt,
            dto.updatedAt,
        );
    }

    protected validate(): void {
        if (!this.userId || this.userId.trim() === '') {
            throw new Error('User ID is required');
        }
        if (!this.name || this.name.trim() === '') {
            throw new Error('Movie list name is required');
        }
    }

    public getUserId = (): string => this.userId;
    public getName = (): string => this.name;
    public getIsDefault = (): boolean => this.isDefault;
}

