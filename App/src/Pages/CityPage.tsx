import { Container } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/FetchData";
import { LocationTravelAdvice } from "../Components/core/LocationTravelAdvice";
import { Typography } from "../Components/core/Typography";
import { LocationTopAttraction } from "../Components/widgets/LocationTopAtrraction";
import { City } from "../models/City";
import styles from "./CityPage.module.css";

export const CityPage = () => {
    const { t } = useTranslation();
    const [city, setCity] = useState<City | undefined>(undefined);
    const { id } = useParams();
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const _city = await fetchData.getCityById(id);
                setCity(_city);
            }
        };
        onMount();
    }, [id]);

    if (!city) {
        return null;
    }

    return (
        <Container className={styles.container}>
            <Typography text={city.label} variant="h1" />
            <LocationTopAttraction id={id} />
            <LocationTravelAdvice />
        </Container>
    );
};
