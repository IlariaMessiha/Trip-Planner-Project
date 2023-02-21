import { FC, useState } from "react";
import { Typography } from "./Typography";
import { Location } from "../../models/Location";
import { GrLocation } from "react-icons/gr";
import styles from "./LocationSearchResult.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { fetchData } from "../../api/FetchData";
import React from "react";
import { Activity } from "../../models/Activity";

interface LocationSearchResultProps {
    id: string;
}
export const LocationSearchResult: FC<LocationSearchResultProps> = ({ id }) => {
    const [location, setLocation] = useState<Location | undefined>(undefined);
    const [locationActivities, setLocationActivities] = useState<Activity[] | []>([]);
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const _location = await fetchData.getLocationById(id);
                setLocation(_location);
                const _locationActivities = await fetchData.getActivitiesForLocation(id);
                setLocationActivities(_locationActivities);
            }
        };
        onMount();
    }, [id]);

    const { t } = useTranslation();
    if (!location) {
        return null;
    }
    return (
        <div className={styles.searchResultElement}>
            {/* <div className={styles.rightSide}></div> */}

            <Link to={`/location/${location.id}`}>
                <img src={location.coverImage} alt="Cover" />
            </Link>

            <div className={styles.rightSide}>
                <Link to={`/location/${location.id}`}>
                    <Typography text={location.name} variant="h3" className={styles.title} />
                </Link>

                <div className={styles.resultType}>
                    <GrLocation /> <Typography text="Location" variant="body1" />
                </div>
                <Typography text={location.country} variant="body1" />
                <div className={styles.availableActivities}>
                    <Typography text={locationActivities.length} variant="body2" />
                    <Typography text={t("common.activities")} variant="body2" />
                </div>
            </div>
        </div>
    );
};
