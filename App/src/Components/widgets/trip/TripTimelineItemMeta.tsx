import { Typography } from "@mui/material";
import { FC } from "react";
import { TripItemDto } from "../../../types/dto/common/TripItemDto";

interface TripTimelineItemMetaProps {
    tripItem: TripItemDto;
}

export const TripTimelineItemMeta: FC<TripTimelineItemMetaProps> = ({ tripItem }) => {
    return (
        <>
            {tripItem.dateTime === "7:00" ? (
                <Typography variant="h6">Breakfast</Typography>
            ) : (
                <div></div>
            )}
            {tripItem.dateTime === "14:00" ? (
                <Typography variant="h6">Lunch</Typography>
            ) : (
                <div></div>
            )}
            {tripItem.dateTime === "21:00" ? (
                <Typography variant="h6">Dinner</Typography>
            ) : (
                <div></div>
            )}
            <Typography variant="h6">At {tripItem.dateTime}</Typography>
        </>
    );
};
