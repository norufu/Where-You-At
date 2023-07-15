// import AdmZip from 'adm-zip';
import { useEffect, useState } from "react";
import PlaceContainer from "../../Components/PlaceBox/PlaceContainer.js";
import {extractZip, comparePlaces, sortSegments, getUniquePlaces, getPlaceBoxData} from "../../Utils.js"
import './Dashboard.css';
import Instructions from "../../Components/Instructions/Instructions.js";

function Dashboard() {
  const [placeData, setPlaceData] = useState();
  const [placeData2, setPlaceData2] = useState();
  const [fileName1, setFileName1] = useState();
  const [fileName2, setFileName2] = useState();

  const [comparedData, setComparedData] = useState();

  const [displayResults, setDisplayResults] = useState(false);

  const fileInputText1 = placeData ? fileName1 : "Select file "
  const fileInputText2 = placeData2 ? fileName2 : "Select file "

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
      setFileName2(file.name)
      console.log("second ! ")
    }
    else  {
      setPlaceData(placeBoxData);
      console.log(file)
      setFileName1(file.name)
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
        <div className="fileInputDiv">
          <label class="label">
            <input className="fileInput" type="file" onChange={parseFile}/>
            <span>{fileInputText1}</span>
          </label>

          <label class="label">
            <input className="fileInput" type="file" onChange={parseFile}/>
            <span>{fileInputText2}</span>
          </label>
        </div>

        <button className="goButton" onClick={showResults}>Go !</button>
      </div>

      <div className="outputDiv">
        { displayResults ? <PlaceContainer p1Info={placeData} p2Info={placeData2} sharedInfo={comparedData}></PlaceContainer> :  <Instructions></Instructions>}
      </div>
    </div>
  );
}

export default Dashboard;
