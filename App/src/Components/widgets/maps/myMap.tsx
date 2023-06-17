import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./map.css";
import { FC } from "react";

interface MapProps {
    long: number;
    lat: number;
    zoom: number;
}
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
console.log(process.env.REACT_APP_API_BASE_URL);

const Map: FC<MapProps> = ({ long, lat, zoom }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${GOOGLE_MAPS_API_KEY}`,
    });
    const center = useMemo(() => ({ lat: lat, lng: long }), []);
    console.log(lat, long);

    return (
        <div className="App">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap mapContainerClassName="map-container" center={center} zoom={zoom}>
                    <Marker position={{ lat: lat, lng: long }} />
                </GoogleMap>
            )}
        </div>
    );
};

export default Map;
