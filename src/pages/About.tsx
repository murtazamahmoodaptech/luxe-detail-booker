import { motion } from "framer-motion";
import { Shield, Users, Award, Heart } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const values = [
  { icon: Shield, title: "Quality First", desc: "We never cut corners. Every detail matters, from the products we use to the techniques we employ." },
  { icon: Users, title: "Customer Focus", desc: "Your satisfaction is our priority. We tailor every service to meet your specific needs and expectations." },
  { icon: Award, title: "Excellence", desc: "Our team is certified and continuously trained in the latest detailing techniques and technologies." },
  { icon: Heart, title: "Passion", desc: "We genuinely love what we do. That passion shows in every vehicle we touch." },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-20 lg:py-28 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            subtitle="About Us"
            title="Driven by Perfection"
            description="We're a team of passionate detailing professionals dedicated to making every vehicle look its absolute best."
          />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              Founded with a simple mission — to provide the highest quality auto detailing service 
              with unmatched attention to detail. Over the years, we've detailed thousands of vehicles, 
              from daily drivers to exotic supercars, earning the trust of car enthusiasts across the region.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-gradient-card border border-border rounded-xl hover:border-gold transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-gold mb-4">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
