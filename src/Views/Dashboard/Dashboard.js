// import AdmZip from 'adm-zip';
import { useEffect, useState } from "react";
import PlaceContainer from "../../Components/PlaceBox/PlaceContainer.js";
import {extractZip, comparePlaces, sortSegments, getUniquePlaces, getPlaceBoxData} from "../../Utils.js"
import './Dashboard.css';

function Dashboard() {
  const [placeData, setPlaceData] = useState();
  const [placeData2, setPlaceData2] = useState();
  const [comparedData, setComparedData] = useState();

  const [displayResults, setDisplayResults] = useState(false);

  useEffect(() => {
    if(placeData2)
      setComparedData(comparePlaces(placeData, placeData2))
  },[placeData2])

  async function parseFile(e) {

    let file = e.target.files[0];
    let files = await extractZip(file)

    let segmentData = sortSegments(files)

    let places = getUniquePlaces(segmentData[1])
    let placeBoxData = getPlaceBoxData(places)

    if(placeData){
      setPlaceData2(placeBoxData)
      console.log("second ! ")
    }
    else  {
      setPlaceData(placeBoxData);
      console.log("first !")
    }
  }

  function showResults() {

    if(placeData && placeData2) { // two entered, comparison mode
      
    }

    setDisplayResults(true);
  }

  return (
    <div className="dashboard">
      <div className="inputDiv">
        <input className="fileInput" type="file" onChange={parseFile}/>
        <input className="fileInput" type="file" onChange={parseFile}/>
        <button onClick={showResults}>Go !</button>
      </div>

      <div className="outputDiv">
        { displayResults ? <PlaceContainer p1Info={placeData} p2Info={placeData2} sharedInfo={comparedData}></PlaceContainer> :  "upload pls"}
      </div>
    </div>
  );
}

export default Dashboard;
