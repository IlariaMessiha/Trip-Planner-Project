import { Injectable } from "@nestjs/common";
import { Activity } from "src/models/Activity";
import { PrismaService } from "src/prisma.service";
import { Attraction } from '@prisma/client'

@Injectable()
export class TestService {
    constructor(private prisma: PrismaService) { }
    async findAttractions(): Promise<Attraction[]> {
        const attractions = await this.prisma.attraction.findMany();
        return attractions;

    }

}
