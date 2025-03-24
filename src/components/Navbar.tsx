
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Menu, X, LogOut } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
          ? 'bg-black/80 backdrop-blur-md py-3 shadow-lg' 
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
            TicketWave
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-300 transition-colors duration-200 flex items-center focus:outline-none">
                  <UserCircle className="mr-1 h-6 w-6" />
                  <span className="max-w-[120px] truncate">{user.email}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-tickets">My Tickets</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500">
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
                <UserCircle className="mr-1 h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
            <Link 
              to="/tickets" 
              className="bg-white text-black px-5 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors duration-300"
            >
              Buy Tickets
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-300 transition-colors">
                  <UserCircle className="h-6 w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-tickets" onClick={() => setIsMobileMenuOpen(false)}>My Tickets</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link 
                to="/signin" 
                className="text-white hover:text-gray-300 transition-colors"
              >
                <UserCircle className="h-6 w-6" />
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden absolute w-full bg-black/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-6 space-y-4">
          <Link 
            to="/" 
            className="block text-white hover:text-gray-300 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="block text-white hover:text-gray-300 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/merchandise" 
            className="block text-white hover:text-gray-300 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Merchandise
          </Link>
          {user && (
            <Link 
              to="/my-tickets" 
              className="block text-white hover:text-gray-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Tickets
            </Link>
          )}
          <Link 
            to="/tickets" 
            className="block bg-white text-black px-5 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Buy Tickets
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
