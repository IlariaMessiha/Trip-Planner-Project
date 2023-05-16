import { Injectable } from "@nestjs/common";
import { country } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

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
