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
  ];
  
  export const API_ENDPOINTS = {
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESEND_VERIFICATION: '/api/auth/resend-verification'
  };