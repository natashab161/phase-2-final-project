import React from "react";
import Slideshow from "./Slideshow.jsx"
import EventsPage from "./EventsPage";
import SearchEvents from "./SearchEvents";
import FeaturedEvents from "./FeaturedEvents";
import EventsMap from "./EventsMap.jsx";

function Home(){
    return(
        <div>
            <Slideshow />
            <FeaturedEvents />
            <SearchEvents />
            <EventsPage />
            <EventsMap />
            {/* <EventsMap /> */}
            {/* Footer */}
        </div>
    )
}

export default Home;