
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { products } from "@/lib/data";

interface CartDrawerProps {
  triggerColor?: string;
}

export default function CartDrawer({ triggerColor = "text-foreground" }: CartDrawerProps) {
  // Mock cart state
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1 }
  ]);

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={`${triggerColor} hover:bg-white/10`}>
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Open Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-background border-l border-border">
        <SheetHeader className="border-b border-border pb-4 mb-4">
          <SheetTitle className="font-serif text-2xl">Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <ShoppingBag className="h-12 w-12 mb-4 opacity-20" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-24 w-20 bg-secondary overflow-hidden">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-medium font-serif text-lg leading-none mb-1">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">${item.price}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button className="p-1 hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-xs">{item.quantity}</span>
                        <button className="p-1 hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button className="text-xs text-muted-foreground hover:text-destructive underline">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-border pt-6 mt-auto space-y-4">
          <div className="flex justify-between text-lg font-serif font-medium">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">Shipping and taxes calculated at checkout.</p>
          <Button className="w-full rounded-none py-6 uppercase tracking-widest text-xs bg-foreground text-background hover:bg-foreground/90">
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
