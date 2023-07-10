
import './Instructions.css';

function Instructions() {

    return (
        <div className='instructions'>
            <h1>What is this?</h1>
            <p>By uploading your Google maps location history you can view all the locations you've been, uploading two peoples history allows you to also compare mutual places you share.</p>

            <h2>Where is my history?</h2>
            <p>You can find the data Google collects on your account by going to <a target="_blank"  href='https://takeout.google.com/settings/takeout'>Google Takeout</a>. Request your data as a JSON format and it will be emailed to you. After receiving it, upload the takeout.zip file here and click Go !</p>
        </div>
    );
}

export default Instructions;