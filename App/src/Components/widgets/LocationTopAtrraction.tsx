import { FC } from "react";

import styles from "./LocationTopAttraction.module.css";
import { Swiper } from "./Swiper";

import { SectionDto } from "../../types/dto/common/SectionDto";
import { Section } from "../core/layout/Section";
import { SectionItemType } from "./SectionItemType";

interface LocationTopAttractionProps {
    sections: SectionDto[];
}
export const LocationTopAttraction: FC<LocationTopAttractionProps> = ({ sections }) => {
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
                                    <SectionItemType item={item} key={item.value.id} />
                                )}
                            />
                        )}
                    </div>
                </Section>
            ))}
        </div>
    );
};
