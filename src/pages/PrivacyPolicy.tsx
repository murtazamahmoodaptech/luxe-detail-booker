import { motion } from "framer-motion";
import { Shield, Eye, Share2, Cookie, Lock, UserCheck, Clock, Mail } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const sections = [
  {
    icon: Eye,
    title: "1. Information We Collect",
    content: "We collect personal information you provide when booking an appointment, including your name, email address, phone number, vehicle information, and service address.",
    items: [
      "Device and browser information when you visit our website",
      "Usage data such as pages visited and time spent on site",
      "Communication records when you contact our support team",
      "Payment information processed securely through third-party providers",
    ],
  },
  {
    icon: UserCheck,
    title: "2. How We Use Your Information",
    content: "Your information is used to:",
    items: [
      "Process and manage your detailing appointments",
      "Communicate about appointment confirmations, reminders, and updates",
      "Send promotional offers and discounts (with your consent)",
      "Improve our services and customer experience",
      "Respond to your inquiries and provide customer support",
      "Comply with legal obligations and resolve disputes",
    ],
    footer: "We never sell your personal data to third parties.",
  },
  {
    icon: Share2,
    title: "3. Data Sharing",
    content: "We may share your information with trusted service providers who assist in operating our business, such as payment processors, email services, and analytics platforms. All third parties are bound by confidentiality agreements and data protection standards.",
  },
  {
    icon: Cookie,
    title: "4. Cookies & Tracking",
    content: "Our website uses cookies and similar technologies to enhance your browsing experience. You can manage your cookie preferences through your browser settings. We use analytics cookies to understand website usage patterns and improve our services.",
  },
  {
    icon: Lock,
    title: "5. Data Security",
    content: "We implement industry-standard security measures to protect your personal information, including SSL encryption, secure servers, and regular security audits. All data is encrypted in transit and at rest. Access to personal data is restricted to authorized personnel only.",
  },
  {
    icon: Shield,
    title: "6. Your Rights",
    content: "You have the right to:",
    items: [
      "Access the personal data we hold about you",
      "Request correction of inaccurate information",
      "Request deletion of your personal data",
      "Opt out of marketing communications at any time",
      "Lodge a complaint with a data protection authority",
    ],
  },
  {
    icon: Clock,
    title: "7. Data Retention",
    content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Appointment records are typically retained for 3 years for warranty and service history purposes.",
  },
  {
    icon: Mail,
    title: "8. Contact Us",
    content: "If you have questions about this privacy policy or wish to exercise your data rights, please contact us at info@premiumdetail.com or call (555) 123-4567. We aim to respond to all inquiries within 48 business hours.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-overlay" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionHeading subtitle="Legal" title="Privacy Policy" description="Last updated: February 2026" />
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="space-y-6">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="bg-gradient-card border border-border rounded-2xl p-6 lg:p-8 card-hover shine-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-bold text-foreground mb-3">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.content}</p>
                    {s.items && (
                      <ul className="mt-3 space-y-2">
                        {s.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.footer && (
                      <p className="mt-3 text-sm font-medium text-primary">{s.footer}</p>
                    )}
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
