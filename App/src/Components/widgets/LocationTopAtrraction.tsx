import { useTranslation } from "react-i18next";
import { FC, useState } from "react";
import { CardActivity } from "../core/CardActivity";
import { Typography } from "../core/Typography";
import styles from "./LocationTopAttraction.module.css";
import { Swiper } from "./Swiper";
import { Activity } from "../../models/Activity";
import React from "react";
import { fetchData } from "../../api/FetchData";

interface LocationTopAttractionProps {
    id?: string;
}
export const LocationTopAttraction: FC<LocationTopAttractionProps> = ({ id }) => {
    const [loctionActivities, setLocationActivities] = useState<Activity[] | []>([]);
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const _locationActivities = await fetchData.getActivitiesForLocation(id);

                setLocationActivities(_locationActivities);
            }
        };
        onMount();
    }, [id]);
    const { t } = useTranslation();
    return (
        <div className={styles.topAttraction}>
            <div className={styles.topAttractionHeader}>
                <Typography text={t("Locations.locationPage.topAttraction")} variant="h2" />
                <Typography
                    text={t("Locations.locationPage.topAttractionSlogan")}
                    variant="body1"
                />
            </div>

            <div className={styles.topAttractionSwiper}>
                {loctionActivities.length === 0 && <div> Loading... </div>}
                {loctionActivities.length > 0 && (
                    <Swiper
                        items={loctionActivities}
                        renderItem={activity => <CardActivity activity={activity} />}
                    />
                )}
            </div>
        </div>
    );
};
