import { FC } from "react";
import { TripItemDto } from "../../../types/dto/common/TripDto";
import { Map, MapItem } from "../maps/Map";
import { RestaurantDto } from "../../../types/dto/common/RestaurantDto";
import { AttractionDto } from "../../../types/dto/common/AttractionDto";

interface TripTimelineMapProps {
    tripItems: TripItemDto<RestaurantDto | AttractionDto>[];
}

export const TripTimelineMap: FC<TripTimelineMapProps> = ({ tripItems }) => {
    const mapItems = tripItems
        .map(item => {
            if (!item.value.mapLocation) return null;
            return {
                lat: item.value.mapLocation?.lat,
                long: item.value.mapLocation?.long,
                label: item.value.label,
            };
        })
        .filter(item => item !== null) as MapItem[];
    return <Map items={mapItems} zoom={11} />;
};
