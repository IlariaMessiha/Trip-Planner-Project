import { Container, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/FetchData";
import { LocationTravelAdvice } from "../Components/core/LocationTravelAdvice";
import { LocationTopAttraction } from "../Components/widgets/LocationTopAtrraction";

import { AttractionDto } from "../types/dto/common/AttractionDto";
import { CityDto } from "../types/dto/common/CityDto";
import { SectionDto } from "../types/dto/common/SectionDto";
import styles from "./CityPage.module.css";

export const CityPage = () => {
    const [city, setCity] = useState<CityDto | undefined>(undefined);
    const [sections, setSections] = useState<SectionDto[] | undefined>(undefined);
    const { id } = useParams();
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const _city = await fetchData.getCity(id);
                setCity(_city.city);
                setSections(_city.sections);
            }
        };
        onMount();
    }, [id]);

    if (!city) {
        return null;
    }

    return (
        <Container className={styles.container}>
            <Typography variant="h3"> {city.label}</Typography>
            <LocationTravelAdvice />
            {sections && <LocationTopAttraction sections={sections} />}
        </Container>
    );
};
