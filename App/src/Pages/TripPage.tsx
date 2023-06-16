import { Typography } from "@mui/material";
import { useState } from "react";
import { TripTimeline } from "../Components/widgets/trip/TripTimeline";
import { TripTimelineIntro } from "../Components/widgets/trip/TripTimelineIntro";
import { TripTimelineMap } from "../Components/widgets/trip/TripTimelineMap";
import { trip as mockTrip } from "../mock";
import { TripDto } from "../types/dto/common/TripDto";
import styles from "./TripPage.module.css";
import { PageLayout } from "../Components/core/layout/PageLayout";

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
        <PageLayout className={styles.page}>
            <div className={styles.content}>
                <div className={styles.contentTrip}>
                    <TripTimelineIntro trip={trip} />
                    <div className={styles.contentTimeline}>
                        <TripTimeline trip={trip} />
                    </div>
                </div>
                <div className={styles.contentMap}>
                    <TripTimelineMap trip={trip} />
                </div>
            </div>
        </PageLayout>
    );
};
