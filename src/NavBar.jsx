import React from "react";
import { Link, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import About from "./About";

function NavBar () {
    return (
        <div>
          <nav className="navBar">
            <ul>
                <li> <Link to='/'>home</Link> </li>
                <li> <Link to='/About'>about</Link> </li>
            </ul>
          </nav>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/About" element={<About />}/>
            </Routes>
        </div>
    )
}

export default NavBar;