import './PlaceBox.css';

function PlaceBox({info}) {

  // console.log(text)
  let cssClass = "placeBox "

  console.log(info)
  if(info.placeAddress === info.placeName) {
    info.placeName = "Address"
  }

  return (
    <div className={cssClass}>
      <div className='info'>
        <p>{info.placeName} </p>
        <p>{info.placeAddress}</p>
      </div>
      <div className='info2'>
        Times Went: {info.timesWent}
      </div>
    </div>
  );
}

export default PlaceBox;