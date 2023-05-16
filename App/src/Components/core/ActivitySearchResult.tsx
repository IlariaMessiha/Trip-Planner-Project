import { FC, useState, useEffect } from "react";

import styles from "./ActivitySearchResult.module.css";

import { useTranslation } from "react-i18next";
import { FaRunning, FaUtensils, FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchData } from "../../api/FetchData";
import React from "react";
import { Typography } from "@mui/material";

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
            const cityInfo = null;
            //  await fetchData.getCityById(item.city_id);
            const countryName = null;
            // await fetchData.getCountryForCity(item.city_id);

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
            <div className={styles.searchResultElement}>
                <Link to={`/activity/${item.id}`}>
                    <img src={require("../../assets/images/nice.jpg")} alt="Cover" />
                </Link>

                <div className={styles.rightSide}>
                    <Link to={`/activity/${item.id}`}>
                        <Typography variant="h3" className={styles.title}>
                            {item.label}
                        </Typography>
                    </Link>

                    <div className={styles.resultType}>
                        {type === "restaurant" ? (
                            <FaUtensils />
                        ) : type === "hotel" ? (
                            <FaBed />
                        ) : (
                            <FaRunning />
                        )}
                        <Typography variant="body1">{t(String(`common.${type}`))}</Typography>
                    </div>
                    <Typography variant="body1">{activityStr || ""} </Typography>
                </div>
            </div>
        </>
    );
};
