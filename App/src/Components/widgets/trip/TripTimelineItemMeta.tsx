import { Typography } from "@mui/material";
import { FC } from "react";
import { TripItemDto } from "../../../types/dto/common/TripDto";
import dayjs from "dayjs";

interface TripTimelineItemMetaProps {
    tripItem: TripItemDto;
}

export const TripTimelineItemMeta: FC<TripTimelineItemMetaProps> = ({ tripItem }) => {
    return (
        <>
            <Typography style={{ paddingTop: 12 }} variant="body1">
                At {dayjs(tripItem.dateTime).format("HH:mm")}
            </Typography>
        </>
    );
};
