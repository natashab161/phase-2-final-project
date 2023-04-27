import React, { useState } from "react";
import './EventForm.css';

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
            <h1>publish your event</h1>
           <form onSubmit={handleEventSubmit}>

            <h2>title your event</h2>
            <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title your event"
                value={title}
                required
            ></input>

            <h2>venue name</h2>
            <input
                onChange={(e) => setVenue(e.target.value)}
                type="text"
                placeholder="Wya? Add the venue name here"
                value={venue}
                required
            ></input>



             <h2>street name</h2>
             <input
                onChange={(e) => setStreet1(e.target.value)}
                type="text"
                placeholder="Street address"
                value={street1}
                required
            ></input>

            <h2>street 2</h2>
            <input
                onChange={(e) => setStreet2(e.target.value)}
                type="text"
                placeholder="Street address"
                value={street2}
            ></input>

            <h2>city</h2>
            <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="City"
                value={city}
                required
            ></input>

            <h2>state</h2>
            <input
                onChange={(e) => setState(e.target.value)}
                type="text"
                placeholder="State" /* should state be a  drop down? */
                value={state}
                required
            ></input>

            <h2>zip code</h2>
            <input
                onChange={(e) => setZipCode(e.target.value)}
                type="number"
                placeholder="Zip code"
                value={zipCode}
                required
            ></input>

            <h2>neighborhood</h2>
             <input
                onChange={(e) => setNeightborhood(e.target.value)}
                type="text"
                placeholder="Neighborhood"
                value={neighborhood}
            ></input>
            {/* this one might need to be altered based on the built in calander feature */}
             <h2>event date</h2>
             <input
                onChange={(e) => setDate(e.target.value)}
                type="number"
                placeholder="Calander date"
                value={date}
                required
            ></input>

            <h2>time</h2>
            <input
                onChange={(e) => setTime(e.target.value)}
                type="number"
                placeholder="Time" /*this should probably be drop down to avoid user errors */
                value={time}
                required
            ></input>

            <h2>link tickets</h2>
               <input
                onChange={(e) => setTickets(e.target.value)}
                type="string"
                placeholder="Link to get tickets"
                value={tickets}
            ></input>

            <h2>age limit</h2>
              <input
                onChange={(e) => setAge(e.target.value)}
                type="number"
                placeholder="Is your  event 18+, 21+ or all ages?" /* this should be a drop down, again to prevent user errors */
                value={age}
                required
            ></input>

            <h2>price</h2>
               <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="$$$"
                value={price}
                required
            ></input>

            <h2>thumbnail image</h2>
               <input
                onChange={(e) => setThumbnail(e.target.value)}
                type=""
                placeholder="Insert image here"
                value={thumbnail}
            ></input>

            <h2>art form</h2>
            <input
                onChange={(e) => setArtForm(e.target.value)}
                type="texr"
                placeholder="ArtForm" /* would this also be a drop down since we will only have so many  artForm categories,  also will artforms  be different than "category" */
                value={artFrom}
            ></input>

            <h2>category</h2>
            <input
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="Categories"
                value={category}
                required
            ></input>

            <h2>subcategory</h2>
            <input
                onChange={(e) => setSubcategory(e.target.value)}
                type="text"
                placeholder="Niche down"
                value={subcategory}
            ></input>

            <h2>event description</h2>
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Got anything else you want people to know? Write it here!" 
                value={description}
            ></input>

            <h2>addional images</h2>
            <input
                onChange={(e) => setImages(e.target.value)}
                type="text"
                placeholder="Additional Images"
                value={images}
            ></input>

            <h2>collaborators</h2>
            <input
                onChange={(e) => setCollaborators(e.target.value)}
                type="text"
                placeholder="Collaborating? Real homies give credit where credit is due"
                value={collaborators}
            ></input>

            <h2>#tags</h2>
              <input
                onChange={(e) => setTags(e.target.value)}
                type="string"
                placeholder="Any other " 
                value={tags}
            ></input>
            <br />
            <button type="submit" className="eventSubmitButton">Create Event</button>
            

           </form>
        </div>
    )
}


export default EventForm;