import React from "react";
import EventsPage from "./EventsPage";
import SearchEvents from "./SearchEvents";
import FeaturedEvents from "./FeaturedEvents";
import CarouselHeader from "./CarouselHeader";

function Home(){
    return(
        <div>
            <h1>the place to be for local artists and art-lovers to connect and grow</h1>
            <CarouselHeader />
            <FeaturedEvents />
            <SearchEvents />
            <EventsPage />
            {/* Footer */}
        </div>
    )
}

export default Home;