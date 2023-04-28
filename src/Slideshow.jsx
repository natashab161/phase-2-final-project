import React, { useState, useEffect, useRef } from "react";
import './Slideshow.css'

const imageSlides = [
  "https://i.imgur.com/D72dbT3.jpg", //pullup
  "https://i.imgur.com/v8rMkLE.jpg", //arts grow
  "https://i.imgur.com/V0VjAvl.jpg", //stop paying for nose bleeds
  "https://i.imgur.com/WzQXFyy.jpg", // not all about the music
  "https://i.imgur.com/al3dz3f.jpg", //event planners
  "https://i.imgur.com/ZopUgtm.jpg", //connect & collab 
];

const delay = 3000;

function Slideshow() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex === imageSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div className="slideshowSlider">
        {imageSlides.map((backgroundImage, idx) => (
<div className="slide"
            key={idx}
            style={{
            //   backgroundImage: `url(${backgroundImage})`,
              transform: `translate3d(${-index * 100}%, 0, 0)`,
            }}>
                <img className="slideImage" src = {backgroundImage}/>
          {/* <div
            className="slide-img"
            key={idx}
            style={{
              backgroundImage: `url(${backgroundImage})`,
            //   transform: `translate3d(${-index * 100}%, 0, 0)`,
            }}
          /> */}
</div>
        ))}
      </div>
    
      <div className="slideshowDots">
        {imageSlides.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
