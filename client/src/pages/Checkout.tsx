
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Check, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/CartContext";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(3, "Zip code is required"),
  country: z.string().min(2, "Country is required"),
  cardNumber: z.string().min(16, "Invalid card number").max(19),
  expiry: z.string().min(4, "Invalid expiry"),
  cvc: z.string().min(3, "Invalid CVC"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { items, total: subtotal, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    }
  });

  const shipping = subtotal > 0 ? 15 : 0; // Flat rate luxury shipping, only if cart not empty
  const total = subtotal + shipping;

  const onSubmit = async (data: CheckoutFormValues) => {
    if (step === 'shipping') {
      setStep('payment');
      window.scrollTo(0, 0);
      return;
    }

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Order processed:", data);
    clearCart();
    setStep('success');
    window.scrollTo(0, 0);
    toast({
      title: "Order Confirmed",
      description: "Thank you for your purchase. A confirmation email has been sent.",
    });
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-serif">Order Confirmed</h1>
          <p className="text-muted-foreground">
            Your order #ASH-8821 has been successfully placed. We'll send you shipping confirmation shortly.
          </p>
          <Button 
            onClick={() => setLocation("/")}
            className="w-full rounded-none py-6 uppercase tracking-widest text-xs bg-foreground text-background hover:bg-foreground/90 mt-8"
          >
            Return to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background grid grid-cols-1 lg:grid-cols-12">
      {/* Left Column - Form */}
      <div className="lg:col-span-7 p-6 lg:p-20 order-2 lg:order-1 border-r border-border">
        <div className="max-w-xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Return to Store
          </Link>

          <div className="flex items-center gap-4 mb-12 text-sm uppercase tracking-widest">
            <span className={step === 'shipping' ? "font-bold text-foreground" : "text-muted-foreground"}>1. Shipping</span>
            <span className="text-muted-foreground">/</span>
            <span className={step === 'payment' ? "font-bold text-foreground" : "text-muted-foreground"}>2. Payment</span>
          </div>

          <h1 className="text-3xl font-serif mb-8">
            {step === 'shipping' ? 'Shipping Details' : 'Payment Method'}
          </h1>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {step === 'shipping' ? (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" {...form.register("email")} className="rounded-none h-12 bg-secondary/30 border-border" />
                  {form.formState.errors.email && <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...form.register("firstName")} className="rounded-none h-12 bg-secondary/30 border-border" />
                    {form.formState.errors.firstName && <p className="text-red-500 text-xs">{form.formState.errors.firstName.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...form.register("lastName")} className="rounded-none h-12 bg-secondary/30 border-border" />
                    {form.formState.errors.lastName && <p className="text-red-500 text-xs">{form.formState.errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" {...form.register("address")} className="rounded-none h-12 bg-secondary/30 border-border" />
                  {form.formState.errors.address && <p className="text-red-500 text-xs">{form.formState.errors.address.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...form.register("city")} className="rounded-none h-12 bg-secondary/30 border-border" />
                    {form.formState.errors.city && <p className="text-red-500 text-xs">{form.formState.errors.city.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" {...form.register("zipCode")} className="rounded-none h-12 bg-secondary/30 border-border" />
                    {form.formState.errors.zipCode && <p className="text-red-500 text-xs">{form.formState.errors.zipCode.message}</p>}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-secondary/30 p-6 border border-border">
                   <div className="flex items-center justify-between mb-4">
                     <h3 className="font-serif">Credit Card</h3>
                     <div className="flex gap-2">
                       <CreditCard className="h-5 w-5 text-muted-foreground" />
                     </div>
                   </div>
                   
                   <div className="space-y-4">
                     <div className="grid gap-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="0000 0000 0000 0000" {...form.register("cardNumber")} className="rounded-none h-12 bg-background border-border" />
                        {form.formState.errors.cardNumber && <p className="text-red-500 text-xs">{form.formState.errors.cardNumber.message}</p>}
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="grid gap-2">
                          <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                          <Input id="expiry" placeholder="MM/YY" {...form.register("expiry")} className="rounded-none h-12 bg-background border-border" />
                          {form.formState.errors.expiry && <p className="text-red-500 text-xs">{form.formState.errors.expiry.message}</p>}
                       </div>
                       <div className="grid gap-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" {...form.register("cvc")} className="rounded-none h-12 bg-background border-border" />
                          {form.formState.errors.cvc && <p className="text-red-500 text-xs">{form.formState.errors.cvc.message}</p>}
                       </div>
                     </div>
                   </div>
                </div>
              </motion.div>
            )}

            <div className="pt-8 flex justify-end">
              <Button 
                type="submit" 
                disabled={form.formState.isSubmitting}
                className="w-full md:w-auto rounded-none px-12 py-6 uppercase tracking-widest text-xs bg-foreground text-background hover:bg-foreground/90"
              >
                {step === 'shipping' ? 'Continue to Payment' : form.formState.isSubmitting ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column - Order Summary */}
      <div className="lg:col-span-5 bg-secondary/20 p-6 lg:p-20 order-1 lg:order-2 h-full">
        <div className="max-w-md mx-auto sticky top-20">
          <h2 className="text-2xl font-serif mb-8">Order Summary</h2>
          
          <div className="space-y-6 mb-8">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4">
                <div className="h-20 w-16 bg-white overflow-hidden border border-border">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium font-serif">{item.name}</h4>
                    <span>${item.price * item.quantity}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-6 bg-border" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping (Standard)</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
          </div>

          <Separator className="my-6 bg-border" />

          <div className="flex justify-between text-xl font-serif font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className="mt-8 flex items-start gap-3 text-xs text-muted-foreground bg-white/50 p-4">
             <Truck className="h-4 w-4 mt-0.5 shrink-0" />
             <p>Standard luxury shipping via DHL Express. Expected delivery: 2-3 business days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
