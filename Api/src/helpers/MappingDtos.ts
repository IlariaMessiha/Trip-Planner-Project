import { Attraction, attraction_review, city, country, directus_files, user } from "@prisma/client";
import { AttractionDto } from "src/types/dto/common/AttractionDto";
import { AttractionReviewDto } from "src/types/dto/common/AttractionReviewDto";
import { CityDto } from "src/types/dto/common/CityDto";
import { UserDto } from "src/types/dto/common/UserDto";
export class MappingDtos {
    constructor() {}
    mapCityToDto(city: city, image: directus_files): CityDto {
        const long = city.long.toNumber();
        const lat = city.lat.toNumber();

        const mapLocation = lat && long ? { lat, long } : null;

        return {
            id: city.id,
            label: city.label,
            cityCode: city.city_code,
            mapLocation: mapLocation,
            imageUrl: `http://localhost:8055/assets/${image.filename_disk}`,
        };
    }
    mapReviewToDto(review: attraction_review, user: UserDto): AttractionReviewDto {
        return {
            id: review.id,
            body: review.body,
            rating: review.rating,
            title: review.title,
            user: user,
        };
    }
    mapUserToDto(user: user): UserDto {
        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
        };
    }
    mapAttractionToDto(attraction: Attraction, image: directus_files): AttractionDto {
        const long = attraction.long.toNumber();
        const lat = attraction.lat.toNumber();

        const mapLocation = lat && long ? { lat, long } : null;

        return {
            id: attraction.id,
            label: attraction.label,
            about: attraction.about,
            address: attraction.address,
            phone: attraction.phone,
            suggestedDuration: attraction.suggested_duration,
            entryFee: attraction.entry_fee.toNumber(),
            imageUrl: `http://localhost:8055/assets/${image.filename_disk}`,
            website: attraction.website,
            type: attraction.type,
            rating: attraction.rating,
            reservationLink: attraction.reservation_link,
            minAge: attraction.min_age,
            email: attraction.email,
            mapLocation: mapLocation,

            openingHours: {
                from: attraction.openning_hours_from.toISOString(),
                to: attraction.openning_hours_to.toISOString(),
            },
        };
    }
}
