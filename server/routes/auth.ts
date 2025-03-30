
import express from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../index';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  paymentOption: z.enum(['oneTime', 'installment']).optional(),
  merchandiseItems: z.array(z.string()).optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Register a new user
router.post('/register', validateRequest(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password, address, city, state, zipCode, paymentOption, merchandiseItems } = req.body;
    
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user in database
    const result = await pool.query(
      'INSERT INTO users (name, email, password, is_email_verified) VALUES ($1, $2, $3, $4) RETURNING id, email, name, is_email_verified',
      [name, email, hashedPassword, false]
    );
    
    const newUser = result.rows[0];
    
    // If shipping address provided, store it
    if (address && city && state && zipCode) {
      await pool.query(
        'INSERT INTO shipping_addresses (user_id, address, city, state, zip_code) VALUES ($1, $2, $3, $4, $5)',
        [newUser.id, address, city, state, zipCode]
      );
    }
    
    // If payment option provided, create order
    if (paymentOption) {
      const amount = paymentOption === 'oneTime' ? 5300 : 900;
      const orderResult = await pool.query(
        'INSERT INTO orders (user_id, amount, payment_type, status) VALUES ($1, $2, $3, $4) RETURNING id',
        [newUser.id, amount, paymentOption, 'active']
      );
      
      const orderId = orderResult.rows[0].id;
      
      // If merchandise items provided, store them
      if (merchandiseItems && merchandiseItems.length > 0) {
        for (const item of merchandiseItems) {
          await pool.query(
            'INSERT INTO order_items (order_id, product_id) VALUES ($1, $2)',
            [orderId, item]
          );
        }
      }
    }
    
    // Generate verification token
    const verificationToken = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET || 'sounduoex_secret',
      { expiresIn: '1d' }
    );
    
    // In a real app, send verification email here
    console.log(`Verification token for ${email}: ${verificationToken}`);
    
    // Generate JWT for authentication
    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET || 'sounduoex_secret',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isEmailVerified: newUser.is_email_verified,
      }
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', validateRequest(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const user = result.rows[0];
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'sounduoex_secret',
      { expiresIn: '7d' }
    );
    
    // Check if user has a ticket/pass
    const orderResult = await pool.query('SELECT * FROM orders WHERE user_id = $1 AND status = $2', [user.id, 'active']);
    const hasTicket = orderResult.rows.length > 0;
    
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isEmailVerified: user.is_email_verified,
        hasTicket,
      },
      redirectTo: user.is_email_verified ? (hasTicket ? '/dashboard' : '/tickets') : '/verify-email'
    });
  } catch (error) {
    next(error);
  }
});

// Verify email
router.get('/verify-email', async (req, res, next) => {
  try {
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).json({ message: 'Verification token is required' });
    }
    
    // Verify token
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET || 'sounduoex_secret') as { id: string };
    
    // Update user's email verification status
    await pool.query('UPDATE users SET is_email_verified = true WHERE id = $1', [decoded.id]);
    
    res.status(200).json({
      message: 'Email verified successfully',
      redirectTo: '/dashboard'
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }
    next(error);
  }
});

// Resend verification email
router.post('/resend-verification', async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Find user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = result.rows[0];
    
    // Check if email is already verified
    if (user.is_email_verified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }
    
    // Generate verification token
    const verificationToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'sounduoex_secret',
      { expiresIn: '1d' }
    );
    
    // In a real app, send verification email here
    console.log(`New verification token for ${email}: ${verificationToken}`);
    
    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    
    // Get user details
    const userResult = await pool.query(
      'SELECT id, email, name, is_email_verified FROM users WHERE id = $1',
      [userId]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = userResult.rows[0];
    
    // Check if user has a ticket/pass
    const orderResult = await pool.query('SELECT * FROM orders WHERE user_id = $1 AND status = $2', [userId, 'active']);
    const hasTicket = orderResult.rows.length > 0;
    
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isEmailVerified: user.is_email_verified,
        hasTicket,
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
