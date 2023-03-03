import { useTranslation } from "react-i18next";
import { FC, useState } from "react";

import { Typography } from "../core/Typography";
import styles from "./LocationTopAttraction.module.css";
import { Swiper } from "./Swiper";

import React from "react";
import { fetchData } from "../../api/FetchData";
import { Attraction } from "../../models/Attraction";
import { CardAttraction } from "../core/CardAttraction";

interface LocationTopAttractionProps {
    id?: string;
}
export const LocationTopAttraction: FC<LocationTopAttractionProps> = ({ id }) => {
    const [cityAttractions, setCityAttractions] = useState<Attraction[] | []>([]);
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const _cityAttractions = await fetchData.getCityAttractions(id);

                setCityAttractions(_cityAttractions);
            }
        };
        onMount();
    }, [id]);
    const { t } = useTranslation();
    return (
        <div className={styles.topAttraction}>
            <div className={styles.topAttractionSwiper}>
                {cityAttractions.length === 0 && <div> Loading... </div>}
                {cityAttractions.length > 0 && (
                    <Swiper
                        items={cityAttractions}
                        renderItem={cityAttraction => (
                            <CardAttraction attraction={cityAttraction} />
                        )}
                    />
                )}
            </div>
        </div>
    );
};
