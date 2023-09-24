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

       <div className='info2'> 
       {info.isShared ? <p>Times went (p1 - p2): {info.p1TimesWent} - {info.p2TimesWent}</p> : <p>Times Went: {info.timesWent}</p>}
      </div>  
    </div>
  );
}

export default PlaceBox;