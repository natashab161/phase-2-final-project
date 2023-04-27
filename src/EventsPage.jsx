import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import "./eventCard.css";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setVisibleEvents(data.slice(0, 6)); // set initial visible events to the first 6
      });
  }, []);

  const handlePrevClick = () => {
    setStartIndex(Math.max(0, startIndex - 6)); // update the start index to show previous 6 events
    setVisibleEvents(events.slice(startIndex - 6, startIndex)); // update the visible events
  };

  const handleNextClick = () => {
    setStartIndex(startIndex + 6); // update the start index to show next 6 events
    setVisibleEvents(events.slice(startIndex + 6, startIndex + 12)); // update the visible events
  };

  const renderEventCards = visibleEvents.map((event) => {
    return <EventCard key={event.id} event={event}></EventCard>;
  });

  return (
    <div>
      <div className="eventsContainer">
      {renderEventCards}
      </div>
    <div class="button-container">
    {startIndex > 0 && <button class="pageButton"onClick={handlePrevClick}>Prev</button>}
    {startIndex + 6 < events.length && (
      <button class="pageButton" onClick={handleNextClick}>Next</button>)}</div>
      </div>
  );
}

export default EventsPage;
