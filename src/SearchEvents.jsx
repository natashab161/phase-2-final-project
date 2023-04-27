import React, {useState} from "react";
import './SearchBar.css';

function SearchEvents({ searchInput, onSearch }) {
<<<<<<< HEAD
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
=======
    const [inputValue, setInputValue]  = useState(searchInput);
>>>>>>> e4c8dc72dcf48a2ac1929d30bc2d3fe53717469c

    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(inputValue);
    }

    return (
      <div id="cover">
        <form className="searchbar" onSubmit={handleSubmit}>
          <div className="searchOuterCell">
            <div className="td"> {/* for some reason this class name is effecting the actual styling, even when the corresponding css pointer is correct */}
              <input
                type="text"
                placeholder="Search Events"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="td" id="s-cover">
              <button type="submit">
                <div id="s-circle"></div>
                <span></span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
export default SearchEvents;