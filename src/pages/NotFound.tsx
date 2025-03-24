
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center px-4 sm:px-6 max-w-xl">
        <h1 className="text-9xl font-bold mb-4 text-white">404</h1>
        <p className="text-3xl font-medium text-gray-300 mb-6">Page not found</p>
        <p className="text-gray-400 mb-10">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition-all duration-300 inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
