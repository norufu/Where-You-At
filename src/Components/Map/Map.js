
/* global google */
import {
    GoogleMap,
    InfoWindow,
    Marker,
    useLoadScript,
  } from "@react-google-maps/api";

import './Map.css';
import { useEffect, useState } from "react";
import CustomMarker from "../CustomMarker/CustomMarker";
import MapInfoBox from "./MapInfoBox";
function Map({markers, playerNum}) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    });

    const [mapRef, setMapRef] = useState();

    const [markerArr, setMarkerArr] = useState([]);
    const [hoveredMarker, setHoveredMarker] = useState();
    const [infoPos, setInfoPos] = useState({x:0,y:0});

    const [showInfo, setShowInfo] = useState(false);

    const onMarkerClick = (key) => {
        window.open(markers[key].link);
    }

    const markerHover = (e, index) => {
        setShowInfo(true)
        setInfoPos({x:e.domEvent.pageX ,y:e.domEvent.pageY})
        setHoveredMarker(markers[index])
    }

    const markerExit = () => {
        setShowInfo(false)
    }

    useEffect(() => {
        generateMarkers()
    }, [isLoaded, markers])

    function generateMarkers() {
        if(markers === undefined) return;

        let icon;
        if(playerNum === 1) icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        if(playerNum === 2) icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        if(playerNum === 3) icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" 

        let marks = []
        for(let i = 0; i < markers.length; i++) {
            let mark = <Marker className="marker" id={i} position={markers[i].pos} icon={icon} key={i} onMouseOver={(e) => markerHover(e, i)} onMouseOut={() => markerExit()} onClick={() => onMarkerClick(i)}></Marker>
            marks.push(mark)
        }
        setMarkerArr(marks)
    }

    const onMapLoad = (map) => {
        setMapRef(map);
        var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(65, -120),           // top left corner of map
            new google.maps.LatLng(-65, 120)            // bottom right corner
        );
        map.fitBounds(bounds);
    };

    return (
        <div className="mapWrapper">
            {showInfo ? (<MapInfoBox marker={hoveredMarker} infoPos={infoPos}></MapInfoBox>) : (<></>)}

            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (                    
            <GoogleMap mapContainerClassName="map-container" onLoad={onMapLoad} zoom={10}>
                {markerArr}
            </GoogleMap>)}
        </div>
    );
}

export default Map;