import React from "react";
import EventsPage from "./EventsPage";
import SearchEvents from "./SearchEvents";
import FeaturedEvents from "./FeaturedEvents";

function Home(){
    return(
        <div>
            <FeaturedEvents />
            <SearchEvents />
            <EventsPage />
            {/* Footer */}
        </div>
    )
}

export default Home;