import { FC } from "react";
import { TripDto } from "../../../types/dto/common/TripDto";
import { TripProfileItem } from "./TripProfileItem";

interface TripProfileItemsProps {
    trips: TripDto[];
}

export const TripProfileItems: FC<TripProfileItemsProps> = ({ trips }) => {
    return (
        <div>
            {trips.map((trip, i) => {
                return <TripProfileItem trip={trip} key={i} />;
            })}
        </div>
    );
};
