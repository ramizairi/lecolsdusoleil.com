import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  ClipboardList, 
  FileText, 
  User, 
  Settings, 
  LogOut,
  Bell,
  Clock,
  CreditCard,
  CheckCircle2,
  Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.png";
import ProfileSection from "@/components/dashboard/ProfileSection";
import SettingsSection from "@/components/dashboard/SettingsSection";
import AppointmentsSection from "@/components/dashboard/AppointmentsSection";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Tableau de bord", icon: ClipboardList },
    { id: "appointments", label: "Mes rendez-vous", icon: Calendar },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "profile", label: "Mon profil", icon: User },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  const upcomingAppointments = [
    { date: "20 Jan 2025", time: "10:00", service: "Consultation initiale", status: "approved", price: 80 },
    { date: "25 Jan 2025", time: "14:30", service: "Suivi thérapeutique", status: "pending", price: 60 },
    { date: "15 Jan 2025", time: "09:00", service: "Bilan complet", status: "paid", price: 150 },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "En attente", color: "bg-amber-100 text-amber-800", icon: Timer };
      case "approved":
        return { label: "À payer", color: "bg-blue-100 text-blue-800", icon: CreditCard };
      case "paid":
        return { label: "Confirmé", color: "bg-green-100 text-green-800", icon: CheckCircle2 };
      default:
        return { label: status, color: "bg-gray-100 text-gray-800", icon: Clock };
    }
  };

  return (
    <>
      <Helmet>
        <title>Tableau de bord - Clos du Soleil</title>
        <meta name="description" content="Gérez vos rendez-vous, traitements et informations personnelles sur votre espace client Clos du Soleil." />
      </Helmet>

      <div className="min-h-screen flex bg-background">
        {/* Sidebar */}
        <aside className="w-72 bg-card border-r border-border shadow-soft flex flex-col">
          <div className="p-6 border-b border-border">
            <Link to="/">
              <img src={logo} alt="Clos du Soleil" className="h-12 w-auto" />
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
            <Link to="/">
              <Button variant="outline" className="w-full gap-3">
                <LogOut className="w-5 h-5" />
                Déconnexion
              </Button>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="h-20 bg-card border-b border-border flex items-center justify-between px-8">
            <div>
              <h1 className="font-serif text-accessible-2xl font-bold text-foreground">
                Bienvenue, Jean Dupont
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
                JD
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="flex-1 p-8 overflow-auto">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="hover:shadow-elevated transition-shadow">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-sunset flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-accessible-3xl font-bold text-foreground">3</p>
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
                        <p className="text-accessible-3xl font-bold text-foreground">1</p>
                        <p className="text-muted-foreground text-accessible-base">Paiement en attente</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-elevated transition-shadow">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-sunset flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-accessible-3xl font-bold text-foreground">12</p>
                        <p className="text-muted-foreground text-accessible-base">Séances complétées</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Upcoming Appointments */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        <Calendar className="w-7 h-7 text-primary" />
                        Prochains rendez-vous
                      </CardTitle>
                      <CardDescription>Vos réservations à venir</CardDescription>
                    </div>
                    <Link to="/contact">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Calendar className="w-4 h-4" />
                        Nouveau RDV
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingAppointments.map((apt, index) => {
                      const statusConfig = getStatusConfig(apt.status);
                      const StatusIcon = statusConfig.icon;
                      
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-5 bg-secondary rounded-xl"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-card flex items-center justify-center border border-border">
                              <Clock className="w-7 h-7 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-accessible-lg text-foreground">{apt.service}</p>
                              <p className="text-muted-foreground text-accessible-base">{apt.date} à {apt.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge className={statusConfig.color}>
                              <StatusIcon className="w-4 h-4 mr-1" />
                              {statusConfig.label}
                            </Badge>
                            <p className="font-bold text-foreground">{apt.price}€</p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

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
                        <div>
                          <p className="font-semibold text-foreground">Consultation initiale</p>
                          <p className="text-sm text-muted-foreground">20 Jan 2025 - 10:00</p>
                        </div>
                        <Button size="sm" className="gap-2">
                          <CreditCard className="w-4 h-4" />
                          Payer 80€
                        </Button>
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
                      <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Rendez-vous confirmé</p>
                          <p className="text-xs text-muted-foreground">Bilan complet - 15 Jan 2025</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                        <Timer className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">En attente de validation</p>
                          <p className="text-xs text-muted-foreground">Suivi thérapeutique - 25 Jan 2025</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "profile" && <ProfileSection />}

            {activeTab === "settings" && <SettingsSection />}

            {activeTab === "appointments" && <AppointmentsSection />}

            {activeTab === "documents" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary" />
                    Documents
                  </CardTitle>
                  <CardDescription>
                    Vos documents et factures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Aucun document disponible</p>
                    <p className="text-sm mt-2">Vos factures apparaîtront ici après paiement</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
