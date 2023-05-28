import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import { user } from "@prisma/client";
import { RegisterBody } from "src/types/dto/auth/RegisterBody";
import * as argon2 from "argon2";

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

    async checkDuplicateMails(email: string): Promise<boolean> {
        const mail = String(email);
        const emailExist = await this.prisma.user.findMany({
            where: { email: mail },
        });
        if (emailExist.length !== 0) {
            return true;
        } else {
            return false;
        }
    }

    async findUserByMail(email: string): Promise<user> {
        const mail = String(email);
        const user = await this.prisma.user.findMany({
            where: { email: mail },
        });

        return user[0];
    }

    async getLastUserId(): Promise<any> {
        const user = await this.prisma.user.findFirst({
            orderBy: {
                id: "desc",
            },
        });

        return user.id;
    }
}
