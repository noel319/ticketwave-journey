
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Eye, EyeOff, ArrowRight, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import ReCAPTCHA from "react-google-recaptcha";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const { signIn, signUp, googleSignIn, appleSignIn, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to home page
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaVerified(!!token);
  };

  const resetCaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setCaptchaVerified(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaVerified) {
      toast({
        title: "CAPTCHA Required",
        description: "Please complete the CAPTCHA verification",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      if (isSignUp) {
        await signUp(email, password, name);
        toast({
          title: "Account Created",
          description: "Please check your email to verify your account",
        });
        navigate('/verify-email');
      } else {
        await signIn(email, password);
        toast({
          title: "Signed In",
          description: "You've successfully signed in",
        });
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive"
      });
      resetCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error: any) {
      toast({
        title: "Google Sign In Error",
        description: error.message || "An error occurred during Google sign in",
        variant: "destructive"
      });
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await appleSignIn();
    } catch (error: any) {
      toast({
        title: "Apple Sign In Error",
        description: error.message || "An error occurred during Apple sign in",
        variant: "destructive"
      });
    }
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
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-10 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
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
              
              <div className="flex justify-center mt-4">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is a test key, replace with your actual key
                  onChange={handleCaptchaChange}
                  theme="dark"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !captchaVerified}
                className={`w-full bg-white hover:bg-gray-200 text-black py-3 rounded-md font-medium transition-colors flex items-center justify-center group ${
                  (isSubmitting || !captchaVerified) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <div className="text-gray-400">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    resetCaptcha();
                  }}
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
                onClick={handleGoogleSignIn}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-3 rounded-md font-medium transition-colors text-gray-300 hover:text-white flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={handleAppleSignIn}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-3 rounded-md font-medium transition-colors text-gray-300 hover:text-white flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M16.125,0.152c0,0-2.232,0.146-4.389,1.984c-0.495,0.432-0.919,1.133-1.219,1.903c-0.276,0.711-0.354,1.403-0.354,1.403s1.865-0.614,3.568-0.614c1.702,0,2.835,0.614,2.835,0.614s-0.42-1.344-1.27-2.521C14.342,1.66,13.125,0.682,12.02,0.306C13.217,0.31,14.424,0.152,16.125,0.152z M17.236,3.151c0,0-0.854,0.806-1.641,1.724c-0.787,0.917-1.315,1.982-1.315,3.037c0,1.054,0.382,1.979,1.042,2.642c0.661,0.663,1.548,1.022,2.523,1.022c0.975,0,1.834-0.389,2.479-1.043c0.644-0.655,1.019-1.553,1.019-2.621c0-1.069-0.367-1.979-1.02-2.642C19.67,4.607,18.781,4.223,17.806,4.223C17.157,4.223,17.236,3.151,17.236,3.151z M12,8c-4.418,0-8,3.582-8,8c0,4.418,3.582,8,8,8c4.418,0,8-3.582,8-8C20,11.582,16.418,8,12,8z M12,22c-3.314,0-6-2.686-6-6c0-3.314,2.686-6,6-6c3.314,0,6,2.686,6,6C18,19.314,15.314,22,12,22z" />
                </svg>
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
