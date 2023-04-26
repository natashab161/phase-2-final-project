import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://pullupnyc-default-rtdb.firebaseio.com/events.json")
      .then((response) => response.json())
      .then((data) => {
        // Convert the data object to an array
        const eventsArray = Object.entries(data).map(([id, event]) => {
          return { ...event, id }; // Add the id to each event object
        });
        setEvents(eventsArray);
      });
  }, []);

  const renderEventCards = events.map((event) => {
    return <EventCard key={event.id} event={event} />;
  });

  return <div className="event-container">{renderEventCards}</div>;
}

export default EventsPage;
