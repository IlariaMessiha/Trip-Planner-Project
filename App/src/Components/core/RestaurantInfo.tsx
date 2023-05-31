import { Button, Paper, styled, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { RestaurantDto } from "../../types/dto/common/RestaurantDto";
import styles from "./RestaurantInfo.module.css";

interface RestaurantInfoProps {
    restaurant: RestaurantDto;
}
// const BuyTicketButton = styled(Button)({
//     borderRadius: "20px",
//     backgroundColor: "black",
//     width: "100%",
//     marginTop: "50px",
//     "&:hover": {
//         backgroundColor: "white",
//         color: "black",
//     },
// });
export const RestaurantInfo: FC<RestaurantInfoProps> = ({ restaurant }) => {
    const { t } = useTranslation();
    return (
        <Paper
            sx={{
                padding: "20px",
                width: "30%",
            }}
        >
            <Typography variant="h6">{t("restaurant.food", { type: restaurant.food })}</Typography>
            {/* <Typography className={styles.activityDescription}>{attraction.about}</Typography> */}
            {/* <Typography variant="h5">{t("attractions.suggestedDuration")}</Typography> */}

            <div className={styles.tickets}>
                <Typography variant="h6">
                    {t("restaurant.averageMealPrice")}
                    {t("restaurant.averageMealPerPerson", { amount: restaurant.avgMealPerPerson })}
                </Typography>
            </div>
            {/* {attraction.reservationLink && (
                <BuyTicketButton
                    className={styles.buyTicketButton}
                    variant="contained"
                    size="large"
                    href={attraction.reservationLink}
                >
                    <Typography variant="button">{t("attractions.buyTicket")}</Typography>
                </BuyTicketButton>
            )} */}
        </Paper>
    );
};
