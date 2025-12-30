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
  Heart,
  Pill,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/logo.png";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Tableau de bord", icon: ClipboardList },
    { id: "appointments", label: "Rendez-vous", icon: Calendar },
    { id: "treatments", label: "Mes traitements", icon: Pill },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "profile", label: "Mon profil", icon: User },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  const upcomingAppointments = [
    { date: "15 Jan 2025", time: "10:00", doctor: "Dr. Marie Laurent", type: "Consultation générale" },
    { date: "22 Jan 2025", time: "14:30", doctor: "Dr. Pierre Dumont", type: "Suivi traitement" },
  ];

  const currentTreatments = [
    { name: "Vitamine D", dosage: "1000 UI", frequency: "1 fois par jour" },
    { name: "Omega 3", dosage: "500 mg", frequency: "2 fois par jour" },
  ];

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
                        <p className="text-accessible-3xl font-bold text-foreground">2</p>
                        <p className="text-muted-foreground text-accessible-base">Rendez-vous à venir</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-elevated transition-shadow">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-sunset flex items-center justify-center">
                        <Pill className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-accessible-3xl font-bold text-foreground">2</p>
                        <p className="text-muted-foreground text-accessible-base">Traitements actifs</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-elevated transition-shadow">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-sunset flex items-center justify-center">
                        <Heart className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-accessible-3xl font-bold text-foreground">Bon</p>
                        <p className="text-muted-foreground text-accessible-base">État de santé</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Upcoming Appointments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Calendar className="w-7 h-7 text-primary" />
                      Prochains rendez-vous
                    </CardTitle>
                    <CardDescription>Vos consultations programmées</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingAppointments.map((apt, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-5 bg-secondary rounded-xl"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-card flex items-center justify-center border border-border">
                            <Clock className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-accessible-lg text-foreground">{apt.type}</p>
                            <p className="text-muted-foreground text-accessible-base">{apt.doctor}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-accessible-lg text-foreground">{apt.date}</p>
                          <p className="text-muted-foreground text-accessible-base">{apt.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Current Treatments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Pill className="w-7 h-7 text-primary" />
                      Traitements en cours
                    </CardTitle>
                    <CardDescription>Vos médicaments actuels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentTreatments.map((treatment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-5 bg-secondary rounded-xl"
                      >
                        <div>
                          <p className="font-semibold text-accessible-lg text-foreground">{treatment.name}</p>
                          <p className="text-muted-foreground text-accessible-base">{treatment.dosage}</p>
                        </div>
                        <div className="bg-card px-4 py-2 rounded-lg border border-border">
                          <p className="text-accessible-base text-foreground">{treatment.frequency}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab !== "overview" && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {menuItems.find((item) => item.id === activeTab)?.label}
                  </CardTitle>
                  <CardDescription>
                    Cette section sera bientôt disponible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-accessible-lg">
                    Contenu en cours de développement...
                  </p>
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
