import './PlaceBox.css';
function PlaceBox({info, playerNum, mapsLink}) {

  let cssClass = `placeBox player${playerNum}`

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