import { attraction, directus_files, restaurant, trip, trip_item } from "@prisma/client";

export type Trip = {
    label: string;
    endDate: string;
    startDate: string;
    tripItems: TripItem[];
};

export type TripItem = {
    dateTime: string;
    restaurant?: restaurant;
    attraction?: attraction;
};

export type TripItemsByDay = Record<string, TripItem[]>;

export type TripFull = trip & {
    trip_items: (trip_item & {
        attraction: attraction & {
            directus_files: directus_files;
        };
        restaurant: restaurant & {
            directus_files: directus_files;
        };
    })[];
};
