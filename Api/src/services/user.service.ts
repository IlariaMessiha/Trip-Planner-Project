import { Injectable } from "@nestjs/common";
import { user } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    async findUsers(): Promise<user[]> {
        const users = await this.prisma.user.findMany();
        return users;
    }
    async findUserById(id: string): Promise<user> {
        const idNumber = Number(id);
        const user = await this.prisma.user.findUnique({
            where: {
                id: idNumber,
            },
        });
        return user;
    }
}
