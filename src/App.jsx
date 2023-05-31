import React from "react";
import { app, auth } from "./Firebase";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import UserStatus from "./UserStatus";
// import UserLocationsMap from "./UserLocationsMap";
import UploadPhotoForm from "./UploadPhotoForm";
import PersonalPhotos from "./PersonalPhotos";
import FirebaseAuth from "./FirebaseAuth";
// import { functions } from "./Firebase";
import { getFunctions } from 'firebase/functions'
import PhotoGallery from "./PhotoGallery";
import VideoUploadForm from "./VideoUploadForm";
// import ChatGPT from "./ChatGPT";
import ProfilePage from "./ProfilePage";
import Home from "./Home";
import About from "./About";
import Create from "./Create";
import EventsMap from "./EventsMap";
import GoogleAnalytics from './GoogleAnalytics';
import Login from "./Login";
// import PhotoMetadataVisualization from "./PhotoMetadataVisualization";

// import Dialogflow from "./DialogFlow";

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
      <nav>
        <ul className="navBar">
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/About">about</Link>
          </li>
          <li>
            <Link to="/Create">create</Link>
          </li>
          <li>
            <Link to="/Login">login</Link>
          </li>
          <li>
            <Link to="/ProfilePage">profile</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/PhotoGallery" element={<PhotoGallery />} />
        <Route path="/VideoUploadForm" element={<VideoUploadForm />} />
        <Route path="/PersonalPhotos" element={<PersonalPhotos user={user} />} />
        <Route path="/UploadPhotoForm" element={<UploadPhotoForm />} />
        <Route path="/EventsMap" element={<EventsMap />} />
        <Route path="/Login" element={<FirebaseAuth />} />
      </Routes>
      <GoogleAnalytics />
      <Login />

      <UserStatus />

      
    </div>
  );
}

export default App;
