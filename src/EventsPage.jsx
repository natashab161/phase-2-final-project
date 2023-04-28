import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import "./eventCard.css";
import "./SearchBar.css"

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch("https://pullupnyc-default-rtdb.firebaseio.com/events.json")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setVisibleEvents(data.slice(0, 6));
      });
  }, []);

  const handlePrevClick = () => {
    setStartIndex(Math.max(0, startIndex - 6));
    setVisibleEvents(events.slice(startIndex - 6, startIndex));
  };

  const handleNextClick = () => {
    setStartIndex(startIndex + 6);
    setVisibleEvents(events.slice(startIndex + 6, startIndex + 12));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const renderEventCards = events.filter((event) => {
    const searchableFields = [
      event.title,
      event.category,
      event.subcategory,
      event.artform,
      event.artist,
      event.location.street,
      event.location.street2,
      event.location.city,
      event.location.state,
      event.location.zip,
      event.location.neighborhood,
      event.venue,
      event.calendar.time,
      event.calendar.date,
      event.calendar.day,
      event.price,
      event.tickets,
      event.share,
      event.description,
      ...(event.tags || []),
      ...(event.collaborators || [])
    ];
    return searchableFields.some((field) => {
      if (typeof field === 'string') {
        return field.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (typeof field === 'object') {
        const values = Object.values(field);
        return values.some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()));
      }
      return false;
    });
  }).map((event) => {
    return <EventCard key={event.id} event={event}></EventCard>;
  });

  return (
    <div>
      <div className="searchContainer">
        <input type="text" placeholder="Search events" onChange={handleSearch} />
      </div>
      <div className="eventsContainer">
        {renderEventCards.slice(startIndex, startIndex + 6)}
      </div>
      <div className="button-container">
        {startIndex > 0 && <button class="pageButton" onClick={handlePrevClick}>Prev</button>}
        {startIndex + 6 < renderEventCards.length && (
          <button className="pageButton" onClick={handleNextClick}>Next</button>)}
      </div>
    </div>
  );
}

export default EventsPage;


