
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";

// ... existing imports ...
const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (data?.session) {
          toast({
            title: "Successfully signed in",
            description: "Welcome back!",
          });
          navigate('/');
        } else {
          navigate('/signin');
        }
      } catch (error: any) {
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to authenticate",
          variant: "destructive"
        });
        navigate('/signin');
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-white text-center">
          <div className="text-2xl font-bold mb-4">Processing your sign in...</div>
          <div className="w-12 h-12 border-t-4 border-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
