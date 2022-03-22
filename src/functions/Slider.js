import React, {useState} from 'react'
import '../styles/Slider.css'
 import BtnSlider from './BtnSlider'

export default function Slider(props) {

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== props.media.length){
            setSlideIndex(slideIndex + 1)
        }
        else if(slideIndex === props.media.length){
            setSlideIndex(1)
        }
    }
    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if(slideIndex === 1){
            setSlideIndex(props.media.length)
        }
    }
    const moveDot = (index) => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider">
            {
            props.media?.map((obj,index) => (
				<div key={"div_"+obj.id} className={slideIndex === index + 1 ? "slide active-anim" : "slide"}>
                    <img
                    key={obj.id}
                    src={obj.src}/>
                </div>
                
                ))
			}
            <BtnSlider moveSlide={nextSlide} direction={"next"}/>
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length:props.media?.length}).map((item,index) => (
                    <div key={"dots_"+index} onClick={() => moveDot(index+1)} className={slideIndex === index + 1 ? "dot active" : "dot"} />
                ))}
            </div>
        </div>
    )
}
