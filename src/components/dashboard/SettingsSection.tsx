import { useEffect, useState } from "react";
import { Settings, Bell, Lock, Globe, Moon, Sun, Shield, Eye, EyeOff, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";

const SettingsSection = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  
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

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/me", { credentials: "include" });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(data?.error?.message ?? "Erreur de chargement");
      }

      if (!data?.data?.settings) {
        throw new Error("Reponse invalide");
      }

      setNotifications(data.data.settings.notifications);
      setPreferences(data.data.settings.preferences);
    } catch (error) {
      toast({
        title: "Chargement impossible",
        description: "Impossible de charger vos parametres. Reessayez.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const saveSettings = async ({
    setLoading,
    successTitle,
    successDescription,
  }: {
    setLoading: (value: boolean) => void;
    successTitle: string;
    successDescription: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/me/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ notifications, preferences }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(data?.error?.message ?? "Mise a jour impossible");
      }

      if (!data?.data) {
        throw new Error("Reponse invalide");
      }

      setNotifications(data.data.notifications);
      setPreferences(data.data.preferences);
      toast({
        title: successTitle,
        description: successDescription,
      });
    } catch (error) {
      toast({
        title: "Mise a jour impossible",
        description: error instanceof Error ? error.message : "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = () =>
    saveSettings({
      setLoading: setIsSaving,
      successTitle: "Preferences enregistrees",
      successDescription: "Vos parametres ont ete mis a jour.",
    });

  const handleSavePreferences = () =>
    saveSettings({
      setLoading: setIsSavingPreferences,
      successTitle: "Preferences enregistrees",
      successDescription: "Vos preferences ont ete mises a jour.",
    });

  const handleSavePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs du mot de passe.",
        variant: "destructive",
      });
      return;
    }

    setIsSavingPassword(true);
    try {
      const response = await fetch("/api/me/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(passwordForm),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(data?.error?.message ?? "Mise a jour impossible");
      }

      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast({
        title: "Mot de passe mis a jour",
        description: "Votre nouveau mot de passe a ete enregistre.",
      });
    } catch (error) {
      toast({
        title: "Mise a jour impossible",
        description: error instanceof Error ? error.message : "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsSavingPassword(false);
    }
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          <Button onClick={handleSaveNotifications} className="w-full gap-2" disabled={isSaving || isLoading}>
            <Save className="w-4 h-4" />
            {isSaving ? "Enregistrement..." : "Enregistrer les preferences"}
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
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
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
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Confirmer le nouveau mot de passe</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="bg-secondary"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
            />
          </div>

          <Button onClick={handleSavePassword} className="w-full gap-2" disabled={isSavingPassword || isLoading}>
            <Shield className="w-4 h-4" />
            {isSavingPassword ? "Mise a jour..." : "Mettre a jour le mot de passe"}
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
              <SelectTrigger className="w-40" disabled={isLoading}>
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
              <SelectTrigger className="w-40" disabled={isLoading}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Clair</SelectItem>
                <SelectItem value="dark">Sombre</SelectItem>
                <SelectItem value="system">Système</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSavePreferences} className="w-full gap-2" disabled={isSavingPreferences || isLoading}>
            <Save className="w-4 h-4" />
            {isSavingPreferences ? "Enregistrement..." : "Enregistrer les preferences"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSection;
