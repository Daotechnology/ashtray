
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      
      <section className="py-20 md:py-32 container-luxury">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Latest Drops</span>
            <h2 className="text-4xl md:text-5xl font-serif">New Arrivals</h2>
          </div>
          <Link href="/shop" className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:text-primary transition-colors">
            View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="py-20 bg-foreground text-background">
        <div className="container-luxury text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">"Elegance is refusal."</h2>
          <p className="text-white/60 max-w-2xl mx-auto font-light italic">
            Ashtray Fashion represents the intersection of streetwear rebellion and high-end luxury tailoring.
            Designed for the modern individual who refuses to compromise.
          </p>
        </div>
      </section>

      <footer className="bg-background py-12 border-t border-border">
        <div className="container-luxury grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl mb-4">ASHTRAY</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Premium menswear for the discerning.
              <br />Created with passion and precision.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">All Products</a></li>
              <li><a href="#" className="hover:text-foreground">New Arrivals</a></li>
              <li><a href="#" className="hover:text-foreground">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground">Returns</a></li>
            </ul>
          </div>
        </div>
        <div className="container-luxury mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          © 2025 Ashtray Fashion. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
