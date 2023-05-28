import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Request,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { UsersService } from "src/services/users.service";
import { LoginBody } from "src/types/dto/auth/LoginBody";
import { RegisterBody } from "src/types/dto/auth/RegisterBody";
import { AuthGuard } from "../auth/auth.guard";

@Controller("/api/auth")
export class AuthController {
    constructor(private jwtService: JwtService, private usersService: UsersService) {}

    @Post("register")
    async registerUser(@Body() body: RegisterBody) {
        if (!body.email || !body.password || !body.firstName || !body.lastName) {
            throw new BadRequestException("Payload incomplete");
        }
        const userExist = await this.usersService.checkDuplicateMails(body.email.toLowerCase());

        if (userExist) {
            throw new BadRequestException("Email already exists");
        }

        const newUser = await this.usersService.createUser(body);
        return { message: "User registered successfully", data: newUser };
    }

    @Post("login")
    async login(@Body() body: LoginBody) {
        if (!body.email || !body.password) {
            throw new BadRequestException("Missing email or password");
        }

        const user = await this.usersService.findUserByMail(body.email.toLowerCase());

        if (!user) {
            throw new BadRequestException("User not found");
        }

        try {
            const passwordsMatches = await argon2.verify(user.password, body.password);
            if (!passwordsMatches) {
                throw new Error();
            }
        } catch (err) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = { firstName: user.firstname, lastName: user.lastname, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken,
        };
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        console.log(req);
        return req.user;
    }
}
