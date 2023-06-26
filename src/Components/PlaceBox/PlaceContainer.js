import { useEffect, useState } from 'react';
import './PlaceContainer.css';
import PlaceBox from './PlaceBox';

function PlaceContainer({placeInfo}) {
    const [boxes, setBoxes] = useState([]);
    const [boxPlaces, setBoxPlaces] = useState([]);
    const [boxAddresses, setBoxAddresses] = useState([]);

    console.log("yupp")
    // setBoxes(init())
    // 
    useEffect(() => {
        console.log(placeInfo)
        if(placeInfo === undefined) {
            console.log("undefined")
            return;
        }
        // placeInfo = placeInfo['placeInfo']
        // console.log(placeInfo['placeInfo'][0])
        let boxArrPlaces = [];
        let boxArrAddresses = [];
        // console.log(placeInfo['placeInfo'].length)
        console.log(placeInfo.length)

        for(let i = 0; i < placeInfo.length; i++) {
            // console.log(i%2)
            // let boxClass = "c" + i%2
            console.log(placeInfo[i])
            if(placeInfo[i].isAddress) {
                boxArrAddresses.push(<PlaceBox key={i}placeName={placeInfo[i].placeName} placeAddress={placeInfo[i].placeAddress} timesWent={placeInfo[i].timesWent}></PlaceBox>)
            }
            else {
                boxArrPlaces.push(<PlaceBox key={i}placeName={placeInfo[i].placeName} placeAddress={placeInfo[i].placeAddress} timesWent={placeInfo[i].timesWent}></PlaceBox>)
            }
            // boxArr.push(<PlaceBox key={i}placeName={placeInfo[i].placeName} placeAddress={placeInfo[i].placeAddress} timesWent={placeInfo[i].timesWent}></PlaceBox>);
            // if(i == 50) break;
        }
        setBoxAddresses(boxArrAddresses)
        setBoxPlaces(boxArrPlaces)
    }, [placeInfo]);
    
    function init() {

    }

    return (
        <div className='placeContainer'>
            <div className='columnDiv backgroundAddress'>{boxAddresses}</div>
            <div className='columnDiv backgroundPlace'>{boxPlaces}</div>
        </div>
    );
}

export default PlaceContainer;