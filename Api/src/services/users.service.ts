import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Attraction, attraction_review, city, country, user } from "@prisma/client";

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
