
export const SIGNIN_FIELDS = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'your.email@example.com',
    type: 'email',
    icon: 'Mail',
    validation: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address'
      }
    }
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    icon: 'Lock',
    validation: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters'
      }
    }
  },    
];

export const SIGNUP_FIELDS = [
  {
    name: 'name',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    type: 'text',
    icon: 'User',
    validation: {
      required: 'Full name is required',
      minLength: {
        value: 2,
        message: 'Name must be at least 2 characters'
      }
    }
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'your.email@example.com',
    type: 'email',
    icon: 'Mail',
    validation: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address'
      }
    }
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Create a secure password',
    type: 'password',
    icon: 'Lock',
    validation: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters'
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      }
    }
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
    type: 'password',
    icon: 'Lock',
    validation: {
      required: 'Please confirm your password',
      validate: (value: string, values: any) => {
        return value === values.password || 'Passwords do not match';
      }
    }
  },
];
  
export const API_ENDPOINTS = {
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
  VERIFY_EMAIL: '/api/auth/verify-email',
  RESEND_VERIFICATION: '/api/auth/resend-verification',
  USER_INFO: '/api/users/me'
};
