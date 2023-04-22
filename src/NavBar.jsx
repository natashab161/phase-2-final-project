import React from "react";
import { Link, Route, Routes, Switch } from 'react-router-dom';
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
          <Switch>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/About" element={<About />}/>
            </Routes>
          </Switch>
        </div>
    )
}

export default NavBar;