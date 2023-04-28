import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from 'firebase/functions';
import * as firebaseui from "firebaseui";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: "https://pullupnyc-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
const functions = getFunctions(app);

const uiConfig = {
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
      clientId: "737390277278-e65basbmigp2304kvg76e5o4nt1d6mdj.apps.googleusercontent.com"
    }
    // Add more providers as needed
  ],
  // Other config options...
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      // Handle sign-in success.
      return false; // Do not redirect automatically.
    },
  },
};

const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

export { app, auth, storage, db, functions, ui, uiConfig };

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getFunctions } from 'firebase/functions';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
//   databaseURL: "https://pullupnyc-default-rtdb.firebaseio.com/",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const storage = getStorage(app);
// const db = getFirestore(app);
// const functions = getFunctions(app);

// export { app, auth, storage, db, functions };
