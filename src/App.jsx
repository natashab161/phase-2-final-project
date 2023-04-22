import './App.css';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <nav className='navBar'>
        <Link to='/'>home</Link>
        <Link to='/CommunityPage'>community</Link>
        <Link to='/GigsPage'>gigs</Link>
        <Link to='/About'>about</Link>
      </nav>

    </div>
  );
}

export default App;
