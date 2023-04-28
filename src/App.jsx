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
import Community from "./Community";
import GigsPage from "./GigsPage";
import About from "./About";
import Create from "./Create";
import EventsMap from "./EventsMap";
import GoogleAnalytics from './GoogleAnalytics';
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
            <Link to="/Community">community</Link>
          </li>
          <li>
            <Link to="/GigsPage">gigs</Link>
          </li>
          <li>
            <Link to="/About">about</Link>
          </li>
          <li>
            <Link to="/Create">create</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/GigsPage" element={<GigsPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/PhotoGallery" element={<PhotoGallery />} />
        <Route path="/VideoUploadForm" element={<VideoUploadForm />} />
        <Route path="/PersonalPhotos" element={user ? <PersonalPhotos user={user} /> : <FirebaseAuth />} />
        <Route path="/UploadPhotoForm" element={<UploadPhotoForm />} />
        <Route path="/EventsMap" element={<EventsMap />} />
      </Routes>
      <GoogleAnalytics />
      <UserStatus />

      
    </div>
  );
}

export default App;
