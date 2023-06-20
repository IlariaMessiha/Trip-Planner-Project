import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";

import { ProfileHeader } from "../Components/core/ProfileHeader";
import { ProfileTabs } from "../Components/core/ProfileTabs";
import { Container } from "../Components/core/layout/Container";
import { FavoritesList } from "../Components/widgets/FavoritesList";
import { ReviewList } from "../Components/widgets/ReviewList";
import { fetchData } from "../api/FetchData";

import { PageLayout } from "../Components/core/layout/PageLayout";
import { TripProfileItems } from "../Components/widgets/trip/TripProfileItems";
import { SectionItemDto } from "../types/dto/common/SectionItemDto";
import { TripDto } from "../types/dto/common/TripDto";
import { ReviewDto } from "../types/dto/reviews/ReviewDto";
import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
    const { loggedInUser, setUserInContext } = useAuthContext();
    const [value, setValue] = useState<string>("1");
    const [reviews, setReviews] = useState<ReviewDto[]>([]);
    const [favorites, setFavorites] = useState<SectionItemDto[]>([]);
    const [trips, setTrips] = useState<TripDto[]>([]);
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
        if (newValue === "3") {
            const response = await fetchData.getMyTrips();
            setTrips(response.trips);
        }
    };
    const logOut = () => {
        localStorage.removeItem("accessToken");
        setUserInContext(null);
    };

    return (
        <PageLayout>
            <Container className={styles.container}>
                <ProfileHeader loggedInUser={loggedInUser} logOut={logOut} />

                <div className={styles.content}>
                    <div className={styles.tabWrapper}>
                        <ProfileTabs handleChange={handleChange} value={value} />
                    </div>
                    <div className={styles.tabContent}>
                        {value === "1" && <ReviewList reviews={reviews} />}
                        {value === "2" && favorites && <FavoritesList favorites={favorites} />}
                        {value === "3" && trips && <TripProfileItems trips={trips} />}
                    </div>
                </div>
            </Container>
        </PageLayout>
    );
};
