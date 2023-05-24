import { FC, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styles from "./CitySearchResult.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React from "react";
import { Paper, Typography } from "@mui/material";
import { CityDto } from "../../../types/dto/common/CityDto";

interface LocationSearchResultProps {
    item: CityDto;
}
export const LocationSearchResult: FC<LocationSearchResultProps> = ({ item }) => {
    const { t } = useTranslation();
    if (!item) {
        return null;
    }
    return (
        <Paper className={styles.searchResultElement}>
            <Link to={`/city/${item.id}`} target="_blank" rel="noopener noreferrer">
                {item.imageUrl && <img src={item.imageUrl} alt="Cover" />}
            </Link>

            <div className={styles.rightSide}>
                <Link to={`/attraction/${item.id}`}>
                    <Typography variant="h4" className={styles.title}>
                        {item.label}
                    </Typography>
                </Link>
                <Typography variant="body1">{item.country.label}</Typography>
                <div className={styles.resultType}>
                    <LocationOnIcon />
                    <Typography variant="body1">{t(`common.City`)}</Typography>
                </div>
            </div>
        </Paper>
    );
};
