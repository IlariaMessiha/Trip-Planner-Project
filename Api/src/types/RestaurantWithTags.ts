import { restaurant, restaurant_tag, tag } from "@prisma/client";

export type RestaurantWithTags = restaurant & {
    restaurant_tag: (restaurant_tag & {
        tag: tag;
    })[];
};
