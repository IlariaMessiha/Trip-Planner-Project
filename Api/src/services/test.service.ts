import { Injectable } from "@nestjs/common";
import { Activity } from "src/models/Activity";
import { PrismaService } from "src/prisma.service";
import { Attraction, city, country } from '@prisma/client'

@Injectable()
export class TestService {

    constructor(private prisma: PrismaService) { }
    async findAttractions(): Promise<Attraction[]> {
        const attractions = await this.prisma.attraction.findMany();
        return attractions;

    }
    async findCities(): Promise<city[]> {
        const cities = await this.prisma.city.findMany();
        return cities;
    }

    async findCountries(): Promise<country[]> {
        const coutries = await this.prisma.country.findMany();
        return coutries;
    }



}
