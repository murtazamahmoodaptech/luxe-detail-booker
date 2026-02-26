import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut, Search, Filter, Pencil, Trash2, Eye, Download, Plus,
  CalendarDays, Clock, DollarSign, Users, CheckCircle, AlertCircle, Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Appointment } from "@/data/mockAppointments";

interface PromoCode {
  id: string;
  code: string;
  discountPercentage: number;
  isActive: boolean;
  expiryDate: string;
}

const INITIAL_PROMOS: PromoCode[] = [
  { id: "1", code: "FIRST10", discountPercentage: 10, isActive: true, expiryDate: "2026-12-31" },
  { id: "2", code: "SUMMER20", discountPercentage: 20, isActive: false, expiryDate: "2026-08-31" },
];

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-primary/20 text-primary border-primary/30",
  Confirmed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Cancelled: "bg-destructive/20 text-red-400 border-destructive/30",
};

export default function AdminDashboard() {
  const { logout, token } = useAdminAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editApt, setEditApt] = useState<Appointment | null>(null);
  const [viewApt, setViewApt] = useState<Appointment | null>(null);
  const [editStatus, setEditStatus] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  // Fetch appointments on mount
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/appointments`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        if (data.success) {
          setAppointments(data.data);
        } else {
          toast.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load appointments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [token, navigate]);

  // Promo state
  const [promos, setPromos] = useState<PromoCode[]>(INITIAL_PROMOS);
  const [showAddPromo, setShowAddPromo] = useState(false);
  const [newPromo, setNewPromo] = useState({ code: "", discountPercentage: "", expiryDate: "" });

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  const filtered = appointments.filter((a) => {
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    const matchSearch = !search || a.fullName.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "Pending").length,
    confirmed: appointments.filter((a) => a.status === "Confirmed").length,
    revenue: appointments.filter((a) => a.status !== "Cancelled").reduce((sum, a) => sum + a.totalPrice, 0),
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        toast.success("Appointment deleted.");
      } else {
        toast.error("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete appointment");
    }
  };

  const handleEditSave = async () => {
    if (!editApt) return;
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/${editApt.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: editStatus }),
      });

      const data = await response.json();
      if (data.success) {
        setAppointments((prev) => prev.map((a) => (a.id === editApt.id ? { ...a, status: editStatus as Appointment["status"] } : a)));
        toast.success("Appointment updated.");
        setEditApt(null);
      } else {
        toast.error("Failed to update appointment");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to update appointment");
    }
  };

  const handleExportCSV = () => {
    const headers = "ID,Name,Phone,Email,Service,Vehicle,Date,Time,Status,Total\n";
    const rows = filtered.map((a) => `${a.id},${a.fullName},${a.phone},${a.email},${a.serviceType},${a.vehicleCategory},${a.date},${a.timeSlot},${a.status},${a.totalPrice}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = "appointments.csv"; link.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported!");
  };

  const handleAddPromo = () => {
    if (!newPromo.code || !newPromo.discountPercentage || !newPromo.expiryDate) {
      toast.error("Fill all promo fields."); return;
    }
    setPromos((prev) => [...prev, { id: Date.now().toString(), code: newPromo.code.toUpperCase(), discountPercentage: Number(newPromo.discountPercentage), isActive: true, expiryDate: newPromo.expiryDate }]);
    setNewPromo({ code: "", discountPercentage: "", expiryDate: "" });
    setShowAddPromo(false);
    toast.success("Promo code added!");
  };

  const togglePromo = (id: string) => {
    setPromos((prev) => prev.map((p) => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const deletePromo = (id: string) => {
    setPromos((prev) => prev.filter((p) => p.id !== id));
    toast.success("Promo code deleted.");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="glass-dark border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-gradient-sky font-display text-xl font-bold">PREMIUM</span>
            <span className="text-foreground font-display text-xl font-light">Admin</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="border-border text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Bookings", value: stats.total, color: "text-primary" },
            { icon: AlertCircle, label: "Pending", value: stats.pending, color: "text-primary" },
            { icon: CheckCircle, label: "Confirmed", value: stats.confirmed, color: "text-emerald-400" },
            { icon: DollarSign, label: "Revenue", value: `$${stats.revenue.toFixed(2)}`, color: "text-primary" },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
              </div>
              <div className="text-2xl font-display font-bold text-foreground">{s.value}</div>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="appointments">
          <TabsList className="bg-secondary border border-border mb-6">
            <TabsTrigger value="appointments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Appointments</TabsTrigger>
            <TabsTrigger value="promos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Tag className="w-4 h-4 mr-1" /> Promo Codes
            </TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, or ID..." className="bg-secondary border-border text-foreground pl-10" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 bg-secondary border-border text-foreground">
                  <Filter className="w-4 h-4 mr-2" /><SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button onClick={handleExportCSV} variant="outline" className="border-border text-muted-foreground hover:text-foreground">
                <Download className="w-4 h-4 mr-2" /> Export CSV
              </Button>
            </div>

            <div className="bg-gradient-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["ID", "Customer", "Service", "Vehicle", "Date", "Status", "Total", "Actions"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr><td colSpan={8} className="text-center py-12 text-muted-foreground">No appointments found.</td></tr>
                    ) : filtered.map((apt) => (
                      <tr key={apt.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 text-primary font-mono text-xs">{apt.id}</td>
                        <td className="px-4 py-3"><div className="text-foreground font-medium">{apt.fullName}</div><div className="text-xs text-muted-foreground">{apt.email}</div></td>
                        <td className="px-4 py-3 text-foreground">{apt.serviceType}</td>
                        <td className="px-4 py-3"><div className="text-foreground">{apt.vehicleName}</div><div className="text-xs text-muted-foreground">{apt.vehicleCategory}</div></td>
                        <td className="px-4 py-3">
                          <div className="text-foreground flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {apt.date}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {apt.timeSlot}</div>
                        </td>
                        <td className="px-4 py-3"><Badge variant="outline" className={`text-xs ${STATUS_COLORS[apt.status]}`}>{apt.status}</Badge></td>
                        <td className="px-4 py-3"><span className="text-foreground font-semibold">${apt.totalPrice.toFixed(2)}</span>{apt.discountApplied && <div className="text-xs text-primary">Promo applied</div>}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => setViewApt(apt)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"><Eye className="w-4 h-4" /></button>
                            <button onClick={() => { setEditApt(apt); setEditStatus(apt.status); }} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(apt.id)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Promo Codes Tab */}
          <TabsContent value="promos">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-xl font-bold text-foreground">Promo Codes</h3>
              <Button onClick={() => setShowAddPromo(true)} className="bg-gradient-sky text-primary-foreground font-semibold hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" /> Add Promo Code
              </Button>
            </div>

            <div className="grid gap-4">
              {promos.map((promo) => (
                <motion.div key={promo.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-card border border-border rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Tag className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-foreground font-bold text-lg font-mono">{promo.code}</div>
                      <div className="text-sm text-muted-foreground">{promo.discountPercentage}% off · Expires {promo.expiryDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{promo.isActive ? "Active" : "Inactive"}</span>
                      <Switch checked={promo.isActive} onCheckedChange={() => togglePromo(promo.id)} />
                    </div>
                    <button onClick={() => deletePromo(promo.id)} className="p-2 rounded hover:bg-secondary text-muted-foreground hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
              {promos.length === 0 && <p className="text-center text-muted-foreground py-8">No promo codes yet.</p>}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* View Dialog */}
      <Dialog open={!!viewApt} onOpenChange={() => setViewApt(null)}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader><DialogTitle className="font-display text-xl">Appointment Details</DialogTitle></DialogHeader>
          {viewApt && (
            <div className="space-y-3 text-sm">
              {[["ID", viewApt.id], ["Customer", viewApt.fullName], ["Phone", viewApt.phone], ["Email", viewApt.email], ["Address", viewApt.address], ["Vehicle", `${viewApt.year} ${viewApt.make} ${viewApt.model}`], ["Category", viewApt.vehicleCategory], ["Service", viewApt.serviceType], ["Date", `${viewApt.date} at ${viewApt.timeSlot}`], ["Promo Code", viewApt.promoCode || "None"], ["Status", viewApt.status], ["Total", `$${viewApt.totalPrice.toFixed(2)}`]].map(([label, val]) => (
                <div key={label} className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className="text-foreground font-medium">{val}</span></div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editApt} onOpenChange={() => setEditApt(null)}>
        <DialogContent className="bg-card border-border text-foreground max-w-md">
          <DialogHeader><DialogTitle className="font-display text-xl">Edit Appointment</DialogTitle></DialogHeader>
          {editApt && (
            <div className="space-y-4">
              <div><Label className="text-foreground">Customer</Label><Input value={editApt.fullName} disabled className="bg-secondary border-border text-muted-foreground mt-1" /></div>
              <div><Label className="text-foreground">Status</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger className="bg-secondary border-border text-foreground mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-card border-border">{["Pending", "Confirmed", "Completed", "Cancelled"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditApt(null)} className="border-border text-muted-foreground">Cancel</Button>
            <Button onClick={handleEditSave} className="bg-gradient-sky text-primary-foreground font-semibold hover:opacity-90">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Promo Dialog */}
      <Dialog open={showAddPromo} onOpenChange={setShowAddPromo}>
        <DialogContent className="bg-card border-border text-foreground max-w-md">
          <DialogHeader><DialogTitle className="font-display text-xl">Add Promo Code</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label className="text-foreground">Code</Label><Input value={newPromo.code} onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })} placeholder="e.g. SUMMER20" className="bg-secondary border-border text-foreground mt-1 uppercase" /></div>
            <div><Label className="text-foreground">Discount %</Label><Input type="number" value={newPromo.discountPercentage} onChange={(e) => setNewPromo({ ...newPromo, discountPercentage: e.target.value })} placeholder="e.g. 10" className="bg-secondary border-border text-foreground mt-1" /></div>
            <div><Label className="text-foreground">Expiry Date</Label><Input type="date" value={newPromo.expiryDate} onChange={(e) => setNewPromo({ ...newPromo, expiryDate: e.target.value })} className="bg-secondary border-border text-foreground mt-1" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPromo(false)} className="border-border text-muted-foreground">Cancel</Button>
            <Button onClick={handleAddPromo} className="bg-gradient-sky text-primary-foreground font-semibold hover:opacity-90">Add Code</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
