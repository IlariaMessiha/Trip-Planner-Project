import { useEffect, useState } from "react";
import { Container } from "../Components/core/layout/Container";
import { Section } from "../Components/core/layout/Section";
import { ChatbotButton } from "../Components/widgets/ChatbotButton";
import { fetchData } from "../api/FetchData";
import styles from "./Dashboard.module.css";

import { SectionItemType } from "../Components/widgets/SectionItemType";
import { Swiper } from "../Components/widgets/Swiper";

import { SectionDto } from "../types/dto/common/SectionDto";

export const Dashboard = () => {
    const [sections, setSections] = useState<SectionDto[]>([]);

    useEffect(() => {
        const onMount = async () => {
            const response = await fetchData.getDashboard();
            setSections(response.sections);
        };

        onMount();
    }, []);

    return (
        <div>
            <Container className={styles.container}>
                {sections.map((section, i) => {
                    return (
                        <Section title={section.title} subtitle={section.subtitle} key={i}>
                            {section.items.length === 0 && <div> Loading... </div>}
                            {section.items.length > 0 && (
                                <Swiper
                                    items={section.items}
                                    renderItem={item => (
                                        <SectionItemType item={item} key={item.value.id} />
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
