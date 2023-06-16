import TimelineConnector from "@mui/lab/TimelineConnector/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator/TimelineSeparator";
import { FC } from "react";
import { TripItemDto } from "../../../types/dto/common/TripItemDto";
import { SectionItemType } from "../SectionItemType";
import styles from "./TripTimelineItem.module.css";
import { TripTimelineItemIcon } from "./TripTimelineItemIcon";
import { TripTimelineItemMeta } from "./TripTimelineItemMeta";

interface TripTimelineItemProps {
    tripItem: TripItemDto;
    isLastItem?: boolean;
}

export const TripTimelineItem: FC<TripTimelineItemProps> = ({ tripItem, isLastItem }) => {
    return (
        <TimelineItem className={styles.item}>
            <TimelineOppositeContent color="textSecondary">
                <TripTimelineItemMeta tripItem={tripItem} />
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot>
                    <TripTimelineItemIcon tripItem={tripItem} />
                </TimelineDot>
                {!isLastItem && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent className={styles.itemContent}>
                {tripItem.item.value && <SectionItemType item={tripItem.item} />}
            </TimelineContent>
        </TimelineItem>
    );
};
