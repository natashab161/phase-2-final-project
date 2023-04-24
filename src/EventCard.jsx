import React from "react";

function EventCard({ event }) {
    return (
        <div className="eventCard">
            <img className="eventThumbnail" 
                src="https://nypost.com/wp-content/uploads/sites/2/2021/08/NYC1.jpg?quality=90&strip=all&w=1024"
               /* src={artist.thumbnail} alt={artist.title} */
            />

            <div className="eventTextContainter">
              <h3 className="eventTitle">{event.title}</h3>  
                    <div className="eventSubHeader"> 
                        <p>this is an example of an event image, delete once json data is in</p>
                        {/* these wont all have be h4, play around with the visual hierarchy later */}
                    {/* <h4>{event.location.neighborhood}</h4>
                        <h4>{event.venue}</h4>
                        <h4>{event.calender.date}</h4>
                        <h4>{event.age}</h4>
                        <h4>{event.artform}</h4>  
                     */}
                    </div>
            </div>

            {/* useState and onClick to use the save button */}
            {/* route to 'links' for tickets, for the MVP this route can exsist and go to  a styled  404 */}
            {/* */}
            
        </div>
         
    )
};

export default EventCard;