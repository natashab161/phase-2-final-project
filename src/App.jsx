// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { app, ui, uiConfig } from "./firebase";
import Login from "./Login";
import './App.css';
import NavBar from './NavBar';
import { getAuth } from "firebase/auth";


function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const auth = getAuth(app); // Get the auth instance
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <NavBar />
      {/* Add the Login component here */}
      <Login />
    </div>
  );
}

export default App;
