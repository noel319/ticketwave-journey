
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { saveSignupProgress } from '@/utils/signupProgress';

interface Step3UserInfoProps {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const Step3UserInfo: React.FC<Step3UserInfoProps> = ({ 
  formData, 
  updateFormData, 
  nextStep, 
  prevStep 
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save progress with email immediately when form is valid
      if (formData.email) {
        saveSignupProgress(formData.email, 3, formData);
      }
      nextStep();
    }
  };

  // Handle input changes and save progress when email is entered
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    // If email field is changed and has a valid format, save progress
    if (name === 'email' && /^\S+@\S+\.\S+$/.test(value)) {
      saveSignupProgress(value, 3, { ...formData, [name]: value });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create Your Account</h2>
      <p className="text-gray-400 mb-6">
        Please provide your information to create your FANS ONLY Pass account.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a secure password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            <p className="text-gray-400 text-xs">Password must be at least 8 characters long</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          
          <div className="pt-4 flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={prevStep}
            >
              Back
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
              Continue to Payment
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
