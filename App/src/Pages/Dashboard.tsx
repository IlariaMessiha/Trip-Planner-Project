import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchData } from "../api/FetchData";
import { CardAttraction } from "../Components/core/cards/CardAttraction";
import { CardCity } from "../Components/core/cards/CardCity";
import { Container } from "../Components/core/layout/Container";
import { Section } from "../Components/core/layout/Section";

import { SearchEngineAutocomplete } from "../Components/widgets/SearchEngineAutocomplete";
import { SectionItemType } from "../Components/widgets/SectionItemType";
import { Swiper } from "../Components/widgets/Swiper";

import { AttractionDto } from "../types/dto/common/AttractionDto";
import { CityDto } from "../types/dto/common/CityDto";
import { SectionDto } from "../types/dto/common/SectionDto";

export const Dashboard = () => {
    const { t } = useTranslation();
    const [cities, setCities] = useState<CityDto[]>([]);
    const [sections, setSections] = useState<SectionDto[]>([]);

    useEffect(() => {
        const onMount = async () => {
            const response = await fetchData.getDashboard();
            setSections(response.sections);
        };

        onMount();
    }, []);

    return (
        <Container>
            <Typography variant="h4">{t("dashboard.slogan")}</Typography>

            <SearchEngineAutocomplete />
            {sections.map(section => {
                return (
                    <Section title={section.title} subtitle={section.subtitle}>
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
    );
};
