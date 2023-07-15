
import './ToggleGroup.css';
import { useEffect, useState, useRef } from "react";
function ToggleGroup({changeHandler, selected}) {


    function handleChange() {

    }

    return (
        <div className='toggleGroup'>
            <input checked={selected === 1} onClick={changeHandler} readOnly name='playerSelect' id='b1' className='radioAsButton' type="radio" value="1"></input>
            <label id='l1' htmlFor="b1">Player 1</label>
            <input checked={selected === 2} onClick={changeHandler} readOnly name='playerSelect' id='b2' className='radioAsButton' type="radio" value="2"></input>
            <label id='l2' htmlFor="b2">Player 2</label>
            <input checked={selected === 3} onClick={changeHandler} readOnly name='playerSelect' id='b3' className='radioAsButton' type="radio" value="3"></input>
            <label id='l3' htmlFor="b3">Shared</label>
        </div>
    );
}

export default ToggleGroup;