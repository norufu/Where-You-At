import './PlaceBox.css';
function PlaceBox({info}) {

  // console.log(text)
  let cssClass = "placeBox "
  const mapsLink = getLink()


  function getLink() {
    if(info.placeAddress) {
      // return(`https://www.google.com/maps/search/?api=1&query_place_id=${info.placeID}`)
      return(`https://www.google.com/maps/place/?q=place_id:${info.placeID}`)
      // return(`https://www.google.com/maps/search/?api=1&query=${info.placeAddress}&query_place_id=${info.placeID}`)
    }
    else {
      return(`https://www.google.com/maps/search/?api=1&query_place_id=${info.placeID}`)
    }
  }

  if(info.placeAddress === info.placeName) {
    info.placeName = "Address"
  }


  return (
    <div className={cssClass}>
      

      <a href={mapsLink} target="_blank"><img src='/mapIcon.svg' className='mapIcon' alt="Map Link"/></a>
      <div className='info'>
        <p>{info.placeName} </p>
        <p>{info.placeAddress}</p>
        <p>{info.placeID}</p>
      </div>

      {!info.isShared ? <div className='info2'> 
        Times Went: {info.timesWent}
      </div> : <></>}
    </div>
  );
}

export default PlaceBox;