import { styled } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Container } from "../Components/core/layout/Container";
import { Typography } from "../Components/core/Typography";
import { Activity } from "../models/Activity";
import styles from "./ActivityPage.module.css";
import IconButton from "@mui/material/IconButton";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { ActivityReviewList } from "../Components/widgets/ActivityReviewList";
import { ActivityGallery } from "../Components/widgets/ActivityGallery";

import { ActivityInfo } from "../Components/core/ActivityInfo";
import { fetchData } from "../api/FetchData";

const ShareButton = styled(IconButton)({
    color: "black",
});
const FavoriteButton = styled(IconButton)({
    color: "black",
});

export const ActivityPage = () => {
    const { t } = useTranslation();
    const [activity, setActivity] = React.useState<Activity | undefined>(undefined);
    const { id } = useParams();
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const _activity = await fetchData.getActivityById(id);
                setActivity(_activity);
            }
        };
        onMount();
    }, [id]);

    if (!activity) {
        return null;
    }
    return (
        <Container>
            <Typography text={activity.name} variant="h1" />
            <div className={styles.header}>
                <div className={styles.communicate}>
                    <div className={styles.openHours}>
                        <Typography text={t("Activities.open hours") + ":"} variant="h4" />
                        <Typography text={activity.openHours} variant="h4" />
                    </div>
                    <a href={activity.website}>
                        <Typography
                            text={t("Activities.visit website")}
                            variant="h4"
                            className={styles.headerButtons}
                        />
                    </a>

                    <a href={activity.phoneNumber}>
                        <Typography
                            text={t("Activities.call")}
                            variant="h4"
                            className={styles.headerButtons}
                        />
                    </a>
                    <a href={activity.email}>
                        <Typography text="Email" variant="h4" className={styles.headerButtons} />
                    </a>

                    <Typography
                        text={t("common.review")}
                        variant="h4"
                        className={styles.headerButtons}
                    />
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
                <ActivityInfo activity={activity} />

                <ActivityGallery activity={activity} className={styles.image} />
            </div>
            <div className={styles.reviewsContainer}>
                <ActivityReviewList activity={activity} />
            </div>
        </Container>
    );
};
