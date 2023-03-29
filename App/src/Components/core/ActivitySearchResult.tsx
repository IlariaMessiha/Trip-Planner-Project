import { FC, useState, useEffect } from "react";

import { Typography } from "./Typography";
import styles from "./ActivitySearchResult.module.css";

import { useTranslation } from "react-i18next";
import { FaRunning, FaUtensils, FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchData } from "../../api/FetchData";
import React from "react";

interface ActivitySearchResultProps {
    item: any;
    type: string;
}
export const ActivitySearchResult: FC<ActivitySearchResultProps> = ({ item, type }) => {
    //return <div></div>;
    // const [activity, setAtivity] = useState<Activity | undefined>(undefined);
    const [activityCityInfo, setAtivityCityInfo] = useState<any>();
    const [activityCountryInfo, setAtivityCountryInfo] = useState<any>();
    const [activityStr, setActivityStr] = useState<string>();
    const { t } = useTranslation();
    useEffect(() => {
        const onMount = async () => {
            const cityInfo = await fetchData.getCityById(item.city_id);
            const countryName = await fetchData.getCountryForCity(item.city_id);

            setAtivityCityInfo(cityInfo);
            setAtivityCountryInfo(countryName);
        };
        onMount();
    }, []);

    useEffect(() => {
        const onMount = async () => {
            if (activityCityInfo && activityCountryInfo) {
                setActivityStr(String(activityCountryInfo.label + ", " + activityCityInfo.label));
            }
        };
        onMount();
    }, [activityCityInfo, activityCountryInfo]);
    if (!item) {
        return null;
    }
    return (
        <>
            {console.log(activityCityInfo)}
            {console.log(activityCountryInfo)}
            <div className={styles.searchResultElement}>
                {/* <div className={styles.rightSide}></div>  */}

                <Link to={`/activity/${item.id}`}>
                    <img
                        src={
                            "https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk1NzY0MDg3NTEzMTYzNDEy/gettyimages-142198198.jpg"
                        }
                        alt="Cover"
                    />
                </Link>

                <div className={styles.rightSide}>
                    <Link to={`/activity/${item.id}`}>
                        <Typography text={item.label} variant="h3" className={styles.title} />
                    </Link>

                    <div className={styles.resultType}>
                        {type === "restaurant" ? (
                            <FaUtensils />
                        ) : type === "hotel" ? (
                            <FaBed />
                        ) : (
                            <FaRunning />
                        )}
                        <Typography text={t(String(`common.${type}`))} variant="body1" />
                    </div>
                    <Typography text={activityStr || ""} variant="body1" />
                    {/* <div className={styles.availableReviews}>
                    {activity.review ? (
                        <Typography text={activity.review.length} variant="body2" />
                    ) : (
                        <Typography text="0" variant="body2" />
                    )}
                    <Typography text={t("common.reviews")} variant="body2" />
                </div> */}
                </div>
            </div>
        </>
    );
};
