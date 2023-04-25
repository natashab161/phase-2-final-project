// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { app, auth } from "./Firebase";
import { functions } from './Firebase';
import Login from "./Login";
import "./App.css";
import NavBar from "./NavBar";
import FirebaseAuth from "./FirebaseAuth";
import UserStatus from "./UserStatus";
import UserLocationsMap from "./UserLocationsMap";
import UploadPhotoForm from "./UploadPhotoForm";
import VideoUploadForm from "./VideoUploadForm";
import PhotoGallery from "./PhotoGallery";
import ChatGPT from "./ChatGPT";

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
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
      <UserStatus />
      <FirebaseAuth />
      <UploadPhotoForm />
      <VideoUploadForm />
      <UserLocationsMap />
      <PhotoGallery />
      <ChatGPT functions={functions}/>
    </div>
  );
}

export default App;
