import React, {useState} from 'react'
import '../styles/Slider.css'

export default function Slider(props) {

    const [slideIndex, setSlideIndex] = useState(1)

    
    const moveDot = (index) => {
        setSlideIndex(index)
    }

    return (
        <>
        <div className="container-slider" >
            {
            props.media?.map((obj,index) => (
				<div key={"div_"+obj.id} className={slideIndex === index + 1 ? "slide active-anim" : "slide"}>
                    <img
                    alt ={"img "+index}
                    key={obj.id}
                    src={obj.src}/>
                </div>
                
                ))
			}

            <div className="container-dots">
                {Array.from({length:props.media?.length}).map((item,index) => (
                    <div key={"dots_"+index} onClick={() => moveDot(index+1)} className={slideIndex === index + 1 ? "dot active" : "dot"} />
                ))}
            </div>
        </div>

        <div className="container-media" > 
        {
        props.media?.map((obj,index) => (
            
            <div key={"div_media_"+obj.id} className={index === 0 ? "media_img_first" : "media_img_others"}>
                <img
                alt ={"img "+index}
                src={obj.src}/>
            </div>
            ))
        }
        
        </div>
        </>
    )
}
