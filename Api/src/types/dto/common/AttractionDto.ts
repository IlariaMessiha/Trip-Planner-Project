import { AttractionReviewDto } from "./AttractionReviewDto";
import { CityDto } from "./CityDto";
import { AttractionTagsDto } from "../tags/AttractionTagsDto";

export interface AttractionDto {
    id: number;
    label: string;
    about: string;

    address: string | null;
    phone: string | null;

    suggestedDuration: number | null;

    openingHours: {
        from: string;
        to: string;
    } | null;

    website: string | null;
    type: string | null;
    // TODO fix 'details' type. This should be JSON. details: string | null;
    rating: number | null;
    reservationLink: string | null;
    minAge: number | null;
    // TODO remove for now, implement code/id system later. attraction_code: string | null;
    email: string | null;

    mapLocation: {
        long: number;
        lat: number;
    } | null;

    entryFee: number | null;
    imageUrl: string | null;
    tags?: AttractionTagsDto[];
}
