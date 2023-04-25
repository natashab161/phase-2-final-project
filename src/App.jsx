// src/App.js
import React from 'react';
import { app, auth } from './Firebase';
import './App.css';
import NavBar from './NavBar';
import UserStatus from './UserStatus';
import UserLocationsMap from './UserLocationsMap';
import UploadPhotoForm from './UploadPhotoForm';
import PersonalPhotos from './PersonalPhotos';
import FirebaseAuth from './FirebaseAuth';
import { functions } from './Firebase';
import PhotoGallery from './PhotoGallery';
import VideoUploadForm from "./VideoUploadForm";
import ChatGPT from "./ChatGPT";
import ProfilePage from './ProfilePage';


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
      <UploadPhotoForm />
      <UserLocationsMap />
      <ChatGPT />
      <ProfilePage />
      <PhotoGallery />
      {user ? (
        <PersonalPhotos user={user} />
      ) : (
        <FirebaseAuth />
      )}
    </div>
  );
}

export default App;


// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { auth } from './Firebase';
// import './App.css';
// import NavBar from './NavBar';
// import UserStatus from './UserStatus';
// import UserLocationsMap from './UserLocationsMap';
// import UploadPhotoForm from './UploadPhotoForm';
// import PersonalPhotos from './PersonalPhotos';
// import SignIn from './SignIn';

// function App() {
//   const [user, setUser] = React.useState(null);

//   React.useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <div className="App">
//       <NavBar />
//       <UserStatus />
//       {user ? (
//         <>
//           <UploadPhotoForm user={user} />
//           <UserLocationsMap />
//           <PersonalPhotos user={user} />
//         </>
//       ) : (
//         <SignIn />
//       )}
//     </div>
//   );
// }

// export default App;


// // // src/App.js
// // import React from "react";
// // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import { app, auth } from "./Firebase";
// // import { functions } from './Firebase';
// // import Login from "./Login";
// // import "./App.css";
// // import NavBar from "./NavBar";
// // import FirebaseAuth from "./FirebaseAuth";
// // import UserStatus from "./UserStatus";
// // import UserLocationsMap from "./UserLocationsMap";
// // import UploadPhotoForm from "./UploadPhotoForm";
// // import VideoUploadForm from "./VideoUploadForm";
// // import PhotoGallery from "./PhotoGallery";
// // import ChatGPT from "./ChatGPT";

// // function App() {
// //   const [user, setUser] = React.useState(null);

// //   React.useEffect(() => {
// //     const unsubscribe = auth.onAuthStateChanged((user) => {
// //       setUser(user);
// //     });

// //     return () => {
// //       unsubscribe();
// //     };
// //   }, []);

// //   return (
// //     <div className="App">
// //       <NavBar />
// //       <UserStatus />
// //       <FirebaseAuth />
// //       <UploadPhotoForm />
// //       <VideoUploadForm />
// //       <UserLocationsMap />
// //       <PhotoGallery />
// //       <ChatGPT functions={functions}/>
// //     </div>
// //   );
// // }

// // export default App;
