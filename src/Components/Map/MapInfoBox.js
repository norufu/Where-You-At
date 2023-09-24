
import './MapInfoBox.css';

function MapInfoBox({marker, infoPos}) {    
    return (
        <div className='infoBox'                  
        style={{
            left: `${infoPos.x}px`,
            top: `${infoPos.y}px`,
        }}>
            <p>{marker.info.isAddress ? marker.info.placeAddress : marker.info.placeName}</p>
            {marker.info.isShared ? <p>Times went (p1 - p2): {marker.info.p1TimesWent} - {marker.info.p2TimesWent}</p> : <p>Times went: {marker.info.timesWent}</p>}
        </div>
    );
}

export default MapInfoBox;