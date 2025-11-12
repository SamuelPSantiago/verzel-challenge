import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "../../services/jwt/jwt.service";
import { APP_GUARD, Reflector } from "@nestjs/core";
import { IS_PUBLIC } from "./decorators/is-public.decorator";
import { UserGateway } from "src/domain/repositories/user.gateway";

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly userGateway: UserGateway
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
            context.getHandler(),
            context.getClass()
        ]);

        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();

        const authToken = this.extractTokenFromRequest(request);
        if (!authToken) throw new UnauthorizedException('User not authenticated!');

        const payload = this.jwtService.verifyAuthToken(authToken);
        if (!payload) throw new UnauthorizedException('User not authenticated!');

        const user = await this.userGateway.findById(payload.userId);
        if (!user) throw new UnauthorizedException('User not found!');

        request.userId = payload.userId;
        return true;
    }

    // authorization: Bearer <token>
    private extractTokenFromRequest(request: Request): string | null {
        const authHeader = request.headers['authorization'] || request.headers['Authorization'];
        console.log('Auth Header:', authHeader);
        if (!authHeader) return null;

        const parts = authHeader.split(' ');
        console.log('Auth Header Parts:', parts);
        return (parts.length !== 2 || parts[0] !== 'Bearer') ? null : parts[1];
    }
}

export const AuthGuardProvider = {
    provide: APP_GUARD,
    useClass: AuthGuard
}