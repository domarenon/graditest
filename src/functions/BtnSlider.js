import React, {useState} from 'react'
import '../styles/Slider.css'
import leftArrow from '../assets/left-arrow.svg'
import rightArrow from '../assets/right-arrow.svg'

export default function BtnSlider(props) {
    return (
        
        <button onClick={props.moveSlide} className={props.direction === "next" ? "btn-slide next": "btn-slide prev"}>
            <img src={props.direction === "next" ? rightArrow : leftArrow}/>
            
        </button>
            
    )
}