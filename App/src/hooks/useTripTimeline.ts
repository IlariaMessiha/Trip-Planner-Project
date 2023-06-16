import { useEffect, useState } from "react";
import { TripDto } from "../types/dto/common/TripDto";
import { mockTrip } from "../mock";

// const getTripFromLocalStorage = (key: string, defaultValue = {}) => {
//     try {
//         const item = window.localStorage.getItem(key);
//         return item ? JSON.parse(item) : defaultValue;
//     } catch (error) {
//         console.log(error);
//         return defaultValue;
//     }
// };

export const useTripTimeline = () => {
    const [trip, setTrip] = useState<TripDto | null>(null);
    const [visibleDay, setVisibleDay] = useState<string | null>(null);

    useEffect(() => {
        setTrip(mockTrip);
        setVisibleDay(mockTrip.tripItems[0].dateTime);
    }, []);

    return {
        trip,
        visibleDay,
        setVisibleDay,
    };
};
