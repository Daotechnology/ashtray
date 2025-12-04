
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import heroBg from "@assets/generated_images/luxury_minimalist_fashion_store_banner.png";

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/30" /> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative h-full container-luxury flex flex-col justify-center items-center text-center text-white z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base uppercase tracking-[0.3em] mb-4"
        >
          Est. 2025
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold mb-6 tracking-tight"
        >
          ASHTRAY
          <br />
          <span className="font-light italic text-4xl md:text-6xl lg:text-8xl">Fashion</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-md text-white/80 mb-10 text-sm md:text-base font-light"
        >
          Redefining modern luxury streetwear. Distinctive designs for the bold.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/shop">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-none px-10 py-6 uppercase tracking-widest text-xs border-none">
              View Collection
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
