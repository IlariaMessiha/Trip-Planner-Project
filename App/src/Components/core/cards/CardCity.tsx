import { CardActionArea, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./CardCity.module.css";

import { CityDto } from "../../../types/dto/common/CityDto";

interface CardCityProps {
    city: CityDto;
}

export const CardCity: FC<CardCityProps> = ({ city }) => {
    return (
        <Card className={styles.item}>
            <Link key={city.id} to={`/city/${city.id}`}>
                <CardActionArea sx={{ ":hover": { opacity: 0.9 } }}>
                    {city.imageUrl && (
                        <CardMedia
                            component="img"
                            height="194"
                            image={city.imageUrl}
                            alt={city.label}
                            className={styles.image}
                        />
                    )}

                    <CardContent className={styles.cityContent}>
                        <Typography variant="body1" className={styles.label}>
                            {city.label}
                        </Typography>
                        {city.country && (
                            <Typography variant="body2">{city.country.label}</Typography>
                        )}
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
};
