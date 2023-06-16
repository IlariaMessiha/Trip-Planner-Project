import Timeline from "@mui/lab/Timeline";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import { FC } from "react";
import { TripDto } from "../../../types/dto/common/TripDto";
import { TripTimelineItem } from "./TripTimelineItem";

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
        >
            {trip?.tripItems.map((item, i) => (
                <TripTimelineItem
                    tripItem={item}
                    key={i}
                    isLastItem={i === trip.tripItems.length - 1}
                />
            ))}
        </Timeline>
    );
};
