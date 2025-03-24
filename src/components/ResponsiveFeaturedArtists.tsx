
import React, { useState, useEffect } from 'react';
import FeaturedArtists from './FeaturedArtists';

const ResponsiveFeaturedArtists = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className={`w-full ${isMobile ? 'px-4' : 'px-6 lg:px-8'}`}>
      <FeaturedArtists />
    </div>
  );
};

export default ResponsiveFeaturedArtists;
