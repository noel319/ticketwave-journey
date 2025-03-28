
import React from 'react';
import LoginPage from '../Login/LoginPage';

const SignUp = () => {
  // We're using the LoginPage component but in signup mode
  return <LoginPage initialStep={1} isSignUpFlow={true} />;
};

export default SignUp;
