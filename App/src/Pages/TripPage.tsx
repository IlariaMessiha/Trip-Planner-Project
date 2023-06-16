import { Typography } from "@mui/material";
import { useState } from "react";
import { Container } from "../Components/core/layout/Container";
import { TripTimeline } from "../Components/widgets/trip/TripTimeline";
import { TripTimelineIntro } from "../Components/widgets/trip/TripTimelineIntro";
import { trip as mockTrip } from "../mock";
import { TripDto } from "../types/dto/common/TripDto";
import styles from "./TripPage.module.css";

export const TripPage = () => {
    const [trip, setTrip] = useState<TripDto | null>(mockTrip);
    // useEffect(() => {
    //     const _trip = getValue("trip");
    //     if (_trip) setTrip(_trip);
    // }, []);
    // const getValue = (key: string, defaultValue = {}) => {
    //     try {
    //         const item = window.localStorage.getItem(key);
    //         return item ? JSON.parse(item) : defaultValue;
    //     } catch (error) {
    //         console.log(error);
    //         return defaultValue;
    //     }
    // };

    // TODO : Create a TripTimelineEmpty component to be displayed here.
    if (!trip) return <Typography variant="h4">No trip found</Typography>;

    return (
        <Container className={styles.container}>
            <TripTimelineIntro trip={trip} />
            <TripTimeline trip={trip} />
        </Container>
    );
};
