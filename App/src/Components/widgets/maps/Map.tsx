import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { FC } from "react";
import styles from "./Map.module.css";

export interface MapItem {
    lat: number;
    long: number;
    label: string;
}
interface MapProps {
    zoom?: number;
    items?: MapItem[];
}
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const Map: FC<MapProps> = ({ zoom, items }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${GOOGLE_MAPS_API_KEY}`,
    });

    if (!isLoaded) return null;

    return (
        <GoogleMap
            mapContainerClassName={styles.mapContainer}
            center={calculateCenter(items || [])}
            zoom={zoom}
        >
            {items &&
                items.map((item, index) => (
                    <Marker
                        key={index}
                        position={{
                            lat: item.lat,
                            lng: item.long,
                        }}
                        label={{
                            text: item.label,
                            color: "black",
                            fontSize: "13px",
                            fontWeight: "bold",
                        }}
                    />
                ))}
        </GoogleMap>
    );
};

const calculateCenter = (items: MapItem[]) => {
    const { totalLat, totalLng } = items.reduce(
        (acc, tripItem) => ({
            totalLat: acc.totalLat + tripItem.lat,
            totalLng: acc.totalLng + tripItem.long,
        }),
        { totalLat: 0, totalLng: 0 }
    );

    return {
        lat: items.length ? totalLat / items.length : 0,
        lng: items.length ? totalLng / items.length : 0,
    };
};
