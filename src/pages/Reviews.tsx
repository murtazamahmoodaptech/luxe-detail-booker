import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const reviews = [
  { name: "James M.", rating: 5, text: "Absolutely incredible work. My car looks better than when I first bought it. The attention to detail is unmatched!", avatar: "JM" },
  { name: "Sarah K.", rating: 5, text: "The Super Wax Detail was worth every penny. My Tesla has never looked this good. Will definitely be coming back!", avatar: "SK" },
  { name: "Michael R.", rating: 5, text: "Professional service from start to finish. They were on time, thorough, and my SUV looks brand new. Highly recommend!", avatar: "MR" },
  { name: "Emily D.", rating: 5, text: "I've tried many detailing services and this is by far the best. The ceramic coating they applied is still holding up months later.", avatar: "ED" },
  { name: "David L.", rating: 4, text: "Great service and very convenient booking. The interior detail was thorough and my car smells amazing. Will book again.", avatar: "DL" },
  { name: "Amanda T.", rating: 5, text: "They treated my car like it was their own. Every inch was cleaned and polished perfectly. The best detailing experience I've had.", avatar: "AT" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < count ? "fill-primary text-primary" : "text-muted-foreground"}`} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <section className="py-20 lg:py-28 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            subtitle="Testimonials"
            title="What Our Clients Say"
            description="Don't just take our word for it — hear from our satisfied customers."
          />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-card border border-border rounded-xl p-6 hover:border-gold transition-colors"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-foreground text-sm leading-relaxed mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-foreground font-semibold text-sm">{review.name}</div>
                    <Stars count={review.rating} />
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
