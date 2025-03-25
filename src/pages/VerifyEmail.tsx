
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail } from 'lucide-react';

const VerifyEmail = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-800">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-800/50 p-4 rounded-full mb-6">
                <Mail className="h-12 w-12 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-2">
                Check Your Email
              </h1>
              
              <p className="text-gray-400 mb-8">
                We've sent you a verification link to your email address. 
                Please click the link to verify your account.
              </p>
              
              <div className="space-y-4 w-full">
                <Link
                  to="/pass" 
                  className="block w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white py-3 rounded-md font-medium transition-colors text-center"
                >
                  Continue to Pass
                </Link>
                
                <Link
                  to="/signin" 
                  className="block w-full bg-white hover:bg-gray-200 text-black py-3 rounded-md font-medium transition-colors text-center mt-4"
                >
                  Back to Sign In
                </Link>
                
                <p className="text-sm text-gray-500 pt-4">
                  Didn't receive an email? Check your spam folder or {' '}
                  <button className="text-white hover:underline focus:outline-none">
                    resend verification email
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VerifyEmail;
