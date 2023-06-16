import { Paper } from "@mui/material";
import { FC } from "react";
import { TripItemDto } from "../../../types/dto/common/TripDto";

interface TripTimelineMapProps {
    tripItems: TripItemDto[];
}

export const TripTimelineMap: FC<TripTimelineMapProps> = ({ tripItems }) => {
    // TODO : Add here a map with all the destinations
    return (
        <Paper
            style={{
                height: "100%",
                display: "flex",
                backgroundColor: "#DDD",
                boxSizing: "border-box",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
            }}
        >
            Display Map Here
        </Paper>
    );
};
