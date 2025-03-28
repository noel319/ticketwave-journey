
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthFormField } from '@/components/auth/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { SIGNUP_FIELDS } from '@/lib/authContants';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';

interface Step1SignupFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
    [key: string]: any;
  };
  updateFormData: (data: Partial<typeof formData>) => void;
  nextStep: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const Step1SignupForm: React.FC<Step1SignupFormProps> = ({ 
  formData, 
  updateFormData, 
  nextStep 
}) => {
  const { signUp, googleSignIn, appleSignIn } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: formData.name || '',
      email: formData.email || '',
      password: formData.password || '',
      confirmPassword: formData.password || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      updateFormData({
        name: values.name,
        email: values.email,
        password: values.password
      });
      
      const redirectPath = await signUp(values.email, values.password, values.name);
      
      if (redirectPath) {
        nextStep();
      }
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const redirectPath = await googleSignIn();
      if (redirectPath) {
        // Handle redirection based on user status
      }
    } catch (error: any) {
      toast.error(error.message || 'Google sign in failed');
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const redirectPath = await appleSignIn();
      if (redirectPath) {
        // Handle redirection based on user status
      }
    } catch (error: any) {
      toast.error(error.message || 'Apple sign in failed');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:opacity-90 text-black font-semibold py-2 rounded-md transition-all"
            >
              Create Account
            </Button>
          </div>
        </form>
      </Form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="bg-white text-gray-800 hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <FcGoogle className="w-5 h-5" />
            <span>Google</span>
          </Button>
          
          <Button
            type="button"
            onClick={handleAppleSignIn}
            className="bg-black text-white border border-gray-700 hover:bg-gray-900 flex items-center justify-center gap-2"
          >
            <BsApple className="w-5 h-5" />
            <span>Apple</span>
          </Button>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <a href="/login" className="text-cyan-400 hover:underline">
          Sign in
        </a>
      </div>
    </div>
  );
};
