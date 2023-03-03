import { Container, IconButton, styled } from "@mui/material";
import React from "react";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/FetchData";
import { Attraction } from "../models/Attraction";
import styles from "./AttractionPage.module.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Typography } from "../Components/core/Typography";
import dayjs from "dayjs";
import { AttractionInfo } from "../Components/core/AttractionInfo";
import { AttractionReviewList } from "../Components/widgets/AttractionReviewList";

const ShareButton = styled(IconButton)({
    color: "black",
});
const FavoriteButton = styled(IconButton)({
    color: "black",
});

export const AttractionPage = () => {
    var utc = require("dayjs/plugin/utc");
    var timezone = require("dayjs/plugin/timezone");
    dayjs.extend(timezone);
    const { t } = useTranslation();
    const [attraction, setAttraction] = React.useState<Attraction | undefined>(undefined);
    const { id } = useParams();
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const _attraction = await fetchData.getAttractionById(id);
                setAttraction(_attraction);
            }
        };
        onMount();
    }, [id]);

    if (!attraction) {
        return null;
    }
    return (
        <Container>
            <Typography text={attraction.label} variant="h1" />
            <div className={styles.header}>
                <div className={styles.communicate}>
                    <div className={styles.openHours}>
                        <Typography text="Opening hours" variant="h4" />
                        <Typography text="From:" variant="h4" />
                        <Typography
                            text={dayjs(attraction.openning_hours_from).format("HH:mm")}
                            variant="h4"
                        />
                        <Typography text="To:" variant="h4" />
                        <Typography
                            text={dayjs(attraction.openning_hours_to).format("HH:mm")}
                            variant="h4"
                        />
                    </div>
                    <a href={attraction.website}>
                        <Typography
                            text={t("Activities.visit website")}
                            variant="h4"
                            className={styles.headerButtons}
                        />
                    </a>
                    <a href={attraction.phone}>
                        <Typography
                            text={t("Activities.call")}
                            variant="h4"
                            className={styles.headerButtons}
                        />
                    </a>
                    <a href={attraction.email}>
                        <Typography text="Email" variant="h4" className={styles.headerButtons} />
                    </a>
                </div>
                <div className={styles.icons}>
                    <ShareButton className={styles.shareButton}>
                        <IosShareIcon />
                    </ShareButton>
                    <FavoriteButton className={styles.shareButton}>
                        <FavoriteBorderIcon />
                    </FavoriteButton>
                </div>
            </div>
            <div className={styles.imageAndDescription}>
                <AttractionInfo attraction={attraction} />
            </div>
            <div className={styles.reviewsContainer}>
                <AttractionReviewList attraction={attraction} />
            </div>
        </Container>
    );
};
