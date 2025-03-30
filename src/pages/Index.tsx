import React, { useEffect, useRef } from 'react';
import Hero from '@/components/Hero';
import ResponsiveFeaturedArtists from '@/components/ResponsiveFeaturedArtists';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutConcert from '@/components/AboutConcert';

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <ResponsiveFeaturedArtists />
          <AboutConcert />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
