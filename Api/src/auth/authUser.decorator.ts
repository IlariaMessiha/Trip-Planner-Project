import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { AuthUser } from "../types/AuthUser";

export const AuthUserPayload = createParamDecorator<unknown, any, AuthUser>(
    (_data, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
);
