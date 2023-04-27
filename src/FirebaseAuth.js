import React, { useEffect, useRef } from "react";
import { app, auth } from "./Firebase";
import * as firebaseui from "firebaseui";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import "firebaseui/dist/firebaseui.css";

const FirebaseAuth = () => {
  const authContainerRef = useRef(null);

  useEffect(() => {
    if (authContainerRef.current) {
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
      ui.start(authContainerRef.current, uiConfig);
    }

    return () => {
      // Clean up the widget instance
      const ui = firebaseui.auth.AuthUI.getInstance();
      if (ui) ui.reset();
    };
  }, []);

  return <div ref={authContainerRef} />;
};

export default FirebaseAuth;
