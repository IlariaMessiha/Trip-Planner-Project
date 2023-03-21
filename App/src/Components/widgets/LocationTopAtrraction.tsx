import { FC } from "react";

import styles from "./LocationTopAttraction.module.css";
import { Swiper } from "./Swiper";

import { CardAttraction } from "../core/CardAttraction";
import { Typography } from "../core/Typography";
import { useTranslation } from "react-i18next";
import { AttractionDto } from "../../types/dto/common/AttractionDto";

interface LocationTopAttractionProps {
    attractions: AttractionDto[];
}
export const LocationTopAttraction: FC<LocationTopAttractionProps> = ({ attractions }) => {
    const { t } = useTranslation();
    return (
        <div className={styles.topAttraction}>
            <Typography text={t("cities.cityPage.topAttraction")} variant="h2" />
            <div className={styles.topAttractionSwiper}>
                {attractions.length === 0 && <div> Loading... </div>}
                {attractions.length > 0 && (
                    <Swiper
                        items={attractions}
                        renderItem={cityAttraction => (
                            <CardAttraction attraction={cityAttraction} />
                        )}
                    />
                )}
            </div>
        </div>
    );
};
