import { FC } from "react";
import styles from "./ActivitySearchResult.module.css";
import { useTranslation } from "react-i18next";
import { FaRunning, FaUtensils, FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import { Typography } from "@mui/material";

interface ActivitySearchResultProps {
    item: any;
    type: string;
}
export const ActivitySearchResult: FC<ActivitySearchResultProps> = ({ item, type }) => {
    const { t } = useTranslation();

    if (!item) {
        return null;
    }
    return (
        <>
            <div className={styles.searchResultElement}>
                <Link
                    to={`/${type.toLowerCase()}/${item.item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={require("../../assets/images/new york.jpg")} alt="Cover" />
                </Link>

                <div className={styles.rightSide}>
                    <Link
                        to={`/${type.toLowerCase()}/${item.item.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Typography variant="h3" className={styles.title}>
                            {item.item.label}
                        </Typography>
                        {/* {item.item.label} */}
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
                    <Typography variant="body1">{item.item.address || ""} </Typography>
                </div>
            </div>
        </>
    );
};
