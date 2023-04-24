import React, { useState } from "react";

function EventForm({ eventSubmit }){

    function handleEventSubmit(e) {
        e.preventDefault();

        const newEvent = {
            title: title,
            street: street,
            city: city,
            state: state,
            zipCode: zipCode,
            neighborhood:  neighborhood,
            venue: venue, 
            date: calander,
            time: time,
            tickets: tickets,
            price: price,
            thumbnail: thumbnail,
            artFrom: artFrom,
            age: age,
            category: category,
            subcategory: subcategory,
            images: images,
            description: description,
            collaborators:collaborators,
            tags: tags,
            
 /* remeber to ask micheal if this is the correct formatting */
        }
    }

    return(
        <div>
            {/* user will submit a form that will create an EventCard and post it to EventsPage */}
            {/* the form info will be the keys in the json data */}
        </div>
    )
}

export default EventForm;