import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Paper, styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Map } from "../widgets/maps/Map";

import { FC } from "react";
import { useTranslation } from "react-i18next";

import { HotelDto } from "../../types/dto/common/HotelDto";
import styles from "./HotelInfo.module.css";

interface HotelInfoProps {
    hotel: HotelDto;
    className?: string;
}
const BuyTicketButton = styled(Button)({
    borderRadius: "20px",
    backgroundColor: "black",
    width: "100%",
    marginTop: "50px",
    "&:hover": {
        backgroundColor: "white",
        color: "black",
    },
});
export const HotelInfo: FC<HotelInfoProps> = ({ hotel, className }) => {
    const { t } = useTranslation();
    return (
        <Paper
            sx={{
                padding: "20px",
            }}
            className={className}
        >
            {hotel.address && (
                <div>
                    <Typography variant="subtitle1">
                        <LocationOnIcon fontSize="small" />
                        <span>{hotel.address}</span>
                    </Typography>
                </div>
            )}

            {hotel.rating && (
                <Box component="fieldset" borderColor="transparent">
                    <Rating name="rating-bar" value={hotel.rating} precision={0.5} readOnly />
                </Box>
            )}

            <div className={styles.tickets}>
                <Typography variant="h6">
                    {t("hotels.startingFromPrice", { amount: hotel.startingFromPrice })}
                </Typography>
            </div>

            {hotel.reservationLink && (
                <BuyTicketButton
                    className={styles.buyTicketButton}
                    variant="contained"
                    size="large"
                    href={hotel.reservationLink}
                >
                    <Typography variant="button">{t("hotels.bookNow")}</Typography>
                </BuyTicketButton>
            )}
            <div className={styles.mapContainer}>
                {hotel.mapLocation && (
                    <Map
                        items={[
                            {
                                lat: hotel.mapLocation.lat,
                                long: hotel.mapLocation.long,
                                label: hotel.label,
                            },
                        ]}
                        zoom={15}
                    />
                )}
            </div>
        </Paper>
    );
};
