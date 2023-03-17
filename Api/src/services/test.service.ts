import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Attraction, attraction_review, city, country, user } from "@prisma/client";

@Injectable()
export class TestService {
    constructor(private prisma: PrismaService) {}
    async findAttractions(): Promise<Attraction[]> {
        const attractions = await this.prisma.attraction.findMany({
            include: {
                directus_files: true,
            },
        });

        return attractions.map(({ directus_files, ...attraction }) => {
            if (!directus_files) return attraction;
            return {
                ...attraction,
                attraction_image: `http://localhost:8055/assets/${directus_files.filename_disk}`,
            };
        });
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
    async findCityPage(id: string): Promise<city> {
        const idNumber = Number(id);
        const city = await this.prisma.city.findUnique({
            where: {
                id: idNumber,
            },
            include: {
                Attraction: true,
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
    async findAttractionPage(id: string): Promise<Attraction> {
        const idNumber = Number(id);
        const attraction = await this.prisma.attraction.findUnique({
            where: {
                id: idNumber,
            },
            include: {
                attraction_review: true,
            },
        });
        return attraction;
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
            },
        });
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
    async findUserById(id: string): Promise<user> {
        const idNumber = Number(id);
        const user = await this.prisma.user.findUnique({
            where: {
                id: idNumber,
            },
        });
        return user;
    }
    async findCityAttractions(id: string): Promise<Attraction[]> {
        const idNumber = Number(id);

        const attractions = await this.prisma.attraction.findMany({
            where: {
                city_id: idNumber,
            },
        });
        return attractions;
    }
    async findCountryForCity(id: string): Promise<country> {
        const city = this.findCityById(id);
        const cityCountry = this.findCountryById((await city).country_id.toString());
        return cityCountry;
    }
    async findReviewById(id: string): Promise<attraction_review> {
        const idNumber = Number(id);
        const review = await this.prisma.attraction_review.findUnique({
            where: {
                id: idNumber,
            },
        });
        return review;
    }
    async findUserForReview(id: string): Promise<user> {
        const review = this.findReviewById(id);
        return this.findUserById((await review).user_id.toString());
    }
}
