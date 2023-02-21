import { Container } from "../Components/core/layout/Container";
import { Typography } from "../Components/core/Typography";

import "../Components/widgets/Swiper.css";
import { Location } from "../models/Location";
import styles from "./LocationPage.module.css";
import { useParams } from "react-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LocationGallery } from "../Components/widgets/LocationGallery";
import { LocationTopAttraction } from "../Components/widgets/LocationTopAtrraction";
import { LocationTravelAdvice } from "../Components/core/LocationTravelAdvice";
import { fetchData } from "../api/FetchData";

export const LocationPage = () => {
    const { t } = useTranslation();
    const [location, setLocation] = useState<Location | undefined>(undefined);
    const { id } = useParams();
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const _location = await fetchData.getLocationById(id);
                setLocation(_location);
            }
        };
        onMount();
    }, [id]);

    if (!location) {
        return null;
    }

    return (
        <Container className={styles.container}>
            <Typography text={location.name} variant="h1" />

            <LocationGallery location={location} />
            <Typography
                text={t(`Locations.${location.name}.description`)}
                className={styles.locationDescription}
            />
            <LocationTopAttraction id={id} />
            <LocationTravelAdvice />
        </Container>
    );
};
