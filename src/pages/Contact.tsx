import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import SectionHeading from "@/components/SectionHeading";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "(555) 123-4567", href: "tel:+15551234567" },
  { icon: Mail, label: "Email", value: "support@globalintegratedsupport.com", href: "mailto:support@globalintegratedsupport.com" },
  { icon: MapPin, label: "Address", value: "123 Detail Lane, Auto City, AC 12345" },
  { icon: Clock, label: "Hours", value: "Mon-Sat: 8AM - 6PM" },
];

const faqs = [
  { q: "How long does a full detail take?", a: "A full interior and exterior detail typically takes 3-5 hours depending on the vehicle size and condition." },
  { q: "Do I need to drop off my car?", a: "We offer both drop-off and mobile services. Choose the option that's most convenient for you when booking." },
  { q: "What products do you use?", a: "We use only professional-grade, pH-balanced, and eco-friendly detailing products from trusted brands." },
  { q: "Do you offer gift cards?", a: "Yes! Gift cards are available in any denomination. Contact us to purchase one for someone special." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Message sent! We'll get back to you shortly.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading subtitle="Get In Touch" title="Contact Us" description="Have questions? We'd love to hear from you. Reach out through any channel below." />
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-foreground">Get in Touch</h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether you have a question about our services, need a custom quote for a fleet, or just want to say hello — we're here to help. Our team typically responds within 2 hours during business hours.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 bg-gradient-card border border-border rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-foreground hover:text-primary transition-colors text-sm">{item.value}</a>
                      ) : (
                        <span className="text-foreground text-sm">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-gradient-card border border-border rounded-xl p-5 sm:p-6 lg:p-8 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="bg-secondary border-border text-foreground mt-1" />
                </div>
                <div>
                  <Label className="text-foreground">Phone</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Your phone" className="bg-secondary border-border text-foreground mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-foreground">Email *</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="bg-secondary border-border text-foreground mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Subject</Label>
                <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="What's this about?" className="bg-secondary border-border text-foreground mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Message *</Label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" rows={5} className="bg-secondary border-border text-foreground mt-1" />
              </div>
              <Button type="submit" className="w-full bg-gradient-sky text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                Send Message <Send className="ml-2 w-4 h-4" />
              </Button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 lg:py-20 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <SectionHeading subtitle="FAQ" title="Frequently Asked Questions" />
          <div className="space-y-4 mt-10">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="border border-border rounded-xl p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-foreground font-semibold mb-2">{faq.q}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
