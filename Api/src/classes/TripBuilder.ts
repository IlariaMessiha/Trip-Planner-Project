import * as dayjs from "dayjs";
import { chain, findKey, last, mapValues, range, sortBy } from "lodash";
import { mapAttractionToDto, mapRestaurantToDto } from "src/helpers/MappingDtos";
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
            label: this.label,
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
            const restaurantTripItem = selectOne(date);

            return [
                ...items,
                {
                    dateTime: this.getPreviousItemEndDateTime(items, date),
                    type: "restaurant" as TripItemDto["type"],
                    value: mapRestaurantToDto(
                        restaurantTripItem.restaurant,
                        restaurantTripItem.image
                    ),
                },
            ];
        });
    }

    public addAttractionTripItem(attractionsPool: AttractionWithImage[]) {
        const sortedPool = sortBy(attractionsPool, a => a.attraction.suggested_duration).reverse();

        sortedPool.forEach(attractionItem => {
            const firstAvailableDay = this.findFirstAvailableDay(
                attractionItem.attraction.suggested_duration
            );

            this.tripItemsByDay[firstAvailableDay] = [
                ...this.tripItemsByDay[firstAvailableDay],
                {
                    dateTime: this.getPreviousItemEndDateTime(
                        this.tripItemsByDay[firstAvailableDay],
                        firstAvailableDay
                    ),
                    type: "attraction",
                    value: mapAttractionToDto(attractionItem.attraction, attractionItem.image),
                },
            ];
        });
    }

    /** Implementation */

    private createTripItemsByDay() {
        this.tripItemsByDay = chain(range(this.tripDurationInDays))
            .map(i => this.startDate.add(i, "day").toISOString())
            .keyBy(date => date)
            .mapValues(() => [])
            .value();
    }

    private getPreviousItemEndDateTime(items: TripItemDto[], date: string) {
        const previousItem = last(items);

        const previousItemDuration = previousItem
            ? (previousItem.value as AttractionDto).suggestedDuration || 2
            : 0;

        return previousItem
            ? dayjs(previousItem.dateTime).add(previousItemDuration, "hour").toISOString()
            : dayjs(date).hour(8).minute(0).second(0).toISOString();
    }

    private findFirstAvailableDay(suggestedDuration: number) {
        const LastHourOfDay = 18;

        return findKey(this.tripItemsByDay, (items, date) => {
            const previousItemEndDateTime = this.getPreviousItemEndDateTime(items, date);
            const endOfDay = dayjs(date).hour(LastHourOfDay).minute(0).second(0);
            const availableHours = endOfDay.diff(previousItemEndDateTime, "hour");

            return availableHours >= suggestedDuration;
        });
    }
}
