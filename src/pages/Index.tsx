import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Award, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import heroImage from "@/assets/hero-car.jpg";
import interiorImg from "@/assets/detail-interior.jpg";
import exteriorImg from "@/assets/detail-exterior.jpg";
import waxImg from "@/assets/detail-wax.jpg";

const services = [
  { title: "Interior Detailing", desc: "Deep clean every surface, leather conditioning, and odor removal.", image: interiorImg, price: "From $199.99" },
  { title: "Exterior Detailing", desc: "Hand wash, clay bar treatment, polish, and protective sealant.", image: exteriorImg, price: "From $179.99" },
  { title: "Super Wax Detail", desc: "Complete interior + exterior with premium ceramic wax finish.", image: waxImg, price: "From $229.99" },
];

const features = [
  { icon: Shield, title: "Premium Products", desc: "We use only the highest quality, eco-friendly detailing products." },
  { icon: Clock, title: "Convenient Booking", desc: "Easy online booking with flexible scheduling that fits your lifestyle." },
  { icon: Award, title: "Expert Technicians", desc: "Certified detailers with years of experience in luxury vehicles." },
];

const stats = [
  { value: "2,500+", label: "Cars Detailed" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "5+", label: "Years Experience" },
  { value: "4.9", label: "Average Rating" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Premium car detailing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-[0.3em] mb-4 block">
              Premium Car Detailing
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Your Car Deserves{" "}
              <span className="text-gradient-gold">Perfection</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Experience the finest auto detailing service. We treat every vehicle 
              with the care and precision it deserves.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book">
                <Button size="lg" className="bg-gradient-gold text-primary-foreground font-semibold text-lg px-8 hover:opacity-90 transition-opacity">
                  Book Appointment <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10 text-lg px-8">
                  View Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient-gold">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            subtitle="Our Services"
            title="Premium Detailing Packages"
            description="Choose from our carefully crafted detailing packages designed to restore and protect your vehicle."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group bg-gradient-card border border-border rounded-xl overflow-hidden hover:border-gold transition-all duration-300 hover:shadow-gold"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-primary text-sm font-semibold mb-1">{service.price}</div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                  <Link to="/book" className="inline-flex items-center text-primary text-sm font-medium hover:gap-2 transition-all gap-1">
                    Book Now <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            subtitle="Why Choose Us"
            title="The Premium Difference"
            description="We go above and beyond to deliver an exceptional detailing experience."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-8"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-gold mb-6">
                  <feat.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{feat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your <span className="text-gradient-gold">Vehicle</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Book your appointment today and experience the difference premium detailing makes.
            </p>
            <Link to="/book">
              <Button size="lg" className="bg-gradient-gold text-primary-foreground font-semibold text-lg px-10 hover:opacity-90 transition-opacity">
                Book Your Detail <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
