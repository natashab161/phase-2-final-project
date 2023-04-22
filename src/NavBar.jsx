import React from "react";
import { Link, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import Community from "./Community";
import GigsPage from "./GigsPage";
import About from "./About";

function NavBar () {
    return (
        <div>
          <nav>
            <ul className="navBar">
                <li> 
                    <Link to='/'>home</Link> 
                </li>
                <li> 
                    <Link to='/Community'>community</Link>
                </li>
                <li>
                    <Link to='/GigsPage'>gigs</Link>
                </li>
                <li> 
                    <Link to='/About'>about</Link>
                </li>
            </ul>
          </nav>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/Community" element={<Community />}/>
                <Route path="/GigsPage" element={<GigsPage />}/>
                <Route path="/About" element={<About />}/>
            </Routes>
        </div>
    )
}

export default NavBar;