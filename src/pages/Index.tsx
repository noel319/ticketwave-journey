
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import ResponsiveFeaturedArtists from '@/components/ResponsiveFeaturedArtists';
import TourDates from '@/components/TourDates';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Function to animate elements when they enter the viewport
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.9) {
          element.classList.add('show');
        }
      });
    };

    // Initial check and scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main>
        <Hero />
        <ResponsiveFeaturedArtists />
        <TourDates />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
