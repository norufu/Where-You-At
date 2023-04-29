// import AdmZip from 'adm-zip';
import axios from 'axios';
import * as zip from "@zip.js/zip.js";

function Dashboard() {


  async function parseFile(e) {
    console.log('yup')
    console.log(e.target.files)
    console.log(e.target.files[0])
    let file = e.target.files[0];
    const zipReader = new zip.ZipReader(new zip.Data64URIReader(file));
    let entries = await zipReader.getEntries()
    console.log(entries);

    // var zip = new AdmZip(e.target.files);

    // - use a TextWriter object to write the unzipped data of the first entry into a string
    // const data = await entries[0].getData(new zip.TextWriter());
    // - close the ZipReader object
    await zipReader.close();



  //   axios({
  //     method: "POST",
  //     url:"http://127.0.0.1:8000",
  //     data: {file: 'fileHere'}
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  }

  return (
    <div className="dashboard">
      <input type="file" onChange={parseFile}/>
    </div>
  );
}

export default Dashboard;
