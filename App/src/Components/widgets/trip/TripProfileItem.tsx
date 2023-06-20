import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { TripDto } from "../../../types/dto/common/TripDto";
import styles from "./TripProfileItem.module.css";

interface TripProfileItemProps {
    trip: TripDto;
}
export const TripProfileItem: FC<TripProfileItemProps> = ({ trip }) => {
    const { t } = useTranslation();

    if (!trip) {
        return null;
    }
    return (
        <Paper className={styles.searchResultElement}>
            {/* <div className={styles.flightIconContainer}> */}
            <Link to={`/profile/trip/${trip.id}`}>
                <FlightTakeoffIcon className={styles.flightIcon} />
            </Link>
            {/* </div> */}

            <div className={styles.rightSide}>
                <Link to={`/profile/trip/${trip.id}`}>
                    <Typography variant="h4" className={styles.title}>
                        {trip.label}
                    </Typography>
                </Link>

                <Typography variant="body1">
                    {t("common.startDate")}
                    {" : "}
                    {new Date(trip.startDate).toLocaleDateString()}{" "}
                </Typography>
                <Typography variant="body1">
                    {t("common.endDate")}
                    {" : "}
                    {new Date(trip.endDate).toLocaleDateString()}{" "}
                </Typography>
            </div>
        </Paper>
    );
};
