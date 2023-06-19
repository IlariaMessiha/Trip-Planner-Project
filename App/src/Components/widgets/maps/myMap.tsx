import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { FC, useMemo } from "react";
import { TripItemDto } from "../../../types/dto/common/TripDto";
import "./map.css";

interface MapProps {
    long?: number;
    lat?: number;
    zoom?: number;
    tripItems?: TripItemDto[];
}
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
console.log(process.env.REACT_APP_API_BASE_URL);

const Map: FC<MapProps> = ({ long, lat, zoom, tripItems }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${GOOGLE_MAPS_API_KEY}`,
    });
    let totalLng = 0;
    let totalLat = 0;

    tripItems?.forEach(tripItem => {
        totalLat += tripItem.value.mapLocation.lat;
        totalLng += tripItem.value.mapLocation.long;
    });
    const center = useMemo(
        () => ({
            lat: lat ? lat : tripItems?.length ? totalLat / tripItems.length : 0,
            lng: long ? long : tripItems?.length ? totalLng / tripItems.length : 0,
        }),
        [
            lat ? lat : tripItems?.length ? totalLat / tripItems.length : 0,
            long ? long : tripItems?.length ? totalLng / tripItems.length : 0,
        ]
    );

    return (
        <div className={tripItems ? "TripView" : "App"}>
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {long !== undefined && lat !== undefined && zoom !== undefined ? (
                        <GoogleMap
                            mapContainerClassName="map-container"
                            center={center}
                            zoom={zoom}
                        >
                            <Marker position={{ lat: lat, lng: long }} />
                        </GoogleMap>
                    ) : (
                        <GoogleMap
                            mapContainerClassName="map-container"
                            center={center}
                            zoom={zoom}
                        >
                            {tripItems &&
                                tripItems.map((tripItem, index) => (
                                    <Marker
                                        key={index}
                                        position={{
                                            lat: tripItem.value.mapLocation.lat,
                                            lng: tripItem.value.mapLocation.long,
                                        }}
                                        label={{
                                            text: tripItem.value.label,
                                            color: "black",
                                            fontSize: "13px",
                                            fontWeight: "bold",
                                        }}
                                    />
                                ))}
                        </GoogleMap>
                    )}
                </>
            )}
        </div>
    );
};

export default Map;
