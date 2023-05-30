import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Request,
    UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private configService: ConfigService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get("AUTH_JWT_SECRET"),
            });
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request["user"] = payload;
        } catch (err) {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(@Request() request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
