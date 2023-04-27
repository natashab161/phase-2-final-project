import React, {  useState, useEffect  } from "react";
import EventCard from "./EventCard";
import "./eventCard.css";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
  fetch("http://localhost:3000/events")
  .then(response => response.json())
  .then(data => {setEvents(data)})
  }, [])

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
