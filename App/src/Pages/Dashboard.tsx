import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchData } from "../api/FetchData";
import { CardAttraction } from "../Components/core/CardAttraction";
import { CardCity } from "../Components/core/CardCity";
import { Container } from "../Components/core/layout/Container";
import { Section } from "../Components/core/layout/Section";
import { Typography } from "../Components/core/Typography";
import { SearchEngineAutocomplete } from "../Components/widgets/SearchEngineAutocomplete";
import { Swiper } from "../Components/widgets/Swiper";

import { Attraction } from "../models/Attraction";
import { City } from "../models/City";

export const Dashboard = () => {
    const { t } = useTranslation();
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        const onMount = async () => {
            const _attractions = await fetchData.getAttraction();
            const _cities = await fetchData.getCities();
            setAttractions(_attractions);
            setCities(_cities);
        };

        onMount();
    }, []);

    return (
        <Container>
            <Typography text={t("dashboard.slogan")} variant="h1" />

            <SearchEngineAutocomplete />
            <Section title={t("common.attractions")}>
                {attractions.length === 0 && <div> Loading... </div>}
                {attractions.length > 0 && (
                    <Swiper
                        items={attractions}
                        renderItem={attraction => <CardAttraction attraction={attraction} />}
                    />
                )}
            </Section>
            <Section title={t("common.cities")}>
                {cities.length === 0 && <div> Loading... </div>}

                {cities.length > 0 && (
                    <Swiper items={cities} renderItem={city => <CardCity city={city} />} />
                )}
            </Section>
        </Container>
    );
};
