import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Container } from "../Components/core/layout/Container";
import { SectionItemType } from "../Components/widgets/SectionItemType";
import { TripDto } from "../types/dto/common/TripDto";
import styles from "./TripPage.module.css";

export const TripPage = () => {
    const [trip, setTrip] = useState<TripDto | null>(null);
    useEffect(() => {
        const _trip = getValue("trip");
        if (_trip) setTrip(_trip);
    }, []);
    console.log(trip);
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
            <Timeline
                sx={{
                    [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.5,
                    },
                }}
                className={styles.trip}
            >
                {trip?.tripItems.map((item, i) => {
                    return (
                        <TimelineItem className={styles.item}>
                            <TimelineOppositeContent color="textSecondary">
                                {item.dateTime === "7:00" ? (
                                    <Typography variant="h6">Breakfast</Typography>
                                ) : (
                                    <div></div>
                                )}
                                {item.dateTime === "14:00" ? (
                                    <Typography variant="h6">Lunch</Typography>
                                ) : (
                                    <div></div>
                                )}
                                {item.dateTime === "21:00" ? (
                                    <Typography variant="h6">Dinner</Typography>
                                ) : (
                                    <div></div>
                                )}
                                <Typography variant="h6">At {item.dateTime}</Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot>
                                    {item.item.type === "restaurant" ? (
                                        <RestaurantIcon />
                                    ) : (
                                        <DirectionsRunIcon />
                                    )}
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent className={styles.itemContent}>
                                {/* {item.attraction && <TripItem item={item.attraction} />}
                                {item.restaurant && <TripItem item={item.restaurant} />} */}
                                <SectionItemType item={item.item} />
                            </TimelineContent>
                        </TimelineItem>
                    );
                })}
            </Timeline>
            <Pagination
                count={14}
                color="primary"
                className={styles.paginator}
                sx={{ padding: "20px", float: "right" }}
                variant="outlined"
                shape="rounded"
            />
        </Container>
    );
};
