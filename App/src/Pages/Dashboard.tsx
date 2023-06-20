import { useEffect, useState } from "react";
import { Container } from "../Components/core/layout/Container";
import { Section } from "../Components/core/layout/Section";
import { ChatbotButton } from "../Components/widgets/ChatbotButton";
import { SectionItemType } from "../Components/widgets/SectionItemType";
import { Swiper } from "../Components/widgets/Swiper";
import { fetchData } from "../api/FetchData";
import { useAuthContext } from "../context/authContext";
import styles from "./Dashboard.module.css";

import { SearchEngineAutocomplete } from "../Components/widgets/SearchEngineAutocomplete";
import { SectionDto } from "../types/dto/common/SectionDto";
import { SectionItemDto } from "../types/dto/common/SectionItemDto";

export const Dashboard = () => {
    const [sections, setSections] = useState<SectionDto[]>([]);
    const [userFavs, setUserFavs] = useState<SectionItemDto[]>([]);
    const { loggedInUser } = useAuthContext();

    useEffect(() => {
        const onMount = async () => {
            const response = await fetchData.getDashboard();
            setSections(response.sections);
        };

        onMount();
    }, []);

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

    return (
        <div>
            <SearchEngineAutocomplete />
            <Container className={styles.container}>
                {sections.map((section, i) => {
                    return (
                        <Section title={section.title} subtitle={section.subtitle} key={i}>
                            {section.items.length === 0 && <div> Loading... </div>}
                            {section.items.length > 0 && (
                                <Swiper
                                    items={section.items}
                                    renderItem={item => (
                                        <SectionItemType
                                            item={item}
                                            key={item.value.id}
                                            userFavs={userFavs}
                                        />
                                    )}
                                />
                            )}
                        </Section>
                    );
                })}
            </Container>
            <ChatbotButton />
        </div>
    );
};
