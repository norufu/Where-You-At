import { useEffect, useState } from 'react';
import './PlaceContainer.css';
import PlaceBox from './PlaceBox';
import { Switch, ToggleButton, ToggleButtonGroup } from '@mui/material';
// import ToggleButtonGroup from '@mui/material/ButtonGroup';


function PlaceContainer({p1Info, p2Info, sharedInfo}) {
    const [p1Boxes, setP1Boxes] = useState([[],[]]);
    const [p2Boxes, setP2Boxes] = useState([[],[]]);
    const [sharedBoxes, setSharedBoxes] = useState([[],[]]);

    const [boxAddresses, setBoxAddresses] = useState();
    const [boxPlaces, setBoxPlaces] = useState();

    const [showPlaces, setShowPlaces] = useState(false);
    const [showPlayer, setShowPlayer] = useState(1) //1/2/3, p1/p2/shared
    const [toggleSelected, setToggleSelected] = useState('1');
    const [isOnePlayer, setIsOnePlayer] = useState(true);

    useEffect(() => {
        if(p1Boxes === undefined) return;
        if(showPlayer == 1) {
            console.log(showPlayer)
            console.log(p1Boxes)
            setBoxPlaces(p1Boxes[0])
            setBoxAddresses(p1Boxes[1])
        }
        else if(showPlayer == 2) {
            console.log("yup")
            setBoxPlaces(p2Boxes[0])
            setBoxAddresses(p2Boxes[1])
        }
        else if (showPlayer == 3) { 
            setBoxPlaces(sharedBoxes[0])
            setBoxAddresses(sharedBoxes[1])
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
        for(let i = 0; i < placeData.length; i++) {
            if(placeData[i].isAddress) {
                boxArrAddresses.push(<PlaceBox key={i} info={placeData[i]}></PlaceBox>)
            }
            else {
                boxArrPlaces.push(<PlaceBox key={i} info={placeData[i]}></PlaceBox>)
            }
        }

        if(playerNum == 1) {
            setP1Boxes([boxArrPlaces, boxArrAddresses]);
            //default to player 1 
            // setBoxPlaces(boxArrPlaces);
            // setBoxAddresses(boxArrAddresses);
            // setToggleSelected(1)
        }
        else if(playerNum == 2) {
            console.log(boxArrPlaces);
            setP2Boxes([boxArrPlaces, boxArrAddresses]);
        }
        else if (playerNum == 3) {
            setSharedBoxes([boxArrPlaces, boxArrAddresses]);
            //if there is 2 players, default to shared
            // setBoxPlaces(boxArrPlaces);
            // setBoxAddresses(boxArrAddresses);
            setToggleSelected(3)
            setShowPlayer(3)
        }
        console.log(playerNum + " ----")
        console.log(boxArrPlaces)
    }

    function togglePlaces() {
        setShowPlaces(!showPlaces);
    }

    const handlePlayerToggle = (event,newToggle) => {
        setToggleSelected(newToggle);
        console.log(newToggle)
        setShowPlayer(parseInt(newToggle))
    };

    return (
        <div className='placeContainer'>

            <ToggleButtonGroup
                color="primary"
                value={toggleSelected}
                exclusive
                onChange={handlePlayerToggle}
                aria-label="Platform"
            >
                <ToggleButton id='1' value="1">Player 1</ToggleButton>
                <ToggleButton id='2' value="2">Player 2</ToggleButton>
                <ToggleButton id='3' value="3">Shared</ToggleButton>
            </ToggleButtonGroup>

            <div className='toggle'>
                <p>Places</p>
                <Switch label="Label" onClick={togglePlaces}></Switch>
                <p>Addresses</p>
            </div>
            { showPlaces ? <div className='columnDiv backgroundAddress'>{boxAddresses}</div> : <div className='columnDiv backgroundPlace'>{boxPlaces}</div>}
        </div>
    );
}

export default PlaceContainer;