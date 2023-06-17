// import AdmZip from 'adm-zip';
import {extractZip, sortSegments, getUniquePlaces} from "../../Utils.js"

function Dashboard() {


  async function parseFile(e) {

    let file = e.target.files[0];
    let files = await extractZip(file)
    console.log(files)
    let segmentData = sortSegments(files)
    console.log(segmentData)
    let places = getUniquePlaces(segmentData[1])

    console.log(places)
  }

  return (
    <div className="dashboard">
      <input type="file" onChange={parseFile}/>
    </div>
  );
}

export default Dashboard;
