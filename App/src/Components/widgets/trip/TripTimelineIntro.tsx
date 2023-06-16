import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { TripDto } from "../../../types/dto/common/TripDto";
import styles from "./TripTimelineIntro.module.css";

interface TripTimelineIntroProps {
    trip: TripDto;
}

export const TripTimelineIntro: FC<TripTimelineIntroProps> = ({ trip }) => {
    const handleUpdateTrip = () => {
        // TODO : Handle update trip. A user can update the label of the trip, the start date and duration.
        // If user updates the start date, all the destinations will be updated accordingly.
        // If user updates the duration, a new recalculation for the trip is necessary
    };
    return (
        <div className={styles.intro}>
            <Typography variant="h4">{trip.label || "Your Recommended trip"}</Typography>
            <div className={styles.actions}>
                <Button variant="outlined">Update</Button>
                <Button variant="outlined">Add new destination</Button>
            </div>
            {/* TODO : add here a one row calendar to let the user select which day to be displayed. */}
        </div>
    );
};
