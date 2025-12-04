
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="group cursor-pointer space-y-3">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <motion.img 
            src={product.image} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-white/90 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:translate-y-0 md:relative md:p-0">
             {/* Mobile overlay / Desktop hidden wrapper if needed, but sticking to clean layout */}
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white text-black px-6 py-2 text-xs uppercase tracking-widest font-medium hover:bg-black hover:text-white transition-colors hidden md:block">
              Quick View
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-sm text-muted-foreground font-medium">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}
