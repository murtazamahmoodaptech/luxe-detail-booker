import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const reviews = [
  { name: "James M.", rating: 5, text: "Absolutely incredible work. My car looks better than when I first bought it. The attention to detail is unmatched! Every surface was spotless.", avatar: "JM" },
  { name: "Sarah K.", rating: 5, text: "The Super Wax Detail was worth every penny. My Tesla has never looked this good. The ceramic coating gives an amazing shine. Will definitely be coming back!", avatar: "SK" },
  { name: "Michael R.", rating: 5, text: "Professional service from start to finish. They were on time, thorough, and my SUV looks brand new. The interior smells incredible too. Highly recommend!", avatar: "MR" },
  { name: "Emily D.", rating: 5, text: "I've tried many detailing services and this is by far the best. The ceramic coating they applied is still holding up months later. Worth the investment.", avatar: "ED" },
  { name: "David L.", rating: 4, text: "Great service and very convenient booking. The interior detail was thorough and my car smells amazing. Only wish they had weekend evening slots.", avatar: "DL" },
  { name: "Amanda T.", rating: 5, text: "They treated my car like it was their own. Every inch was cleaned and polished perfectly. The best detailing experience I've had in 10 years of owning cars.", avatar: "AT" },
  { name: "Robert C.", rating: 5, text: "Brought my classic Mustang in for a full detail before a car show. They understood exactly what was needed and delivered beyond expectations. Won first place!", avatar: "RC" },
  { name: "Linda P.", rating: 5, text: "As a busy mom, I never have time to clean my minivan properly. These guys made it look brand new inside and out. Even got the crayon marks out of the seats!", avatar: "LP" },
  { name: "Chris W.", rating: 4, text: "Solid exterior detail on my truck. The paint correction removed years of swirl marks. Very happy with the results and fair pricing for the quality delivered.", avatar: "CW" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < count ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            subtitle="Testimonials"
            title="What Our Clients Say"
            description="Don't just take our word for it — hear from our satisfied customers who trust us with their vehicles."
          />
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-gradient-sky">4.9</div>
              <div className="text-xs text-muted-foreground mt-1">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-gradient-sky">500+</div>
              <div className="text-xs text-muted-foreground mt-1">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-gradient-sky">98%</div>
              <div className="text-xs text-muted-foreground mt-1">Would Recommend</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-gradient-card border border-border rounded-xl p-5 sm:p-6 hover:border-primary transition-colors"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-foreground text-sm leading-relaxed mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-sky flex items-center justify-center text-primary-foreground font-bold text-sm">
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
