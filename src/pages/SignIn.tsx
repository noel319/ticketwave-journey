
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, CreditCard, Calendar, User, Package, Music, Users, Mail, Home, MapPin } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

const SignIn = () => {
  const [selectedPlan, setSelectedPlan] = useState<'buyNow' | 'paymentPlan'>('buyNow');
  const [step, setStep] = useState(1);
  const [selectedMerchandise, setSelectedMerchandise] = useState<string[]>([]);
  const [showBillingFields, setShowBillingFields] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const merchandise = [
    { id: 'tshirt', name: 'Concert T-Shirt', description: 'Limited edition concert t-shirt' },
    { id: 'hoodie', name: 'Premium Hoodie', description: 'Cozy premium hoodie with tour dates' },
    { id: 'poster', name: 'Autographed Poster', description: 'Exclusive autographed poster' },
    { id: 'vinyl', name: 'Vinyl Record', description: 'Limited edition vinyl record' },
    { id: 'hat', name: 'Snapback Hat', description: 'Tour logo snapback hat' },
    { id: 'bracelet', name: 'VIP Bracelet', description: 'Special VIP access bracelet' },
  ];
  
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (selectedMerchandise.length !== 2) {
        toast({
          title: "Please select 2 merchandise items",
          variant: "destructive",
        });
        return;
      }

      if (selectedPlan === 'paymentPlan' && !values.paymentPlanAcknowledgement) {
        toast({
          title: "Payment Plan Agreement Required",
          description: "Please acknowledge the payment plan terms to continue.",
          variant: "destructive",
        });
        return;
      }

      // Create account with provided email and password
      await signUp(values.email, values.password, values.fullName);
      
      // After successful signup, show success message and navigate
      toast({
        title: "Subscription Successful!",
        description: "Your FANS ONLY Membership has been activated. Check your email for details.",
      });
      
      // In a real app, we would handle payment processing here
      navigate('/verify-email');
    } catch (error: any) {
      toast({
        title: "Subscription Failed",
        description: error.message || "An error occurred during subscription",
        variant: "destructive"
      });
    }
  };

  const toggleMerchandiseSelection = (id: string) => {
    if (selectedMerchandise.includes(id)) {
      setSelectedMerchandise(selectedMerchandise.filter(item => item !== id));
    } else {
      // If already 2 items selected, replace the first one
      if (selectedMerchandise.length >= 2) {
        setSelectedMerchandise([selectedMerchandise[1], id]);
      } else {
        setSelectedMerchandise([...selectedMerchandise, id]);
      }
    }
  };

  const goToNextStep = () => {
    if (step === 1) {
      if (selectedMerchandise.length !== 2) {
        toast({
          title: "Please select 2 merchandise items",
          variant: "destructive",
        });
        return;
      }
    }
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const goToPreviousStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-purple-500/20 backdrop-blur-sm rounded-full text-purple-300 mb-4">
              <span className="text-sm font-medium">Limited Availability - Only 80,000 memberships</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              FANS ONLY Membership Card
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your exclusive access to the concert of a lifetime and premium benefits
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Benefits */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 p-6 border border-purple-500/20 sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                  Membership Benefits
                </h2>
                
                <ul className="space-y-6 mb-8">
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-purple-500/20 p-2 rounded-lg">
                      <Music className="h-5 w-5 text-purple-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Concert Ticket</h3>
                      <p className="text-gray-300 text-sm">First-come, first-served seating. Arrive early for the best seats!</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-purple-500/20 p-2 rounded-lg">
                      <Package className="h-5 w-5 text-purple-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Free Merchandise</h3>
                      <p className="text-gray-300 text-sm">Select two exclusive merchandise items included with your membership.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-purple-500/20 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-purple-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Digital Concert</h3>
                      <p className="text-gray-300 text-sm">Exclusive digital concert with behind-the-scenes footage and interviews.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-purple-500/20 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-purple-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Meet & Greet Chance</h3>
                      <p className="text-gray-300 text-sm">Limited spots available. Members will be contacted by email before the event.</p>
                    </div>
                  </li>
                </ul>
                
                <div className="bg-white/5 rounded-lg p-4 mb-6">
                  <h3 className="text-center text-lg font-semibold text-white mb-2">Membership Counter</h3>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-300">
                      {78462} <span className="text-sm font-normal text-gray-400">/ 80,000 available</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Only {80000 - 78462} spots remaining!</p>
                  </div>
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-400">
                  Secure your membership now before they're all gone!
                </div>
              </div>
            </div>
            
            {/* Right Column - Subscription Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 p-6 border border-gray-800">
                {step === 1 && (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                      Choose Your Payment Plan
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div
                        className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
                          selectedPlan === 'buyNow'
                            ? 'border-purple-500 bg-purple-900/20'
                            : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
                        }`}
                        onClick={() => setSelectedPlan('buyNow')}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-white">Buy Now</h3>
                          {selectedPlan === 'buyNow' && (
                            <div className="bg-purple-500 rounded-full p-1">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-3xl font-bold text-white mb-2">$5,300</p>
                        <p className="text-gray-300 text-sm mb-4">One-time payment</p>
                        <ul className="space-y-2">
                          <li className="flex items-center text-sm text-gray-300">
                            <Check className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Immediate membership activation</span>
                          </li>
                          <li className="flex items-center text-sm text-gray-300">
                            <Check className="h-4 w-4 text-purple-400 mr-2" />
                            <span>All benefits included</span>
                          </li>
                          <li className="flex items-center text-sm text-gray-300">
                            <Check className="h-4 w-4 text-purple-400 mr-2" />
                            <span>No monthly payments to worry about</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div
                        className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
                          selectedPlan === 'paymentPlan'
                            ? 'border-purple-500 bg-purple-900/20'
                            : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
                        }`}
                        onClick={() => setSelectedPlan('paymentPlan')}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-white">Payment Plan</h3>
                          {selectedPlan === 'paymentPlan' && (
                            <div className="bg-purple-500 rounded-full p-1">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-3xl font-bold text-white mb-2">$900<span className="text-xl">/month</span></p>
                        <p className="text-gray-300 text-sm mb-4">For 6 months (First payment today)</p>
                        <ul className="space-y-2">
                          <li className="flex items-center text-sm text-gray-300">
                            <Check className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Same benefits as full payment</span>
                          </li>
                          <li className="flex items-center text-sm text-gray-300">
                            <Check className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Spread cost over 6 months</span>
                          </li>
                          <li className="flex items-center text-sm text-gray-300">
                            <Check className="h-4 w-4 text-purple-400 mr-2" />
                            <span>Total cost: $5,400 ($100 service fee)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 mb-8">
                      <p className="text-sm text-yellow-300">
                        <strong>Important:</strong> If choosing the payment plan, three declined payments will result in membership revocation. 
                        No additional payments will be taken after revocation, but previous payments are non-refundable.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                      Select Your Free Merchandise (Choose 2)
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {merchandise.map((item) => (
                        <div
                          key={item.id}
                          className={`cursor-pointer p-4 rounded-lg border transition-all ${
                            selectedMerchandise.includes(item.id)
                              ? 'border-purple-500 bg-purple-900/20'
                              : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
                          }`}
                          onClick={() => toggleMerchandiseSelection(item.id)}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                            {selectedMerchandise.includes(item.id) && (
                              <div className="bg-purple-500 rounded-full p-1">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={goToNextStep}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-all duration-300"
                      >
                        Continue to Registration
                      </Button>
                    </div>
                  </>
                )}
                
                {step === 2 && (
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
                            onClick={goToPreviousStep}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
