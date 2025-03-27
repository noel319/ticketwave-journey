
import { Router } from 'express';
import {
  signup,
  login,
  verifyEmail,
  resendVerification,
  googleAuth,
  appleAuth,
  getUser
} from '../controllers/auth.controller';
import { validate } from '../middleware/validation.middleware';
import { authenticate } from '../middleware/auth.middleware';
import {
  signupSchema,
  loginSchema,
  verifyEmailSchema,
  resendVerificationSchema,
  googleAuthSchema,
  appleAuthSchema
} from '../schemas/auth.schema';

const router = Router();

// Auth routes
router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.get('/verify-email', validate(verifyEmailSchema), verifyEmail);
router.post('/resend-verification', validate(resendVerificationSchema), resendVerification);
router.post('/google', validate(googleAuthSchema), googleAuth);
router.post('/apple', validate(appleAuthSchema), appleAuth);

// Protected routes
router.get('/me', authenticate, getUser);

export default router;
