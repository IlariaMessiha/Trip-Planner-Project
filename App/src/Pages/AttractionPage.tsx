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

import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { AttractionInfo } from "../Components/core/AttractionInfo";
import { AttractionReviewList } from "../Components/widgets/AttractionReviewList";
import { SharePopup } from "../Components/widgets/SharePopup";
import Tooltip from "@mui/material/Tooltip";

const ShareButton = styled(IconButton)({
    color: "black",
});
const FavoriteButton = styled(IconButton)({
    color: "black",
});
const ReviewButton = styled(IconButton)({
    color: "black",
});

export const AttractionPage = () => {
    const [open, setOpen] = React.useState(false);
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
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    if (!attraction) {
        return null;
    }
    return (
        <Container>
            <Typography text={attraction.label} variant="h1" />
            <div className={styles.header}>
                <div className={styles.communicate}>
                    <div className={styles.openHours}>
                        <Typography text={t("attractions.open-hours")} variant="h4" />
                        <Typography text={t("attractions.from")} variant="h4" />
                        <Typography
                            text={dayjs(attraction.openning_hours_from).format("HH:mm")}
                            variant="h4"
                        />
                        <Typography text={t("attractions.to")} variant="h4" />

                        <Typography
                            text={dayjs(attraction.openning_hours_to).format("HH:mm")}
                            variant="h4"
                        />
                    </div>
                    <a href={attraction.website}>
                        <Typography
                            text={t("attractions.visit website")}
                            variant="h4"
                            className={styles.headerButtons}
                        />
                    </a>
                    <a href={attraction.phone}>
                        <Typography
                            text={t("attractions.call")}
                            variant="h4"
                            className={styles.headerButtons}
                        />
                    </a>
                    <a href={attraction.email}>
                        <Typography text="Email" variant="h4" className={styles.headerButtons} />
                    </a>
                </div>
                <div className={styles.icons}>
                    <ShareButton className={styles.shareButton} onClick={handleClickOpen}>
                        <IosShareIcon />
                    </ShareButton>
                    <SharePopup url={window.location.href} open={open} onClose={handleClose} />
                    <FavoriteButton className={styles.shareButton}>
                        <FavoriteBorderIcon />
                    </FavoriteButton>
                    <Tooltip title={t("common.review")}>
                        <ReviewButton>
                            <EditIcon className={styles.icon} />
                        </ReviewButton>
                    </Tooltip>
                </div>
            </div>
            <div className={styles.imageAndDescription}>
                <AttractionInfo attraction={attraction} />
            </div>
            <div className={styles.reviewsContainer}>
                <AttractionReviewList reviews={attraction.attraction_review} />
            </div>
        </Container>
    );
};
