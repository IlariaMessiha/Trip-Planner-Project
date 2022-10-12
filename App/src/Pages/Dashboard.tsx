import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { apiCalls } from "../api/api";
import { fetchData } from "../api/FetchData";
import { CardActivity } from "../Components/core/CardActivity";
import { CardLocation } from "../Components/core/CardLocation";
import { Container } from "../Components/core/layout/Container";
import { Section } from "../Components/core/layout/Section";
import { Typography } from "../Components/core/Typography";
import { SearchEngineAutocomplete } from "../Components/widgets/SearchEngineAutocomplete";
import { Swiper } from "../Components/widgets/Swiper";
import { Activity } from "../models/Activity";

export const Dashboard = () => {
    const { t } = useTranslation();
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const onMount = async () => {
            const _activities = await fetchData.getActivities();

            setActivities(_activities);
        };

        onMount();
    }, []);

    return (
        <Container>
            <Typography text={t("dashboard.slogan")} variant="h1" />

            <SearchEngineAutocomplete />
            <Section title={t("common.locations")}>
                <Swiper
                    items={apiCalls.getLocations()}
                    renderItem={location => <CardLocation location={location} key={location.id} />}
                />
            </Section>

            <Section title={t("common.activities")}>
                {activities.length === 0 && <div> Loading... </div>}

                {activities.length > 0 && (
                    <Swiper
                        items={activities}
                        renderItem={activity => <CardActivity activity={activity} />}
                    />
                )}
            </Section>
        </Container>
    );
};
