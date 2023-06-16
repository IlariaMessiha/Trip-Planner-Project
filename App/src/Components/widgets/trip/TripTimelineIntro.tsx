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
    const tripDurationInDays = dayjs(trip.arrivalDate).diff(dayjs(trip.departureDate), "day");
    const tabValue = visibleDay ? dayjs(visibleDay).diff(dayjs(trip.departureDate), "day") : 0;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setVisibleDay(dayjs(trip.departureDate).add(newValue, "day").toISOString());
    };

    const handleUpdateTrip = () => {
        // TODO : Handle update trip. A user can update the label of the trip, the start date and duration.
        // If user updates the start date, all the destinations will be updated accordingly.
        // If user updates the duration, a new recalculation for the trip is necessary
    };
    return (
        <div className={styles.intro}>
            <Typography variant="h4">{trip.label || "Your Recommended trip"}</Typography>
            <div className={styles.actions}>
                <Button variant="outlined">Update</Button>
                <Button variant="outlined">Add new destination</Button>
            </div>

            <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                {/* <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} /> */}

                {range(tripDurationInDays).map(day => (
                    <Tab
                        key={day}
                        label={dayjs(trip.departureDate).add(day, "day").format("DD MMM")}
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
