import './PlaceBox.css';

function PlaceBox({placeName, placeAddress, timesWent}) {

  // console.log(text)
  let cssClass = "placeBox "

  if(placeAddress === placeName) {
    placeName = "Address"
  }

  return (
    <div className={cssClass}>
      <div className='info'>
        <p>{placeName} </p>
        <p>{placeAddress}</p>
      </div>
      <div className='info2'>
        Times Went: {timesWent}
      </div>
    </div>
  );
}

export default PlaceBox;