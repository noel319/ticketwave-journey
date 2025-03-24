
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive"
        });
        navigate('/signin');
        return;
      }

      if (data?.session) {
        toast({
          title: "Successfully signed in",
          description: "Welcome back!",
        });
        navigate('/');
      } else {
        navigate('/signin');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-pulse text-white text-center">
        <div className="text-2xl font-bold mb-4">Processing your sign in...</div>
        <div className="w-12 h-12 border-t-4 border-white rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthCallback;
