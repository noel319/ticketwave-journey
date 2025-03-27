
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-black to-purple-950/60 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 animate-text-glow">SOUNDUOEX</Link>
            <p className="text-gray-400 mb-6 text-sm max-w-md">
              The ultimate live music experience spanning across major stadiums worldwide.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-cyan-400 hover:text-white transition-colors duration-300" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-cyan-400 hover:text-white transition-colors duration-300" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-cyan-400 hover:text-white transition-colors duration-300" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-cyan-400 hover:text-white transition-colors duration-300" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>         

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold uppercase text-sm tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-cyan-300 transition-colors duration-300 text-sm block">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-cyan-300 transition-colors duration-300 text-sm block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-cyan-300 transition-colors duration-300 text-sm block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-cyan-300 transition-colors duration-300 text-sm block">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-900/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm order-2 md:order-1 mt-4 md:mt-0">
            &copy; {currentYear} SOUNDUOEX. All rights reserved.
          </p>
          <div className="order-1 md:order-2">
            <ul className="flex space-x-6 text-sm">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-cyan-300 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-cyan-300 transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-cyan-300 transition-colors duration-300">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
