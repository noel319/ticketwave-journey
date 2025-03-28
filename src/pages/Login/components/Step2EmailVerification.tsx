
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, RefreshCw, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface Step2EmailVerificationProps {
  email: string;
  nextStep: () => void;
  prevStep: () => void;
  skipVerification?: boolean;
}

export const Step2EmailVerification: React.FC<Step2EmailVerificationProps> = ({ 
  email, 
  nextStep,
  prevStep,
  skipVerification = false
}) => {
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { resendVerificationEmail, user } = useAuth();

  useEffect(() => {
    // For demo purposes - if skipVerification is true, mark as verified after 2 seconds
    if (skipVerification) {
      const timer = setTimeout(() => {
        setIsVerified(true);
        toast.success("Email verified successfully!");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    
    // If user email is already verified, mark as verified
    if (user?.isEmailVerified) {
      setIsVerified(true);
    }
  }, [user, skipVerification]);
  
  const handleResendEmail = async () => {
    if (!email) {
      toast.error('Email address is required');
      return;
    }
    
    setIsResending(true);
    try {
      if (skipVerification) {
        // Demo mode
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('Verification email sent. Please check your inbox.');
      } else {
        // Real functionality
        await resendVerificationEmail(email);
        toast.success('Verification email sent. Please check your inbox.');
      }
    } catch (error) {
      toast.error('Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = () => {
    if (skipVerification) {
      setIsVerified(true);
      toast.success("Email verified successfully!");
    } else {
      nextStep();
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="flex justify-center mb-6">
        <div className={`p-4 rounded-full ${isVerified ? 'bg-green-800/50' : 'bg-gray-800/50'}`}>
          {isVerified ? (
            <CheckCircle className="h-12 w-12 text-green-400" />
          ) : (
            <Mail className="h-12 w-12 text-cyan-400" />
          )}
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      
      {isVerified ? (
        <div className="space-y-6">
          <p className="text-green-400 mb-6">
            Your email has been successfully verified!
          </p>
          <Button
            onClick={nextStep}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:opacity-90 text-black font-semibold"
          >
            Continue to Next Step
          </Button>
        </div>
      ) : (
        <>
          <p className="text-gray-400 mb-6">
            We've sent a verification link to <span className="text-white font-medium">{email}</span>.
            Please check your inbox and click the link to verify your account.
          </p>
          
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 mb-6">
            <p className="text-sm text-gray-300">
              <span className="text-cyan-400 font-medium">Tip:</span> If you don't see the email in your inbox, please check your spam or junk folder.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button
              onClick={handleResendEmail}
              disabled={isResending}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              {isResending ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Resend Verification Email
            </Button>
            
            <Button
              onClick={handleVerify}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:opacity-90 text-black font-semibold"
            >
              I've Verified My Email
            </Button>
            
            <Button
              onClick={prevStep}
              variant="ghost"
              className="w-full text-gray-400"
            >
              Go Back
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
