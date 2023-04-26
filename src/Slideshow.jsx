import React, { useState,useEffect} from "react";

const imageSlides = ["#0088FE", "#00C49F", "#FFBB28"];
const delay  = 5000;

function Slideshow() {
    const [index, setIndext] = useState(0);

    useEffect(() =>{
        setTimeout(
            () =>
                setIndext((prevIndex) =>
                    prevIndex === imageSlides.length - 1 ? 0 : prevIndex +  1 
                ),
             delay
         );
    })

    return (
        <div className="slideshow">
            <div 
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%)`}}
                >
                <div className="slide">
                    {imageSlides.map((backgroundImage, index) => (
                        <div className="slide" key={index} style={{backgroundImage}} /> 
                    ))}
                </div>
                <div className="slideshowDots">
                    {imageSlides.map((_, idx) => (
                        <div key={idx} className="slideshowDot"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Slideshow;

