
import React, { useEffect, useRef } from 'react';
import Hero from '@/components/Hero';
import ResponsiveFeaturedArtists from '@/components/ResponsiveFeaturedArtists';
import TourDates from '@/components/TourDates';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    
    // 3D Music Visualization Background
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions
      const setCanvasDimensions = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      setCanvasDimensions();
      window.addEventListener('resize', setCanvasDimensions);
      
      if (ctx) {
        // Create musical note particles
        const particles: {
          x: number;
          y: number;
          size: number;
          speed: number;
          opacity: number;
          color: string;
          shape: 'circle' | 'note';
        }[] = [];
        
        const colors = [
          'rgba(138, 43, 226, 0.7)', // purple
          'rgba(255, 105, 180, 0.7)', // pink
          'rgba(32, 156, 238, 0.7)',  // blue
          'rgba(138, 43, 226, 0.7)', // purple
          'rgba(255, 192, 203, 0.7)', // light pink
        ];
        
        // Initialize particles
        for (let i = 0; i < 30; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            speed: Math.random() * 0.5 + 0.2,
            opacity: Math.random() * 0.5 + 0.2,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: Math.random() > 0.7 ? 'note' : 'circle'
          });
        }
        
        // Draw a musical note
        const drawNote = (x: number, y: number, size: number, color: string) => {
          // Draw note head
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.ellipse(x, y, size, size * 0.8, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw note stem
          ctx.beginPath();
          ctx.moveTo(x + size * 0.7, y - size * 0.5);
          ctx.lineTo(x + size * 0.7, y - size * 3);
          ctx.lineWidth = size / 3;
          ctx.strokeStyle = color;
          ctx.stroke();
        };
        
        // Animation loop
        const animate = () => {
          // Create a semi-transparent effect by not clearing completely
          ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Update and draw particles
          particles.forEach(particle => {
            // Move upward
            particle.y -= particle.speed;
            
            // Reset when off-screen
            if (particle.y < -20) {
              particle.y = canvas.height + 20;
              particle.x = Math.random() * canvas.width;
            }
            
            // Draw particle
            if (particle.shape === 'note') {
              drawNote(particle.x, particle.y, particle.size * 2, particle.color);
            } else {
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
              ctx.fillStyle = particle.color;
              ctx.fill();
            }
          });
          
          requestAnimationFrame(animate);
        };
        
        animate();
      }
    }
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      
      {/* Gradient Overlays */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-1">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black"></div>
        
        {/* Add radial gradients for light effects */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-radial from-purple-600/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-gradient-radial from-pink-600/10 to-transparent"></div>
        
        {/* Sound wave animation */}
        <div className="absolute bottom-0 left-0 w-full h-20 opacity-10">
          <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end h-full">
            {Array.from({ length: 100 }).map((_, index) => (
              <div 
                key={index}
                className="w-[0.2%] bg-gradient-to-t from-purple-500 to-pink-500 opacity-70 animate-pulse-slow"
                style={{ 
                  height: `${Math.sin(index * 0.2) * 50 + 50}%`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <ResponsiveFeaturedArtists />
          <TourDates />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
