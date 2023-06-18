import { Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LocationTravelAdvice } from "../Components/core/LocationTravelAdvice";
import { LocationTopAttraction } from "../Components/widgets/LocationTopAtrraction";
import { fetchData } from "../api/FetchData";
import { useAuthContext } from "../context/authContext";
import { CityDto } from "../types/dto/common/CityDto";
import { SectionDto } from "../types/dto/common/SectionDto";
import styles from "./CityPage.module.css";
import { FavoriteItem } from "../types/dto/common/FavoriteItemDto";

export const CityPage = () => {
    const [city, setCity] = useState<CityDto | undefined>(undefined);
    const [sections, setSections] = useState<SectionDto[] | undefined>(undefined);
    const [userFavs, setUserFavs] = useState<FavoriteItem[]>([]);
    const { loggedInUser } = useAuthContext();
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

    useEffect(() => {
        const getUserLikes = async (id: number, token: string) => {
            const userFavs = await fetchData.getProfileFavorites(id, token);
            setUserFavs(userFavs);
        };
        const token = localStorage.getItem("accessToken");
        if (loggedInUser && token) {
            getUserLikes(loggedInUser.id, token);
        } else {
            setUserFavs([]);
        }
    }, [loggedInUser]);

    if (!city) {
        return null;
    }

    return (
        <Container className={styles.container}>
            <Typography variant="h4"> {city.label}</Typography>
            <LocationTravelAdvice />
            {sections && <LocationTopAttraction sections={sections} userFavs={userFavs} />}
        </Container>
    );
};
