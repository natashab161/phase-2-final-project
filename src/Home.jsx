import React from "react";
import EventsPage from "./EventsPage";
import FeaturedEvents from "./FeaturedEvents";

function Home(){
    return(
        <div>
            <h1>the place to be for local artists and art-lovers to connect and grow</h1>
            {/* <FeaturedEvents /> */}
            <FeaturedEvents />
            <EventsPage />
            {/* Footer */}
        </div>
    )
}

export default Home;