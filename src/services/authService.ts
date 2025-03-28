import axios from 'axios';
import { API_ENDPOINTS } from '../lib/authContants';

const API_BASE_URL = 'http://localhost:5000';

export const signUp = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.SIGNUP}`, data);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.VERIFY_EMAIL}`, { token });
  return response.data;
};

export const resendVerification = async (email: string) => {
  const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.RESEND_VERIFICATION}`, { email });
  return response.data;
};