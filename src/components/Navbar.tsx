
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
          ? 'bg-gray-900/90 backdrop-blur-md py-3 shadow-lg' 
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
            <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-sky-400 bg-clip-text text-transparent">SOUNDUOEX</span>
          </Link>

          <div className="flex items-center">
            {/* Auth button */}
            <div className="ml-6">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white hover:text-gray-300 transition-colors duration-200 flex items-center focus:outline-none">
                    <UserCircle className="h-6 w-6 text-sky-300" />
                    <span className="max-w-[80px] sm:max-w-[120px] ml-1 truncate hidden sm:inline">{user.email}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass-card bg-gray-950/90 text-white border-gray-700/20">
                    <DropdownMenuItem asChild className="hover:bg-gray-800/60">
                      <Link to="/pass" className="cursor-pointer focus:bg-gray-800/60">Pass Card</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-gray-800/60">
                      <Link to="/my-tickets" className="cursor-pointer focus:bg-gray-800/60">My Tickets</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700/20" />
                    <DropdownMenuItem onClick={handleSignOut} className="text-sky-300 hover:bg-gray-800/60 focus:text-sky-300">
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
                  <UserCircle className="h-5 w-5 text-sky-300" />
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
