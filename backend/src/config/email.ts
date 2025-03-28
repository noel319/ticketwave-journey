
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASS || 'password',
  },
});

export const sendVerificationEmail = async (to: string, token: string) => {
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: `"SOUNDUOEX" <${process.env.EMAIL_USER || 'noreply@sounduoex.com'}>`,
    to,
    subject: 'Verify Your Email for SOUNDUOEX',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000; color: #fff; border-radius: 10px; border: 1px solid #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #ff00ff; margin: 0;">SOUNDUOEX</h1>
          <p style="color: #aaa; font-size: 16px;">Thank you for signing up!</p>
        </div>
        <div style="background-color: #111; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin-top: 0;">Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(to right, #ff00ff, #00ffff); color: #000; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: bold; text-transform: uppercase; font-size: 14px;">Verify Email</a>
          </div>
          <p style="margin-bottom: 0; font-size: 12px; color: #aaa;">If you didn't create an account with SOUNDUOEX, you can safely ignore this email.</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #666;">
          <p>© ${new Date().getFullYear()} SOUNDUOEX. All rights reserved.</p>
        </div>
      </div>
    `,
  });
};
