import JSZip from "jszip";

//get the json files from takeout folder
// https://www.freakyjolly.com/how-to-extract-zip-file-in-react-to-a-relative-path-using-jszip/
export const extractZip = async (file) => {
  const zip = new JSZip();
  const extractedFiles = await zip.loadAsync(file);
  let data = []

  let keys = Object.keys(extractedFiles.files)
  for(let i = 0; i < keys.length; i++) {
    if(keys[i] === "Takeout/Location History/Settings.json" || keys[i] === "Takeout/Location History/Records.json" || keys[i] === "Takeout/archive_browser.html") 
      continue;
    let content = JSON.parse(await extractedFiles.files[keys[i]].async("string"))

    data.push(content)
  }
      return(data)
}

//sort all files into activity segments/places
export const sortSegments = (files) => {
  let segmentData = [[],[]] // [place], [activity]

  for(let i = 0; i < files.length; i++) {
    let currentFile = files[i]['timelineObjects']
    for(let i = 0; i < currentFile.length; i++) {
      if(currentFile[i].activitySegment) {
        segmentData[0].push(currentFile[i].activitySegment);
      }
      else if(currentFile[i].placeVisit) {
        segmentData[1].push(currentFile[i].placeVisit);
      }
    }
  }
  return(segmentData)
}

export const getUniquePlaces = (placeData) => {
  let uniqueList = [];
  for(let i = 0; i < placeData.length; i++) {
    let place = placeData[i]
    //first entry
    if(uniqueList.length === 0) {
      place['timesWent'] = 1;
      uniqueList.push(place);
      continue;
    }

    //check if this placeId has been logged
    let isLogged = false;
    for(let p = 0; p < uniqueList.length; p++) { 
      let loggedPlace = uniqueList[p]
      if(loggedPlace['location']['placeId'] === place['location']['placeId']) {
        loggedPlace['timesWent'] ++;
        isLogged = true;
      }
    }

    //not logged? log it
    if(!isLogged) {
      place['timesWent'] = 1;
      uniqueList.push(place);
    }
  }

  uniqueList.sort(mySort('timesWent'))
  return(uniqueList);
}

function mySort(property) {
  return function(a, b) {
    return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
  }
}

export const getPlaceBoxData = (placeData) => { 
  let returnPlaces = [];
  for(let i = 0; i < placeData.length; i++) {
    let obj = {};
    obj["timesWent"] = placeData[i].timesWent;
    obj["placeID"] = placeData[i].location.placeId;
    obj["isShared"] = false;
    if(placeData[i]['location'].hasOwnProperty('name')) {
      obj['placeName'] = placeData[i]['location']['name'];
      obj['placeAddress'] = placeData[i]['location']['address']
      obj['isAddress'] = false;
    }
    else if(placeData[i]['location'].hasOwnProperty('address')) {
      obj['placeName'] = placeData[i]['location']['address'];
      obj['placeAddress'] = placeData[i]['location']['address']
      obj['isAddress'] = true;
    }
    else {
      obj['placeName'] = "Unnamed";
      obj['isAddress'] = true;
    }

    returnPlaces.push(obj);
  }

  return(returnPlaces)
} 

export const comparePlaces = (placeData1, placeData2) => {
  let sharedExactPlaces = [];
  let sharedNamePlaces = [];

  for(let p1 = 0; p1 < placeData1.length; p1++) {
    for(let p2 = 0; p2 < placeData2.length; p2++) {
      if(placeData1[p1]['placeID'] === placeData2[p2]['placeID']) {
        let newEntry = structuredClone(placeData1[p1]);
        newEntry.isShared = true;
        sharedExactPlaces.push(newEntry);
        break;
      }
    }
  }

  return(sharedExactPlaces)
}


// def comparePlaces(p1Places, p2Places):
//     sharedExactPlaces = [] #exact by id
//     sharedNamePlaces = [] #shared by name
//     for p1 in p1Places:
//         for p2 in p2Places:
//             if('name' in p2['placeVisit']['location'] and 'name' in p1['placeVisit']['location']): #check exact location by ID
//                 if(p1['placeVisit']['location']['name'] == p2['placeVisit']['location']['name'] and p1 not in sharedNamePlaces):
                    
//                    sharedNamePlaces.append(p1)
//             if(p1['placeVisit']['location']['placeId'] == p2['placeVisit']['location']['placeId']): #check location names rather than exact location
//                 sharedExactPlaces.append(p1)
//                 break
//     return(sharedExactPlaces)