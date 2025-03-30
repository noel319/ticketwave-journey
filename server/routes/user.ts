
import express from 'express';
import { z } from 'zod';
import { pool } from '../index';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

// Validation schemas
const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

// Get user info
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
    
    // Get user's shipping address
    const addressResult = await pool.query(
      'SELECT address, city, state, zip_code FROM shipping_addresses WHERE user_id = $1',
      [userId]
    );
    
    // Get user's order
    const orderResult = await pool.query(
      `SELECT o.id, o.amount, o.payment_type, o.status, o.created_at, 
        CASE WHEN o.payment_type = 'installment' THEN 
          (SELECT COUNT(*) FROM payments WHERE order_id = o.id) 
        ELSE 0 END as payments_made
       FROM orders o WHERE o.user_id = $1 AND o.status = $2 ORDER BY o.created_at DESC LIMIT 1`,
      [userId, 'active']
    );
    
    // Get merchandise items if order exists
    let merchandise = [];
    if (orderResult.rows.length > 0) {
      const merchandiseResult = await pool.query(
        `SELECT p.name FROM order_items oi 
         JOIN products p ON oi.product_id = p.id 
         WHERE oi.order_id = $1`,
        [orderResult.rows[0].id]
      );
      merchandise = merchandiseResult.rows.map(item => item.name);
    }
    
    const user = userResult.rows[0];
    const address = addressResult.rows[0] || null;
    const order = orderResult.rows[0] || null;
    
    // Calculate next payment date if on installment plan
    let nextPaymentDate = null;
    let remainingPayments = null;
    
    if (order && order.payment_type === 'installment') {
      const paymentsMade = parseInt(order.payments_made);
      remainingPayments = 6 - paymentsMade;
      
      if (remainingPayments > 0) {
        const orderDate = new Date(order.created_at);
        nextPaymentDate = new Date(orderDate);
        nextPaymentDate.setMonth(orderDate.getMonth() + paymentsMade + 1);
        
        // Format date as YYYY-MM-DD
        nextPaymentDate = nextPaymentDate.toISOString().split('T')[0];
      }
    }
    
    res.status(200).json({
      name: user.name,
      email: user.email,
      isEmailVerified: user.is_email_verified,
      hasPass: !!order,
      purchaseDate: order ? new Date(order.created_at).toISOString().split('T')[0] : null,
      paymentPlan: order ? order.payment_type : null,
      paymentStatus: order ? order.status : null,
      nextPaymentDate,
      remainingPayments,
      merchandise,
      shippingAddress: address ? {
        address: address.address,
        city: address.city,
        state: address.state,
        zipCode: address.zip_code
      } : null
    });
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.put('/me', authenticate, validateRequest(updateProfileSchema), async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { name, address, city, state, zipCode } = req.body;
    
    // Start a transaction
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Update user name if provided
      if (name) {
        await client.query('UPDATE users SET name = $1 WHERE id = $2', [name, userId]);
      }
      
      // Update shipping address if provided
      if (address && city && state && zipCode) {
        // Check if address exists
        const addressResult = await client.query(
          'SELECT * FROM shipping_addresses WHERE user_id = $1',
          [userId]
        );
        
        if (addressResult.rows.length > 0) {
          // Update existing address
          await client.query(
            'UPDATE shipping_addresses SET address = $1, city = $2, state = $3, zip_code = $4 WHERE user_id = $5',
            [address, city, state, zipCode, userId]
          );
        } else {
          // Create new address
          await client.query(
            'INSERT INTO shipping_addresses (user_id, address, city, state, zip_code) VALUES ($1, $2, $3, $4, $5)',
            [userId, address, city, state, zipCode]
          );
        }
      }
      
      await client.query('COMMIT');
      
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    next(error);
  }
});

// Update payment method
router.put('/payment', authenticate, async (req, res, next) => {
  try {
    // In a real application, this would interact with your payment processor
    // For now, we'll just return a success message
    res.status(200).json({ message: 'Payment method updated successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
