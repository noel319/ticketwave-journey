
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, User, Lock } from 'lucide-react';
import { SIGNUP_FIELDS } from '@/lib/authContants';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

interface Step1SignupFormProps {
  formData?: {
    name: string;
    email: string;
    password: string;
    [key: string]: any;
  };
  updateFormData?: (data: Partial<any>) => void;
  nextStep?: () => void;
  onNext?: (data: FormData) => void;
}

export const Step1SignupForm: React.FC<Step1SignupFormProps> = ({ 
  formData, 
  updateFormData, 
  nextStep, 
  onNext 
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: formData?.name || '',
      email: formData?.email || '',
      password: formData?.password || '',
      confirmPassword: ''
    },
  });

  const onSubmit = (data: FormData) => {
    if (updateFormData && nextStep) {
      // LoginPage.tsx flow
      updateFormData({
        name: data.name,
        email: data.email,
        password: data.password
      });
      nextStep();
    } else if (onNext) {
      // Direct onNext callback flow
      onNext(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
        <p className="text-gray-300">Join SOUNDUOEX to get exclusive access to tickets and merchandise</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {SIGNUP_FIELDS.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as keyof FormData}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        placeholder={field.placeholder} 
                        type={field.type} 
                        {...formField} 
                        className="pl-10 bg-purple-900/50 border-purple-700 focus:border-pink-500"
                      />
                    </FormControl>
                    <div className="absolute left-3 top-3 text-purple-400">
                      {field.icon === 'User' && <User size={16} />}
                      {field.icon === 'Mail' && <Mail size={16} />}
                      {field.icon === 'Lock' && <Lock size={16} />}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Continue
          </Button>
        </form>
      </Form>
      
      <div className="text-center text-sm text-gray-400">
        <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
};
