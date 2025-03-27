import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User, Mail, Lock } from 'lucide-react';

interface FormFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  type: string;
  icon: string;
}

const iconMap: Record<string, React.ReactNode> = {
  User: <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />,
  Mail: <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />,
  Lock: <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
};

export const AuthFormField: React.FC<FormFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type,
  icon
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {iconMap[icon]}
              <Input
                type={type}
                placeholder={placeholder}
                className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500"
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};