// src/components/Login.js
import React, { useEffect, useRef } from "react";
import { ui, uiConfig } from "./Firebase";
import "firebaseui/dist/firebaseui.css";

const Login = () => {
  const uiRef = useRef();

  useEffect(() => {
    if (ui.isPendingRedirect()) {
      ui.start(uiRef.current, uiConfig);
    }
  }, []);

  return <div ref={uiRef} />;
};

export default Login;
