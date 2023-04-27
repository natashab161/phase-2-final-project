import React from "react";
import Slideshow from "./Slideshow.jsx"
import EventsPage from "./EventsPage";
import SearchEvents from "./SearchEvents";
import FeaturedEvents from "./FeaturedEvents";

function Home(){
    return(
        <div>
            <Slideshow />
            <FeaturedEvents />
            <SearchEvents />
            <EventsPage />
            {/* Footer */}
        </div>
    )
}

export default Home;