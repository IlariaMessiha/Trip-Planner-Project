import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { FC } from "react";
import { TripItemDto } from "../../../types/dto/common/TripItemDto";

interface TripTimelineItemIconProps {
    tripItem: TripItemDto;
}

export const TripTimelineItemIcon: FC<TripTimelineItemIconProps> = ({ tripItem }) => {
    return tripItem.item.type === "restaurant" ? <RestaurantIcon /> : <DirectionsRunIcon />;
};
