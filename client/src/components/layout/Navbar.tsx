
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CartDrawer from "../cart/CartDrawer";
import logo from "@assets/WhatsApp_Image_2025-11-27_at_14.53.36_1411d977_1764861939721.jpg";
import textLogo from "@assets/WhatsApp_Image_2025-11-27_at_14.53.37_113d00c6_1764861965363.jpg";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHome
          ? "bg-white/90 backdrop-blur-md py-4 border-b border-border/50"
          : "bg-transparent py-6 text-white"
      }`}
    >
      <div className="container-luxury flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled || !isHome ? "text-foreground" : "text-white"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background border-r border-border">
              <div className="flex flex-col gap-8 mt-10">
                <Link href="/" className="text-2xl font-serif">Home</Link>
                <Link href="/shop" className="text-2xl font-serif">Shop</Link>
                <Link href="/about" className="text-2xl font-serif">About</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mx-0">
          <img src={logo} alt="Ashtray Fashion" className="h-10 w-10 object-contain mix-blend-multiply" />
           <span className={`font-serif text-xl tracking-widest-luxury font-bold ${isScrolled || !isHome ? "text-foreground" : "text-white"}`}>
            ASHTRAY
          </span>
        </Link>

        {/* Desktop Links */}
        <div className={`hidden md:flex items-center gap-8 ${isScrolled || !isHome ? "text-foreground" : "text-white/90"}`}>
          <Link href="/" className="hover:text-primary transition-colors text-sm uppercase tracking-widest whitespace-nowrap">Home</Link>
          <Link href="/shop" className="hover:text-primary transition-colors text-sm uppercase tracking-widest whitespace-nowrap">Shop</Link>
          <Link href="/lookbook" className="hover:text-primary transition-colors text-sm uppercase tracking-widest whitespace-nowrap">Lookbook</Link>
          <Link href="/about" className="hover:text-primary transition-colors text-sm uppercase tracking-widest whitespace-nowrap">About</Link>
        </div>

        {/* Cart */}
        <div className="flex items-center gap-4">
           <CartDrawer triggerColor={isScrolled || !isHome ? "text-foreground" : "text-white"} />
        </div>
      </div>
    </nav>
  );
}
