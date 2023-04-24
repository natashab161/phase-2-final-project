import React from "react";

function EventCard() {
    return (
        <div className="eventCard">
            <img 
                src="https://nypost.com/wp-content/uploads/sites/2/2021/08/NYC1.jpg?quality=90&strip=all&w=1024" 
                alt="I heart nyc image" 
                style={{ width: '100%' }} />

            <div className=".eventTextContainter">
                <p>this is an example of an event image</p>
            </div>
            {/* i think we will fetch  the json data here */}
            {/* photo + displayed information about each card/event */}
            {/* useState and onClick to use the save button */}
            {/* route to 'links' for tickets, for the MVP this route can exsist and go to  a styled  404 */}
            {/* */}
            
        </div>
         
    )
};

export default EventCard;