import React, {useState, useEffect} from "react";
import EventCard from "./EventCard";

function EventsPage() {
    const [events, setEvents] = useState([])

    useEffect(() => {
    fetch("http://localhost:3000/events")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setEvents(data)})
    }, [])

    const renderEventCards = events.map((event) => {
        return (
          <EventCard key={event.id} event={event}></EventCard>
        )
      })

      return (
        <div className="event-container">
          {renderEventCards}
        </div>
      );
}

export default EventsPage;