import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Calendar, ClipboardList, Mail, Phone, User, Loader2, Save } from "lucide-react";
import Seo from "@/components/Seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  APPOINTMENT_STATUS_OPTIONS,
  getAppointmentBadgeClass,
  getAppointmentStatusLabel,
} from "@/lib/appointments";
import type { AppointmentStatus } from "@/lib/appointments";

type AppointmentRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
  price: number | null;
  rendezvousDate: string | null;
  tunisDate: string | null;
};

type AppointmentDetail = AppointmentRow & {
  message: string | null;
  notes: string | null;
};

const statusBadge = (status: string) => getAppointmentBadgeClass(status);

const AdminDashboard = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<AppointmentRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<AppointmentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState<{
    status: AppointmentStatus;
    price: string;
    rendezvousDate: string;
    tunisDate: string;
    notes: string;
  }>({
    status: "new",
    price: "",
    rendezvousDate: "",
    tunisDate: "",
    notes: "",
  });

  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/appointments", { credentials: "include" });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }
        throw new Error(data?.error?.message ?? "Erreur de chargement");
      }

      setAppointments(data.data.appointments ?? []);
    } catch (error) {
      toast({
        title: "Chargement impossible",
        description: error instanceof Error ? error.message : "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadAppointment = async (id: string) => {
    setIsLoadingDetail(true);
    try {
      const response = await fetch(`/api/admin/appointments/${id}`, { credentials: "include" });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }
        throw new Error(data?.error?.message ?? "Erreur de chargement");
      }

      const appointment = data.data.appointment as AppointmentDetail;
      setSelected(appointment);
      setSelectedId(id);
      setForm({
        status: appointment.status ?? "new",
        price: appointment.price !== null ? String(appointment.price) : "",
        rendezvousDate: appointment.rendezvousDate ?? "",
        tunisDate: appointment.tunisDate ?? "",
        notes: appointment.notes ?? "",
      });
    } catch (error) {
      toast({
        title: "Chargement impossible",
        description: error instanceof Error ? error.message : "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingDetail(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const selectedLabel = useMemo(() => {
    if (!selected) {
      return "Selectionnez un dossier";
    }
    return `${selected.name}`;
  }, [selected]);

  const handleSave = async () => {
    if (!selectedId) {
      return;
    }

    const priceValue = form.price.trim() === "" ? null : Number(form.price);
    if (priceValue !== null && Number.isNaN(priceValue)) {
      toast({
        title: "Prix invalide",
        description: "Veuillez saisir un montant valide.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        status: form.status,
        price: priceValue,
        rendezvousDate: form.rendezvousDate || null,
        tunisDate: form.tunisDate || null,
        notes: form.notes || null,
      };

      const response = await fetch(`/api/admin/appointments/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }
        throw new Error(data?.error?.message ?? "Mise a jour impossible");
      }

      const updated = data.data.appointment as AppointmentDetail;
      setSelected(updated);
      setAppointments((prev) =>
        prev.map((item) => (item.id === updated.id ? { ...item, ...updated } : item)),
      );

      toast({
        title: "Dossier mis a jour",
        description: "Les informations ont ete enregistrees.",
      });
    } catch (error) {
      toast({
        title: "Mise a jour impossible",
        description: error instanceof Error ? error.message : "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Seo
        title="Admin - Tableau de bord"
        description="Administration des rendez-vous"
        noindex
      />

      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-7 h-7 text-primary" />
              <div>
                <h1 className="text-3xl font-serif font-bold">Dashboard Admin</h1>
                <p className="text-muted-foreground">Suivi des demandes et rendez-vous</p>
              </div>
            </div>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/admin/newsletter">
                <Mail className="w-4 h-4" />
                Newsletter
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_1.5fr] gap-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Demandes
                </CardTitle>
                <CardDescription>Liste des rendez-vous</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Chargement...
                  </div>
                ) : appointments.length === 0 ? (
                  <p className="text-muted-foreground">Aucune demande disponible.</p>
                ) : (
                  <div className="space-y-3">
                    {appointments.map((item) => (
                      <div
                        key={item.id}
                        className={`w-full rounded-xl border p-4 transition-all ${
                          selectedId === item.id ? "border-primary shadow-soft" : "border-border"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-foreground">{item.name || "Sans nom"}</p>
                            <p className="text-sm text-muted-foreground">{item.email}</p>
                          </div>
                          <Badge className={statusBadge(item.status)}>
                            {getAppointmentStatusLabel(item.status)}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            Cree le {item.createdAt ? new Date(item.createdAt).toLocaleDateString("fr-FR") : "-"}
                          </span>
                          <Button variant="outline" size="sm" onClick={() => loadAppointment(item.id)}>
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {selectedLabel}
                </CardTitle>
                <CardDescription>Details et mise a jour</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {!selected && !isLoadingDetail ? (
                  <p className="text-muted-foreground">Selectionnez un dossier pour voir les details.</p>
                ) : isLoadingDetail ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Chargement...
                  </div>
                ) : selected ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-muted-foreground">Email</Label>
                        <p className="flex items-center gap-2 text-foreground">
                          <Mail className="w-4 h-4 text-primary" />
                          {selected.email}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-muted-foreground">Telephone</Label>
                        <p className="flex items-center gap-2 text-foreground">
                          <Phone className="w-4 h-4 text-primary" />
                          {selected.phone}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Message</Label>
                      <p className="text-sm bg-secondary rounded-xl p-3 text-foreground">
                        {selected.message || "Aucun message."}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Statut</Label>
                        <Select
                          value={form.status}
                          onValueChange={(value) =>
                            setForm((prev) => ({ ...prev, status: value as AppointmentStatus }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir" />
                          </SelectTrigger>
                          <SelectContent>
                            {APPOINTMENT_STATUS_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Prix (EUR)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={form.price}
                          onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Date rendez-vous</Label>
                        <Input
                          type="date"
                          value={form.rendezvousDate}
                          onChange={(e) => setForm((prev) => ({ ...prev, rendezvousDate: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Date Tunisie</Label>
                        <Input
                          type="date"
                          value={form.tunisDate}
                          onChange={(e) => setForm((prev) => ({ ...prev, tunisDate: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Notes admin</Label>
                      <textarea
                        className="w-full min-h-[120px] rounded-xl border border-border bg-secondary p-3 text-sm text-foreground"
                        value={form.notes}
                        onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                      />
                    </div>

                    <Button onClick={handleSave} className="w-full gap-2" disabled={isSaving}>
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {isSaving ? "Enregistrement..." : "Mettre a jour"}
                    </Button>
                  </>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
