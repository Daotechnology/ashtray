
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import aboutBg from "@assets/generated_images/design_studio_workspace_fashion_sketches.png";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutBg})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full container-luxury flex items-center justify-center text-center z-10">
          <h1 className="text-5xl md:text-7xl font-serif text-white">The Brand</h1>
        </div>
      </div>

      <div className="container-luxury py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg"
          >
            <h2 className="text-3xl font-serif mb-6">Origins</h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              Ashtray Fashion was born from a desire to bridge the gap between raw street culture and refined luxury tailoring. 
              Founded in 2025, we set out to create pieces that aren't just worn, but experienced.
            </p>
            <p className="text-muted-foreground font-light leading-relaxed">
              The name "Ashtray" symbolizes the remnants of the night—the gritty, authentic moments that define our youth 
              and our culture. It's about finding beauty in the unexpected and luxury in the raw.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-serif mb-6">Philosophy</h2>
            <ul className="space-y-6">
              <li className="border-l-2 border-primary pl-6">
                <h3 className="font-bold text-lg uppercase tracking-widest mb-2">Quality Over Quantity</h3>
                <p className="text-muted-foreground font-light">
                  We produce in limited batches using only the finest heavy-weight cottons and technical fabrics.
                </p>
              </li>
              <li className="border-l-2 border-primary pl-6">
                <h3 className="font-bold text-lg uppercase tracking-widest mb-2">Designed for Life</h3>
                <p className="text-muted-foreground font-light">
                  Our garments are built to age beautifully, developing character with every wear.
                </p>
              </li>
              <li className="border-l-2 border-primary pl-6">
                <h3 className="font-bold text-lg uppercase tracking-widest mb-2">Unapologetic Style</h3>
                <p className="text-muted-foreground font-light">
                  We design for the bold. For those who aren't afraid to stand out and make a statement.
                </p>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Quote Section */}
        <div className="mt-24 py-16 border-y border-border text-center">
          <p className="text-2xl md:text-4xl font-serif italic text-foreground/80 max-w-4xl mx-auto leading-tight">
            "Fashion is not something that exists in dresses only. Fashion is in the sky, in the street, fashion has to do with ideas, the way we live, what is happening."
          </p>
          <span className="block mt-6 text-sm uppercase tracking-widest text-muted-foreground">— Coco Chanel (Adopted Philosophy)</span>
        </div>
      </div>
    </div>
  );
}
