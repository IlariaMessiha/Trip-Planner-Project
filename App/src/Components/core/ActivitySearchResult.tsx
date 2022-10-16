import { FC, useState } from "react";

import { Typography } from "./Typography";
import styles from "./ActivitySearchResult.module.css";
import { Activity } from "../../models/Activity";
import { useTranslation } from "react-i18next";
import { FaRunning } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchData } from "../../api/FetchData";
import React from "react";

interface ActivitySearchResultProps {
    id: string;
}
export const ActivitySearchResult: FC<ActivitySearchResultProps> = ({ id }) => {
    const [activity, setAtivity] = useState<Activity | undefined>(undefined);
    const { t } = useTranslation();
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const _activity = await fetchData.getActivityById(id);
                setAtivity(_activity);
            }
        };
        onMount();
    }, [id]);
    if (!activity) {
        return null;
    }
    return (
        <div className={styles.searchResultElement}>
            {/* <div className={styles.rightSide}></div> */}

            <Link to={`/activity/${activity.id}`}>
                <img src={activity.coverImage} alt="Cover" />
            </Link>

            <div className={styles.rightSide}>
                <Link to={`/activity/${activity.id}`}>
                    <Typography text={activity.name} variant="h3" className={styles.title} />
                </Link>

                <div className={styles.resultType}>
                    <FaRunning />
                    <Typography text={t("common.activity")} variant="body1" />
                </div>
                <Typography text={activity.location.name} variant="body1" />
                <div className={styles.availableReviews}>
                    {activity.review ? (
                        <Typography text={activity.review.length} variant="body2" />
                    ) : (
                        <Typography text="0" variant="body2" />
                    )}
                    <Typography text={t("common.reviews")} variant="body2" />
                </div>
            </div>
        </div>
    );
};
