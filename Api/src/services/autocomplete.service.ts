import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AutoCompleteService {
    constructor(private prisma: PrismaService) {}

    async search(searchQuery: string) {
        
        const attraction = await this.prisma.attraction.findFirst({
            where: {
                label: {
                    startsWith: searchQuery,
                    mode: "insensitive",
                },              
            }
        });

        const city = await this.prisma.city.findFirst({
            where: {
                label: {
                    startsWith: searchQuery,
                    mode: "insensitive",
                },
            },
        });

        const restaurant = await this.prisma.restaurant.findFirst({
            where: {
                label: {
                    startsWith: searchQuery,
                    mode: "insensitive",
                },
            }
        });
        const hotel = await this.prisma.hotel.findFirst({
            where: {
                label: {
                    startsWith: searchQuery,
                    mode: "insensitive",
                },
            }
        });

        const searchResults = [];

        if (city !== null) {
            const cityObj = {
                label: city.label,
                type: "city",
                id: city.id,
                country_id: city.country_id
            }
            searchResults.push(cityObj);
        }
        
        if (attraction !== null) {
            const attractionObj = { 
                label: attraction.label,
                type: "attraction",
                id: attraction.id,
                city_id: attraction.city_id
            }  
            searchResults.push(attractionObj);
        }


        if (restaurant !== null) {
            const restaurantObj = {
                label: restaurant.label,
                type: "restaurant",
                id: restaurant.id,
                city_id: restaurant.city_id
            }
            searchResults.push(restaurantObj);
        }

        if (hotel !== null) {
            const hotelObj = {
                label: hotel.label,
                type: "hotel",
                id: hotel.id,
                city_id: hotel.city_id
            }
            searchResults.push(hotelObj);
        }

        return searchResults;
    }
}

