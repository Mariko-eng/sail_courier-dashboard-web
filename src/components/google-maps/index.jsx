import "./index.css";
import React, { useEffect, useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { APIProvider } from "@vis.gl/react-google-maps";


const CustomGoogleMap = ( props ) => {
    const { markerLocation } = props;
    const [ defaultLocation, setDefaultLocation] = useState({
        lat: 51.509865,
        lng: -0.118092,
      });
    
    useEffect(() => {
        setDefaultLocation(markerLocation);
    }, [markerLocation])

    return (
        <div className="map-container">
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KeY}>
            <Map
                style={{ borderRadius: "20px" }}
                // defaultZoom={13}
                // defaultCenter={defaultLocation}
                renderingType="VECTOR"
                disableDefaultUI
                gestureHandling={"greedy"}
                center={defaultLocation}
                zoom={13}
                heading={0}
                tilt={0}
            >
                <Marker position={defaultLocation} />
            </Map>
            </APIProvider>
        </div>
    )
}

export default CustomGoogleMap;
