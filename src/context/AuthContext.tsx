
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

// Define API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface User {
  id: string;
  email: string;
  name?: string;
  isEmailVerified: boolean;
  hasTicket?: boolean;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string, name: string) => Promise<string | null>;
  signOut: () => void;
  googleSignIn: () => Promise<string | null>;
  appleSignIn: () => Promise<string | null>;
  resendVerificationEmail: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<string | null>;
  getRedirectPath: () => string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create axios instance with authorization header
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: localStorage.getItem('token'),
    user: null,
    loading: true,
    error: null,
  });

  // Function to get user profile data
  const loadUser = async () => {
    if (!authState.token) {
      setAuthState(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      const res = await api.get('/auth/me');
      setAuthState(prev => ({
        ...prev,
        user: res.data.user,
        loading: false,
      }));
    } catch (error) {
      console.error('Error loading user:', error);
      localStorage.removeItem('token');
      setAuthState({
        token: null,
        user: null,
        loading: false,
        error: 'Session expired. Please log in again.',
      });
    }
  };

  // Load user data on mount or token change
  useEffect(() => {
    loadUser();
  }, [authState.token]);

  // Sign In
  const signIn = async (email: string, password: string): Promise<string | null> => {
    try {
      const res = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      setAuthState({
        token: res.data.token,
        user: res.data.user,
        loading: false,
        error: null,
      });
      
      return res.data.redirectTo || null;
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'Login failed',
        loading: false,
      }));
      toast.error(error.response?.data?.message || 'Login failed');
      return null;
    }
  };

  // Sign Up
  const signUp = async (email: string, password: string, name: string): Promise<string | null> => {
    try {
      const res = await api.post('/auth/signup', { email, password, name });
      
      localStorage.setItem('token', res.data.token);
      setAuthState({
        token: res.data.token,
        user: res.data.user,
        loading: false,
        error: null,
      });
      
      return '/verify-email';
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'Registration failed',
        loading: false,
      }));
      toast.error(error.response?.data?.message || 'Registration failed');
      return null;
    }
  };

  // Sign Out
  const signOut = () => {
    localStorage.removeItem('token');
    setAuthState({
      token: null,
      user: null,
      loading: false,
      error: null,
    });
  };

  // Google Sign In
  const googleSignIn = async (): Promise<string | null> => {
    try {
      // In a real implementation, you would use Google's OAuth flow
      // Here we're simulating the final step where we'd send the token to our server
      const token = "google-token"; // This would come from Google OAuth
      
      const res = await api.post('/auth/google', { token });
      
      localStorage.setItem('token', res.data.token);
      setAuthState({
        token: res.data.token,
        user: res.data.user,
        loading: false,
        error: null,
      });
      
      return res.data.redirectTo || '/';
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'Google sign in failed',
        loading: false,
      }));
      toast.error(error.response?.data?.message || 'Google sign in failed');
      return null;
    }
  };

  // Apple Sign In
  const appleSignIn = async (): Promise<string | null> => {
    try {
      // In a real implementation, you would use Apple's OAuth flow
      // Here we're simulating the final step where we'd send the token to our server
      const token = "apple-token"; // This would come from Apple OAuth
      
      const res = await api.post('/auth/apple', { token });
      
      localStorage.setItem('token', res.data.token);
      setAuthState({
        token: res.data.token,
        user: res.data.user,
        loading: false,
        error: null,
      });
      
      return res.data.redirectTo || '/';
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'Apple sign in failed',
        loading: false,
      }));
      toast.error(error.response?.data?.message || 'Apple sign in failed');
      return null;
    }
  };

  // Resend verification email
  const resendVerificationEmail = async (email: string): Promise<void> => {
    try {
      await api.post('/auth/resend-verification', { email });
      toast.success('Verification email sent. Please check your inbox.');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to resend verification email');
    }
  };

  // Verify email
  const verifyEmail = async (token: string): Promise<string | null> => {
    try {
      const res = await api.get(`/auth/verify-email?token=${token}`);
      
      // Update user data after verification
      if (authState.user) {
        setAuthState(prev => ({
          ...prev,
          user: { ...prev.user!, isEmailVerified: true },
        }));
      }
      
      toast.success('Email verified successfully!');
      return res.data.redirectTo || '/tickets';
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Email verification failed');
      return null;
    }
  };

  // Determine redirect path based on user state
  const getRedirectPath = (): string => {
    if (!authState.user) return '/login';
    if (!authState.user.isEmailVerified) return '/verify-email';
    if (!authState.user.hasTicket) return '/tickets';
    return '/';
  };

  return (
    <AuthContext.Provider value={{ 
      user: authState.user, 
      loading: authState.loading, 
      error: authState.error,
      isAuthenticated: !!authState.token,
      signIn, 
      signUp, 
      signOut,
      googleSignIn,
      appleSignIn,
      resendVerificationEmail,
      verifyEmail,
      getRedirectPath
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
