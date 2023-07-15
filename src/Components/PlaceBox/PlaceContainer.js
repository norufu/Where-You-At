import { useEffect, useState } from 'react';
import './PlaceContainer.css';
import PlaceBox from './PlaceBox';
import { Switch, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Map from '../Map/Map';
import ToggleGroup from '../ToggleGroup/ToggleGroup';
// import ToggleButtonGroup from '@mui/material/ButtonGroup';


function PlaceContainer({p1Info, p2Info, sharedInfo}) {
    const [p1Boxes, setP1Boxes] = useState([]);
    const [p2Boxes, setP2Boxes] = useState([]);
    const [p1Markers, setP1Markers] = useState([]);
    const [p2Markers, setP2Markers] = useState([]);

    const [sharedBoxes, setSharedBoxes] = useState([]);
    const [sharedMarkers, setSharedMarkers] = useState([]);

    const [boxPlaces, setBoxPlaces] = useState();
    const [displayedMarkers, setDisplayedMarkers] = useState();

    const [showPlayer, setShowPlayer] = useState(1) //1/2/3, p1/p2/shared
    const [toggleSelected, setToggleSelected] = useState('1');

    const [cssClass, setCssClass] = useState(`columnDiv backgroundPlace player1`) //1/2/3, p1/p2/shared

    function generateLink(info) {
        if(info.placeAddress) {
          // return(`https://www.google.com/maps/search/?api=1&query_place_id=${info.placeID}`)
          return(`https://www.google.com/maps/place/?q=place_id:${info.placeID}`)
          // return(`https://www.google.com/maps/search/?api=1&query=${info.placeAddress}&query_place_id=${info.placeID}`)
        }
        else {
          return(`https://www.google.com/maps/search/?api=1&query_place_id=${info.placeID}`)
        }
      }


    useEffect(() => {
        if(showPlayer === 1) {
            setBoxPlaces(p1Boxes)
            setDisplayedMarkers(p1Markers)
            setCssClass(`columnDiv backgroundPlace player${showPlayer}`)
        }
        else if(showPlayer === 2) {
            setBoxPlaces(p2Boxes)
            setDisplayedMarkers(p2Markers)
            setCssClass(`columnDiv backgroundPlace player${showPlayer}`)
        }
        else if (showPlayer === 3) { 
            setBoxPlaces(sharedBoxes)
            setDisplayedMarkers(sharedMarkers)
            setCssClass(`columnDiv backgroundPlace player${showPlayer}`)
        }
    }, [showPlayer]);

    useEffect(() => {
    }, [boxPlaces])
    
    useEffect(() => {
        generateBoxes(p1Info, 1)
        generateBoxes(p2Info, 2)
        generateBoxes(sharedInfo, 3)

        if(sharedInfo !== undefined) setShowPlayer(3);
        else setShowPlayer(1);
    }, [p1Info, p2Info, sharedInfo]);

    function generateBoxes(placeData, playerNum) {
        if(placeData === undefined) return;

        let boxArrPlaces = [];
        let markers = [];
        for(let i = 0; i < placeData.length; i++) {
            let placeLink = generateLink(placeData[i])
            markers.push({pos: {lat:placeData[i].lat, lng:placeData[i].long}, link: placeLink})
            boxArrPlaces.push(<PlaceBox key={i} info={placeData[i]} playerNum={playerNum} mapsLink={placeLink}></PlaceBox>)
        }

        if(playerNum === 1) {
            setP1Boxes([boxArrPlaces]);
            setP1Markers(markers)
            setBoxPlaces(boxArrPlaces)
            setDisplayedMarkers(markers)        
        }
        else if(playerNum === 2) {
            setP2Markers(markers)
            setP2Boxes([boxArrPlaces]);
        }
        else if (playerNum === 3) {
            setSharedBoxes([boxArrPlaces]);
            setSharedMarkers(markers)
            //if there is 2 players, default to shared
            setBoxPlaces(boxArrPlaces)
            setDisplayedMarkers(markers)    
            setToggleSelected(3)
            setShowPlayer(3)
        }
    }

    const handlePlayerToggle = (event) => {
        let clickedValue = event.target.defaultValue;
        // setToggleSelected(newToggle);
        setShowPlayer(parseInt(clickedValue))
    };

    return (
        <div className="placeContainer">

            <ToggleGroup changeHandler={handlePlayerToggle} selected={showPlayer}></ToggleGroup>

            <Map markers={displayedMarkers} playerNum={showPlayer}></Map>

            {boxPlaces == undefined || boxPlaces.length != 0 ? <div className={cssClass}>{boxPlaces}</div> : <p>No player data</p>}
        </div>
    );
}

export default PlaceContainer;