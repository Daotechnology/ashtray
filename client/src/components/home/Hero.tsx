
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Import images
import heroBg1 from "@assets/generated_images/luxury_minimalist_fashion_store_banner.png";
import heroBg2 from "@assets/generated_images/male_model_rooftop_sunset_fashion_shot.png";
import heroBg3 from "@assets/generated_images/studio_fashion_group_shot_minimalism.png";

const slides = [
  {
    id: 1,
    image: heroBg1,
    subtitle: "Est. 2025",
    title: "ASHTRAY",
    title2: "Fashion",
    description: "Redefining modern luxury streetwear. Distinctive designs for the bold."
  },
  {
    id: 2,
    image: heroBg2,
    subtitle: "New Collection",
    title: "URBAN",
    title2: "Solitude",
    description: "Explore the silence of the city with our new heavyweight essentials."
  },
  {
    id: 3,
    image: heroBg3,
    subtitle: "Editorial",
    title: "MODERN",
    title2: "Collective",
    description: "Uniforms for the creative avant-garde."
  }
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    
    // Auto-play
    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div className="relative flex-[0_0_100%] h-full min-w-0" key={slide.id}>
              {/* Image with Ken Burns effect */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: selectedIndex === index ? 1.05 : 1 }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="h-full w-full"
                >
                  <div 
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
              </div>

              {/* Content */}
              <div className="relative h-full container-luxury flex flex-col justify-center items-center text-center text-white z-10">
                <AnimatePresence mode="wait">
                  {selectedIndex === index && (
                    <motion.div
                      key={`content-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 block">
                        {slide.subtitle}
                      </span>
                      
                      <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold mb-2 tracking-tight leading-none">
                        {slide.title}
                      </h1>
                      <span className="font-light italic text-4xl md:text-6xl lg:text-8xl block mb-6">
                        {slide.title2}
                      </span>

                      <p className="max-w-md text-white/80 mb-10 text-sm md:text-base font-light">
                        {slide.description}
                      </p>

                      <Link href="/shop">
                        <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-none px-10 py-6 uppercase tracking-widest text-xs border-none">
                          View Collection
                        </Button>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-10 left-0 right-0 z-20 container-luxury flex justify-between items-end pointer-events-none">
         {/* Scroll Indicators */}
        <div className="flex gap-4 pointer-events-auto">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`h-[2px] transition-all duration-300 ${
                index === selectedIndex ? "w-12 bg-white" : "w-6 bg-white/30 hover:bg-white/60"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>

        <div className="flex gap-2 pointer-events-auto">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={scrollPrev}
            className="rounded-none border-white/20 bg-black/20 text-white hover:bg-white hover:text-black backdrop-blur-sm h-12 w-12"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={scrollNext}
            className="rounded-none border-white/20 bg-black/20 text-white hover:bg-white hover:text-black backdrop-blur-sm h-12 w-12"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
