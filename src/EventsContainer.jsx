import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import "./eventCard.css";

function EventContainer({ events, searchInput }) {
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setVisibleEvents(events.slice(0, 6));
    setStartIndex(0);
  }, [events]);

  useEffect(() => {
    setVisibleEvents(events.filter((event) => {
      return event.category && event.category.toLowerCase().includes(searchInput.toLowerCase())
    }).slice(0, 6));
    setStartIndex(0);
  }, [searchInput, events]);

  const handlePrevClick = () => {
    setStartIndex(Math.max(0, startIndex - 6));
    setVisibleEvents(
      events.slice(startIndex - 6, startIndex)
    );
  };

  const handleNextClick = () => {
    setStartIndex(startIndex + 6);
    setVisibleEvents(
      events.slice(startIndex + 6, startIndex + 12)
    );
  };

  return (
    <div>
      <div className="eventsContainer">
        {visibleEvents.map((event) => {
          return <EventCard key={event.id} event={event} />;
        })}
      </div>
      <div className="button-container">
        {startIndex > 0 && (
          <button className="pageButton" onClick={handlePrevClick}>
            Prev
          </button>
        )}
        {startIndex + 6 < events.length && (
          <button className="pageButton" onClick={handleNextClick}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default EventContainer;
