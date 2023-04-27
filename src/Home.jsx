import React from "react";
import Slideshow from "./Slideshow.jsx"
import EventsPage from "./EventsPage";
import FeaturedEvents from "./FeaturedEvents";

function Home(){
    return(
        <div>
            <Slideshow />
            <FeaturedEvents />
            <EventsPage />
            {/* Footer */}
        </div>
    )
}

export default Home;