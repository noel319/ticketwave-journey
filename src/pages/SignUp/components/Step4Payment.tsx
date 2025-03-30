
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreditCard, Calendar, Lock, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { registerUser } from '@/services/authService';

interface Step4Props {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const formSchema = z.object({
  cardNumber: z.string()
    .min(16, 'Card number must be at least 16 digits')
    .max(19, 'Card number must be at most 19 digits')
    .regex(/^\d+$/, 'Card number must contain only digits'),
  cardExpiry: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry date must be in MM/YY format'),
  cardCvc: z.string()
    .min(3, 'CVC must be at least 3 digits')
    .max(4, 'CVC must be at most 4 digits')
    .regex(/^\d+$/, 'CVC must contain only digits'),
});

export const Step4Payment: React.FC<Step4Props> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  });

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{2})(\d{2})/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2');
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsProcessing(true);
    
    try {
      // Update form data with card details
      updateFormData({
        cardDetails: {
          number: values.cardNumber,
          expiry: values.cardExpiry,
          cvc: values.cardCvc
        }
      });

      // Process payment and register user
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        paymentOption: formData.paymentOption,
        merchandiseItems: formData.merchandise
      };

      // Call registration API
      await registerUser(userData);
      
      // Navigate to success page
      nextStep();
    } catch (error: any) {
      toast.error(error.message || 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700/50 pb-4">
        Payment Information
      </h2>
      
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h3 className="font-semibold text-white">Order Summary</h3>
            <p className="text-sm text-gray-300 mt-1">FANS ONLY Pass with selected merchandise</p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p className="text-xl font-bold text-white">
              {formData.paymentOption === 'oneTime' 
                ? '$5,300.00' 
                : '$900.00 today'}
            </p>
            {formData.paymentOption === 'installment' && (
              <p className="text-sm text-gray-300">+ $900/month for 5 more months</p>
            )}
          </div>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Card Details</h3>
            
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="1234 5678 9012 3456"
                        className="pl-10 bg-gray-800/50 border-gray-700 focus:border-blue-500"
                        {...field}
                        onChange={(e) => {
                          const formattedValue = formatCardNumber(e.target.value.replace(/\D/g, ''));
                          field.onChange(formattedValue);
                        }}
                        maxLength={19}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cardExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="MM/YY"
                          className="pl-10 bg-gray-800/50 border-gray-700 focus:border-blue-500"
                          {...field}
                          onChange={(e) => {
                            const formattedValue = formatExpiryDate(e.target.value.replace(/\D/g, ''));
                            field.onChange(formattedValue);
                          }}
                          maxLength={5}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cardCvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="123"
                          className="pl-10 bg-gray-800/50 border-gray-700 focus:border-blue-500"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/\D/g, ''));
                          }}
                          maxLength={4}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 mb-4">
            <p className="text-sm text-amber-300">
              <strong>Payment Information:</strong> All transactions are secure and encrypted. Your card information is never stored in our database.
              {formData.paymentOption === 'installment' && ' Your card will be automatically charged monthly for the remaining 5 payments.'}
            </p>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button"
              onClick={prevStep}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md"
              disabled={isProcessing}
            >
              Back
            </Button>
            
            <Button 
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-cyan-300 text-gray-900 font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-all"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Purchase
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
