import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// import { Client } from "@elastic/elasticsearch";

import { SearchQuery, SearchResult } from "src/types/dto/search/searchDto";
import { MappingDtos } from "src/helpers/mappingDtos";

@Injectable()
export class SearchService {
    constructor(private prisma: PrismaService, private mappingDtos: MappingDtos) {}

    async search(searchQuery: SearchQuery): Promise<SearchResult[]> {
        const attractions = await this.prisma.attraction.findMany({
            where: {
                label: {
                    contains: searchQuery.label,
                    mode: "insensitive",
                },
            },
            include: {
                directus_files: true,
            },
        });
        const cities = await this.prisma.city.findMany({
            where: {
                label: {
                    startsWith: searchQuery.label,
                    mode: "insensitive",
                },
            },
            include: {
                attraction: true,
                directus_files: true,
                country: true,
            },
        });
        const countries = await this.prisma.country.findMany({
            where: {
                label: {
                    startsWith: searchQuery.label,
                    mode: "insensitive",
                },
            },
        });
        const attractionItems: SearchResult[] = [];
        attractions.map(attraction => {
            attractionItems.push({
                item: this.mappingDtos.mapAttractionToDto(attraction, attraction.directus_files),
                type: "Attraction",
            });
        });
        const countryItems: SearchResult[] = countries.map(country => {
            return {
                item: this.mappingDtos.mapCountryToDto(country),
                type: "Country",
            };
        });

        const cityItems: SearchResult[] = cities.map(city => {
            return {
                item: this.mappingDtos.mapCityToDto(
                    city,
                    city.directus_files,
                    this.mappingDtos.mapCountryToDto(city.country)
                ),
                type: "City",
            };
        });
        if (!searchQuery.type) {
            return [...countryItems, ...cityItems, ...attractionItems];
        } else {
            const searchResults: SearchResult[] = [];
            searchQuery.type.map(type => {
                if (type === "Attraction") {
                    searchResults.push(...attractionItems);
                }
                if (type === "City") {
                    searchResults.push(...cityItems);
                }
                if (type === "Country") {
                    searchResults.push(...countryItems);
                }
            });
            return searchResults;
        }
    }
}
