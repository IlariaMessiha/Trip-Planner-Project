import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Attraction, attraction_review, city, country, user } from "@prisma/client";

@Injectable()
export class CountriesService {
    constructor(private prisma: PrismaService) {}

    async findCountryById(id: string): Promise<country> {
        const idNumber = Number(id);
        const country = await this.prisma.country.findUnique({
            where: {
                id: idNumber,
            },
        });
        return country;
    }
    async findCountries(): Promise<country[]> {
        const coutries = await this.prisma.country.findMany();
        return coutries;
    }
}
