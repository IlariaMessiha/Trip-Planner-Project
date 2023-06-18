import { Button, Tab, Tabs, Typography } from "@mui/material";
import dayjs from "dayjs";
import { range } from "lodash";
import { FC, useState } from "react";
import { TripDto } from "../../../types/dto/common/TripDto";
import styles from "./TripTimelineIntro.module.css";
import { TripUpdateDialogue } from "./TripUpdateDialogue";
import { TripAddItemDialogue } from "./TripAddItemDialogue";

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
    // TODO : fix - sometimes tripDurationInDays is 1 day less than the actual duration
    const tripDurationInDays = dayjs(trip.endDate).diff(dayjs(trip.startDate), "day") + 1;
    const tabValue = visibleDay ? dayjs(visibleDay).diff(dayjs(trip.startDate), "day") : 0;
    const [updatePopupState, setUpdatePopupState] = useState<boolean>(false);
    const [addItemPopupState, setAddItemPopupState] = useState<boolean>(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setVisibleDay(dayjs(trip.startDate).add(newValue, "day").toISOString());
    };

    const handleUpdateTrip = () => {
        setUpdatePopupState(true);
        // TODO : Handle update trip. A user can update the label of the trip, the start date and duration.
        // If user updates the start date, all the destinations will be updated accordingly.
        // If user updates the duration, a new recalculation for the trip is necessary
    };
    const onCloseAddItemPopup = () => {
        setAddItemPopupState(false);
    };
    const onCloseUpdatePopup = () => {
        setUpdatePopupState(false);
    };
    const handleAdd = () => {
        setAddItemPopupState(true);
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
            <TripUpdateDialogue
                open={updatePopupState}
                tripId={trip.id}
                onClose={onCloseUpdatePopup}
            />
            <TripAddItemDialogue
                open={addItemPopupState}
                tripId={trip.id}
                onClose={onCloseAddItemPopup}
            />
        </div>
    );
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
