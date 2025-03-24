
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password, name });
    // Implement authentication logic here
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-800">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {isSignUp ? 'Create an Account' : 'Welcome Back'}
              </h1>
              <p className="text-gray-400">
                {isSignUp 
                  ? 'Join us to get access to exclusive ticket offers and more.' 
                  : 'Sign in to access your tickets and account information.'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {!isSignUp && (
                  <div className="text-right mt-1">
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full bg-white hover:bg-gray-200 text-black py-3 rounded-md font-medium transition-colors flex items-center justify-center group"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <div className="text-gray-400">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-1 text-white hover:underline focus:outline-none"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
            </div>
            
            <div className="relative mt-8 pt-8">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-900 px-4 text-sm text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-3 rounded-md font-medium transition-colors text-gray-300 hover:text-white"
              >
                Google
              </button>
              <button
                type="button"
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-3 rounded-md font-medium transition-colors text-gray-300 hover:text-white"
              >
                Apple
              </button>
            </div>
            
            <div className="mt-8 text-center text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
