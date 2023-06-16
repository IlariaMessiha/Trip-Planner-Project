import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { FC } from "react";
import { TripItemDto } from "../../../types/dto/common/TripDto";

interface TripTimelineItemIconProps {
    tripItem: TripItemDto;
}

export const TripTimelineItemIcon: FC<TripTimelineItemIconProps> = ({ tripItem }) => {
    return tripItem.type === "restaurant" ? <RestaurantIcon /> : <DirectionsRunIcon />;
};
