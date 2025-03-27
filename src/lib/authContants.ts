export const SIGNUP_FIELDS = [
    {
      name: 'name',
      label: 'Name',
      placeholder: 'Your name',
      type: 'text',
      icon: 'User',
      validation: {
        required: 'Name is required',
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
      placeholder: 'Create a password',
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
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Confirm your password',
      type: 'password',
      icon: 'Lock',
      validation: {
        required: 'Please confirm your password',
        validate: (value: string, values: any) => 
          value === values.password || "Passwords don't match"
      }
    }
  ];
  
  export const API_ENDPOINTS = {
    SIGNUP: '/api/auth/signup',
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESEND_VERIFICATION: '/api/auth/resend-verification'
  };