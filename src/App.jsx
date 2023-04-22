import './App.css';
import React from 'react';
import Home from './Home';
import About from './About';
import { Link, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <nav className='navBar'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>

      </nav>
        <Routes>
          <Route path='/' element={<Home />}/>


        </Routes>
          
    </div>
  );
}

export default App;
