import { useEffect, useMemo, useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string | null;
  createdAt: string;
  emailVerified: boolean;
}

const ProfileSection = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [stats, setStats] = useState({ appointmentsTotal: 0 });
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editedProfile, setEditedProfile] = useState<ProfileData | null>(null);

  const loadProfile = async () => {
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

      if (!data?.data?.profile) {
        throw new Error("Reponse invalide");
      }

      setProfile(data.data.profile);
      setEditedProfile(data.data.profile);
      setStats(data.data.stats ?? { appointmentsTotal: 0 });
    } catch (error) {
      toast({
        title: "Chargement impossible",
        description: "Impossible de charger votre profil. Reessayez.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSave = async () => {
    if (!editedProfile) {
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/me/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName: editedProfile.firstName,
          lastName: editedProfile.lastName,
          phone: editedProfile.phone,
          address: editedProfile.address,
          birthDate: editedProfile.birthDate ?? "",
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(data?.error?.message ?? "Mise a jour impossible");
      }

      setProfile((current) => (current ? { ...current, ...data.data.profile } : data.data.profile));
      setEditedProfile((current) => (current ? { ...current, ...data.data.profile } : data.data.profile));
      setIsEditing(false);
      toast({
        title: "Profil mis a jour",
        description: "Vos informations ont ete enregistrees avec succes.",
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

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const profileFields = [
    { key: "firstName", label: "Prenom", icon: User, type: "text", editable: true },
    { key: "lastName", label: "Nom", icon: User, type: "text", editable: true },
    { key: "email", label: "Email", icon: Mail, type: "email", editable: false },
    { key: "phone", label: "Telephone", icon: Phone, type: "tel", editable: true },
    { key: "address", label: "Adresse", icon: MapPin, type: "text", editable: true },
    { key: "birthDate", label: "Date de naissance", icon: Calendar, type: "date", editable: true },
  ];

  const memberSinceLabel = useMemo(() => {
    if (!profile?.createdAt) {
      return "";
    }
    return new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(
      new Date(profile.createdAt),
    );
  }, [profile?.createdAt]);

  const membershipYearsLabel = useMemo(() => {
    if (!profile?.createdAt) {
      return "";
    }
    const createdAt = new Date(profile.createdAt);
    const diffYears = Math.max(0, new Date().getFullYear() - createdAt.getFullYear());
    if (diffYears < 1) {
      return "Moins d'un an";
    }
    return diffYears === 1 ? "1 an" : `${diffYears} ans`;
  }, [profile?.createdAt]);

  if (isLoading || !profile || !editedProfile) {
    return (
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Chargement du profil...</CardTitle>
            <CardDescription>Merci de patienter.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-24 rounded-xl bg-secondary animate-pulse" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-sunset relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-2xl bg-card border-4 border-background flex items-center justify-center shadow-elevated">
              <span className="text-3xl font-bold text-primary">
                {profile.firstName?.[0] ?? ""}{profile.lastName?.[0] ?? ""}
              </span>
            </div>
          </div>
        </div>
        <CardContent className="pt-16 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-accessible-2xl font-bold text-foreground">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-muted-foreground text-accessible-base mt-1">
                Membre depuis {memberSinceLabel || "-"}
              </p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
                <Edit3 className="w-4 h-4" />
                Modifier
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2" disabled={isSaving}>
                  <Save className="w-4 h-4" />
                  {isSaving ? "Enregistrement..." : "Enregistrer"}
                </Button>
                <Button onClick={handleCancel} variant="outline" className="gap-2">
                  <X className="w-4 h-4" />
                  Annuler
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <User className="w-6 h-6 text-primary" />
            Informations personnelles
          </CardTitle>
          <CardDescription>
            Gérez vos informations de profil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {profileFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <field.icon className="w-4 h-4" />
                  {field.label}
                </Label>
                {isEditing ? (
                  field.editable ? (
                    <Input
                      type={field.type}
                      value={
                        field.key === "birthDate"
                          ? editedProfile.birthDate ?? ""
                          : (editedProfile[field.key as keyof ProfileData] as string)
                      }
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          [field.key]: e.target.value,
                        })
                      }
                      className="bg-secondary"
                    />
                  ) : (
                    <p className="py-3 px-4 bg-secondary rounded-lg text-foreground text-accessible-base">
                      {String(profile[field.key as keyof ProfileData] ?? "")}
                    </p>
                  )
                ) : (
                  <p className="py-3 px-4 bg-secondary rounded-lg text-foreground text-accessible-base">
                    {field.type === "date" && profile[field.key as keyof ProfileData]
                      ? new Date(profile[field.key as keyof ProfileData] as string).toLocaleDateString("fr-FR")
                      : (profile[field.key as keyof ProfileData] as string) || "-"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center hover:shadow-elevated transition-shadow">
          <CardContent className="pt-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-sunset mx-auto flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-accessible-3xl font-bold text-foreground">{stats.appointmentsTotal}</p>
            <p className="text-muted-foreground text-accessible-base">Rendez-vous total</p>
          </CardContent>
        </Card>
        
        <Card className="text-center hover:shadow-elevated transition-shadow">
          <CardContent className="pt-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-sunset mx-auto flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-accessible-3xl font-bold text-foreground">{membershipYearsLabel || "0 an"}</p>
            <p className="text-muted-foreground text-accessible-base">Membre actif</p>
          </CardContent>
        </Card>
        
        <Card className="text-center hover:shadow-elevated transition-shadow">
          <CardContent className="pt-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-sunset mx-auto flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-accessible-3xl font-bold text-foreground">
              {profile.emailVerified ? "Verifie" : "En attente"}
            </p>
            <p className="text-muted-foreground text-accessible-base">Compte email</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSection;
