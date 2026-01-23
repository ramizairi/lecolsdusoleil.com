import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  CreditCard, 
  Eye,
  History,
  Plus,
  ArrowRight,
  Ban,
  Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

type AppointmentStatus = "pending" | "approved" | "rejected" | "paid" | "completed" | "cancelled";

interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  price: number;
  status: AppointmentStatus;
  note?: string;
}

const AppointmentsSection = () => {
  const { toast } = useToast();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      date: "2025-01-20",
      time: "10:00",
      service: "Consultation initiale",
      price: 80,
      status: "approved",
      note: "Votre rendez-vous a été approuvé. Veuillez procéder au paiement."
    },
    {
      id: "2",
      date: "2025-01-25",
      time: "14:30",
      service: "Suivi thérapeutique",
      price: 60,
      status: "pending",
      note: "En attente de validation par le gestionnaire."
    },
    {
      id: "3",
      date: "2025-01-15",
      time: "09:00",
      service: "Bilan complet",
      price: 150,
      status: "paid",
    },
    {
      id: "4",
      date: "2025-01-10",
      time: "11:00",
      service: "Consultation générale",
      price: 80,
      status: "completed",
    },
    {
      id: "5",
      date: "2025-01-05",
      time: "16:00",
      service: "Suivi thérapeutique",
      price: 60,
      status: "rejected",
      note: "Le créneau n'est plus disponible. Veuillez choisir une autre date."
    },
    {
      id: "6",
      date: "2024-12-20",
      time: "10:00",
      service: "Consultation initiale",
      price: 80,
      status: "cancelled",
      note: "Annulé par le client."
    },
  ]);

  const getStatusConfig = (status: AppointmentStatus) => {
    switch (status) {
      case "pending":
        return {
          label: "En attente",
          color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
          icon: Timer,
          step: 1,
        };
      case "approved":
        return {
          label: "Approuvé - Paiement requis",
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
          icon: CreditCard,
          step: 2,
        };
      case "rejected":
        return {
          label: "Refusé",
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
          icon: XCircle,
          step: 0,
        };
      case "paid":
        return {
          label: "Payé - Confirmé",
          color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
          icon: CheckCircle2,
          step: 3,
        };
      case "completed":
        return {
          label: "Terminé",
          color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
          icon: CheckCircle2,
          step: 4,
        };
      case "cancelled":
        return {
          label: "Annulé",
          color: "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-500",
          icon: Ban,
          step: 0,
        };
    }
  };

  const handlePayment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowPaymentDialog(true);
  };

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsDialog(true);
  };

  const processPayment = () => {
    if (selectedAppointment) {
      setAppointments(apps =>
        apps.map(app =>
          app.id === selectedAppointment.id ? { ...app, status: "paid" as AppointmentStatus } : app
        )
      );
      setShowPaymentDialog(false);
      toast({
        title: "Paiement réussi",
        description: "Votre rendez-vous est maintenant confirmé.",
      });
    }
  };

  const activeAppointments = appointments.filter(
    apt => ["pending", "approved", "paid"].includes(apt.status)
  );

  const historyAppointments = appointments.filter(
    apt => ["completed", "rejected", "cancelled"].includes(apt.status)
  );

  const renderProgressSteps = (currentStep: number) => {
    const steps = [
      { num: 1, label: "Réservation" },
      { num: 2, label: "Validation" },
      { num: 3, label: "Paiement" },
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
                {currentStep > step.num ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  step.num
                )}
              </div>
              <span className={`text-xs mt-2 ${currentStep >= step.num ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-3 rounded-full ${currentStep > step.num ? "bg-primary" : "bg-secondary"}`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* New Appointment Button */}
      <div className="flex justify-end">
        <Button asChild className="gap-2">
          <Link href="/contact">
            <Plus className="w-5 h-5" />
            Nouveau rendez-vous
          </Link>
        </Button>
      </div>

      {/* Active Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            Rendez-vous en cours
          </CardTitle>
          <CardDescription>
            Vos réservations actives et leur statut
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {activeAppointments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Aucun rendez-vous en cours</p>
              <Button asChild className="mt-4 gap-2">
                <Link href="/contact">
                  <Plus className="w-4 h-4" />
                  Prendre rendez-vous
                </Link>
              </Button>
            </div>
          ) : (
            activeAppointments.map((appointment) => {
              const statusConfig = getStatusConfig(appointment.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={appointment.id}
                  className="p-6 bg-secondary rounded-2xl space-y-4"
                >
                  {/* Progress Steps */}
                  {renderProgressSteps(statusConfig.step)}

                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-card flex items-center justify-center border border-border">
                        <Clock className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">
                          {appointment.service}
                        </h3>
                        <p className="text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-muted-foreground">à {appointment.time}</p>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <Badge className={statusConfig.color}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {statusConfig.label}
                      </Badge>
                      <p className="text-xl font-bold text-foreground">
                        {appointment.price}€
                      </p>
                    </div>
                  </div>

                  {appointment.note && (
                    <div className="flex items-start gap-2 p-3 bg-card rounded-lg border border-border">
                      <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{appointment.note}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => handleViewDetails(appointment)}
                    >
                      <Eye className="w-4 h-4" />
                      Détails
                    </Button>
                    {appointment.status === "approved" && (
                      <Button
                        className="gap-2 flex-1"
                        onClick={() => handlePayment(appointment)}
                      >
                        <CreditCard className="w-4 h-4" />
                        Payer maintenant
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

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <History className="w-6 h-6 text-primary" />
            Historique des rendez-vous
          </CardTitle>
          <CardDescription>
            Vos rendez-vous passés
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {historyAppointments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucun historique disponible</p>
            </div>
          ) : (
            historyAppointments.map((appointment) => {
              const statusConfig = getStatusConfig(appointment.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-secondary rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center border border-border">
                      <StatusIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{appointment.service}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(appointment.date).toLocaleDateString("fr-FR")} à {appointment.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={statusConfig.color}>
                      {statusConfig.label}
                    </Badge>
                    <p className="font-semibold text-foreground">{appointment.price}€</p>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Paiement du rendez-vous
            </DialogTitle>
            <DialogDescription>
              Confirmez le paiement pour valider votre rendez-vous
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-secondary rounded-xl space-y-2">
                <p className="font-semibold text-foreground">{selectedAppointment.service}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedAppointment.date).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })} à {selectedAppointment.time}
                </p>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-sunset rounded-xl text-primary-foreground">
                <span className="font-medium">Total à payer</span>
                <span className="text-2xl font-bold">{selectedAppointment.price}€</span>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Le paiement sera sécurisé par Stripe
              </p>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Annuler
            </Button>
            <Button onClick={processPayment} className="gap-2">
              <CreditCard className="w-4 h-4" />
              Payer {selectedAppointment?.price}€
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Détails du rendez-vous
            </DialogTitle>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p className="font-semibold text-foreground">{selectedAppointment.service}</p>
                </div>
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground">Prix</p>
                  <p className="font-semibold text-foreground">{selectedAppointment.price}€</p>
                </div>
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date(selectedAppointment.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground">Heure</p>
                  <p className="font-semibold text-foreground">{selectedAppointment.time}</p>
                </div>
              </div>

              <div className="p-4 bg-secondary rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Statut</p>
                <Badge className={getStatusConfig(selectedAppointment.status).color}>
                  {getStatusConfig(selectedAppointment.status).label}
                </Badge>
              </div>

              {selectedAppointment.note && (
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Note</p>
                  <p className="text-foreground">{selectedAppointment.note}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentsSection;
