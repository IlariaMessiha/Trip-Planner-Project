import { FC } from "react";
import { AttractionDto } from "../../types/dto/common/AttractionDto";
import { CityDto } from "../../types/dto/common/CityDto";
import { HotelDto } from "../../types/dto/common/HotelDto";
import { RestaurantDto } from "../../types/dto/common/RestaurantDto";
import { SectionItemDto } from "../../types/dto/common/SectionItemDto";
import { CardAttraction } from "../core/cards/CardAttraction";
import { CardCity } from "../core/cards/CardCity";
import { CardHotel } from "../core/cards/CardHotel";
import { CardRestaurant } from "../core/cards/CardRestaurant";

interface SectionItemTypeProps {
    item: SectionItemDto;
}
export const SectionItemType: FC<SectionItemTypeProps> = ({ item }) => {
    const isSectionItemAttraction = (
        item: SectionItemDto
    ): item is SectionItemDto<AttractionDto> => {
        return item.type === "attraction";
    };
    const isSectionItemCity = (item: SectionItemDto): item is SectionItemDto<CityDto> => {
        return item.type === "city";
    };
    const isSectionItemHotel = (item: SectionItemDto): item is SectionItemDto<HotelDto> => {
        return item.type === "hotel";
    };

    const isSectionItemRestaurant = (
        item: SectionItemDto
    ): item is SectionItemDto<RestaurantDto> => {
        return item.type === "restaurant";
    };
    return (
        <div>
            {isSectionItemAttraction(item) && <CardAttraction attraction={item.value} />}
            {isSectionItemHotel(item) && <CardHotel hotel={item.value} />}
            {isSectionItemRestaurant(item) && <CardRestaurant restaurant={item.value} />}
            {isSectionItemCity(item) && <CardCity city={item.value} />}
        </div>
    );
};
