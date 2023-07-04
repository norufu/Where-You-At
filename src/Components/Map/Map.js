
/* global google */
import {
    GoogleMap,
    InfoWindow,
    Marker,
    useLoadScript,
  } from "@react-google-maps/api";

import './Map.css';
import { useEffect, useState } from "react";
function Map({markers, playerNum}) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    });

    const [mapRef, setMapRef] = useState();

    const markerOutput = generateMarkers()
    console.log(markerOutput)
    function generateMarkers() {
        if(markers === undefined) return;

        let icon;
        console.log(playerNum)
        if(playerNum === 1) icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        if(playerNum === 2) icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        if(playerNum === 3) icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        console.log(icon)

        let marks = []
        for(let i = 0; i < markers.length; i++) {
            let mark = <Marker position={markers[i]} icon={icon} key={i}></Marker>
            marks.push(mark)
        }

        return(marks)
    }

    const onMapLoad = (map) => {
        setMapRef(map);
        const bounds = new google.maps.LatLngBounds();
        // markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
    };

    return (
        <div className="mapWrapper">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (                    
            <GoogleMap mapContainerClassName="map-container" onLoad={onMapLoad}>
                {markerOutput}
            </GoogleMap>)}
        </div>
    );
}

export default Map;