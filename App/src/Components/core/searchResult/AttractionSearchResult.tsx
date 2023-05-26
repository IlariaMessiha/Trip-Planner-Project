import { FC } from "react";
import styles from "./AttractionSearchResult.module.css";
import { useTranslation } from "react-i18next";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { Link } from "react-router-dom";
import React from "react";
import { Paper, Typography } from "@mui/material";
import { AttractionDto } from "../../../types/dto/common/AttractionDto";

interface AttractionSearchResultProps {
    item: AttractionDto;
}
export const AttractionSearchResult: FC<AttractionSearchResultProps> = ({ item }) => {
    const { t } = useTranslation();

    if (!item) {
        return null;
    }
    return (
        <>
            <Paper className={styles.searchResultElement}>
                <Link to={`/attraction/${item.id}`} target="_blank" rel="noopener noreferrer">
                    {item.imageUrl && <img src={item.imageUrl} alt="Cover" />}
                </Link>

                <div className={styles.rightSide}>
                    <Link to={`/attraction/${item.id}`} target="_blank" rel="noopener noreferrer">
                        <Typography variant="h4" className={styles.title}>
                            {item.label}
                        </Typography>
                        {/* {item.item.label} */}
                    </Link>

                    <div className={styles.resultType}>
                        <DirectionsRunIcon />

                        <Typography variant="body1">{t(String(`common.attraction`))}</Typography>
                    </div>
                    <Typography variant="body1">{item.address || ""} </Typography>
                </div>
            </Paper>
        </>
    );
};
