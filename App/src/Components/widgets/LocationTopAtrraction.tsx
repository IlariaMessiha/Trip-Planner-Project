import { FC } from "react";

import styles from "./LocationTopAttraction.module.css";
import { Swiper } from "./Swiper";

import { SectionDto } from "../../types/dto/common/SectionDto";
import { Section } from "../core/layout/Section";
import { SectionItemType } from "./SectionItemType";
import { FavoriteItem } from "../../types/dto/common/FavoriteItemDto";

interface LocationTopAttractionProps {
    sections: SectionDto[];
    userFavs?: FavoriteItem[];
}
export const LocationTopAttraction: FC<LocationTopAttractionProps> = ({ sections, userFavs }) => {
    return (
        <div className={styles.topAttraction}>
            {sections.map((section, i) => (
                <Section title={section.title} subtitle={section.subtitle} key={i}>
                    <div className={styles.section}>
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
                    </div>
                </Section>
            ))}
        </div>
    );
};
