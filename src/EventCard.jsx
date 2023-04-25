import React, {useState} from "react";


function EventCard({ event }) {
  console.log(event)

  return (
    <div className="eventCard">
      <img className="eventThumbnail"
        src={event?.thumbnail}/>
      <div className="eventTextContainter">
       <h3 className="eventTitle">{event?.title}</h3>
          <div className="eventSubHeader">
          <h4>{event?.location.neighborhood}</h4>
            <h4>{event?.venue}</h4>
            <h4>{event?.calendar.date}</h4>
            <h4>{event?.age}</h4>
            <h4>{event?.artform}</h4>
          </div>
      </div>
      {/* useState and onClick to use the save button */}
      {/* route to 'links' for tickets, for the MVP this route can exsist and go to a styled 404 */}
      {/* */}
    </div>
  )
};
export default EventCard;