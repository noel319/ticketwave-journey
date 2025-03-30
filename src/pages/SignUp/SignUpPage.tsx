import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, Loader } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";
import { showToast } from '@/utils/toast';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { AuthFormField } from '@/components/auth/FormField';
import { signUp } from '@/services/authService';
import { SIGNUP_FIELDS } from '@/lib/authContants';
import Navbar from '@/components/Navbar';



const formSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email must be less than 100 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must be less than 50 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onCaptchaChange = (value: string | null) => {
    setCaptchaVerified(!!value);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!captchaVerified) {
      showToast({
        type: 'error',
        message: 'CAPTCHA verification required',
        description: 'Please complete the CAPTCHA verification',
      });
      return;
    }

    setIsLoading(true);
    try {
      const redirectPath = await signUp({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (redirectPath) {
        form.reset();
        setCaptchaVerified(false);
        navigate(redirectPath, { state: { email: values.email } });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Optional: Implement these if you need social login
  const handleGoogleSignIn = () => {
    showToast({
      type: 'info',
      message: 'Google sign-in',
      description: 'This feature is not implemented yet',
    });
  };

  const handleAppleSignIn = () => {
    showToast({
      type: 'info',
      message: 'Apple sign-in',
      description: 'This feature is not implemented yet',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-md mx-auto bg-black/30 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-purple-500/20 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gradient-primary">Sign Up</h1>
            <p className="text-gray-300 mt-2">Create your SOUNDUOEX account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {SIGNUP_FIELDS.map((field) => (
                <AuthFormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
                  icon={field.icon}
                />
              ))}

              <div className="flex justify-center my-6">
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'YOUR_ACTUAL_RECAPTCHA_SITE_KEY'}
                  onChange={onCaptchaChange}
                  theme="dark"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 py-6"
                disabled={isLoading || !captchaVerified}
                aria-live="polite"
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Sign Up</span>
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/30 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant="outline"
              className="bg-transparent border-gray-700 hover:bg-gray-800 text-white"
              aria-label="Sign up with Google"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              Google
            </Button>
            <Button 
              onClick={handleAppleSignIn}
              disabled={isLoading}
              variant="outline"
              className="bg-transparent border-gray-700 hover:bg-gray-800 text-white"
              aria-label="Sign up with Apple"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M16.125,0.1c-1.597,0.1-3.197,1.097-4.196,2.396c-0.897,1.198-1.596,2.896-1.297,4.594c1.497,0.1,3.095-0.8,4.094-2.098C15.625,3.693,16.224,1.794,16.125,0.1z M12.031,8.088c-0.8,0-2.297,0.897-3.795,0.897c-1.996,0-3.794-0.897-3.794-0.897c-1.497,0-3.094,1.097-4.093,2.995c-1.695,2.993-1.397,8.684,1.298,13.477c0.897,1.598,2.094,3.295,3.692,3.295c1.497,0,1.896-0.898,3.893-0.898c1.996,0,2.496,0.898,3.894,0.898c1.697,0,2.894-1.697,3.892-3.295c0.8-1.498,1.098-2.994,1.098-2.994c-2.095-0.799-3.593-2.994-3.593-5.289c0-2.395,1.797-4.292,1.797-4.292C13.73,8.587,12.031,8.088,12.031,8.088z"/>
              </svg>
              Apple
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-pink-400 hover:text-pink-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};