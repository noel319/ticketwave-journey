
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User, CreditCard, Calendar, Mail, Home, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface MerchandiseItem {
  id: string;
  name: string;
  description: string;
}

interface RegistrationFormProps {
  selectedPlan: 'buyNow' | 'paymentPlan';
  selectedMerchandise: string[];
  merchandise: MerchandiseItem[];
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onBack: () => void;
}

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  
  // Shipping address
  address: z.string().min(5, { message: "Address is required for merchandise delivery." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  zipCode: z.string().min(5, { message: "Zip code is required." }),
  
  // Billing address (same as shipping by default)
  sameAsBilling: z.boolean().default(true),
  billingAddress: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingZipCode: z.string().optional(),
  
  // Payment information
  cardNumber: z.string().min(16, { message: "Please enter a valid card number." }),
  expDate: z.string().min(5, { message: "Please enter a valid expiration date (MM/YY)." }),
  cvv: z.string().min(3, { message: "Please enter a valid CVV." }),
  
  // Account creation
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  
  // Agreements and consent
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions."
  }),
  privacyAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the privacy policy."
  }),
  paymentPlanAcknowledgement: z.boolean().optional(),
  marketingOptIn: z.boolean().optional(),
});

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ 
  selectedPlan, 
  selectedMerchandise, 
  merchandise,
  onSubmit,
  onBack
}) => {
  const [showBillingFields, setShowBillingFields] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      sameAsBilling: true,
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingZipCode: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
      password: "",
      termsAccepted: false,
      privacyAccepted: false,
      paymentPlanAcknowledgement: false,
      marketingOptIn: false,
    },
  });

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
        Create Your Account
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mt-4 mb-4 border-b border-white/10 pb-2">
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input placeholder="Enter your full name" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input type="email" placeholder="Enter your email" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional but Recommended)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormDescription>
                      For urgent updates about your order
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Create Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Create a secure password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mt-6 mb-4 border-b border-white/10 pb-2">
            Shipping Information
          </h3>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Home className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input placeholder="Enter your street address" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input placeholder="Zip Code" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="sameAsBilling"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        setShowBillingFields(!checked);
                      }}
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
            
            {showBillingFields && (
              <div className="space-y-4 border border-gray-700 rounded-md p-4 mt-4">
                <h4 className="font-medium text-white">Billing Address</h4>
                
                <FormField
                  control={form.control}
                  name="billingAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your billing address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="billingCity"
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
                  
                  <FormField
                    control={form.control}
                    name="billingState"
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
                    name="billingZipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Zip Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-white mt-6 mb-4 border-b border-white/10 pb-2">
            Payment Information
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input placeholder="1234 5678 9012 3456" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            {selectedPlan === 'paymentPlan' && (
              <FormField
                control={form.control}
                name="paymentPlanAcknowledgement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4 p-4 border border-yellow-500/30 rounded-md bg-yellow-900/10">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I understand that by selecting the payment plan, I agree to pay $900/month for 6 months. I acknowledge that three declined payments will result in membership revocation with no refunds for previous payments.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            )}
          </div>
          
          <h3 className="text-xl font-bold text-white mt-6 mb-4 border-b border-white/10 pb-2">
            Legal Agreements & Consent
          </h3>
          
          <div className="space-y-4 pt-4">
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
                      I agree to the <a href="#" className="text-purple-400 hover:underline">Terms and Conditions</a>, including purchase of tickets and membership card subscription.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="privacyAccepted"
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
                      I agree to the <a href="#" className="text-purple-400 hover:underline">Privacy Policy</a> and understand how my data will be used and stored.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="marketingOptIn"
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
                      I would like to receive emails about future events, exclusive offers, and concert updates (you can unsubscribe at any time)
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-purple-300">
              <strong>You're almost there!</strong> By completing this form, you'll secure your FANS ONLY Membership and receive:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-purple-300">
              <li>Access to the July 6, 2026 concert at MetLife Stadium</li>
              <li>Your selected merchandise items: {merchandise.filter(item => selectedMerchandise.includes(item.id)).map(item => item.name).join(' and ')}</li>
              <li>Digital concert with exclusive content</li>
              <li>Chance for a Meet & Greet experience</li>
            </ul>
          </div>
          
          <div className="flex justify-between">
            <Button 
              type="button"
              onClick={onBack}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              Back
            </Button>
            
            <Button 
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-all duration-300"
            >
              {selectedPlan === 'buyNow' ? 'Complete Purchase' : 'Start Payment Plan'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
