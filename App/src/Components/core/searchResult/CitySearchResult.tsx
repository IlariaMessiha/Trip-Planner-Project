import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CityDto } from "../../../types/dto/common/CityDto";
import styles from "./CitySearchResult.module.css";

interface CitySearchResultProps {
    item: CityDto;
}
export const CitySearchResult: FC<CitySearchResultProps> = ({ item }) => {
    const { t } = useTranslation();
    if (!item) {
        return null;
    }
    return (
        <Paper className={styles.searchResultElement}>
            <Link to={`/city/${item.id}`}>
                {item.imageUrl && <img src={item.imageUrl} alt="Cover" />}
            </Link>

            <div className={styles.rightSide}>
                <Link to={`/city/${item.id}`}>
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
