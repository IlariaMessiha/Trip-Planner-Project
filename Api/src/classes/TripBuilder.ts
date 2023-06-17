import * as dayjs from "dayjs";
import { chain, cloneDeep, last, mapValues, range } from "lodash";
import { mapRestaurantToDto } from "src/helpers/MappingDtos";
import { AttractionWithImage } from "src/types/AttractionWithImage";
import { RestaurantWithTags } from "src/types/RestaurantWithTags";
import { AttractionDto } from "src/types/dto/common/AttractionDto";
import { TripDto } from "src/types/dto/common/TripDto";
import { TripItemDto, TripItemsByDayDto } from "src/types/dto/common/TripItemDto";

export class TripBuilder {
    private label = "Your recommended trip";

    // Here we assume the start and end dates, because the user did not specify them.
    // The user could change them in the future.
    private startDate = dayjs().add(1, "week");
    private endDate = this.startDate.add(this.tripDurationInDays - 1, "day");
    private tripItemsByDay: TripItemsByDayDto;

    public constructor(private readonly tripDurationInDays: number) {}

    public init() {
        this.createTripItemsByDay();
    }

    public build(): TripDto {
        const trip: TripDto = {
            label: "Your recommended trip",
            startDate: this.startDate.toISOString(),
            endDate: this.endDate.toISOString(),
            tripItems: Object.values(this.tripItemsByDay).flat(),
        };

        return trip;
    }

    public addRestaurantTripItem(
        restaurantsPool: RestaurantWithTags[],
        meal: "breakfast" | "dinner"
    ) {
        const tagByMeal = {
            breakfast: "food-meal:breakfast",
            dinner: "food-meal:dinner",
        };

        const filteredRestaurants = restaurantsPool.filter(restaurant =>
            restaurant.tags.some(tag => tag.code === tagByMeal[meal])
        );

        const selectOne = (date: string) => {
            const index = dayjs(date).diff(this.startDate, "day");
            const pool = filteredRestaurants.length > 0 ? filteredRestaurants : restaurantsPool;
            return pool[index % pool.length];
        };

        this.tripItemsByDay = mapValues(this.tripItemsByDay, (items, date) => {
            const breakfastRestaurant = selectOne(date);
            const previousItem = last(items);

            const previousItemDuration = previousItem
                ? (previousItem.value as AttractionDto).suggestedDuration || 2
                : 0;

            const dateTime = previousItem
                ? dayjs(previousItem.dateTime).add(previousItemDuration, "hour").toISOString()
                : dayjs(date).hour(8).minute(0).second(0).toISOString();

            return [
                ...items,
                {
                    dateTime,
                    type: "restaurant" as TripItemDto["type"],
                    value: mapRestaurantToDto(
                        breakfastRestaurant.restaurant,
                        breakfastRestaurant.image
                    ),
                },
            ];
        });
    }

    public addAttractionTripItem(attractionsPool: AttractionWithImage[]) {
        const newTripItemsPerDay = cloneDeep(this.tripItemsByDay);

        // sortBy(attractionsPool, "suggested_duration").reverse();
        // newTripItemsPerDay.map((items, i) => {
        //     items.push({
        //         dateTime: "9:00",
        //         type: "attraction",
        //         value: mapAttractionToDto(attractionsPool[i].attraction, attractionsPool[i].image),
        //     });
        // });
        return newTripItemsPerDay;
    }

    /** Implementation */

    private createTripItemsByDay() {
        this.tripItemsByDay = chain(range(this.tripDurationInDays))
            .map(i => this.startDate.add(i, "day").toISOString())
            .keyBy(date => date)
            .mapValues(() => [])
            .value();
    }
}
