import { createParamDecorator } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";

export const UserId = createParamDecorator<undefined>(
    (data, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();

        const userId = request.userId;
        if (!userId) throw new UnauthorizedException('User not authenticated!');
        
        return userId;
    }
)