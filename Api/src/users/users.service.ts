import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import { user } from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(userData: {}): Promise<user> {
        const newUser = await this.prisma.user.create({
            data: userData,
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
                password: true,
            },
        });
        return newUser;
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
