
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    isEmailVerified?: boolean;
    role?: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header provided' });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Attach user to request
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

export const requireEmailVerified = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  if (!req.user.isEmailVerified) {
    return res.status(403).json({ message: 'Email not verified', redirectTo: '/verify-email' });
  }

  next();
};
