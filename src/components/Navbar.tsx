
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'bg-black/70 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-white font-bold text-2xl tracking-tighter hover:opacity-90 transition-opacity"
          >
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent">SOUNDUOEX</span>
          </Link>

          <div className="flex items-center">
            {/* Navigation Links */}
            {/* <nav className="flex items-center space-x-6">
              <Link to="/" className="text-white hover:text-pink-300 transition-colors duration-200">
                Home
              </Link>
              <Link to="/about" className="text-white hover:text-pink-300 transition-colors duration-200">
                About
              </Link>
              <Link to="/merchandise" className="text-white hover:text-pink-300 transition-colors duration-200">
                Merchandise
              </Link>
              <Link to="/tickets" className="text-white hover:text-pink-300 transition-colors duration-200">
                Get Pass
              </Link>
              {user && (
                <Link to="/pass" className="text-white hover:text-pink-300 transition-colors duration-200">
                  Pass
                </Link>
              )}
            </nav> */}

            {/* Auth button */}
            <div className="ml-6">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white hover:text-gray-300 transition-colors duration-200 flex items-center focus:outline-none">
                    <UserCircle className="h-6 w-6 text-pink-300" />
                    <span className="max-w-[80px] sm:max-w-[120px] ml-1 truncate hidden sm:inline">{user.email}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass-card bg-black/80 text-white border-pink-500/20">
                    <DropdownMenuItem asChild className="hover:bg-white/10">
                      <Link to="/pass" className="cursor-pointer focus:bg-white/10">Pass Card</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-white/10">
                      <Link to="/my-tickets" className="cursor-pointer focus:bg-white/10">My Tickets</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/20" />
                    <DropdownMenuItem onClick={handleSignOut} className="text-pink-300 hover:bg-white/10 focus:text-pink-300">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  to="/login" 
                  className="text-white hover:text-gray-300 transition-colors duration-200 flex items-center"
                >
                  <UserCircle className="h-5 w-5 text-pink-300" />
                  <span className="ml-1 hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
