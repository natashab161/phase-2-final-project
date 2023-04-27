import React, { useState,useEffect, useRef } from "react";

const imageSlides = 
    ["https://i.imgur.com/D72dbT3.jpg", //pullup
     "https://i.imgur.com/v8rMkLE.jpg", //arts grow
     "https://i.imgur.com/al3dz3f.jpg"]; //event planners

    const delay  = 5000;

function Slideshow() {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === imageSlides.length - 1 ? 0 : prevIndex +  1 
                ),
             delay
         );
        
         return () => {};
    }, [index]);

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
                        <div 
                            key={idx} 
                            className={`slideshowDot${index === idx ? "active" : ""}`}
                            onClick={() => {
                                setIndex(idx);
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Slideshow;

