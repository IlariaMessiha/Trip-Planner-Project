import { UsersService } from "src/users/users.service";
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService, userService: UsersService) {}

    @HttpCode(HttpStatus.OK)
    @Post("signup")
    async registerUser(@Body() data: any) {
        return this.authService.registerUser(
            data.email,
            data.firstname,
            data.lastname,
            data.password
        );
    }

    @HttpCode(HttpStatus.OK)
    @Post("signin")
    signIn(@Body() data: Record<string, string>) {
        console.log(data.password);
        return this.authService.signIn(data.email, data.password);
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        console.log(req);
        return req.user;
    }
}
