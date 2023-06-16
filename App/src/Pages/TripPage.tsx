import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Container } from "../Components/core/layout/Container";
import { TripTimeline } from "../Components/widgets/trip/TripTimeline";
import { TripDto } from "../types/dto/common/TripDto";
import styles from "./TripPage.module.css";

export const TripPage = () => {
    const [trip, setTrip] = useState<TripDto | null>(null);
    useEffect(() => {
        const _trip = getValue("trip");
        if (_trip) setTrip(_trip);
    }, []);
    const getValue = (key: string, defaultValue = {}) => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.log(error);
            return defaultValue;
        }
    };

    return (
        <Container className={styles.container}>
            <Typography variant="h4">Your Recommended trip</Typography>
            <Typography variant="h5">Day 1</Typography>
            {trip && <TripTimeline trip={trip} />}
        </Container>
    );
};
