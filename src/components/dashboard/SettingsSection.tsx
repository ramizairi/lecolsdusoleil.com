import { useState } from "react";
import { Settings, Bell, Lock, Globe, Moon, Sun, Shield, Eye, EyeOff, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const SettingsSection = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    appointments: true,
    promotions: false,
  });

  const [preferences, setPreferences] = useState({
    language: "fr",
    theme: "light",
  });

  const handleSavePassword = () => {
    toast({
      title: "Mot de passe mis à jour",
      description: "Votre nouveau mot de passe a été enregistré.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Préférences enregistrées",
      description: "Vos préférences de notification ont été mises à jour.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription>
            Gérez vos préférences de notification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center border border-border">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Notifications par email</p>
                <p className="text-sm text-muted-foreground">Recevoir des alertes par email</p>
              </div>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center border border-border">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Notifications SMS</p>
                <p className="text-sm text-muted-foreground">Recevoir des alertes par SMS</p>
              </div>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center border border-border">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Rappels de rendez-vous</p>
                <p className="text-sm text-muted-foreground">Recevoir des rappels avant vos RDV</p>
              </div>
            </div>
            <Switch
              checked={notifications.appointments}
              onCheckedChange={(checked) => setNotifications({ ...notifications, appointments: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center border border-border">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Offres et promotions</p>
                <p className="text-sm text-muted-foreground">Recevoir nos offres spéciales</p>
              </div>
            </div>
            <Switch
              checked={notifications.promotions}
              onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
            />
          </div>

          <Button onClick={handleSaveNotifications} className="w-full gap-2">
            <Save className="w-4 h-4" />
            Enregistrer les préférences
          </Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-primary" />
            Sécurité
          </CardTitle>
          <CardDescription>
            Modifier votre mot de passe
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Mot de passe actuel</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-secondary pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Nouveau mot de passe</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="bg-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label>Confirmer le nouveau mot de passe</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="bg-secondary"
            />
          </div>

          <Button onClick={handleSavePassword} className="w-full gap-2">
            <Shield className="w-4 h-4" />
            Mettre à jour le mot de passe
          </Button>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-primary" />
            Préférences
          </CardTitle>
          <CardDescription>
            Personnalisez votre expérience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center border border-border">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Langue</p>
                <p className="text-sm text-muted-foreground">Choisir la langue de l'interface</p>
              </div>
            </div>
            <Select
              value={preferences.language}
              onValueChange={(value) => setPreferences({ ...preferences, language: value })}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center border border-border">
                {preferences.theme === "dark" ? (
                  <Moon className="w-6 h-6 text-primary" />
                ) : (
                  <Sun className="w-6 h-6 text-primary" />
                )}
              </div>
              <div>
                <p className="font-semibold text-foreground">Thème</p>
                <p className="text-sm text-muted-foreground">Mode clair ou sombre</p>
              </div>
            </div>
            <Select
              value={preferences.theme}
              onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Clair</SelectItem>
                <SelectItem value="dark">Sombre</SelectItem>
                <SelectItem value="system">Système</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSection;
