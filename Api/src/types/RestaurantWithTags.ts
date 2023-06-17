import { directus_files, restaurant, tag } from "@prisma/client";

export interface RestaurantWithTags {
    restaurant: restaurant;
    image: directus_files;
    tags: tag[];
}
