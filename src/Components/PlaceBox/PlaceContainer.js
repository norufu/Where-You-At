import { useEffect, useState } from 'react';
import './PlaceContainer.css';
import PlaceBox from './PlaceBox';
import { Switch, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Map from '../Map/Map';
// import ToggleButtonGroup from '@mui/material/ButtonGroup';


function PlaceContainer({p1Info, p2Info, sharedInfo}) {
    const [p1Boxes, setP1Boxes] = useState([[],[]]);
    const [p2Boxes, setP2Boxes] = useState([[],[]]);
    const [p1Markers, setP1Markers] = useState([]);
    const [p2Markers, setP2Markers] = useState([]);

    const [sharedBoxes, setSharedBoxes] = useState([[],[]]);
    const [sharedMarkers, setSharedMarkers] = useState([]);

    const [boxAddresses, setBoxAddresses] = useState();
    const [boxPlaces, setBoxPlaces] = useState();
    const [displayedMarkers, setDisplayedMarkers] = useState();

    const [showPlaces, setShowPlaces] = useState(false);
    const [showPlayer, setShowPlayer] = useState(1) //1/2/3, p1/p2/shared
    const [toggleSelected, setToggleSelected] = useState('1');

    useEffect(() => {
        if(p1Boxes === undefined) return;
        if(showPlayer === 1) {
            setBoxPlaces(p1Boxes[0])
            setBoxAddresses(p1Boxes[1])
            setDisplayedMarkers(p1Markers)
        }
        else if(showPlayer === 2) {
            setBoxPlaces(p2Boxes[0])
            setBoxAddresses(p2Boxes[1])
            setDisplayedMarkers(p2Markers)
        }
        else if (showPlayer === 3) { 
            setBoxPlaces(sharedBoxes[0])
            setBoxAddresses(sharedBoxes[1])
            setDisplayedMarkers(sharedMarkers)
        }
    }, [showPlayer]);

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
        let boxArrAddresses = [];
        let markers = [];
        for(let i = 0; i < placeData.length; i++) {
            markers.push({lat:placeData[i].lat, lng:placeData[i].long})
            if(placeData[i].isAddress) {
                boxArrAddresses.push(<PlaceBox key={i} info={placeData[i]}></PlaceBox>)
            }
            else {
                boxArrPlaces.push(<PlaceBox key={i} info={placeData[i]}></PlaceBox>)
            }
        }

        if(playerNum === 1) {
            setP1Boxes([boxArrPlaces, boxArrAddresses]);
            setP1Markers(markers)
            //default to player 1 
        }
        else if(playerNum === 2) {
            setP2Markers(markers)
            setP2Boxes([boxArrPlaces, boxArrAddresses]);
        }
        else if (playerNum === 3) {
            setSharedBoxes([boxArrPlaces, boxArrAddresses]);
            setSharedMarkers(markers)
            //if there is 2 players, default to shared
            setToggleSelected(3)
            setShowPlayer(3)
        }
    }

    function togglePlaces() {
        setShowPlaces(!showPlaces);
    }

    const handlePlayerToggle = (event,newToggle) => {
        setToggleSelected(newToggle);
        setShowPlayer(parseInt(newToggle))
    };

    return (
        <div className='placeContainer'>

            <ToggleButtonGroup
                className='toggleButtonGroup'
                color="primary"
                value={toggleSelected}
                exclusive
                onChange={handlePlayerToggle}
                aria-label="Platform">
                <ToggleButton id='1' value="1">Player 1</ToggleButton>
                <ToggleButton id='2' value="2">Player 2</ToggleButton>
                <ToggleButton id='3' value="3">Shared</ToggleButton>
            </ToggleButtonGroup>

            <div className='toggle'>
                <p>Places</p>
                <Switch label="Label" onClick={togglePlaces}></Switch>
                <p>Addresses</p>
            </div>

            <Map markers={displayedMarkers} playerNum={showPlayer}></Map>

            { showPlaces ? <div className='columnDiv backgroundAddress'>{boxAddresses}</div> : <div className='columnDiv backgroundPlace'>{boxPlaces}</div>}
        </div>
    );
}

export default PlaceContainer;