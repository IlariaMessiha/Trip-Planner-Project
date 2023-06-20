import { CardContent, Rating, styled, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { HotelDto } from "../../../types/dto/common/HotelDto";
import { CardBase } from "./CardBase";

interface CardHotelProps {
    hotel: HotelDto;
}

const StarsRating = styled(Rating)({
    "&.MuiRating-root": {
        color: "blue",
    },
});
export const CardHotel: FC<CardHotelProps> = ({ hotel }) => {
    const { t } = useTranslation();
    return (
        <CardBase
            navigateTo={`/hotel/${hotel.id}`}
            imageAlt={hotel.label}
            imageUrl={hotel.imageUrl}
        >
            <CardContent>
                <Typography variant="body1">{hotel.label}</Typography>
                {hotel.rating && (
                    <StarsRating
                        size="small"
                        name="half-rating"
                        defaultValue={hotel.rating}
                        precision={0.5}
                        readOnly
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
        </CardBase>
    );
};
