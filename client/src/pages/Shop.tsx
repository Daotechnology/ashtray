
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/shop/ProductCard";
import { products, categories } from "@/lib/data";
import { useState } from "react";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-12 container-luxury">
        <h1 className="text-5xl md:text-7xl font-serif text-center mb-12">Collection</h1>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-sm uppercase tracking-widest pb-1 transition-all ${
                activeCategory === category 
                  ? "border-b-2 border-foreground text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
