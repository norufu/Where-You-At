// import AdmZip from 'adm-zip';
import { useState } from "react";
import PlaceContainer from "../../Components/PlaceBox/PlaceContainer.js";
import {extractZip, sortSegments, getUniquePlaces, getPlaceBoxData} from "../../Utils.js"
import './Dashboard.css';

function Dashboard() {
  const [dataIsUploaded, setDataIsUploaded] = useState(false);
  const [placeData, setPlaceData] = useState();


  async function parseFile(e) {

    let file = e.target.files[0];
    let files = await extractZip(file)
    // console.log(files)
    let segmentData = sortSegments(files)
    // console.log(segmentData)
    let places = getUniquePlaces(segmentData[1])
    let placeBoxData = getPlaceBoxData(places)

    setDataIsUploaded(true);
    setPlaceData(placeBoxData);

    // console.log(placeBoxData)
  }

  return (
    <div className="dashboard">
      <div className="inputDiv">
        <input type="file" onChange={parseFile}/>
      </div>
      <div className="outputDiv">
        { dataIsUploaded ? <PlaceContainer placeInfo={placeData}></PlaceContainer> :  "upload pls"}
      </div>
    </div>
  );
}

export default Dashboard;
