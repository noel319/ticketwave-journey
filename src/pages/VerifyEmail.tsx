
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const VerifyEmail = () => {
  const { user, resendVerificationEmail, verifyEmail } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set email from user or from state passed by login/signup page
    const stateEmail = location.state?.email;
    setEmail(stateEmail || user?.email || '');

    // Check for token in URL
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      handleVerification(token);
    }
  }, [location, user]);

  const handleVerification = async (token: string) => {
    setIsLoading(true);
    try {
      const redirectPath = await verifyEmail(token);
      if (redirectPath) {
        navigate(redirectPath);
      }
    } catch (error) {
      toast.error('Failed to verify email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error('Email address is required');
      return;
    }
    
    setIsLoading(true);
    try {
      await resendVerificationEmail(email);
    } catch (error) {
      toast.error('Failed to resend verification email');
    } finally {
      setIsLoading(false);
    }
  };

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
                  to="/tickets" 
                  className="block w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white py-3 rounded-md font-medium transition-colors text-center"
                >
                  Continue to Pass
                </Link>
                
                <Link
                  to="/login" 
                  className="block w-full bg-white hover:bg-gray-200 text-black py-3 rounded-md font-medium transition-colors text-center mt-4"
                >
                  Back to Sign In
                </Link>
                
                <div className="text-sm text-gray-500 pt-4">
                  Didn't receive an email? Check your spam folder or {' '}
                  <Button 
                    variant="link"
                    className="text-white p-0 hover:underline focus:outline-none"
                    onClick={handleResend}
                    disabled={isLoading}
                  >
                    resend verification email
                  </Button>
                </div>
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
