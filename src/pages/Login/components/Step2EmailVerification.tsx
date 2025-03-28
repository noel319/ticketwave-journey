
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface Step2EmailVerificationProps {
  email: string;
  nextStep: () => void;
  prevStep: () => void;
}

export const Step2EmailVerification: React.FC<Step2EmailVerificationProps> = ({ 
  email, 
  nextStep,
  prevStep 
}) => {
  const [isResending, setIsResending] = useState(false);
  const { resendVerificationEmail, user } = useAuth();

  React.useEffect(() => {
    // If user email is already verified, move to the next step
    if (user?.isEmailVerified) {
      nextStep();
    }
  }, [user, nextStep]);
  
  const handleResendEmail = async () => {
    if (!email) {
      toast.error('Email address is required');
      return;
    }
    
    setIsResending(true);
    try {
      await resendVerificationEmail(email);
      toast.success('Verification email sent. Please check your inbox.');
    } catch (error) {
      toast.error('Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800/50 p-4 rounded-full">
          <Mail className="h-12 w-12 text-cyan-400" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      
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
          onClick={nextStep}
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
    </div>
  );
};
