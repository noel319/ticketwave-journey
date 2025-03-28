
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/database';
import { generateToken, generateEmailVerificationToken, verifyToken } from '../utils/jwt';
import { sendVerificationEmail } from '../config/email';
import { AuthRequest } from '../middleware/auth.middleware';
import axios from 'axios';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (name, email, password, is_email_verified) VALUES ($1, $2, $3, $4) RETURNING id, email',
      [name, email, hashedPassword, false]
    );

    const user = result.rows[0];

    // Generate verification token
    const verificationToken = generateEmailVerificationToken(user.id);

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Generate JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      isEmailVerified: false
    });

    return res.status(201).json({
      message: 'User created successfully. Please verify your email.',
      token,
      user: {
        id: user.id,
        email: user.email,
        isEmailVerified: false
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const result = await pool.query(
      'SELECT id, email, password, is_email_verified, has_ticket FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      isEmailVerified: user.is_email_verified,
      hasTicket: user.has_ticket
    });

    // Determine redirect based on user status
    let redirectTo = '/';
    if (!user.is_email_verified) {
      redirectTo = '/verify-email';
    } else if (!user.has_ticket) {
      redirectTo = '/tickets';
    }

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        isEmailVerified: user.is_email_verified,
        hasTicket: user.has_ticket
      },
      redirectTo
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded || decoded.purpose !== 'email_verification') {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    // Update user verification status
    await pool.query(
      'UPDATE users SET is_email_verified = TRUE WHERE id = $1',
      [decoded.userId]
    );

    return res.status(200).json({ 
      message: 'Email verified successfully',
      redirectTo: '/tickets' 
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return res.status(500).json({ message: 'Server error during email verification' });
  }
};

export const resendVerification = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const result = await pool.query(
      'SELECT id, is_email_verified FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      // Don't reveal that the user doesn't exist
      return res.status(200).json({ message: 'If your email exists in our system, a verification link has been sent' });
    }

    const user = result.rows[0];

    // Check if email is already verified
    if (user.is_email_verified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    // Generate verification token
    const verificationToken = generateEmailVerificationToken(user.id);

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    return res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    console.error('Resend verification error:', error);
    return res.status(500).json({ message: 'Server error during resend verification' });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    // Verify Google token with Google's API
    const googleRes = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );

    const { email, name, sub } = googleRes.data;

    // Check if user exists
    let result = await pool.query(
      'SELECT id, email, is_email_verified, has_ticket FROM users WHERE email = $1',
      [email]
    );

    let user;
    if (result.rows.length === 0) {
      // Create new user if not exists
      result = await pool.query(
        'INSERT INTO users (name, email, password, is_email_verified, google_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, is_email_verified, has_ticket',
        [name, email, '', true, sub] // Password is empty for social logins
      );
    }

    user = result.rows[0];

    // Generate JWT
    const jwtToken = generateToken({
      id: user.id,
      email: user.email,
      isEmailVerified: user.is_email_verified,
      hasTicket: user.has_ticket
    });

    // Determine redirect based on user status
    let redirectTo = '/';
    if (!user.has_ticket) {
      redirectTo = '/tickets';
    }

    return res.status(200).json({
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        isEmailVerified: user.is_email_verified,
        hasTicket: user.has_ticket
      },
      redirectTo
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return res.status(500).json({ message: 'Server error during Google authentication' });
  }
};

export const appleAuth = async (req: Request, res: Response) => {
  try {
    const { token, name } = req.body;

    // In a real implementation, verify Apple token with Apple's API
    // This is a simplified version
    
    // For demo purposes, assuming the token contains necessary info
    // In reality, you'd need to verify with Apple's servers
    const decodedToken = verifyToken(token); // This is a placeholder
    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid Apple token' });
    }

    const { email, sub } = decodedToken;

    // Check if user exists
    let result = await pool.query(
      'SELECT id, email, is_email_verified, has_ticket FROM users WHERE email = $1',
      [email]
    );

    let user;
    if (result.rows.length === 0) {
      // Create new user if not exists
      result = await pool.query(
        'INSERT INTO users (name, email, password, is_email_verified, apple_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, is_email_verified, has_ticket',
        [name || 'Apple User', email, '', true, sub] // Password is empty for social logins
      );
    }

    user = result.rows[0];

    // Generate JWT
    const jwtToken = generateToken({
      id: user.id,
      email: user.email,
      isEmailVerified: user.is_email_verified,
      hasTicket: user.has_ticket
    });

    // Determine redirect based on user status
    let redirectTo = '/';
    if (!user.has_ticket) {
      redirectTo = '/tickets';
    }

    return res.status(200).json({
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        isEmailVerified: user.is_email_verified,
        hasTicket: user.has_ticket
      },
      redirectTo
    });
  } catch (error) {
    console.error('Apple auth error:', error);
    return res.status(500).json({ message: 'Server error during Apple authentication' });
  }
};

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const result = await pool.query(
      'SELECT id, name, email, is_email_verified, has_ticket FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.is_email_verified,
        hasTicket: user.has_ticket
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ message: 'Server error while retrieving user data' });
  }
};
