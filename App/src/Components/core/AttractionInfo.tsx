import { Button, Paper, styled } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Attraction } from "../../models/Attraction";
import styles from "./AttractionInfo.module.css";
import { Typography } from "./Typography";

interface AttractionInfoProps {
    attraction: Attraction;
}
const ByTicketButton = styled(Button)({
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
            <Typography text={t("Activities.about")} variant="h2" />
            <Typography text={attraction.about} className={styles.activityDescription} />
            <Typography text={t("Activities.suggested duration")} variant="h4" />
            <div className={styles.suggestedDuration}>
                <Typography text={attraction.suggested_duration} />
                <Typography text={t("Activities.hours")} />
            </div>
            <div className={styles.tickets}>
                <Typography text={t("Activities.ticket price")} variant="h4" />
                <Typography text={attraction.entry_fee} />
            </div>
            <ByTicketButton variant="contained" size="large">
                <Typography text={t("Activities.buy ticket")} />
            </ByTicketButton>
        </Paper>
    );
};
