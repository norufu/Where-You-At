import { useEffect, useState } from 'react';
import './PlaceContainer.css';
import PlaceBox from './PlaceBox';
import { Switch } from '@mui/material';

function PlaceContainer({placeInfo}) {
    const [boxPlaces, setBoxPlaces] = useState([]);
    const [boxAddresses, setBoxAddresses] = useState([]);
    const [showPlaces, setShowPlaces] = useState(false);

    useEffect(() => {
        console.log(placeInfo)
        if(placeInfo === undefined) {
            console.log("undefined")
            return;
        }

        let boxArrPlaces = [];
        let boxArrAddresses = [];
        console.log(placeInfo.length)

        for(let i = 0; i < placeInfo.length; i++) {

            console.log(placeInfo[i])
            if(placeInfo[i].isAddress) {
                boxArrAddresses.push(<PlaceBox key={i} info={placeInfo[i]}></PlaceBox>)
            }
            else {
                boxArrPlaces.push(<PlaceBox key={i} info={placeInfo[i]}></PlaceBox>)
            }
        }
        setBoxAddresses(boxArrAddresses)
        setBoxPlaces(boxArrPlaces)
    }, [placeInfo]);
    
    function togglePlaces() {
        setShowPlaces(!showPlaces);
    }

    return (
        <div className='placeContainer'>
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