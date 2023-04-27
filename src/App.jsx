import React from "react";
import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import Community from "./Community";
import GigsPage from "./GigsPage";
import About from "./About";
import Create from "./Create";


function App() {
 return (
  <div className="App">
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
                <li> 
                    <Link to='/Create'>create</Link>
                </li>
            </ul>
                
          </nav>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/Community" element={<Community />}/>
                <Route path="/GigsPage" element={<GigsPage />}/>
                <Route path="/About" element={<About />}/>
                <Route path="/Create" element={<Create />}/>
            </Routes>
        </div>
  </div>
 );
}
export default App;