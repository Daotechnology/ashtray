
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import lookbook1 from "@assets/generated_images/male_model_in_sage_green_hoodie_luxury_streetwear.png";
import lookbook2 from "@assets/generated_images/male_model_in_black_polo_shirt_luxury_vibe.png";
import lookbook3 from "@assets/generated_images/male_model_moody_street_fashion_editorial_shot.png";
import lookbook4 from "@assets/generated_images/male_model_minimalist_studio_shot_beige_background.png";

const looks = [
  {
    id: 1,
    image: lookbook1,
    title: "Urban Sage",
    description: "The signature hoodie in its natural habitat."
  },
  {
    id: 2,
    image: lookbook3, // Using the new moody shot
    title: "Nightcrawler",
    description: "Distressed essentials for the after-hours."
  },
  {
    id: 3,
    image: lookbook2,
    title: "Noir Executive",
    description: "Elevated basics that command attention."
  },
  {
    id: 4,
    image: lookbook4, // Using the new studio shot
    title: "Clean Slate",
    description: "Minimalism redefined for the modern man."
  }
];

export default function Lookbook() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 container-luxury">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-6">SS25 Lookbook</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light">
            A visual exploration of our latest collection. 
            Merging brutalist architecture with soft, organic textures.
          </p>
        </motion.div>

        <div className="space-y-32">
          {looks.map((look, index) => (
            <motion.div 
              key={look.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row gap-8 md:gap-20 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-1/2 aspect-[3/4] overflow-hidden bg-secondary">
                <img 
                  src={look.image} 
                  alt={look.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
              
              <div className="w-full md:w-1/2 text-center md:text-left">
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
                  Look 0{index + 1}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif mb-6">{look.title}</h2>
                <p className="text-lg text-muted-foreground font-light max-w-md mx-auto md:mx-0">
                  {look.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
