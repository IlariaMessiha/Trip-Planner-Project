import { City } from "../models/City";
import { Country } from "../models/Country";
import { Attraction } from "../models/Attraction";
import { Hotel } from "../models/Hotel";
import { Restaurant } from "../models/Restaurant";

export type SearchResult = {
    type: SearchResultType;
    item: City | Country | Attraction | Hotel | Restaurant;
};

export type SearchQuery = {
    label: string;
    type?: SearchResultType;
};

export type SearchResultType = "City" | "Country" | "Attraction" | "Restaurant" | "Hotel" | "";
