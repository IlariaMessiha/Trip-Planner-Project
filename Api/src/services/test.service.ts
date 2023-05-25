// import { Injectable } from "@nestjs/common";
// import { PrismaService } from "src/prisma.service";
// //import { PrismaClient } from "@prisma/client";
// //const prisma = new PrismaClient();
// // import { Client } from "@elastic/elasticsearch";
// interface Location {
//     city_id: number;
//     // Other properties of location object
// }
// import {
//     Attraction,
//     attraction_review,
//     city,
//     country,
//     user,
//     hotel,
//     restaurant,
// } from "@prisma/client";

// type SearchResultType = Attraction | city | country | hotel | restaurant;

// const mappings = {
//     countries: 0,
//     citites: 1,
//     attractions: 2,
//     hotels: 3,
//     restaurants: 4,
// };

// @Injectable()
// export class TestService {
//     constructor(private prisma: PrismaService) {}
//     async findAttractions(): Promise<Attraction[]> {
//         const attractions = await this.prisma.attraction.findMany();
//         return attractions;
//     }
//     async findCityById(id: string): Promise<city> {
//         const idNumber = Number(id);
//         const city = await this.prisma.city.findUnique({
//             where: {
//                 id: idNumber,
//             },
//         });
//         return city;
//     }
//     async findCountryById(id: string): Promise<country> {
//         const idNumber = Number(id);
//         const country = await this.prisma.country.findUnique({
//             where: {
//                 id: idNumber,
//             },
//         });
//         return country;
//     }
//     async findAttractionById(id: string): Promise<Attraction> {
//         const idNumber = Number(id);
//         const attraction = await this.prisma.attraction.findUnique({
//             where: {
//                 id: idNumber,
//             },
//         });
//         return attraction;
//     }
//     async findAttractionForCity(id: string): Promise<city> {
//         const attraction = this.findAttractionById(id);
//         const cityIdNumber = (await attraction).city_id.toString();
//         const attractionCity = this.findCityById(cityIdNumber);
//         return attractionCity;
//     }
//     async findReviewsForAttraction(id): Promise<attraction_review[]> {
//         const idNumber = Number(id);
//         const attractionReviews = await this.prisma.attraction_review.findMany({
//             where: {
//                 attraction_id: idNumber,
//             },
//         });
//         return attractionReviews;
//     }
//     async findCities(): Promise<city[]> {
//         const cities = await this.prisma.city.findMany();
//         return cities;
//     }

//     async findCountries(): Promise<country[]> {
//         const coutries = await this.prisma.country.findMany();
//         return coutries;
//     }
//     async findUsers(): Promise<user[]> {
//         const users = await this.prisma.user.findMany();
//         return users;
//     }
//     async findUserById(id: string): Promise<user> {
//         const idNumber = Number(id);
//         const user = await this.prisma.user.findUnique({
//             where: {
//                 id: idNumber,
//             },
//         });
//         return user;
//     }
//     async findCityAttractions(id: string): Promise<Attraction[]> {
//         const idNumber = Number(id);

//         const attractions = await this.prisma.attraction.findMany({
//             where: {
//                 city_id: idNumber,
//             },
//         });
//         return attractions;
//     }

//     async findCityHotels(id: string): Promise<hotel[]> {
//         const idNumber = Number(id);

//         const hotels = await this.prisma.hotel.findMany({
//             where: {
//                 city_id: idNumber,
//             },
//         });
//         return hotels;
//     }

//     async findCityRestaurants(id: string): Promise<restaurant[]> {
//         const idNumber = Number(id);

//         const restaurants = await this.prisma.restaurant.findMany({
//             where: {
//                 city_id: idNumber,
//             },
//         });
//         return restaurants;
//     }

//     async findCountryForCity(id: string): Promise<country> {
//         const city = this.findCityById(id);
//         const cityCountry = this.findCountryById((await city).country_id.toString());
//         return cityCountry;
//     }

//     async findCountryByName(name: string): Promise<country[]> {
//         const country = await this.prisma.country.findMany({
//             where: {
//                 label: {
//                     startsWith: name,
//                     mode: "insensitive",
//                 },
//             },
//             include: {
//                 city: true,
//             },
//         });

//         return country;
//     }

//     async findCityByName(name: string, filter: string[]): Promise<city[]> {
//         if (filter.length == 0) {
//             console.log("if filter.length = 0 ");
//             filter = ["attraction", "hotel", "restaurant"];
//         }

//         const city = await this.prisma.city.findMany({
//             where: {
//                 label: {
//                     startsWith: name,
//                     mode: "insensitive",
//                 },
//             },
//             include: {
//                 Attraction: filter.includes("attraction") ? true : false,
//                 restaurant: filter.includes("restaurant") ? true : false,
//                 hotel: filter.includes("hotel") ? true : false,
//             },
//         });
//         console.log(city);

//         return city;
//     }

//     async findAttractionByName(name: string): Promise<Attraction[]> {
//         const attraction = await this.prisma.attraction.findMany({
//             where: {
//                 label: {
//                     startsWith: name,
//                     mode: "insensitive",
//                 },
//             },
//         });
//         return attraction;
//     }

//     async findRestaurantByName(name: string): Promise<restaurant[]> {
//         const restaurant = await this.prisma.restaurant.findMany({
//             where: {
//                 label: {
//                     startsWith: name,
//                     mode: "insensitive",
//                 },
//             },
//         });

//         return restaurant;
//     }

//     async findHotelByName(name: string): Promise<hotel[]> {
//         const hotel = await this.prisma.hotel.findMany({
//             where: {
//                 label: {
//                     startsWith: name,
//                     mode: "insensitive",
//                 },
//             },
//         });

//         return hotel;
//     }

//     // async findLocationByFilter(array:string[]): Promise<SearchResultType[]>{
//     //     const location = await this.prisma.`${array[0]}`.

//     // }

//     async findReviewById(id: string): Promise<attraction_review> {
//         const idNumber = Number(id);
//         const review = await this.prisma.attraction_review.findUnique({
//             where: {
//                 id: idNumber,
//             },
//         });
//         return review;
//     }
//     async findUserForReview(id: string): Promise<user> {
//         const review = this.findReviewById(id);
//         return this.findUserById((await review).user_id.toString());
//     }

//     async findSearchWithoutFilter(q: string, filters: string[]): Promise<{}> {
//         if (q === "") {
//             return null;
//         }

//         const searchResults = [];
//         const countries = await this.findCountryByName(q);
//         searchResults.push(countries);

//         const cities = await this.findCityByName(q, filters);
//         searchResults.push(cities);

//         let citiesId = [];
//         let allCountriesId = [];

//         if (searchResults[0].length !== 0) {
//             for (let i = 0; i < searchResults[0].length; i++) {
//                 allCountriesId.push(searchResults[0][i].id);
//                 for (let y = 0; y < searchResults[0][i].city.length; y++) {
//                     citiesId.push(searchResults[0][i].city[y].id);
//                 }
//             }
//         } else if (searchResults[1].length !== 0) {
//             for (let i = 0; i < searchResults[1].length; i++) {
//                 citiesId.push(searchResults[1][i].id);
//             }
//         } else {
//             console.log("wla 7aga mn dol ");
//         }

//         const citiesWithAttractions = searchResults[1];
//         var citiesWithAttractionsIds = [];
//         for (let y = 0; y < citiesWithAttractions.length; y++) {
//             citiesWithAttractionsIds.push(citiesWithAttractions[y].id);
//         }

//         if (filters.length === 0) {
//             const attractions = await this.findAttractionByName(q);
//             searchResults.push(attractions);

//             const hotels = await this.findHotelByName(q);
//             searchResults.push(hotels);

//             const restaurants = await this.findRestaurantByName(q);
//             searchResults.push(restaurants);

//             //return searchResults;
//         } else {
//             searchResults.push([]);
//             searchResults.push([]);
//             searchResults.push([]);

//             for (const filter of filters) {
//                 if (filter === "attraction") {
//                     const attractions = [];
//                     for (const cityId of citiesId) {
//                         if (!citiesWithAttractionsIds.includes(cityId)) {
//                             const cityAttractions = await this.findCityAttractions(cityId);
//                             attractions.push(...cityAttractions);
//                         } else {
//                             console.log("did not enter ********");
//                         }
//                     }
//                     if (attractions.length !== 0) {
//                         searchResults[2] = attractions;
//                     }
//                     const matchingAttractions = await this.findAttractionByName(q);
//                     matchingAttractions.forEach(attraction => {
//                         if (!citiesId.includes(attraction.city_id)) {
//                             searchResults[2].push(attraction);
//                         }
//                     });
//                 }
//                 if (filter === "hotel") {
//                     const hotels = [];
//                     for (const cityId of citiesId) {
//                         if (!citiesWithAttractionsIds.includes(cityId)) {
//                             const cityHotels = await this.findCityHotels(cityId);
//                             hotels.push(...cityHotels);
//                         }
//                     }
//                     if (hotels.length !== 0) {
//                         searchResults[3] = hotels;
//                     }

//                     const matchingHotels = await this.findHotelByName(q);

//                     matchingHotels.forEach(hotel => {
//                         if (!citiesId.includes(hotel.city_id)) {
//                             searchResults[3].push(hotel);
//                         }
//                     });
//                 }

//                 if (filter === "restaurant") {
//                     const restaurants = [];
//                     for (const cityId of citiesId) {
//                         if (!citiesWithAttractionsIds.includes(cityId)) {
//                             const cityRestaurants = await this.findCityRestaurants(cityId);
//                             restaurants.push(...cityRestaurants);
//                         }
//                     }
//                     if (restaurants.length !== 0) {
//                         searchResults[4] = restaurants;
//                     }
//                     const matchingRestaurants = await this.findRestaurantByName(q);
//                     matchingRestaurants.forEach(restaurant => {
//                         if (!citiesId.includes(restaurant.city_id)) {
//                             searchResults[4].push(restaurant);
//                         }
//                     });
//                 }
//             }
//         }

//         // if (searchResults[1].length != 0) {
//         //     searchResults[1] = searchResults[1].filter(
//         //         city => !allCountriesId.includes(city.country_id)
//         //     );
//         // }

//         if (searchResults[2].length !== 0) {
//             searchResults[2] = searchResults[2].filter(
//                 attraction => !citiesWithAttractionsIds.includes(attraction.city_id)
//             );
//         }

//         if (searchResults[3].length != 0) {
//             searchResults[3] = searchResults[3].filter(
//                 hotel => !citiesWithAttractionsIds.includes(hotel.city_id)
//             );
//         }

//         if (searchResults[4].length != 0) {
//             searchResults[4] = searchResults[4].filter(
//                 restaurant => !citiesWithAttractionsIds.includes(restaurant.city_id)
//             );
//         }

//         if (searchResults.every(array => array.length === 0)) {
//             searchResults.length = 0;
//             searchResults.push({
//                 error: "No Results found",
//             });
//             return searchResults[0];
//         }

//         console.log(searchResults[1]);

//         for (const city of searchResults[1]) {
//             if (city.Attraction && city.Attraction.length !== 0) {
//                 for (const attraction of city.Attraction) {
//                     searchResults[2].push(attraction);
//                 }
//                 delete city.Attraction;
//             }

//             if (city.hotel && city.hotel.length !== 0) {
//                 for (const hotel of city.hotel) {
//                     searchResults[3].push(hotel);
//                 }
//                 delete city.hotel;
//             }
//             if (city.restaurant && city.restaurant.length !== 0) {
//                 for (const restaurant of city.restaurant) {
//                     searchResults[4].push(restaurant);
//                 }
//                 delete city.restaurant;
//             }
//         }

//         // const finalObj = {
//         //     countries: searchResults[mappings.countries],
//         //     cities: searchResults[mappings.citites],
//         //     attractions: searchResults[mappings.attractions],
//         //     hotels: searchResults[mappings.hotels],
//         //     restaurants : searchResults[mappings.restaurants]
//         // };

//         // if (filters.length === 0) {
//         //     return finalObj;
//         // } else {

//         //     if (!filters.includes("country")){
//         //         delete finalObj.countries
//         //     }

//         //     if (!filters.includes("city")){
//         //         delete finalObj.cities
//         //     }
//         //     if (!filters.includes("attraction")){
//         //         delete finalObj.attractions
//         //     }
//         //     if (!filters.includes("hotel")){
//         //         delete finalObj.countries
//         //     }
//         //     if (!filters.includes("restaurants")){
//         //         delete finalObj.restaurants
//         //     }

//         // }

//         const finalObj = {
//             country: searchResults[mappings.countries],
//             city: searchResults[mappings.citites],
//             attraction: searchResults[mappings.attractions],
//             hotel: searchResults[mappings.hotels],
//             restaurant: searchResults[mappings.restaurants],
//         };
//         const filteredFinalObj = Object.fromEntries(
//             Object.entries(finalObj).filter(([key, value]) => value.length > 0)
//         );

//         if (filters.length === 0) {
//             return filteredFinalObj;
//         } else {
//             const filteredObj = {};
//             for (const filter of filters) {
//                 if (filteredFinalObj[filter]) {
//                     filteredObj[filter] = finalObj[filter];
//                 }
//             }
//             return filteredObj;
//         }
//     }
// }
