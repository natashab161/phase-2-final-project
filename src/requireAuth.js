import React from 'react';
import { Redirect } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const requireAuth = (WrappedComponent) => {
  const auth = getAuth();
  if (!auth.currentUser) {
    return <Redirect to="/signin" />;
  }
  return WrappedComponent;
};

export default requireAuth;
