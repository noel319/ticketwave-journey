
import axios from 'axios';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@/lib/authContants';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
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

// Helper function to handle errors
const handleError = (error: any) => {
  const message = error.response?.data?.message || 'An error occurred';
  toast.error(message);
  throw error;
};

export const signUp = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await api.post(API_ENDPOINTS.REGISTER, userData);
    toast.success('Account created successfully! Please check your email for verification.');
    return '/verify-email';
  } catch (error) {
    return handleError(error);
  }
};

export const registerUser = async (userData: any) => {
  try {
    const response = await api.post(API_ENDPOINTS.REGISTER, userData);
    
    // Store token in local storage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    toast.success('Registration successful! Welcome to SOUNDUOEX.');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
    
    // Store token in local storage
    localStorage.setItem('token', response.data.token);
    
    toast.success('Login successful! Welcome back.');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  toast.info('You have been logged out');
};

export const verifyEmail = async (token: string) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.VERIFY_EMAIL}?token=${token}`);
    toast.success('Email verified successfully!');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const resendVerificationEmail = async (email: string) => {
  try {
    await api.post(API_ENDPOINTS.RESEND_VERIFICATION, { email });
    toast.success('Verification email sent. Please check your inbox.');
  } catch (error) {
    return handleError(error);
  }
};

export default {
  signUp,
  registerUser,
  login,
  logout,
  verifyEmail,
  resendVerificationEmail,
};
