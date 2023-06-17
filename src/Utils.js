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

// def getUniquePlaces(data):
//     tempData = []
//     count = 0
//     for place in data:
//         if(len(tempData) == 0):
//             place['timesWent'] = 1
//             tempData.append(place)
//             continue
//         isLogged = False
//         for loggedPlace in tempData:
//             if(loggedPlace['placeVisit']['location']['placeId'] == place['placeVisit']['location']['placeId']):
//                 loggedPlace['timesWent'] += 1 
//                 isLogged = True
//                 # print(loggedPlace['placeVisit']['location']['placeId'] + '\n' + place['placeVisit']['location']['placeId'])
                

//         if(not isLogged):
//             place['timesWent'] = 1
//             tempData.append(place)
            

//         count+=1
//     print('\n\n')
//     print(len(tempData))
//     return(tempData)