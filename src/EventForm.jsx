import React, { useState } from "react";
import './EventForm.css';

function EventForm({ eventSubmit }) {
  const [title, setTitle] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [neighborhood, setNeightborhood] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tickets, setTickets] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [artFrom, setArtForm] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [images, setImages] = useState("");
  const [description, setDescription] = useState("");
  const [collaborators, setCollaborators] = useState("");
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
      neighborhood: neighborhood,
      venue: venue,
      date: date,
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
      collaborators: collaborators,
      tags: tags,
    };

    fetch('https://pullupnyc-default-rtdb.firebaseio.com/events.json', {
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
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="eventFormContainer">
      <h1>publish your event</h1>
      <form onSubmit={handleEventSubmit}>
        <h2>title your event</h2>
        <input
          className="eventFormInput"
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
          placeholder="State"
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

        {/* Event date */}
        <h2>event date</h2>
        <input
          onChange={(e) => setDate(e.target.value)}
          type="date"
          placeholder="Calendar date"
          value={date}
          required
        ></input>

        {/* Event time */}
        <h2>time</h2>
        <input
          onChange={(e) => setTime(e.target.value)}
          type="time"
          placeholder="Time"
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
        
        {/* Age limit */}
        <h2>age limit</h2>
        <select
          onChange={(e) => setAge(e.target.value)}
          value={age}
          required
        >
          <option value="">Select age limit</option>
          <option value="all">All ages</option>
          <option value="18">18+</option>
          <option value="21">21+</option>
        </select>

        //             <h2>price</h2>
//                <input
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
            <button type="submit" className="eventFormButton">Create Event</button>
            

           </form>
        </div>
    )
}


export default EventForm;
