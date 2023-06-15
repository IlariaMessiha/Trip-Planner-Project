import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";

import { ProfileHeader } from "../Components/core/ProfileHeader";
import { ProfileTabs } from "../Components/core/ProfileTabs";
import { Container } from "../Components/core/layout/Container";
import { FavoritesList } from "../Components/widgets/FavoritesList";
import { ReviewList } from "../Components/widgets/ReviewList";
import { fetchData } from "../api/FetchData";
import { FavoriteItem } from "../types/dto/common/FavoriteItemDto";

import styles from "./ProfilePage.module.css";
import { ReviewDto } from "../types/dto/reviews/ReviewDto";

export const ProfilePage = () => {
    const { loggedInUser, setUserInContext } = useAuthContext();
    const [value, setValue] = useState<string>("1");
    const [reviews, setReviews] = useState<ReviewDto[]>([]);
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        const onMount = async () => {
            if (loggedInUser && token) {
                const response = await fetchData.getProfileReviews(loggedInUser.id, token);
                setReviews(response);
            }
        };
        onMount();
    }, [loggedInUser, token]);

    if (!loggedInUser || !token) {
        return null;
    }
    const handleChange = async (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        if (newValue === "1") {
            const response = await fetchData.getProfileReviews(loggedInUser.id, token);
            setReviews(response);
        }
        if (newValue === "2") {
            const response = await fetchData.getProfileFavorites(loggedInUser.id, token);
            setFavorites(response);
        }
    };
    const logOut = () => {
        localStorage.removeItem("accessToken");
        setUserInContext(null);
    };

    return (
        <Container className={styles.container}>
            <ProfileHeader loggedInUser={loggedInUser} logOut={logOut} />

            <div className={styles.content}>
                <ProfileTabs handleChange={handleChange} value={value} />
                <div className={styles.tabContent}>
                    {value === "1" && <ReviewList reviews={reviews} />}
                    {value === "2" && favorites && <FavoritesList favorites={favorites} />}
                </div>
            </div>
        </Container>
    );
};
