import React from "react";
import Slideshow from "./Slideshow.jsx"
import EventsPage from "./EventsPage";
import FeaturedEvents from "./FeaturedEvents";
import EventsMap from "./EventsMap.jsx";

function Home(){
    return(
        <div>
            {/* <Slideshow /> */}
            {/* <FeaturedEvents /> */}
            <Slideshow />
            <FeaturedEvents />
            <EventsPage />
            <EventsMap />
            {/* Footer */}
        </div>
    )
}

export default Home;