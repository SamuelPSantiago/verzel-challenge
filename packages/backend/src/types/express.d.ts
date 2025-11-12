import { Role } from 'src/domain/entities/user/user.entity';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export {};


