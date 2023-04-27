import React, { useState } from "react";

  /* look into how to make certain forms required */
    /* and code for drop downs */

function EventForm({ eventSubmit }){
    const [title, setTitle] = useState("");
    const [street1, setStreet1] = useState("");
    const [street2, setStreet2] = useState("");
    const [city, setCity] =  useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [neighborhood, setNeightborhood ] = useState("");
    const [venue, setVenue ] = useState("");
    const [date, setDate ] = useState(""); {/* alter this one */}
    const [time, setTime] = useState("");
    const [tickets, setTickets] = useState("");
    const [price, setPrice ] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [artFrom, setArtForm ] = useState("");
    const [age, setAge] = useState(""); {/* alter this one */}
    const [category,setCategory]  =  useState("");
    const [subcategory, setSubcategory] = useState("");
    const [images, setImages] =  useState("");
    const [description, setDescription] = useState("");
    const [collaborators, setCollaborators]  = useState("");
    const [tags, setTags] = useState("");

    function handleEventSubmit(e) {
        e.preventDefault();

        const newEvent = {
            title: title,
            street1: street1,
            street2: street2,
            city: city,
            state: state,
            zipCode: zipCode,
            neighborhood:  neighborhood,
            venue: venue, 
            date: date,
            time: time,
            tickets: tickets,
            price: price,
            thumbnail: thumbnail,
            artFrom: artFrom,
            age: age, /* could do a boolean, 18+ true, false, 21+ true,false */
            category: category,
            subcategory: subcategory,
            images: images,
            description: description,
            collaborators:collaborators,
            tags: tags,  
        };

      fetch('/eventsdata.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      })

      .then(response => response.json())
      .then(data => {
        eventSubmit(data);
      })
      .catch((error)  =>  {
        console.error('Error:', error);
      })

  
    }

    return(
        <div className="eventForm">
            <h1>Create your event</h1>
           <form onSubmit={handleEventSubmit}>
            <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title your event"
                value={title}
                required
            ></input>
             <input
                onChange={(e) => setStreet1(e.target.value)}
                type="text"
                placeholder="Street address"
                value={street1}
            ></input>
            <input
                onChange={(e) => setStreet2(e.target.value)}
                type="text"
                placeholder="Street address"
                value={street2}
            ></input>
            <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="City"
                value={city}
                required
            ></input>
            <input
                onChange={(e) => setState(e.target.value)}
                type="text"
                placeholder="State" /* should state be a  drop down? */
                value={state}
                required
            ></input>
            <input
                onChange={(e) => setZipCode(e.target.value)}
                type="number"
                placeholder="Zip code"
                value={zipCode}
                required
            ></input>
             <input
                onChange={(e) => setNeightborhood(e.target.value)}
                type="text"
                placeholder="Neighborhood"
                value={neighborhood}
            ></input>
             <input
                onChange={(e) => setVenue(e.target.value)}
                type="text"
                placeholder="Wya? Add the venue name here"
                value={venue}
                required
            ></input>
            {/* this one might need to be altered based on the built in calander feature */}
             <input
                onChange={(e) => setDate(e.target.value)}
                type="number"
                placeholder="Calander date"
                value={date}
                required
            ></input>
            <input
                onChange={(e) => setTime(e.target.value)}
                type="number"
                placeholder="Time" /*this should probably be drop down to avoid user errors */
                value="time"
                required
            ></input>
               <input
                onChange={(e) => setTickets(e.target.value)}
                type="string"
                placeholder="Link to get tickets"
                value={tickets}
            ></input>
              <input
                onChange={(e) => setAge(e.target.value)}
                type="number"
                placeholder="Is your  event 18+, 21+ or all ages?" /* this should be a drop down, again to prevent user errors */
                value={age}
                required
            ></input>
               <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="$$$"
                value={price}
                required
            ></input>
               <input
                onChange={(e) => setThumbnail(e.target.value)}
                type=""
                placeholder="Insert image here"
                value={thumbnail}
            ></input>
            <input
                onChange={(e) => setArtForm(e.target.value)}
                type="texr"
                placeholder="ArtForm" /* would this also be a drop down since we will only have so many  artForm categories,  also will artforms  be different than "category" */
                value={artFrom}
            ></input>
            <input
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="Categories"
                value={category}
                required
            ></input>
            <input
                onChange={(e) => setSubcategory(e.target.value)}
                type="text"
                placeholder="Niche down"
                value={subcategory}
            ></input>
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Got anything else you want people to know? Write it here!" 
                value={description}
            ></input>
            <input
                onChange={(e) => setCollaborators(e.target.value)}
                type="text"
                placeholder="Collaborating? Real homies give credit where credit is due"
                value={collaborators}
            ></input>
              <input
                onChange={(e) => setTags(e.target.value)}
                type="string"
                placeholder="Any other " 
                value={tags}
            ></input>
            <br />
            <button type="submit">Create Event</button>
            

           </form>
        </div>
    )
}


export default EventForm;