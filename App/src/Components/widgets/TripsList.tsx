import { FC } from "react";
import { getTripsDto } from "../../types/dto/trips/getTripsDto";
import { TripSearchResult } from "../core/searchResult/TripSearchResult";

interface TripsList {
    trips: getTripsDto[];
}

export const TripsList: FC<TripsList> = ({ trips }) => {
    return (
        <div>
            {trips.map((trip, i) => {
                
                return <TripSearchResult item={trip} key={i}/>
            })}
        </div>
    );
};
