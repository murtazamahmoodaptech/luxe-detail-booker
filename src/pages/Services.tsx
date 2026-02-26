import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Check, ArrowRight, ArrowLeft, ShoppingCart, Car, Truck, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { CAR_BRANDS } from "@/data/carBrands";
import { VEHICLE_CATEGORIES, getPrice } from "@/data/pricing";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import interiorImg from "@/assets/detail-interior.jpg";
import exteriorImg from "@/assets/detail-exterior.jpg";
import waxImg from "@/assets/detail-wax.jpg";

const CATEGORY_ICONS: Record<string, typeof Car> = {
  Car: Car,
  CrossOver: Car,
  SUV: Truck,
  "X-Large": Truck,
  "RV/Boat/Semi": Bus,
};

const services = [
  {
    id: "interior",
    name: "Interior Only",
    image: interiorImg,
    features: ["Full vacuum & steam clean", "Leather conditioning", "Dashboard & console detail", "Window cleaning", "Odor elimination", "Air vent cleaning"],
  },
  {
    id: "exterior",
    name: "Exterior Only",
    image: exteriorImg,
    features: ["Hand wash & dry", "Clay bar treatment", "Machine polish", "Sealant application", "Tire & rim detail", "Trim restoration"],
  },
  {
    id: "superwax",
    name: "Super Wax Detail",
    image: waxImg,
    popular: true,
    features: ["Complete interior detail", "Full exterior detail", "Premium ceramic wax", "Paint correction", "Engine bay cleaning", "Headlight restoration"],
  },
];

export default function ServicesPage() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addItem, items } = useCart();

  const handleAddToCart = (serviceType: string, vehicleCategory: string) => {
    const price = getPrice(serviceType, vehicleCategory);
    if (!price) return;
    addItem({
      id: `${selectedBrand}-${serviceType}-${vehicleCategory}-${Date.now()}`,
      brand: selectedBrand!,
      serviceType,
      vehicleCategory,
      price,
    });
    toast.success(`${serviceType} (${vehicleCategory}) added to cart!`);
    navigate("/book");
  };

  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            subtitle="Our Services"
            title="Detailing Packages & Pricing"
            description="Select your car brand, pick a service, and choose your vehicle category."
          />
          {items.length > 0 && (
            <div className="flex justify-center mt-6">
              <Link to="/book">
                <Button className="bg-gradient-sky text-primary-foreground font-semibold hover:opacity-90">
                  <ShoppingCart className="w-4 h-4 mr-2" /> View Cart ({items.length}) — ${items.reduce((s, i) => s + i.price, 0).toFixed(2)}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Brand */}
            {!selectedBrand && (
              <motion.div key="brands" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Select Your Car Brand</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {CAR_BRANDS.map((brand, i) => (
                    <motion.button
                      key={brand.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => setSelectedBrand(brand.name)}
                      className="bg-gradient-card border border-border rounded-xl p-6 text-center hover:border-primary hover:shadow-sky transition-all duration-300 group"
                    >
                      <span className="text-4xl block mb-3">{brand.icon}</span>
                      <span className="text-foreground font-semibold group-hover:text-primary transition-colors">{brand.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Service */}
            {selectedBrand && !selectedService && (
              <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <button onClick={() => setSelectedBrand(null)} className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to Brands
                </button>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2 text-center">
                  Services for <span className="text-gradient-sky">{selectedBrand}</span>
                </h3>
                <p className="text-muted-foreground text-center mb-8">Choose a detailing package</p>

                <div className="grid md:grid-cols-3 gap-8">
                  {services.map((svc, i) => (
                    <motion.div
                      key={svc.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setSelectedService(svc.name)}
                      className={`cursor-pointer bg-gradient-card border rounded-xl overflow-hidden hover:shadow-sky transition-all duration-300 ${
                        svc.popular ? "border-primary shadow-sky" : "border-border hover:border-primary"
                      }`}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img src={svc.image} alt={svc.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        {svc.popular && (
                          <div className="absolute top-3 left-3 bg-gradient-sky text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Most Popular
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h4 className="font-display text-xl font-bold text-foreground mb-3">{svc.name}</h4>
                        <div className="space-y-1.5 mb-4">
                          {svc.features.slice(0, 4).map((f) => (
                            <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" /> {f}
                            </div>
                          ))}
                        </div>
                        <Button className="w-full bg-gradient-sky text-primary-foreground font-semibold hover:opacity-90">
                          Select & Choose Category <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Select Category + Add to Cart */}
            {selectedBrand && selectedService && (
              <motion.div key="categories" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <button onClick={() => setSelectedService(null)} className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to Services
                </button>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2 text-center">
                  <span className="text-gradient-sky">{selectedService}</span> for {selectedBrand}
                </h3>
                <p className="text-muted-foreground text-center mb-8">Select your vehicle category to see pricing</p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {VEHICLE_CATEGORIES.map((cat, i) => {
                    const Icon = CATEGORY_ICONS[cat] || Car;
                    const price = getPrice(selectedService, cat);
                    return (
                      <motion.div
                        key={cat}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-gradient-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-sky transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-foreground font-semibold text-lg">{cat}</h4>
                            <span className="text-primary font-bold text-xl">${price?.toFixed(2)}</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleAddToCart(selectedService, cat)}
                          className="w-full bg-gradient-sky text-primary-foreground font-semibold hover:opacity-90"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
