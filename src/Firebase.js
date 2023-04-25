// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app);

export { app, auth, functions };

// // Initialize Firebase
// const firebase = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// // FirebaseUI configuration
// const uiConfig = {
//   signInFlow: "popup",
//   signInOptions: [GoogleAuthProvider.PROVIDER_ID],
//   callbacks: {
//     signInSuccessWithAuthResult: () => false,
//   },
// };

// // Initialize FirebaseUI instance
// const auth = getAuth(firebase);
// const ui = new firebaseui.auth.AuthUI(auth);

// export { firebase, ui, uiConfig };
