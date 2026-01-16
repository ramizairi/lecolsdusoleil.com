import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
}

const ProfileSection = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    address: "123 Rue de la Paix, 75001 Paris",
    birthDate: "1985-03-15",
  });

  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const profileFields = [
    { key: "firstName", label: "Prénom", icon: User, type: "text" },
    { key: "lastName", label: "Nom", icon: User, type: "text" },
    { key: "email", label: "Email", icon: Mail, type: "email" },
    { key: "phone", label: "Téléphone", icon: Phone, type: "tel" },
    { key: "address", label: "Adresse", icon: MapPin, type: "text" },
    { key: "birthDate", label: "Date de naissance", icon: Calendar, type: "date" },
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-sunset relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-2xl bg-card border-4 border-background flex items-center justify-center shadow-elevated">
              <span className="text-3xl font-bold text-primary">
                {profile.firstName[0]}{profile.lastName[0]}
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
                Membre depuis Janvier 2024
              </p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
                <Edit3 className="w-4 h-4" />
                Modifier
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Enregistrer
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
                  <Input
                    type={field.type}
                    value={editedProfile[field.key as keyof ProfileData]}
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
                    {field.type === "date"
                      ? new Date(profile[field.key as keyof ProfileData]).toLocaleDateString("fr-FR")
                      : profile[field.key as keyof ProfileData]}
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
            <p className="text-accessible-3xl font-bold text-foreground">12</p>
            <p className="text-muted-foreground text-accessible-base">Rendez-vous total</p>
          </CardContent>
        </Card>
        
        <Card className="text-center hover:shadow-elevated transition-shadow">
          <CardContent className="pt-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-sunset mx-auto flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-accessible-3xl font-bold text-foreground">1 an</p>
            <p className="text-muted-foreground text-accessible-base">Membre actif</p>
          </CardContent>
        </Card>
        
        <Card className="text-center hover:shadow-elevated transition-shadow">
          <CardContent className="pt-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-sunset mx-auto flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-accessible-3xl font-bold text-foreground">Vérifié</p>
            <p className="text-muted-foreground text-accessible-base">Compte email</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSection;
