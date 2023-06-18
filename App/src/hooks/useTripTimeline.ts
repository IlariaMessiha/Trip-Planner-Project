import { useEffect, useState } from "react";
import { TripDto } from "../types/dto/common/TripDto";

import { useParams } from "react-router-dom";
import { fetchData } from "../api/FetchData";
import { postData } from "../api/PostData";

export const useTripTimeline = () => {
    const [trip, setTrip] = useState<TripDto | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
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

    const updateTrip = async (label: string) => {
        if (!trip) return;

        setLoading(true);
        const _trip = await postData.updateTrip(trip.id, {
            tripLabel: label,
        });
        setTrip(_trip);
        setLoading(false);
    };

    return {
        trip,
        visibleDay,
        loading,
        setVisibleDay,
        updateTrip,
    };
};
