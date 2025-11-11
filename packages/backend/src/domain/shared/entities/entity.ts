export abstract class Entity {
    protected id: string;
    protected createdAt: Date;
    protected updatedAt: Date;

    protected constructor(id: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    protected abstract validate(): void;
    
    public getId = (): string => this.id;
    public getCreatedAt = (): Date => this.createdAt;
    public getUpdatedAt = (): Date => this.updatedAt;

    protected hasUpdated(): void {
        this.updatedAt = new Date();
    }
}