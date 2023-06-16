import { attraction, directus_files } from "@prisma/client";

export interface AttractionWithImage {
    attraction: attraction;
    image: directus_files;
}
