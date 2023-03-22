import { FC } from "react";

import styles from "./LocationTopAttraction.module.css";
import { Swiper } from "./Swiper";

import { CardAttraction } from "../core/cards/CardAttraction";
import { Typography } from "../core/Typography";
import { useTranslation } from "react-i18next";
import { AttractionDto } from "../../types/dto/common/AttractionDto";
import { SectionDto } from "../../types/dto/common/SectionDto";
import { SectionItemType } from "./SectionItemType";

interface LocationTopAttractionProps {
    sections: SectionDto[];
}
export const LocationTopAttraction: FC<LocationTopAttractionProps> = ({ sections }) => {
    const { t } = useTranslation();
    return (
        <div className={styles.topAttraction}>
            {sections.map(section => {
                {
                    return (
                        <div className={styles.topAttractionSwiper}>
                            <Typography text={section.title} variant="h2" />
                            <Typography text={section.subtitle} variant="h3" />
                            <div className={styles.section}>
                                {section.items.length === 0 && <div> Loading... </div>}
                                {section.items.length > 0 && (
                                    <Swiper
                                        items={section.items}
                                        renderItem={item => (
                                            <SectionItemType item={item} key={item.value.id} />
                                        )}
                                    />
                                )}
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};
