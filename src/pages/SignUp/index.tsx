
import React from 'react';
import { Navigate } from 'react-router-dom';

const SignUp = () => {
  // Redirect to the new multi-step login flow
  return <Navigate to="/login" replace />;
};

export default SignUp;
