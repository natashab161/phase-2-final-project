import React from "react";
import EventCard from "./EventCard";

function SearchEvents({ searchInput, onSearch }) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Browse events near you </label>
      <input
        value={searchInput}
        type="text"
        id="search"
        placeholder="Type a category to search..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchEvents;