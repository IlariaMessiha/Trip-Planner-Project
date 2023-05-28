import { FC } from "react";
import styles from "./HotelSearchResult.module.css";
import { useTranslation } from "react-i18next";
import HotelIcon from "@mui/icons-material/Hotel";
import { Link } from "react-router-dom";
import React from "react";
import { Paper, Typography } from "@mui/material";
import { HotelDto } from "../../../types/dto/common/HotelDto";

interface HotelSearchResultProps {
    item: HotelDto;
}
export const HotelSearchResult: FC<HotelSearchResultProps> = ({ item }) => {
    const { t } = useTranslation();

    if (!item) {
        return null;
    }
    return (
        <>
            <Paper className={styles.searchResultElement}>
                <Link to={`/hotel/${item.id}`} target="_blank" rel="noopener noreferrer">
                    {item.imageUrl && <img src={item.imageUrl} alt="Cover" />}
                </Link>

                <div className={styles.rightSide}>
                    <Link to={`/hotel/${item.id}`} target="_blank" rel="noopener noreferrer">
                        <Typography variant="h4" className={styles.title}>
                            {item.label}
                        </Typography>
                    </Link>

                    <div className={styles.resultType}>
                        <HotelIcon />

                        <Typography variant="body1">{t(String(`common.hotel`))}</Typography>
                    </div>
                    <Typography variant="body1">{item.address || ""} </Typography>
                </div>
            </Paper>
        </>
    );
};
