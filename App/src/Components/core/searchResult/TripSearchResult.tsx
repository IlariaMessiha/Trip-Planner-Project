import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getTripsDto } from "../../../types/dto/trips/getTripsDto";
import styles from "./TripSearchResult.module.css";

interface TripSearchResultProps {
    item: getTripsDto;
}
export const TripSearchResult: FC<TripSearchResultProps> = ({ item }) => {
    const { t } = useTranslation();

    if (!item) {
        return null;
    }
    return (
        <>
            <Paper className={styles.searchResultElement}>
                {/* <div className={styles.flightIconContainer}> */}
                    <Link to={`/profile/trip/${item.id}`} >
                        <FlightTakeoffIcon className={styles.flightIcon} />
                    </Link>
                {/* </div> */}

                <div className={styles.rightSide}>
                    <Link to={`/profile/trip/${item.id}`}>
                        <Typography variant="h4" className={styles.title}>
                            {item.label}
                        </Typography>
                    </Link>

                    

                    <Typography variant="body1">
                        {t("common.startDate")}
                        {" : "}
                        {new Date(item.startDate).toLocaleDateString()}{" "}
                    </Typography>
                    <Typography variant="body1">
                        {t("common.endDate")}
                        {" : "}
                        {new Date(item.endDate).toLocaleDateString()}{" "}
                    </Typography>
                </div>
            </Paper>
        </>
    );
};
