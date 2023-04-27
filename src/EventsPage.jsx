import React, { useState, useEffect } from "react";
import SearchEvents from "./SearchEvents";
import EventsContainer from "./EventsContainer";
import "./eventCard.css";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetch("https://pullupnyc-default-rtdb.firebaseio.com/events.json")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  useEffect(() => {
    const newFilteredEvents = events.filter((event) => {
      return event.category && event.category.toLowerCase().includes(searchInput.toLowerCase());
    });
    setFilteredEvents(newFilteredEvents);
  }, [events, searchInput]);

  function onSearch(input) {
    setSearchInput(input);
  }

  return (
    <div>
      <SearchEvents searchInput={searchInput} onSearch={onSearch} />
      <EventsContainer events={filteredEvents} />
    </div>
  );
}

export default EventsPage;
