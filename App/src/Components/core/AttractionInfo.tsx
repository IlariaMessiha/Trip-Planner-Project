import { Button, Paper, styled } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AttractionDto } from "../../types/dto/common/AttractionDto";
import styles from "./AttractionInfo.module.css";
import { Typography } from "./Typography";

interface AttractionInfoProps {
    attraction: AttractionDto;
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
export const AttractionInfo: FC<AttractionInfoProps> = ({ attraction }) => {
    const { t } = useTranslation();
    return (
        <Paper
            sx={{
                padding: "20px",
                width: "30%",
            }}
        >
            <Typography text={t("attractions.about")} variant="h2" />
            <Typography text={attraction.about} className={styles.activityDescription} />
            <Typography text={t("attractions.suggestedDuration")} variant="h4" />
            <div className={styles.suggestedDuration}>
                <Typography
                    text={t("attractions.suggestedDurationFormat", {
                        duration: attraction.suggestedDuration,
                    })}
                />
            </div>
            <div className={styles.tickets}>
                <Typography text={t("attractions.ticketPrice")} variant="h4" />
                <Typography
                    text={t("attractions.ticketPriceFormat", { amount: attraction.entryFee })}
                />
            </div>
            {attraction.reservationLink && (
                <BuyTicketButton
                    className={styles.buyTicketButton}
                    variant="contained"
                    size="large"
                    href={attraction.reservationLink}
                >
                    <Typography text={t("attractions.buyTicket")} />
                </BuyTicketButton>
            )}
        </Paper>
    );
};
