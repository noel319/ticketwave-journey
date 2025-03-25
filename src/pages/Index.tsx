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
    
    // Enhanced 3D Music Visualization Background
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
        // Create musical note particles with enhanced properties
        const particles: {
          x: number;
          y: number;
          size: number;
          speed: number;
          opacity: number;
          color: string;
          shape: 'circle' | 'note' | 'wave' | 'star';
          rotation: number;
          rotationSpeed: number;
          pulse: boolean;
          pulseSpeed: number;
          pulseSize: number;
          trail: boolean;
        }[] = [];
        
        const colors = [
          'rgba(138, 43, 226, 0.7)', // purple
          'rgba(255, 105, 180, 0.7)', // pink
          'rgba(32, 156, 238, 0.7)',  // blue
          'rgba(138, 43, 226, 0.7)', // purple
          'rgba(255, 192, 203, 0.7)', // light pink
          'rgba(75, 0, 130, 0.7)',    // indigo
          'rgba(0, 191, 255, 0.7)',   // deep sky blue
          'rgba(220, 20, 60, 0.7)',   // crimson
        ];
        
        // Initialize particles with more variety
        for (let i = 0; i < 60; i++) {
          const shape = Math.random() > 0.6 ? 
            (Math.random() > 0.5 ? 'note' : 'wave') : 
            (Math.random() > 0.8 ? 'star' : 'circle');
            
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            speed: Math.random() * 0.8 + 0.2,
            opacity: Math.random() * 0.7 + 0.3,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shape,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            pulse: Math.random() > 0.7,
            pulseSpeed: Math.random() * 0.03 + 0.01,
            pulseSize: 0,
            trail: Math.random() > 0.8,
          });
        }
        
        // Draw a musical note
        const drawNote = (x: number, y: number, size: number, color: string, rotation: number) => {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rotation);
          
          // Draw note head
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.ellipse(0, 0, size, size * 0.8, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw note stem
          ctx.beginPath();
          ctx.moveTo(size * 0.7, -size * 0.5);
          ctx.lineTo(size * 0.7, -size * 3);
          ctx.lineWidth = size / 3;
          ctx.strokeStyle = color;
          ctx.stroke();
          ctx.restore();
        };
        
        // Draw a wave
        const drawWave = (x: number, y: number, size: number, color: string, rotation: number) => {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rotation);
          
          ctx.beginPath();
          ctx.moveTo(-size * 2, 0);
          
          // Create a sine wave
          for (let i = -size * 2; i <= size * 2; i += 1) {
            ctx.lineTo(i, Math.sin(i * 0.5) * size * 0.5);
          }
          
          ctx.lineWidth = size / 2;
          ctx.strokeStyle = color;
          ctx.stroke();
          ctx.restore();
        };
        
        // Draw a star
        const drawStar = (x: number, y: number, size: number, color: string, rotation: number) => {
          const spikes = 5;
          const outerRadius = size * 2;
          const innerRadius = size;
          
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rotation);
          ctx.beginPath();
          ctx.fillStyle = color;
          
          for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI * 2 * i) / (spikes * 2);
            const xPos = Math.cos(angle) * radius;
            const yPos = Math.sin(angle) * radius;
            
            if (i === 0) {
              ctx.moveTo(xPos, yPos);
            } else {
              ctx.lineTo(xPos, yPos);
            }
          }
          
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        };
        
        // Add frequency spectrum visualization
        const frequencyBars = 16;
        const frequencyData = Array(frequencyBars).fill(0);
        
        // Update frequency data with simulated audio levels
        const updateFrequency = () => {
          for (let i = 0; i < frequencyBars; i++) {
            // Simulate audio pattern
            const base = (Math.sin(Date.now() * 0.001 + i * 0.3) + 1) / 2;
            const secondary = (Math.sin(Date.now() * 0.002 + i * 0.5) + 1) / 2;
            frequencyData[i] = base * 0.7 + secondary * 0.3;
          }
        };
        
        // Draw frequency spectrum
        const drawFrequency = () => {
          const barWidth = canvas.width / frequencyBars;
          const barMaxHeight = canvas.height * 0.15;
          
          ctx.save();
          
          // Draw bars at the bottom
          for (let i = 0; i < frequencyBars; i++) {
            const barHeight = frequencyData[i] * barMaxHeight;
            const x = i * barWidth;
            const y = canvas.height - barHeight;
            
            // Create gradient for each bar
            const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
            gradient.addColorStop(0, 'rgba(255, 105, 180, 0.7)');
            gradient.addColorStop(1, 'rgba(138, 43, 226, 0.3)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth - 2, barHeight);
            
            // Add glow effect
            ctx.shadowColor = 'rgba(255, 105, 180, 0.3)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
          }
          
          ctx.restore();
        };
        
        // Animation loop
        const animate = () => {
          // Create a semi-transparent effect by not clearing completely
          ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Update simulated frequency data
          updateFrequency();
          
          // Draw frequency visualization
          drawFrequency();
          
          // Update and draw particles
          particles.forEach(particle => {
            // Move upward with some horizontal drift
            particle.y -= particle.speed;
            particle.x += Math.sin(Date.now() * 0.001 + particle.y * 0.01) * 0.3;
            
            // Update rotation
            particle.rotation += particle.rotationSpeed;
            
            // Update pulse effect
            if (particle.pulse) {
              particle.pulseSize = Math.sin(Date.now() * particle.pulseSpeed) * 0.5 + 0.5;
            }
            
            // Reset when off-screen
            if (particle.y < -20 || particle.x < -20 || particle.x > canvas.width + 20) {
              particle.y = canvas.height + 20;
              particle.x = Math.random() * canvas.width;
            }
            
            // Calculate actual size with pulse effect
            const currentSize = particle.size * (1 + particle.pulseSize);
            
            // Draw trail effect
            if (particle.trail) {
              ctx.beginPath();
              ctx.strokeStyle = particle.color.replace(')', ', 0.3)').replace('rgba', 'rgba');
              ctx.lineWidth = currentSize / 3;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particle.x, particle.y + currentSize * 4);
              ctx.stroke();
            }
            
            // Draw particle according to its shape
            switch (particle.shape) {
              case 'note':
                drawNote(particle.x, particle.y, currentSize, particle.color, particle.rotation);
                break;
              case 'wave':
                drawWave(particle.x, particle.y, currentSize, particle.color, particle.rotation);
                break;
              case 'star':
                drawStar(particle.x, particle.y, currentSize, particle.color, particle.rotation);
                break;
              default:
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
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
      {/* Enhanced Canvas Background */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      
      {/* Gradient Overlays */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-1">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/80 to-black"></div>
        
        {/* Enhanced radial gradients for light effects */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-radial from-purple-600/20 to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-radial from-pink-600/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-gradient-radial from-indigo-600/15 to-transparent"></div>
        
        {/* Sound wave animation */}
        <div className="absolute bottom-0 left-0 w-full h-24 opacity-10">
          <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end h-full">
            {Array.from({ length: 120 }).map((_, index) => (
              <div 
                key={index}
                className="w-[0.15%] bg-gradient-to-t from-purple-500 to-pink-500 opacity-70 animate-pulse-slow"
                style={{ 
                  height: `${
                    // Create a more complex pattern using multiple sine waves
                    Math.sin(index * 0.2) * 30 + 
                    Math.sin(index * 0.1) * 20 + 
                    Math.cos(index * 0.3) * 10 + 50
                  }%`,
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
          <AboutConcert />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
