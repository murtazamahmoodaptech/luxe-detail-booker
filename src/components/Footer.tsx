import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gradient-gold font-display text-2xl font-bold">PREMIUM</span>
              <span className="text-foreground font-display text-2xl font-light">Detail</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium car detailing services that bring out the best in your vehicle. 
              Experience luxury treatment for your ride.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-primary font-display text-lg mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: "/services", label: "Services" },
                { to: "/book", label: "Book Appointment" },
                { to: "/reviews", label: "Reviews" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                { to: "/privacy-policy", label: "Privacy Policy" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-primary font-display text-lg mb-4">Services</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>Interior Detailing</span>
              <span>Exterior Detailing</span>
              <span>Super Wax Detail</span>
              <span>Ceramic Coating</span>
              <span>Paint Correction</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary font-display text-lg mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+15551234567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" /> (555) 123-4567
              </a>
              <a href="mailto:info@premiumdetail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" /> info@premiumdetail.com
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>123 Detail Lane<br />Auto City, AC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Premium Detail. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
