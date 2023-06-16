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
import { Typography } from "@mui/material";
import { FC } from "react";
import { TripDto } from "../../../types/dto/common/TripDto";
import { SectionItemType } from "../SectionItemType";
import styles from "./TripTimeline.module.css";

interface TripTimelineProps {
    trip: TripDto;
}

export const TripTimeline: FC<TripTimelineProps> = ({ trip }) => {
    return (
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
                    <TimelineItem className={styles.item} key={i}>
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
                            {item.item.value && <SectionItemType item={item.item} />}
                        </TimelineContent>
                    </TimelineItem>
                );
            })}
        </Timeline>
    );
};
