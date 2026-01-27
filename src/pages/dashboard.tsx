import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  Calendar,
  ClipboardList,
  User,
  Settings,
  LogOut,
  Bell,
  CreditCard,
  CheckCircle2,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/logo.png";
import Seo from "@/components/Seo";
import ProfileSection from "@/components/dashboard/ProfileSection";
import SettingsSection from "@/components/dashboard/SettingsSection";
import AppointmentsSection from "@/components/dashboard/AppointmentsSection";
import { useToast } from "@/hooks/use-toast";
import { getAppointmentStatusLabel, type AppointmentStatus } from "@/lib/appointments";

type AppointmentSummary = {
  id: string;
  title: string;
  status: AppointmentStatus;
  price: number | null;
  rendezvousDate: string | null;
  createdAt: string;
  updatedAt: string;
};

type ProfileSummary = {
  firstName: string;
  lastName: string;
  email: string;
};

const Dashboard = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState<ProfileSummary | null>(null);
  const [appointments, setAppointments] = useState<AppointmentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const menuItems = [
    { id: "overview", label: "Tableau de bord", icon: ClipboardList },
    { id: "appointments", label: "Mes rendez-vous", icon: Calendar },
    { id: "profile", label: "Mon profil", icon: User },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  const loadDashboard = async () => {
    setIsLoading(true);
    try {
      const [meResponse, appointmentResponse] = await Promise.all([
        fetch("/api/me", { credentials: "include" }),
        fetch("/api/me/appointments", { credentials: "include" }),
      ]);

      if (meResponse.status === 401 || appointmentResponse.status === 401) {
        router.push("/login");
        return;
      }

      const meData = await meResponse.json().catch(() => null);
      const appointmentData = await appointmentResponse.json().catch(() => null);

      if (!meResponse.ok) {
        throw new Error(meData?.error?.message ?? "Chargement impossible");
      }

      if (!appointmentResponse.ok) {
        throw new Error(appointmentData?.error?.message ?? "Chargement impossible");
      }

      setProfile(meData.data.profile);
      setAppointments(appointmentData.data.appointments ?? []);
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
    loadDashboard();
  }, []);

  const totalAppointments = appointments.length;
  const pendingPayments = appointments.filter((apt) => apt.status === "payement").length;
  const upcomingPayment = appointments.find((apt) => apt.status === "payement" && apt.price !== null) ?? null;

  const recentUpdates = useMemo(() => {
    return [...appointments]
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, 2);
  }, [appointments]);

  const fullName = profile ? `${profile.firstName} ${profile.lastName}`.trim() : "";
  const initials = profile ? `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase() : "--";

  return (
    <>
      <Seo
        title="Tableau de bord - Clos du Soleil"
        description="Gérez vos rendez-vous, traitements et informations personnelles sur votre espace client Clos du Soleil."
        noindex
      />

      <div className="min-h-screen flex bg-background">
        {/* Sidebar */}
        <aside className="w-72 bg-card border-r border-border shadow-soft flex flex-col">
          <div className="p-6 border-b border-border">
            <Link href="/">
              <img src={logo.src} alt="Clos du Soleil" className="h-12 w-auto" />
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-accessible-base font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-gradient-sunset text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="w-6 h-6" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <Button asChild variant="outline" className="w-full gap-3">
              <Link href="/">
                <LogOut className="w-5 h-5" />
                Déconnexion
              </Link>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="h-20 bg-card border-b border-border flex items-center justify-between px-8">
            <div>
              <h1 className="font-serif text-accessible-2xl font-bold text-foreground">
                {fullName ? `Bienvenue, ${fullName}` : "Bienvenue"}
              </h1>
              <p className="text-muted-foreground text-accessible-base">
                Votre espace personnel
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-3 rounded-xl bg-secondary hover:bg-accent transition-colors">
                <Bell className="w-6 h-6 text-foreground" />
                <span className="absolute top-1 right-1 w-3 h-3 bg-primary rounded-full" />
              </button>
              <div className="w-12 h-12 rounded-full bg-gradient-sunset flex items-center justify-center text-primary-foreground font-bold text-accessible-lg">
                {initials || "--"}
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="flex-1 p-8 overflow-auto">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-elevated transition-shadow">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-sunset flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-accessible-3xl font-bold text-foreground">
                          {isLoading ? "-" : totalAppointments}
                        </p>
                        <p className="text-muted-foreground text-accessible-base">Rendez-vous à venir</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-elevated transition-shadow">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-sunset flex items-center justify-center">
                        <CreditCard className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-accessible-3xl font-bold text-foreground">
                          {isLoading ? "-" : pendingPayments}
                        </p>
                        <p className="text-muted-foreground text-accessible-base">Paiement en attente</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-elevated transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <CreditCard className="w-6 h-6 text-primary" />
                        Paiements en attente
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        {upcomingPayment ? (
                          <>
                            <div>
                              <p className="font-semibold text-foreground">{upcomingPayment.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {upcomingPayment.rendezvousDate
                                  ? new Date(upcomingPayment.rendezvousDate).toLocaleDateString("fr-FR")
                                  : "Date a confirmer"}
                              </p>
                            </div>
                            <Button size="sm" className="gap-2" onClick={() => setActiveTab("appointments")}>
                              <CreditCard className="w-4 h-4" />
                              Payer {upcomingPayment.price}€
                            </Button>
                          </>
                        ) : (
                          <div className="text-sm text-muted-foreground">Aucun paiement en attente.</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-elevated transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <Bell className="w-6 h-6 text-primary" />
                        Notifications récentes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {recentUpdates.length === 0 ? (
                        <div className="text-sm text-muted-foreground">Aucune notification recente.</div>
                      ) : (
                        recentUpdates.map((appointment) => {
                          const StatusIcon =
                            appointment.status === "completed"
                              ? CheckCircle2
                              : appointment.status === "payement"
                                ? CreditCard
                                : appointment.status === "rendezvous"
                                  ? Calendar
                                  : Timer;

                          const iconColor =
                            appointment.status === "completed"
                              ? "text-green-600"
                              : appointment.status === "payement"
                                ? "text-purple-600"
                                : appointment.status === "rendezvous"
                                  ? "text-blue-600"
                                  : "text-amber-600";

                          return (
                            <div key={appointment.id} className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                              <StatusIcon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {getAppointmentStatusLabel(appointment.status)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {appointment.title} •{" "}
                                  {appointment.updatedAt
                                    ? new Date(appointment.updatedAt).toLocaleDateString("fr-FR")
                                    : "-"}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "profile" && <ProfileSection />}

            {activeTab === "settings" && <SettingsSection />}

            {activeTab === "appointments" && <AppointmentsSection />}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
