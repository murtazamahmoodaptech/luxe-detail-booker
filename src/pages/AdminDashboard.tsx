import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut, Search, Filter, Pencil, Trash2, Eye, Download, Plus,
  CalendarDays, Clock, DollarSign, Users, CheckCircle, AlertCircle, Tag, UserPlus
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
import { MOCK_APPOINTMENTS, Appointment } from "@/data/mockAppointments";

interface PromoCode {
  id: string;
  code: string;
  discountPercentage: number;
  isActive: boolean;
  expiryDate: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

const INITIAL_PROMOS: PromoCode[] = [
  { id: "1", code: "FIRST10", discountPercentage: 10, isActive: true, expiryDate: "2026-12-31" },
  { id: "2", code: "SUMMER20", discountPercentage: 20, isActive: false, expiryDate: "2026-08-31" },
];

const INITIAL_USERS: User[] = [
  { id: "1", name: "John Smith", email: "john@example.com", phone: "+1 555-0101", role: "Customer", status: "Active", createdAt: "2026-01-15" },
  { id: "2", name: "Sarah Johnson", email: "sarah@example.com", phone: "+1 555-0102", role: "Customer", status: "Active", createdAt: "2026-01-20" },
  { id: "3", name: "Mike Davis", email: "mike@example.com", phone: "+1 555-0103", role: "VIP", status: "Active", createdAt: "2026-02-01" },
  { id: "4", name: "Emma Wilson", email: "emma@example.com", phone: "+1 555-0104", role: "Customer", status: "Inactive", createdAt: "2026-02-10" },
];

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-primary/20 text-primary border-primary/30",
  Confirmed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Cancelled: "bg-destructive/20 text-red-400 border-destructive/30",
};

const USER_STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Inactive: "bg-destructive/20 text-red-400 border-destructive/30",
};

const emptyUser = { name: "", email: "", phone: "", role: "Customer" };

export default function AdminDashboard() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editApt, setEditApt] = useState<Appointment | null>(null);
  const [viewApt, setViewApt] = useState<Appointment | null>(null);
  const [editStatus, setEditStatus] = useState("");

  // Promo state
  const [promos, setPromos] = useState<PromoCode[]>(INITIAL_PROMOS);
  const [showAddPromo, setShowAddPromo] = useState(false);
  const [newPromo, setNewPromo] = useState({ code: "", discountPercentage: "", expiryDate: "" });

  // Users state
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [userSearch, setUserSearch] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [userForm, setUserForm] = useState(emptyUser);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  const filtered = appointments.filter((a) => {
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    const matchSearch = !search || a.fullName.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const filteredUsers = users.filter((u) =>
    !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "Pending").length,
    confirmed: appointments.filter((a) => a.status === "Confirmed").length,
    revenue: appointments.filter((a) => a.status !== "Cancelled").reduce((sum, a) => sum + a.totalPrice, 0),
  };

  const handleDelete = (id: string) => { setAppointments((prev) => prev.filter((a) => a.id !== id)); toast.success("Appointment deleted."); };

  const handleEditSave = () => {
    if (!editApt) return;
    setAppointments((prev) => prev.map((a) => (a.id === editApt.id ? { ...a, status: editStatus as Appointment["status"] } : a)));
    toast.success("Appointment updated.");
    setEditApt(null);
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

  // User handlers
  const handleAddUser = () => {
    if (!userForm.name || !userForm.email || !userForm.phone) {
      toast.error("Fill all required fields."); return;
    }
    setUsers((prev) => [...prev, { id: Date.now().toString(), ...userForm, status: "Active", createdAt: new Date().toISOString().split("T")[0] }]);
    setUserForm(emptyUser);
    setShowAddUser(false);
    toast.success("User added!");
  };

  const handleEditUser = () => {
    if (!editUser) return;
    setUsers((prev) => prev.map((u) => u.id === editUser.id ? editUser : u));
    toast.success("User updated.");
    setEditUser(null);
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success("User deleted.");
  };

  const toggleUserStatus = (id: string) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u));
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
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-card border border-border rounded-xl p-5 card-hover">
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
            <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4 mr-1" /> Users
            </TabsTrigger>
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

          {/* Users Tab */}
          <TabsContent value="users">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={userSearch} onChange={(e) => setUserSearch(e.target.value)} placeholder="Search users by name or email..." className="bg-secondary border-border text-foreground pl-10" />
              </div>
              <Button onClick={() => { setUserForm(emptyUser); setShowAddUser(true); }} className="bg-gradient-sky text-primary-foreground font-semibold hover:opacity-90">
                <UserPlus className="w-4 h-4 mr-2" /> Add User
              </Button>
            </div>

            <div className="bg-gradient-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["Name", "Email", "Phone", "Role", "Status", "Joined", "Actions"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-12 text-muted-foreground">No users found.</td></tr>
                    ) : filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <span className="text-foreground font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                        <td className="px-4 py-3 text-muted-foreground">{user.phone}</td>
                        <td className="px-4 py-3"><Badge variant="outline" className="text-xs border-primary/30 text-primary">{user.role}</Badge></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-xs ${USER_STATUS_COLORS[user.status]}`}>{user.status}</Badge>
                            <Switch checked={user.status === "Active"} onCheckedChange={() => toggleUserStatus(user.id)} className="scale-75" />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{user.createdAt}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => setViewUser(user)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"><Eye className="w-4 h-4" /></button>
                            <button onClick={() => setEditUser({ ...user })} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
                            <button onClick={() => handleDeleteUser(user.id)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
                <motion.div key={promo.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-card border border-border rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 card-hover">
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

      {/* View Appointment Dialog */}
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

      {/* Edit Appointment Dialog */}
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

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="bg-card border-border text-foreground max-w-md">
          <DialogHeader><DialogTitle className="font-display text-xl">Add New User</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label className="text-foreground">Full Name *</Label><Input value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} placeholder="John Smith" className="bg-secondary border-border text-foreground mt-1" /></div>
            <div><Label className="text-foreground">Email *</Label><Input type="email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} placeholder="john@example.com" className="bg-secondary border-border text-foreground mt-1" /></div>
            <div><Label className="text-foreground">Phone *</Label><Input value={userForm.phone} onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })} placeholder="+1 555-0100" className="bg-secondary border-border text-foreground mt-1" /></div>
            <div><Label className="text-foreground">Role</Label>
              <Select value={userForm.role} onValueChange={(v) => setUserForm({ ...userForm, role: v })}>
                <SelectTrigger className="bg-secondary border-border text-foreground mt-1"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {["Customer", "VIP", "Staff"].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUser(false)} className="border-border text-muted-foreground">Cancel</Button>
            <Button onClick={handleAddUser} className="bg-gradient-sky text-primary-foreground font-semibold hover:opacity-90">Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader><DialogTitle className="font-display text-xl">User Details</DialogTitle></DialogHeader>
          {viewUser && (
            <div className="space-y-3 text-sm">
              {[["Name", viewUser.name], ["Email", viewUser.email], ["Phone", viewUser.phone], ["Role", viewUser.role], ["Status", viewUser.status], ["Joined", viewUser.createdAt]].map(([label, val]) => (
                <div key={label} className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className="text-foreground font-medium">{val}</span></div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
        <DialogContent className="bg-card border-border text-foreground max-w-md">
          <DialogHeader><DialogTitle className="font-display text-xl">Edit User</DialogTitle></DialogHeader>
          {editUser && (
            <div className="space-y-4">
              <div><Label className="text-foreground">Full Name</Label><Input value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} className="bg-secondary border-border text-foreground mt-1" /></div>
              <div><Label className="text-foreground">Email</Label><Input type="email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} className="bg-secondary border-border text-foreground mt-1" /></div>
              <div><Label className="text-foreground">Phone</Label><Input value={editUser.phone} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} className="bg-secondary border-border text-foreground mt-1" /></div>
              <div><Label className="text-foreground">Role</Label>
                <Select value={editUser.role} onValueChange={(v) => setEditUser({ ...editUser, role: v })}>
                  <SelectTrigger className="bg-secondary border-border text-foreground mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {["Customer", "VIP", "Staff"].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUser(null)} className="border-border text-muted-foreground">Cancel</Button>
            <Button onClick={handleEditUser} className="bg-gradient-sky text-primary-foreground font-semibold hover:opacity-90">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
