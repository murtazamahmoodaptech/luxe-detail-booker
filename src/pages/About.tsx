import { motion } from "framer-motion";
import { Shield, Users, Award, Heart, CheckCircle, Sparkles, Clock, Leaf } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const values = [
  { icon: Shield, title: "Quality First", desc: "We never cut corners. Every detail matters, from the products we use to the techniques we employ." },
  { icon: Users, title: "Customer Focus", desc: "Your satisfaction is our priority. We tailor every service to meet your specific needs and expectations." },
  { icon: Award, title: "Excellence", desc: "Our team is certified and continuously trained in the latest detailing techniques and technologies." },
  { icon: Heart, title: "Passion", desc: "We genuinely love what we do. That passion shows in every vehicle we touch." },
];

const process = [
  { step: "01", title: "Book Online", desc: "Select your vehicle brand, choose a service, and pick a convenient time slot through our easy booking system." },
  { step: "02", title: "Vehicle Assessment", desc: "Our technicians perform a thorough inspection of your vehicle to identify areas needing special attention." },
  { step: "03", title: "Expert Detailing", desc: "Using premium products and advanced techniques, we meticulously detail every surface of your vehicle." },
  { step: "04", title: "Quality Check", desc: "A final walkthrough ensures every detail meets our exacting standards before your vehicle is returned." },
];

const whyUs = [
  { icon: Sparkles, title: "Premium Products", desc: "We exclusively use professional-grade, pH-balanced products safe for all vehicle finishes." },
  { icon: Clock, title: "On-Time Service", desc: "We respect your schedule. Appointments start and finish on time, every time." },
  { icon: Leaf, title: "Eco-Friendly", desc: "Our waterless and low-water techniques conserve up to 100 gallons per wash compared to traditional methods." },
  { icon: CheckCircle, title: "Satisfaction Guarantee", desc: "Not happy with the results? We'll re-do the service at no extra charge." },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            subtitle="About Us"
            title="Driven by Perfection"
            description="We're a team of passionate detailing professionals dedicated to making every vehicle look its absolute best."
          />
        </div>
      </section>

      {/* Story */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Story</h3>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
                Founded with a simple mission — to provide the highest quality auto detailing service with unmatched attention to detail. Over the years, we've detailed thousands of vehicles, from daily drivers to exotic supercars, earning the trust of car enthusiasts across the region.
              </p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                What started as a one-man operation has grown into a full-service detailing studio backed by a team of certified professionals. We invest in ongoing training, cutting-edge equipment, and premium products to ensure every vehicle that leaves our care looks showroom-ready.
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-gradient-card border border-border rounded-xl hover:border-primary transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/30 mb-4">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-12 lg:py-20 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading subtitle="How It Works" title="Our Process" description="From booking to delivery, here's what you can expect." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {process.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative p-6">
                <span className="text-5xl font-display font-bold text-primary/15 absolute top-2 left-4">{p.step}</span>
                <div className="relative pt-8">
                  <h4 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading subtitle="Why Us" title="The Difference" description="Here's what sets us apart from the rest." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {whyUs.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 bg-gradient-card border border-border rounded-xl hover:border-primary transition-colors">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
