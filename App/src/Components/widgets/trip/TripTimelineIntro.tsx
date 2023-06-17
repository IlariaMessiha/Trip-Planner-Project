import { Button, Tab, Tabs, Typography } from "@mui/material";
import { FC } from "react";
import { TripDto } from "../../../types/dto/common/TripDto";
import styles from "./TripTimelineIntro.module.css";
import dayjs from "dayjs";
import { range } from "lodash";

interface TripTimelineIntroProps {
    trip: TripDto;
    visibleDay: string | null;
    setVisibleDay: (day: string) => void;
}

export const TripTimelineIntro: FC<TripTimelineIntroProps> = ({
    trip,
    visibleDay,
    setVisibleDay,
}) => {
    const tripDurationInDays = dayjs(trip.endDate).diff(dayjs(trip.startDate), "day");
    const tabValue = visibleDay ? dayjs(visibleDay).diff(dayjs(trip.startDate), "day") : 0;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setVisibleDay(dayjs(trip.startDate).add(newValue, "day").toISOString());
    };

    const handleUpdateTrip = () => {
        // TODO : Handle update trip. A user can update the label of the trip, the start date and duration.
        // If user updates the start date, all the destinations will be updated accordingly.
        // If user updates the duration, a new recalculation for the trip is necessary
    };

    const handleAdd = () => {
        // TODO :  A user can add a new restaurant or attraction to the trip.
    };

    return (
        <div className={styles.intro}>
            <Typography variant="h4">{trip.label || "Your Recommended trip"}</Typography>
            <div className={styles.actions}>
                <Button variant="outlined" onClick={handleUpdateTrip}>
                    Update
                </Button>
                <Button variant="outlined" onClick={handleAdd}>
                    Add new destination
                </Button>
            </div>

            <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                {range(tripDurationInDays).map(day => (
                    <Tab
                        key={day}
                        label={dayjs(trip.startDate).add(day, "day").format("DD MMM")}
                        {...a11yProps(day)}
                    />
                ))}
            </Tabs>
        </div>
    );
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
