
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSavedProgress, clearSavedProgress } from '@/utils/signupProgress';
import { toast } from 'sonner';

export const ContinueSignup: React.FC = () => {
  const navigate = useNavigate();
  const [hasProgress, setHasProgress] = useState(false);
  const [progressDetails, setProgressDetails] = useState<{
    email: string;
    step: number;
    lastUpdated: Date;
  } | null>(null);
  
  useEffect(() => {
    const savedProgress = getSavedProgress();
    if (savedProgress) {
      setHasProgress(true);
      setProgressDetails({
        email: savedProgress.email,
        step: savedProgress.currentStep,
        lastUpdated: new Date(savedProgress.lastUpdated)
      });
    }
  }, []);
  
  const continueSignup = () => {
    navigate('/signup');
  };
  
  const startFresh = () => {
    clearSavedProgress();
    navigate('/signup');
    toast.info('Starting a new registration');
  };
  
  if (!hasProgress) return null;
  
  return (
    <Card className="bg-blue-950/50 border border-blue-500/20 p-4 mb-8 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-300 mb-2">Continue Your Registration</h3>
      <p className="text-sm text-blue-200 mb-4">
        You have an unfinished signup from {progressDetails?.lastUpdated.toLocaleString()} 
        (Step {progressDetails?.step} of 5) for {progressDetails?.email}.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={continueSignup} 
          className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
        >
          Continue Registration
        </Button>
        <Button 
          onClick={startFresh} 
          variant="outline" 
          className="text-blue-300 border-blue-400 hover:bg-blue-900/30"
        >
          Start Fresh
        </Button>
      </div>
    </Card>
  );
};
