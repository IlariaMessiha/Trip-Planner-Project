import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { PageLayout } from "../Components/core/layout/PageLayout";
import { TripTimeline } from "../Components/widgets/trip/TripTimeline";
import { TripTimelineIntro } from "../Components/widgets/trip/TripTimelineIntro";
import { TripTimelineMap } from "../Components/widgets/trip/TripTimelineMap";
import { useTripTimeline } from "../hooks/useTripTimeline";
import styles from "./TripPage.module.css";

export const TripPage = () => {
    const { trip, setVisibleDay, visibleDay } = useTripTimeline();

    // TODO : Create a TripTimelineEmpty component to be displayed here.
    if (!trip) return <Typography variant="h4">No trip found</Typography>;

    console.log("visibleDay", visibleDay);
    const filteredTripItems = trip.tripItems.filter(item =>
        dayjs(item.dateTime).isSame(visibleDay, "day")
    );

    return (
        <PageLayout className={styles.page}>
            <div className={styles.content}>
                <div className={styles.contentTrip}>
                    <TripTimelineIntro
                        trip={trip}
                        visibleDay={visibleDay}
                        setVisibleDay={setVisibleDay}
                    />
                    <div className={styles.contentTimeline}>
                        <TripTimeline tripItems={filteredTripItems} />
                    </div>
                </div>
                <div className={styles.contentMap}>
                    <TripTimelineMap tripItems={filteredTripItems} />
                </div>
            </div>
        </PageLayout>
    );
};
