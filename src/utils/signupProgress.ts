
// Utility functions to save and retrieve signup progress

interface SignupProgress {
  email: string;
  currentStep: number;
  formData: Record<string, any>;
  lastUpdated: number;
}

const SIGNUP_PROGRESS_KEY = 'sounduoex_signup_progress';

/**
 * Save the current signup progress to localStorage
 */
export const saveSignupProgress = (email: string, currentStep: number, formData: Record<string, any>): void => {
  if (!email) return;
  
  const progress: SignupProgress = {
    email,
    currentStep,
    formData,
    lastUpdated: Date.now(),
  };
  
  localStorage.setItem(SIGNUP_PROGRESS_KEY, JSON.stringify(progress));
};

/**
 * Get saved signup progress from localStorage
 */
export const getSavedProgress = (email?: string): SignupProgress | null => {
  const savedProgressStr = localStorage.getItem(SIGNUP_PROGRESS_KEY);
  if (!savedProgressStr) return null;
  
  try {
    const savedProgress: SignupProgress = JSON.parse(savedProgressStr);
    
    // If email is provided, only return progress if it matches
    if (email && savedProgress.email !== email) {
      return null;
    }
    
    // Check if progress is less than 24 hours old
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if (Date.now() - savedProgress.lastUpdated > twentyFourHours) {
      clearSavedProgress();
      return null;
    }
    
    return savedProgress;
  } catch (error) {
    clearSavedProgress();
    return null;
  }
};

/**
 * Clear saved signup progress
 */
export const clearSavedProgress = (): void => {
  localStorage.removeItem(SIGNUP_PROGRESS_KEY);
};
