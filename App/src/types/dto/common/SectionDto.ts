import { SectionItemDto } from "./SectionItemDto";

export interface SectionDto {
    title: string;
    subtitle: string;
    items: SectionItemDto[];
}
