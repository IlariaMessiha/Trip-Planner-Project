import dayjs from "dayjs";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { TripDto } from "../../../types/dto/common/TripDto";
import { Section } from "../../core/layout/Section";
import { SectionItemType } from "../SectionItemType";
import { Swiper } from "../Swiper";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { upperFirst } from "lodash";
dayjs.extend(LocalizedFormat);

interface TripProfileItemProps {
    trip: TripDto;
}
export const TripProfileItem: FC<TripProfileItemProps> = ({ trip }) => {
    const { t } = useTranslation();

    const from = dayjs(trip.startDate).format("LL");
    const to = dayjs(trip.endDate).format("LL");

    return (
        <Section
            title={trip.label}
            subtitle={upperFirst(t("common.dateRange", { from, to }))}
            navigateTo={`/profile/trip/${trip.id}`}
        >
            <Swiper
                items={trip.tripItems}
                renderItem={item => <SectionItemType item={item} key={item.value.id} />}
            />
        </Section>
    );
};
