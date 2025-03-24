
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent">TicketWave</span>
          </Link>

          {/* Auth and Buy Tickets button */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-300 transition-colors duration-200 flex items-center focus:outline-none">
                  <UserCircle className="h-6 w-6 text-pink-300" />
                  <span className="max-w-[80px] sm:max-w-[120px] ml-1 truncate hidden sm:inline">{user.email}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-card bg-black/80 text-white border-pink-500/20">
                  <DropdownMenuItem asChild className="hover:bg-white/10">
                    <Link to="/profile" className="cursor-pointer focus:bg-white/10">My Profile</Link>
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
                to="/signin" 
                className="text-white hover:text-gray-300 transition-colors duration-200 flex items-center"
              >
                <UserCircle className="h-5 w-5 text-pink-300" />
                <span className="ml-1 hidden sm:inline">Sign In</span>
              </Link>
            )}
            <Link 
              to="/tickets" 
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 sm:px-5 py-2 rounded-md font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-500/20"
            >
              Buy Tickets
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
