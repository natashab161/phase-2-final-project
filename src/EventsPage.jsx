import React from "react";
import EventCard from "./EventCard";

function EventsPage() {
    return (
        <div>
            {/* container for <EventCard>
            I named this EventsPage bc EventsContainer was too long 
            If you think of something better feel free to change it */}
            <EventCard />
        </div>
    )
}

export default EventsPage;