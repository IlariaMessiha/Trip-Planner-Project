import { Injectable } from "@nestjs/common";
import { Activity } from "src/models/Activity";
import { PrismaService } from "src/prisma.service";
import { Attraction, attraction_review, city, country, user } from '@prisma/client'

@Injectable()
export class TestService {

    constructor(private prisma: PrismaService) { }
    async findAttractions(): Promise<Attraction[]> {
        const attractions = await this.prisma.attraction.findMany();
        return attractions;

    }
    async findCityById(id: string): Promise<city> {
        const idNumber = Number(id);
        const city = await this.prisma.city.findUnique({
            where: {
                id: idNumber,
            },
        });
        return city;

    }
    async findCountryById(id: string): Promise<country> {
        const idNumber = Number(id);
        const country = await this.prisma.country.findUnique({
            where: {
                id: idNumber,
            },
        });
        return country;

    }
    async findAttractionById(id: string): Promise<Attraction> {
        const idNumber = Number(id);
        const attraction = await this.prisma.attraction.findUnique({
            where: {
                id: idNumber,
            },
        });
        return attraction;

    }
    async findAttractionForCity(id: string): Promise<city> {
        const attraction = this.findAttractionById(id);
        const cityIdNumber = (await attraction).city_id.toString();
        const attractionCity = this.findCityById(cityIdNumber);
        return attractionCity;


    }
    async findReviewsForAttraction(id): Promise<attraction_review[]> {
        const idNumber = Number(id);
        const attractionReviews = await this.prisma.attraction_review.findMany({
            where: {
                attraction_id: idNumber,
            }
        })
        return attractionReviews;
    }
    async findCities(): Promise<city[]> {
        const cities = await this.prisma.city.findMany();
        return cities;
    }

    async findCountries(): Promise<country[]> {
        const coutries = await this.prisma.country.findMany();
        return coutries;
    }
    async findUsers(): Promise<user[]> {
        const users = await this.prisma.user.findMany();
        return users;
    }
    async findCityAttractions(id: string): Promise<Attraction[]> {
        const idNumber = Number(id);

        const attractions = await this.prisma.attraction.findMany({
            where: {
                city_id: idNumber,
            }
        })
        return attractions;

    }
    async findCountryForCity(id: string): Promise<country> {
        const city = this.findCityById(id);
        const cityCountry = this.findCountryById((await city).country_id.toString());
        return cityCountry;
    }


}
