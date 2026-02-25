import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import interiorImg from "@/assets/detail-interior.jpg";
import exteriorImg from "@/assets/detail-exterior.jpg";
import waxImg from "@/assets/detail-wax.jpg";

const packages = [
  {
    name: "Interior Only",
    image: interiorImg,
    features: ["Full vacuum & steam clean", "Leather conditioning", "Dashboard & console detail", "Window cleaning", "Odor elimination", "Air vent cleaning"],
    prices: [
      { cat: "Car", price: "$199.99" },
      { cat: "CrossOver", price: "$209.99" },
      { cat: "SUV", price: "$219.99" },
      { cat: "X-Large", price: "$239.99" },
      { cat: "RV/Boat/Semi", price: "$429.99" },
    ],
  },
  {
    name: "Exterior Only",
    image: exteriorImg,
    features: ["Hand wash & dry", "Clay bar treatment", "Machine polish", "Sealant application", "Tire & rim detail", "Trim restoration"],
    prices: [
      { cat: "Car", price: "$179.99" },
      { cat: "CrossOver", price: "$189.99" },
      { cat: "SUV", price: "$199.99" },
      { cat: "X-Large", price: "$219.99" },
      { cat: "RV/Boat/Semi", price: "$399.99" },
    ],
  },
  {
    name: "Super Wax Detail",
    image: waxImg,
    popular: true,
    features: ["Complete interior detail", "Full exterior detail", "Premium ceramic wax", "Paint correction", "Engine bay cleaning", "Headlight restoration"],
    prices: [
      { cat: "Car", price: "$229.99" },
      { cat: "CrossOver", price: "$239.99" },
      { cat: "SUV", price: "$249.99" },
      { cat: "X-Large", price: "$259.99" },
      { cat: "RV/Boat/Semi", price: "$599.99" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            subtitle="Our Services"
            title="Detailing Packages & Pricing"
            description="Professional-grade detailing packages tailored to your vehicle's needs."
          />
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 space-y-16">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`grid lg:grid-cols-2 gap-8 bg-gradient-card border rounded-2xl overflow-hidden ${
                pkg.popular ? "border-gold shadow-gold" : "border-border"
              }`}
            >
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                {pkg.popular && (
                  <div className="absolute top-4 left-4 bg-gradient-gold text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
              </div>

              <div className="p-8 lg:p-10">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">{pkg.name}</h3>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-6 mb-6">
                  <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-3">Pricing by Vehicle</h4>
                  <div className="space-y-2">
                    {pkg.prices.map((p) => (
                      <div key={p.cat} className="flex justify-between text-sm">
                        <span className="text-foreground">{p.cat}</span>
                        <span className="text-primary font-semibold">{p.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/book">
                  <Button className="w-full bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                    Book This Package <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
