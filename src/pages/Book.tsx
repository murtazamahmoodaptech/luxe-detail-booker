import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, Car } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import SectionHeading from "@/components/SectionHeading";
import { SERVICE_TYPES, VEHICLE_CATEGORIES, TIME_SLOTS, getPrice } from "@/data/pricing";

export default function BookPage() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    vehicleName: "",
    make: "",
    model: "",
    year: "",
    serviceType: "",
    vehicleCategory: "",
    promoCode: "",
    timeSlot: "",
  });
  const [date, setDate] = useState<Date>();

  const savedPromo = localStorage.getItem("promo_code");
  const promoCode = form.promoCode.trim().toUpperCase() || savedPromo || "";
  const hasDiscount = promoCode === "FIRST10";

  const basePrice = useMemo(() => {
    if (!form.serviceType || !form.vehicleCategory) return null;
    return getPrice(form.serviceType, form.vehicleCategory);
  }, [form.serviceType, form.vehicleCategory]);

  const discount = hasDiscount && basePrice ? basePrice * 0.1 : 0;
  const total = basePrice ? basePrice - discount : null;

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.email || !form.serviceType || !form.vehicleCategory || !date || !form.timeSlot) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Appointment request submitted! We'll confirm your booking shortly.");
  };

  return (
    <>
      <section className="py-20 lg:py-28 bg-gradient-card">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            subtitle="Book Now"
            title="Schedule Your Detail"
            description="Fill out the form below and we'll confirm your appointment."
          />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Personal Info */}
            <div className="bg-gradient-card border border-border rounded-xl p-6 lg:p-8 space-y-4">
              <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Full Name *</Label>
                  <Input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="John Doe" className="bg-secondary border-border text-foreground mt-1" />
                </div>
                <div>
                  <Label className="text-foreground">Cell Number *</Label>
                  <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(555) 123-4567" className="bg-secondary border-border text-foreground mt-1" />
                </div>
                <div>
                  <Label className="text-foreground">Email *</Label>
                  <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="john@example.com" className="bg-secondary border-border text-foreground mt-1" />
                </div>
                <div>
                  <Label className="text-foreground">Address</Label>
                  <Input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="123 Main St" className="bg-secondary border-border text-foreground mt-1" />
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="bg-gradient-card border border-border rounded-xl p-6 lg:p-8 space-y-4">
              <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                <Car className="w-5 h-5 text-primary" /> Vehicle Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Vehicle Name</Label>
                  <Input value={form.vehicleName} onChange={(e) => update("vehicleName", e.target.value)} placeholder="e.g. Tesla Model 3" className="bg-secondary border-border text-foreground mt-1" />
                </div>
                <div>
                  <Label className="text-foreground">Make</Label>
                  <Input value={form.make} onChange={(e) => update("make", e.target.value)} placeholder="e.g. Tesla" className="bg-secondary border-border text-foreground mt-1" />
                </div>
                <div>
                  <Label className="text-foreground">Model</Label>
                  <Input value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="e.g. Model 3" className="bg-secondary border-border text-foreground mt-1" />
                </div>
                <div>
                  <Label className="text-foreground">Year</Label>
                  <Input value={form.year} onChange={(e) => update("year", e.target.value)} placeholder="e.g. 2024" className="bg-secondary border-border text-foreground mt-1" />
                </div>
              </div>
            </div>

            {/* Service & Scheduling */}
            <div className="bg-gradient-card border border-border rounded-xl p-6 lg:p-8 space-y-4">
              <h3 className="font-display text-xl font-bold text-foreground">Service & Scheduling</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Service Type *</Label>
                  <Select value={form.serviceType} onValueChange={(v) => update("serviceType", v)}>
                    <SelectTrigger className="bg-secondary border-border text-foreground mt-1">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {SERVICE_TYPES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground">Vehicle Category *</Label>
                  <Select value={form.vehicleCategory} onValueChange={(v) => update("vehicleCategory", v)}>
                    <SelectTrigger className="bg-secondary border-border text-foreground mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {VEHICLE_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground">Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-secondary border-border mt-1", !date && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label className="text-foreground">Time Slot *</Label>
                  <Select value={form.timeSlot} onValueChange={(v) => update("timeSlot", v)}>
                    <SelectTrigger className="bg-secondary border-border text-foreground mt-1">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {TIME_SLOTS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Promo & Pricing */}
            <div className="bg-gradient-card border border-gold rounded-xl p-6 lg:p-8 space-y-4">
              <h3 className="font-display text-xl font-bold text-foreground">Promo & Pricing</h3>
              <div>
                <Label className="text-foreground">Promo Code</Label>
                <Input
                  value={form.promoCode || savedPromo || ""}
                  onChange={(e) => update("promoCode", e.target.value)}
                  placeholder="Enter promo code"
                  className="bg-secondary border-border text-foreground mt-1"
                />
              </div>

              {basePrice !== null && (
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Price</span>
                    <span className="text-foreground">${basePrice.toFixed(2)}</span>
                  </div>
                  {hasDiscount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-primary">Discount (10%)</span>
                      <span className="text-primary">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                    <span className="text-foreground">Total</span>
                    <span className="text-gradient-gold">${total!.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full bg-gradient-gold text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity">
              Submit Booking Request
            </Button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
