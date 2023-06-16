import Timeline from "@mui/lab/Timeline";
import { FC } from "react";
import { TripItemDto } from "../../../types/dto/common/TripDto";
import { TripTimelineItem } from "./TripTimelineItem";
import timelineOppositeContentClasses from "@mui/lab/TimelineOppositeContent/timelineOppositeContentClasses";

interface TripTimelineProps {
    tripItems: TripItemDto[];
}

export const TripTimeline: FC<TripTimelineProps> = ({ tripItems }) => {
    return (
        <Timeline
            sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                },
            }}
        >
            {tripItems.map((item, i) => (
                <TripTimelineItem tripItem={item} key={i} isLastItem={i === tripItems.length - 1} />
            ))}
        </Timeline>
    );
};
