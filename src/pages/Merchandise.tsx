import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'clothing' | 'accessories' | 'collectibles';
}

const products: Product[] = [
  {
    id: 1,
    name: 'World Tour T-Shirt',
    price: 35,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    category: 'clothing'
  },
  {
    id: 2,
    name: 'Artist Hoodie',
    price: 65,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'clothing'
  },
  {
    id: 3,
    name: 'Concert Poster',
    price: 25,
    image: 'https://images.unsplash.com/photo-1614032686163-bdc24c13d0b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'collectibles'
  },
  {
    id: 4,
    name: 'Tour Cap',
    price: 30,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80',
    category: 'accessories'
  },
  {
    id: 5,
    name: 'Commemorative Wristband',
    price: 15,
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'accessories'
  },
  {
    id: 6,
    name: 'Limited Edition Vinyl',
    price: 40,
    image: 'https://images.unsplash.com/photo-1603048588665-709f072324a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'collectibles'
  }
];

const Merchandise = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isVisible, setIsVisible] = useState(false);
  const [isDigitalVisible, setIsDigitalVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const digitalSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const digitalObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDigitalVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (digitalSectionRef.current) {
      digitalObserver.observe(digitalSectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (digitalSectionRef.current) {
        digitalObserver.unobserve(digitalSectionRef.current);
      }
    };
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main>
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Merchandise" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Official Merchandise</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Take home a piece of the experience with our exclusive merchandise.
            </p>
          </div>
        </section>
        
        <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
          <div 
            className={cn(
              "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-0">Shop Collection</h2>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === 'all' 
                      ? "bg-white text-black" 
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  )}
                >
                  All Items
                </button>
                <button 
                  onClick={() => setSelectedCategory('clothing')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === 'clothing' 
                      ? "bg-white text-black" 
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  )}
                >
                  Clothing
                </button>
                <button 
                  onClick={() => setSelectedCategory('accessories')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === 'accessories' 
                      ? "bg-white text-black" 
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  )}
                >
                  Accessories
                </button>
                <button 
                  onClick={() => setSelectedCategory('collectibles')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === 'collectibles' 
                      ? "bg-white text-black" 
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  )}
                >
                  Collectibles
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-gray-300 mb-4">${product.price.toFixed(2)}</p>
                    
                    <button className="w-full bg-white hover:bg-gray-200 text-black py-2 rounded-md font-medium transition-colors flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section ref={digitalSectionRef} className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black">
          <div 
            className={cn(
              "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000",
              isDigitalVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white mb-4">
                  <span className="text-sm font-medium">New Release</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Experience Digital Magic</h2>
                <p className="text-gray-300 mb-6">
                  Can't make it to the live show? Experience the magic from home with our immersive digital concert experience. 
                  Featuring multi-angle HD video, studio-quality sound, and exclusive behind-the-scenes content.
                </p>
                <p className="text-gray-300 mb-8">
                  Pre-order now to get early access to soundcheck footage and an exclusive digital merchandise pack.
                </p>
                
                <a 
                  href="#" 
                  className="bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-md font-medium transition-all duration-300 inline-flex items-center justify-center"
                >
                  Pre-order Now
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 animate-pulse"></div>
                <div className="relative bg-gray-900 p-1 rounded-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Digital Concert Experience" 
                    className="rounded-xl shadow-2xl w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Merchandise;
