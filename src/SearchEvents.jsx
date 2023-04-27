// import React, {useState} from "react";
// import './SearchBar.css';

// function SearchEvents({ searchInput, onSearch }) {


//     const [inputValue, setInputValue]  = useState(searchInput);

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       onSearch(inputValue);
//     }

//     return (
//       <div id="cover">
//         <form className="searchbar" onSubmit={handleSubmit}>
//           <div className="searchOuterCell">
//             <div className="td"> {/* for some reason this class name is effecting the actual styling, even when the corresponding css pointer is correct */}
//               <input
//                 type="text"
//                 placeholder="Search Events"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//               />
//             </div>
//             <div className="td" id="s-cover">
//               <button type="submit">
//                 <div id="s-circle"></div>
//                 <span></span>
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     );
//   }
// export default SearchEvents;