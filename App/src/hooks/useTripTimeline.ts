import { useEffect, useState } from "react";
import { TripDto } from "../types/dto/common/TripDto";
import { mockTrip } from "../mock";
import { fetchData } from "../api/FetchData";
import { useParams } from "react-router-dom";

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
    const token = localStorage.getItem("accessToken");
    const [trip, setTrip] = useState<TripDto | null>(null);
    const [visibleDay, setVisibleDay] = useState<string | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const onMount = async () => {
            if (id && token) {
                const _trip = await fetchData.getTrip(parseInt(id), token);
                setTrip(_trip);
                setVisibleDay(mockTrip.tripItems[0].dateTime);
            }
        };
        onMount();
    }, [id, token]);

    return {
        trip,
        visibleDay,
        setVisibleDay,
    };
};
