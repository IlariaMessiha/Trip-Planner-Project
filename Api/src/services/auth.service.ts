import { Injectable } from "@nestjs/common";
import { UsersService } from "src/services/users.service";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async registerUser(email: string, firstname: string, lastname: string, password: string) {
        const userExist = await this.usersService.checkDuplicateMails(email.toLowerCase());
        if (userExist) {
            return { error: " Email already exists" };
        } else {
            const hashedPass = await argon2.hash(password);
            const userData = {
                email: email.toLowerCase(),
                firstname: firstname,
                lastname: lastname,
                id: (await this.usersService.getLastUserId()) + 1,
                password: hashedPass,
            };

            const newUser = await this.usersService.createUser(userData);
            return { message: "User registered successfully", data: newUser };
        }
    }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserByMail(email.toLowerCase());
        let passwordsMatches = null;

        if (user) {
            passwordsMatches = await argon2.verify(user.password, pass);
        }

        if (!user || !passwordsMatches) {
            return { error: "email or password are invalid" };
        } else {
            const payload = { firstname: user.firstname, lastname: user.lastname, sub: user.id };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
    }
}
