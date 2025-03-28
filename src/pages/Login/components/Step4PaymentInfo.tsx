
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Home, MapPin, CreditCardIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Step4PaymentInfoProps {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const formSchema = z.object({
  cardholderName: z.string().min(2, { message: "Cardholder name is required." }),
  cardNumber: z.string().min(16, { message: "Please enter a valid card number." }),
  expDate: z.string().min(5, { message: "Please enter a valid expiration date (MM/YY)." }),
  cvv: z.string().min(3, { message: "Please enter a valid CVV." }),
  
  address: z.string().min(5, { message: "Address is required for merchandise delivery." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  zipCode: z.string().min(5, { message: "Zip code is required." }),
  
  sameAsBilling: z.boolean().default(true),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions."
  }),
});

export const Step4PaymentInfo: React.FC<Step4PaymentInfoProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const selectedTicket = formData.selectedTickets?.[0] || { name: 'Standard Pass', price: '$499' };
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      sameAsBilling: true,
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsProcessing(true);
    try {
      // In a real app, we would process payment here
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      updateFormData({
        paymentInfo: values,
        hasTicket: true
      });
      
      // In a real app, we would update the user's profile
      toast.success('Payment successful!');
      nextStep();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">Payment Information</h2>
      <p className="text-gray-400 mb-6 text-center">Complete your purchase to get your SOUNDUOEX Pass</p>
      
      <div className="bg-gray-800/30 rounded-lg p-4 mb-8 border border-gray-700">
        <h3 className="font-bold mb-3">Order Summary</h3>
        <div className="flex justify-between py-2 border-b border-gray-700">
          <span className="text-gray-300">{selectedTicket.name}</span>
          <span className="font-bold text-white">{selectedTicket.price}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-700">
          <span className="text-gray-300">Processing Fee</span>
          <span className="text-white">$25.00</span>
        </div>
        <div className="flex justify-between py-3 mt-2">
          <span className="font-bold text-white">Total</span>
          <span className="font-bold text-cyan-400 text-xl">
            ${parseFloat(selectedTicket.price.replace('$', '').replace(',', '')) + 25}
          </span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CreditCardIcon className="mr-2 h-5 w-5 text-cyan-400" />
              <span>Payment Details</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="cardholderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name on card" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input placeholder="1234 5678 9012 3456" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="expDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Home className="mr-2 h-5 w-5 text-cyan-400" />
              <span>Shipping Address</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Street address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input placeholder="Zip Code" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="sameAsBilling"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    My billing address is the same as my shipping address
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the <a href="#" className="text-cyan-400 hover:underline">Terms and Conditions</a>, 
                    including purchase of tickets and the SOUNDUOEX pass subscription.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <div className="flex flex-col md:flex-row gap-4 justify-between pt-4">
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="md:w-auto"
            >
              Back
            </Button>
            
            <Button
              type="submit"
              disabled={isProcessing}
              className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:opacity-90 text-black font-semibold md:w-auto"
            >
              {isProcessing ? 'Processing...' : 'Complete Purchase'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
