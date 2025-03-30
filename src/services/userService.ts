
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

export const getUserInfo = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.USER_INFO);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateUserProfile = async (userData: any) => {
  try {
    const response = await api.put(API_ENDPOINTS.USER_INFO, userData);
    toast.success('Profile updated successfully');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updatePaymentMethod = async (paymentData: any) => {
  try {
    const response = await api.put('/api/users/payment', paymentData);
    toast.success('Payment method updated successfully');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export default {
  getUserInfo,
  updateUserProfile,
  updatePaymentMethod,
};
