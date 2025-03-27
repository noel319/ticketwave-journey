
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'sounduoex-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = (userId: string): string => {
  return jwt.sign({ userId, purpose: 'email_verification' }, JWT_SECRET, { expiresIn: '24h' });
};

export const generateResetPasswordToken = (userId: string): string => {
  return jwt.sign({ userId, purpose: 'reset_password' }, JWT_SECRET, { expiresIn: '1h' });
};
