import {
    attraction,
    attraction_review,
    attraction_tag,
    city,
    country,
    directus_files,
    hotel,
    restaurant,
    restaurant_review,
    user,
} from "@prisma/client";
import { AttractionDto } from "src/types/dto/common/AttractionDto";
import { AttractionReviewDto } from "src/types/dto/common/AttractionReviewDto";
import { AttractionTagDto } from "src/types/dto/common/AttractionTagDto";
import { CityDto } from "src/types/dto/common/CityDto";
import { CountryDto } from "src/types/dto/common/CountryDto";
import { HotelDto } from "src/types/dto/common/HotelDto";
import { RestaurantDto } from "src/types/dto/common/RestaurantDto";
import { RestaurantReviewDto } from "src/types/dto/common/RestaurantReviewDto";
import { TagDto } from "src/types/dto/common/TagDto";
import { UserDto } from "src/types/dto/common/UserDto";

export const mapUserToDto = (user: user): UserDto => {
    return {
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
    };
};
export const mapAttractionReviewToDto = (
    attractionReview: attraction_review,
    user: UserDto,
    attraction: AttractionDto
): AttractionReviewDto => {
    return {
        id: attractionReview.id,
        body: attractionReview.body,
        rating: attractionReview.rating,
        title: attractionReview.title,
        user: user,
        attraction: attraction,
    };
};

export const mapRestaurantReviewToDto = (
    restaurantReview: restaurant_review,
    user: UserDto,
    restaurant: RestaurantDto
): RestaurantReviewDto => {
    return {
        id: restaurantReview.id,
        body: restaurantReview.body,
        rating: restaurantReview.rating,
        title: restaurantReview.title,
        user: user,
        restaurant: restaurant,
    };
};
export const mapAttractionToDto = (
    attraction: attraction,
    image: directus_files
): AttractionDto => {
    const long = attraction.long ? attraction.long.toNumber() : null;
    const lat = attraction.lat ? attraction.lat.toNumber() : null;

    const mapLocation = lat && long ? { long, lat } : null;
    const imageUrl = image ? `${process.env.ASSETS_PATH}/${image.filename_disk}` : null;

    return {
        id: attraction.id,
        label: attraction.label,
        about: attraction.about,
        address: attraction.address,
        phone: attraction.phone,
        suggestedDuration: attraction.suggested_duration,
        entryFee: attraction.entry_fee ? attraction.entry_fee.toNumber() : null,
        imageUrl: imageUrl,
        website: attraction.website,
        type: attraction.type,
        rating: attraction.rating,
        reservationLink: attraction.reservation_link,
        minAge: attraction.min_age,
        email: attraction.email,
        mapLocation: mapLocation,

        openingHours: {
            from: attraction.openning_hours_from
                ? attraction.openning_hours_from.toISOString()
                : null,
            to: attraction.openning_hours_to ? attraction.openning_hours_to.toISOString() : null,
        },
    };
};
export const mapRestaurantToDto = (
    restaurant: restaurant,
    image: directus_files
): RestaurantDto => {
    const long = restaurant.long ? restaurant.long.toNumber() : null;
    const lat = restaurant.lat ? restaurant.lat.toNumber() : null;

    const mapLocation = lat && long ? { lat, long } : null;
    const imageUrl = image ? `${process.env.ASSETS_PATH}/${image.filename_disk}` : null;

    return {
        id: restaurant.id,
        label: restaurant.label,
        address: restaurant.address,
        phone: restaurant.phone,
        imageUrl: imageUrl,
        website: restaurant.website,
        rating: restaurant.rating,
        email: restaurant.email,
        mapLocation: mapLocation,
        code: restaurant.code,
        avgMealPerPerson: restaurant.avg_meal_per_person.toNumber(),
        food: restaurant.food,
    };
};

export class MappingDtos {
    mapCityToDto(city: city, image: directus_files, country: CountryDto): CityDto {
        const long = city.long ? city.long.toNumber() : null;
        const lat = city.lat ? city.lat.toNumber() : null;

        const mapLocation = lat && long ? { lat, long } : null;
        const imageUrl = image ? `${process.env.ASSETS_PATH}/${image.filename_disk}` : null;

        return {
            id: city.id,
            label: city.label,
            cityCode: city.city_code,
            mapLocation: mapLocation,
            imageUrl: imageUrl,
            country: country,
        };
    }
    mapCountryToDto(country: country): CountryDto {
        return {
            id: country.id,
            code: country.country_code,
            label: country.label,
        };
    }

    mapHotelToDto(hotel: hotel, image: directus_files): HotelDto {
        const long = hotel.long ? hotel.long.toNumber() : null;
        const lat = hotel.lat ? hotel.lat.toNumber() : null;
        const mapLocation = lat && long ? { lat, long } : null;
        const imageUrl = image ? `${process.env.ASSETS_PATH}/${image.filename_disk}` : null;

        return {
            id: hotel.id,
            label: hotel.label,
            address: hotel.address,
            phone: hotel.phone,
            imageUrl: imageUrl,
            website: hotel.website,
            rating: hotel.rating,
            reservationLink: hotel.reservation_link,
            email: hotel.email,
            mapLocation: mapLocation,
            hotelCode: hotel.hotel_code,
            startingFromPrice: hotel.starting_from_price.toNumber(),
        };
    }

    // mapDtoToRestaurant(restaurant: RestaurantDto): restaurant {
    //     return {
    //         id: restaurant.id,
    //         label: restaurant.label,
    //         code: restaurant.code,
    //         address: restaurant.address,
    //         email: restaurant.email,
    //         food: restaurant.food,
    //         avg_meal_per_person: restaurant.avgMealPerPerson,
    //     };
    // }
    mapAttractionTagToDto(
        attractionTag: attraction_tag,
        attraction: attraction,
        tag: TagDto
    ): AttractionTagDto {
        return {
            attractionId: attraction.id,
            id: attractionTag.id,
            tag: tag,
        };
    }
}
