
import Navbar from "@/components/layout/Navbar";
import { products } from "@/lib/data";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/CartContext";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const product = products.find(p => p.id === params?.id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { toast } = useToast();
  const { addToCart } = useCart();

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Select a size",
        description: "Please choose a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(product, selectedSize);
    
    toast({
      title: "Added to cart",
      description: `${product.name} - Size ${selectedSize}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Image Section */}
        <div className="h-[50vh] lg:h-screen bg-secondary relative overflow-hidden pt-20 lg:pt-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center p-8 lg:p-20 pt-12">
          <div className="max-w-md mx-auto lg:mx-0 w-full">
            <span className="text-sm uppercase tracking-widest text-muted-foreground mb-2 block">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">{product.name}</h1>
            <p className="text-2xl font-medium mb-8">${product.price}</p>
            
            <p className="text-muted-foreground leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="space-y-6 mb-10">
              <div>
                <label className="text-xs uppercase tracking-widest font-bold block mb-4">Size</label>
                <div className="flex gap-4">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border flex items-center justify-center transition-all ${
                        selectedSize === size 
                          ? "border-foreground bg-foreground text-background" 
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              onClick={handleAddToCart}
              className="w-full rounded-none py-8 uppercase tracking-widest text-sm bg-foreground text-background hover:bg-foreground/90"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
