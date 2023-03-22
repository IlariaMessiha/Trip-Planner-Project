import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    IconButton,
    Rating,
    styled,
    Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { HotelDto } from "../../../types/dto/common/HotelDto";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import styles from "./CardHotel.module.css";

interface CardHotelProps {
    hotel: HotelDto;
}
const FavoriteButton = styled(IconButton)({
    position: "absolute",
    backgroundColor: "white",
    color: "black",
    top: 6,
    right: 10,
    zIndex: 10,
});
const StarsRating = styled(Rating)({
    "&.MuiRating-root": {
        color: "blue",
    },
});
export const CardHotel: FC<CardHotelProps> = ({ hotel }) => {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <Card className={styles.item} sx={{ maxWidth: 345 }}>
                <Link key={hotel.id} to={`/hotel/${hotel.id}`}>
                    <CardActionArea sx={{ ":hover": { opacity: 0.9 } }}>
                        {hotel.imageUrl && (
                            <CardMedia
                                component="img"
                                height="194"
                                image={hotel.imageUrl}
                                alt={hotel.label}
                            />
                        )}
                        <FavoriteButton>
                            <FavoriteBorderOutlinedIcon />
                        </FavoriteButton>

                        <CardContent className={styles.hotelContent}>
                            <Typography variant="body1" className={styles.label}>
                                {hotel.label}
                            </Typography>
                            {hotel.rating && (
                                <StarsRating
                                    name="half-rating"
                                    defaultValue={hotel.rating}
                                    precision={0.5}
                                    readOnly
                                    sx={{}}
                                />
                            )}
                            {hotel.startingFromPrice && (
                                <Typography variant="body2">
                                    {t("hotels.startingFromPrice", {
                                        amount: hotel.startingFromPrice,
                                    })}
                                </Typography>
                            )}
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </div>
    );
};
