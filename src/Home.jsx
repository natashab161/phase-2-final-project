import React from "react";
import EventsPage from "./EventsPage";
import CarouselHeader from "./CarouselHeader";

function Home(){
    return(
        <div>
            <img src="./media/tester-logo.png">
            </img>
            <h1>
                the place to be for local artists and art-lovers to connect and grow
            </h1>
            {/* <FeaturedEvents /> */}
            {/* Search & Map can be nested here or within the EventsPage*/}
            <EventsPage />
            {/* Footer */}
        </div>
    )
}

export default Home;