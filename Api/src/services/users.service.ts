import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import * as argon2 from "argon2";
import { RegisterBody } from "src/types/dto/auth/RegisterBody";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(registerBody: RegisterBody) {
        const hashedPass = await argon2.hash(registerBody.password);
        return this.prisma.user.create({
            data: {
                email: registerBody.email,
                firstname: registerBody.firstName,
                lastname: registerBody.lastName,
                password: hashedPass,
            },
        });
    }

    async findUserByMail(email: string) {
        return this.prisma.user.findFirst({
            where: { email: email.toLowerCase() },
        });
    }

    async findUserById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
}
