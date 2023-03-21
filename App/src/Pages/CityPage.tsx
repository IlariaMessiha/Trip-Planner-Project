import { Container } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/FetchData";
import { LocationTravelAdvice } from "../Components/core/LocationTravelAdvice";
import { Typography } from "../Components/core/Typography";
import { LocationTopAttraction } from "../Components/widgets/LocationTopAtrraction";

import { AttractionDto } from "../types/dto/common/AttractionDto";
import { CityDto } from "../types/dto/common/CityDto";
import styles from "./CityPage.module.css";

export const CityPage = () => {
    const [city, setCity] = useState<CityDto | undefined>(undefined);
    const [attractions, setAttractions] = useState<AttractionDto[] | undefined>(undefined);
    const { id } = useParams();
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const _city = await fetchData.getCity(id);
                setCity(_city.city);
                setAttractions(_city.attractions);
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
            {attractions && <LocationTopAttraction attractions={attractions} />}
            <LocationTravelAdvice />
        </Container>
    );
};
