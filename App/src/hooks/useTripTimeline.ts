import { useEffect, useState } from "react";
import { TripDto } from "../types/dto/common/TripDto";

import { fetchData } from "../api/FetchData";
import { useParams } from "react-router-dom";

export const useTripTimeline = () => {
    const [trip, setTrip] = useState<TripDto | null>(null);
    const [visibleDay, setVisibleDay] = useState<string | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const onMount = async () => {
            if (id) {
                const _trip = await fetchData.getTrip(parseInt(id));
                setTrip(_trip);
                setVisibleDay(_trip.tripItems[0].dateTime);
            }
        };
        onMount();
    }, [id]);

    return {
        trip,
        visibleDay,
        setVisibleDay,
    };
};
