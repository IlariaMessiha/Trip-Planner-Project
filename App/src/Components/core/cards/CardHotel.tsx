import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    IconButton,
    Rating,
    styled,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { HotelDto } from "../../../types/dto/common/HotelDto";
import { Typography } from "../Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./CardHotel.module.css";

interface CardHotelProps {
    hotel: HotelDto;
}
const FavoriteButton = styled(IconButton)({
    position: "absolute",
    backgroundColor: "white",
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
                {hotel.imageUrl && (
                    <CardMedia
                        component="img"
                        height="194"
                        image={hotel.imageUrl}
                        alt={hotel.label}
                    />
                )}
                <FavoriteButton>
                    <FavoriteIcon />
                </FavoriteButton>
                <Link key={hotel.id} to={`/hotel/${hotel.id}`}>
                    <CardActionArea sx={{ height: "100%" }}>
                        <CardContent className={styles.hotelContent}>
                            <Typography text={hotel.label} variant="h4" />
                            {/* {hotelCity ? (
                                <Typography text={hotelCity?.label} />
                            ) : (
                                <div></div>
                            )}
                            <div className={styles.availableReviews}>
                                {hotelReviews ? (
                                    <Typography text={hotelReviews.length} variant="body2" />
                                ) : (
                                    <Typography text="0" variant="body2" />
                                )}

                                <Typography text={t("common.reviews")} variant="body2" />
                            </div> */}

                            {hotel.rating && (
                                <StarsRating
                                    name="half-rating"
                                    defaultValue={hotel.rating}
                                    precision={0.5}
                                    readOnly
                                    sx={{}}
                                />
                            )}
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </div>
    );
};
