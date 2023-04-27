import React, { useState } from "react";
import "./eventCard.css";

function EventsSearch2({ events, filteredEvents, setFilteredEvents }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearchTerm(searchTerm);

    const filteredEvents = events.filter((event) => {
      return (
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.location.city.toLowerCase().includes(searchTerm) ||
        event.location.state.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredEvents(filteredEvents);
  };

  return (
    <div className="searchContainer">
      <input
        type="text"
        placeholder="Search for events by name or location"
        value={searchTerm}
        onChange={handleSearch}
        className="searchInput"
      />
    </div>
  );
}

export default EventsSearch2;


  // import React, { useState } from 'react';
// import EventsMap from './EventsMap';

// function EventsSearch2({ events, visibleEvents, setVisibleEvents }) {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (event) => {
//     const searchTerm = event.target.value.toLowerCase();
//     setSearchTerm(searchTerm);

//     const filteredEvents = events.filter(event => {
//       const searchableFields = [
//         event.title,
//         event.category,
//         event.subcategory,
//         event.artform,
//         event.artist,
//         event.location.street,
//         event.location.city,
//         event.location.state,
//         event.location.neighborhood,
//         event.venue,
//         event.description,
//         ...(event.tags || []),
//         ...(event.collaborators || [])
//       ];

//       return searchableFields.some(field => {
//         if (typeof field === 'string') {
//           return field.toLowerCase().includes(searchTerm);
//         } else if (typeof field === 'object') {
//           const values = Object.values(field);
//           return values.some(value => value && value.toLowerCase().includes(searchTerm));
//         }
//         return false;
//       });
//     });

//     setVisibleEvents(filteredEvents.slice(0, 6));
//   }

//   return (
//     <div>
//       <input type="text" placeholder="Search events" onChange={handleSearch} />
//       <EventsMap visibleEvents={visibleEvents} />
//     </div>
//   );
// }

// export default EventsSearch2;

// import React, { useState } from "react";

// function EventsSearch2({ events, setVisibleEvents }) {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);

//     const filteredEvents = events.filter((event) => {
//       const searchableFields = [
//         event.title,
//         event.category,
//         event.subcategory,
//         event.artform,
//         event.artist,
//         event.location.street,
//         event.location.city,
//         event.location.state,
//         event.location.neighborhood,
//         event.venue,
//         event.description,
//         ...(event.tags || []),
//         ...(event.collaborators || [])
//       ];
//       return searchableFields.some((field) => {
//         if (typeof field === 'string') {
//           return field.toLowerCase().includes(searchTerm.toLowerCase());
//         } else if (typeof field === 'object') {
//           const values = Object.values(field);
//           return values.some((value) => value && value.toLowerCase().includes(searchTerm.toLowerCase()));
//         }
//         return false;
//       });
//     });
//     setVisibleEvents(filteredEvents.slice(0, 6));
//   }

//   return (
//     <div className="searchContainer">
//       <input type="text" placeholder="Search events" onChange={handleSearch} />
//     </div>
//   );
// }

// export default EventsSearch2;
