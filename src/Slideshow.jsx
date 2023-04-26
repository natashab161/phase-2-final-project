import React from "react";

const imageSlides = ["#0088FE", "#00C49F", "#FFBB28"];

function Slideshow() {
    return (
        <div className="slideshow">
            <div className="slideshowSlider">
                <div className="slide">
                    {imageSlides.map((backgroundImage, index) => (
                        <div className="slide" key={index} style={{backgroundImage}} /> 
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Slideshow;

