import SectionHeading from "@/components/SectionHeading";

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="py-20 lg:py-28 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading subtitle="Legal" title="Privacy Policy" />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl prose-sm">
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Information We Collect</h3>
              <p>We collect personal information you provide when booking an appointment, including your name, email address, phone number, vehicle information, and address. We use this information solely to provide our detailing services.</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">How We Use Your Information</h3>
              <p>Your information is used to process bookings, communicate about appointments, send promotional offers (with your consent), and improve our services. We never sell your personal data to third parties.</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Data Security</h3>
              <p>We implement industry-standard security measures to protect your personal information. All data is encrypted in transit and at rest.</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Contact Us</h3>
              <p>If you have questions about this privacy policy, please contact us at info@premiumdetail.com or call (555) 123-4567.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
