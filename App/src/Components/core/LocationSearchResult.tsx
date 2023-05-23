import { FC, useState } from "react";
import { GrLocation } from "react-icons/gr";
import styles from "./LocationSearchResult.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React from "react";
import { Typography } from "@mui/material";

interface LocationSearchResultProps {
    item: any;
    type: string;
}
export const LocationSearchResult: FC<LocationSearchResultProps> = ({ item, type }) => {
    const { t } = useTranslation();
    if (!item) {
        return null;
    }
    return (
        <div className={styles.searchResultElement}>
            {/* <div className={styles.rightSide}></div> */}

            <Link
                to={`/${type.toLowerCase()}/${item.item.id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={require("../../assets/images/new york.jpg")} alt="Cover" />
                {/* 
                not sure about the way of importing the image
                <img src={item.item.imageUrl} alt="Cover" /> 
                */}
            </Link>

            <div className={styles.rightSide}>
                <Link to={`/attraction/${item.item.id}`}>
                    <Typography variant="h3" className={styles.title}>
                        {item.item.label}
                    </Typography>
                </Link>
                <Typography variant="body1">{item.item.country.label}</Typography>
                <div className={styles.resultType}>
                    <GrLocation /> <Typography variant="body1">{t(`common.${type}`)}</Typography>
                </div>

                <div className={styles.availableActivities}>
                    {/* {<Typography text={locationActivities.length} variant="body2" />} */}
                    <Typography variant="body2">{t("common.activities")} </Typography>
                </div>
            </div>
        </div>
    );
};
