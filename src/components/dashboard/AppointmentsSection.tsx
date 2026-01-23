import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  CreditCard,
  Eye,
  Plus,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAppointmentBadgeClass, getAppointmentStatusLabel, type AppointmentStatus } from "@/lib/appointments";

interface Appointment {
  id: string;
  title: string;
  status: AppointmentStatus;
  price: number | null;
  rendezvousDate: string | null;
  tunisDate: string | null;
  notes: string | null;
  message: string | null;
  createdAt: string;
  updatedAt: string;
}

const statusStep = (status: AppointmentStatus) => {
  switch (status) {
    case "new":
      return 1;
    case "rendezvous":
      return 2;
    case "payement":
      return 3;
    case "completed":
      return 4;
    default:
      return 1;
  }
};

const statusIcon = (status: AppointmentStatus) => {
  switch (status) {
    case "new":
      return AlertCircle;
    case "rendezvous":
      return Calendar;
    case "payement":
      return CreditCard;
    case "completed":
      return CheckCircle2;
  }
};

const AppointmentsSection = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/me/appointments", { credentials: "include" });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(data?.error?.message ?? "Chargement impossible");
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

  useEffect(() => {
    loadAppointments();
  }, []);

  const handlePayment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowPaymentDialog(true);
  };

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsDialog(true);
  };

  const processPayment = async () => {
    if (!selectedAppointment) {
      return;
    }

    setIsPaying(true);
    try {
      const response = await fetch(`/api/me/appointments/${selectedAppointment.id}/pay`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error?.message ?? "Paiement impossible");
      }

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === selectedAppointment.id ? { ...apt, status: "completed" } : apt,
        ),
      );
      setSelectedAppointment((current) => (current ? { ...current, status: "completed" } : current));
      setShowPaymentDialog(false);

      toast({
        title: "Paiement enregistre",
        description: "Votre rendez-vous est maintenant confirme.",
      });
    } catch (error) {
      toast({
        title: "Paiement impossible",
        description: error instanceof Error ? error.message : "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsPaying(false);
    }
  };

  const renderProgressSteps = (currentStep: number) => {
    const steps = [
      { num: 1, label: "Demande" },
      { num: 2, label: "Rendez-vous" },
      { num: 3, label: "Paiement" },
      { num: 4, label: "Termine" },
    ];

    return (
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => (
          <div key={step.num} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  currentStep >= step.num
                    ? "bg-gradient-sunset text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {currentStep > step.num ? <CheckCircle2 className="w-5 h-5" /> : step.num}
              </div>
              <span
                className={`text-xs mt-2 ${
                  currentStep >= step.num ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-3 rounded-full ${
                  currentStep > step.num ? "bg-primary" : "bg-secondary"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const emptyState = (
    <div className="text-center py-12 text-muted-foreground">
      <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
      <p className="text-lg">Aucun rendez-vous pour le moment</p>
      <Button asChild className="mt-4 gap-2">
        <Link href="/contact">
          <Plus className="w-4 h-4" />
          Prendre rendez-vous
        </Link>
      </Button>
    </div>
  );

  const sortedAppointments = useMemo(() => {
    return [...appointments].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [appointments]);

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Button asChild className="gap-2">
          <Link href="/contact">
            <Plus className="w-5 h-5" />
            Nouveau rendez-vous
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            Mes rendez-vous
          </CardTitle>
          <CardDescription>Suivez vos demandes et gerez vos paiements.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Chargement...
            </div>
          ) : sortedAppointments.length === 0 ? (
            emptyState
          ) : (
            sortedAppointments.map((appointment) => {
              const step = statusStep(appointment.status);
              const StatusIcon = statusIcon(appointment.status);
              const badgeClass = getAppointmentBadgeClass(appointment.status);
              const label = getAppointmentStatusLabel(appointment.status);
              const priceLabel = appointment.price !== null ? `${appointment.price}€` : "Prix a definir";
              const canPay = appointment.status === "payement" && appointment.price !== null;

              return (
                <div key={appointment.id} className="p-6 bg-secondary rounded-2xl space-y-4">
                  {renderProgressSteps(step)}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-card flex items-center justify-center border border-border">
                        <Clock className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{appointment.title}</h3>
                        <p className="text-muted-foreground">
                          Cree le{" "}
                          {appointment.createdAt
                            ? new Date(appointment.createdAt).toLocaleDateString("fr-FR", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                            : "-"}
                        </p>
                        {appointment.rendezvousDate && (
                          <p className="text-muted-foreground">
                            Rendez-vous: {new Date(appointment.rendezvousDate).toLocaleDateString("fr-FR")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <Badge className={badgeClass}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {label}
                      </Badge>
                      <p className="text-xl font-bold text-foreground">{priceLabel}</p>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="flex items-start gap-2 p-3 bg-card rounded-lg border border-border">
                      <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="gap-2" onClick={() => handleViewDetails(appointment)}>
                      <Eye className="w-4 h-4" />
                      Details
                    </Button>
                    {appointment.status === "payement" && (
                      <Button className="gap-2 flex-1" onClick={() => handlePayment(appointment)} disabled={!canPay}>
                        <CreditCard className="w-4 h-4" />
                        {canPay ? "Payer maintenant" : "Prix en attente"}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Paiement du rendez-vous
            </DialogTitle>
            <DialogDescription>Confirmez le paiement pour valider votre rendez-vous</DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-secondary rounded-xl space-y-2">
                <p className="font-semibold text-foreground">{selectedAppointment.title}</p>
                <p className="text-sm text-muted-foreground">
                  Cree le{" "}
                  {selectedAppointment.createdAt
                    ? new Date(selectedAppointment.createdAt).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })
                    : "-"}
                </p>
                {selectedAppointment.rendezvousDate && (
                  <p className="text-sm text-muted-foreground">
                    Rendez-vous: {new Date(selectedAppointment.rendezvousDate).toLocaleDateString("fr-FR")}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center p-4 bg-gradient-sunset rounded-xl text-primary-foreground">
                <span className="font-medium">Total a payer</span>
                <span className="text-2xl font-bold">
                  {selectedAppointment.price !== null ? `${selectedAppointment.price}€` : "-"}
                </span>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Le paiement sera securise par Stripe
              </p>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Annuler
            </Button>
            <Button onClick={processPayment} className="gap-2" disabled={isPaying}>
              {isPaying ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
              {isPaying
                ? "Paiement..."
                : `Payer ${selectedAppointment?.price !== null ? selectedAppointment?.price : ""}€`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Details du rendez-vous
            </DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-semibold text-foreground">{selectedAppointment.title}</p>
                </div>
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground">Prix</p>
                  <p className="font-semibold text-foreground">
                    {selectedAppointment.price !== null ? `${selectedAppointment.price}€` : "-"}
                  </p>
                </div>
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground">Rendez-vous</p>
                  <p className="font-semibold text-foreground">
                    {selectedAppointment.rendezvousDate
                      ? new Date(selectedAppointment.rendezvousDate).toLocaleDateString("fr-FR")
                      : "-"}
                  </p>
                </div>
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground">Date Tunisie</p>
                  <p className="font-semibold text-foreground">
                    {selectedAppointment.tunisDate
                      ? new Date(selectedAppointment.tunisDate).toLocaleDateString("fr-FR")
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-secondary rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Statut</p>
                <Badge className={getAppointmentBadgeClass(selectedAppointment.status)}>
                  {getAppointmentStatusLabel(selectedAppointment.status)}
                </Badge>
              </div>

              {selectedAppointment.notes && (
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Note</p>
                  <p className="text-foreground">{selectedAppointment.notes}</p>
                </div>
              )}

              {selectedAppointment.message && (
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Message initial</p>
                  <p className="text-foreground">{selectedAppointment.message}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentsSection;
