import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      toast({
        title: "Compte créé!",
        description: "Bienvenue chez Clos du Soleil. Vous pouvez maintenant vous connecter.",
      });
      router.push("/login");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Créer un compte - Clos du Soleil</title>
        <meta name="description" content="Créez votre compte Clos du Soleil pour accéder à nos services de soins personnalisés pour seniors." />
      </Head>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 flex items-center justify-center py-32 px-6">
          <Card className="w-full max-w-lg shadow-elevated animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-accessible-3xl">
                Créer un compte
              </CardTitle>
              <CardDescription className="text-accessible-lg">
                Rejoignez notre communauté
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Prénom
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Jean"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Dupont"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Adresse e-mail
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Téléphone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Mot de passe
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimum 8 caractères"
                      value={formData.password}
                      onChange={handleChange}
                      className="pr-14"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Répétez votre mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    minLength={8}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="accessible" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Création en cours..." : "Créer mon compte"}
                </Button>

                <div className="text-center pt-4 border-t border-border">
                  <p className="text-accessible-base text-muted-foreground">
                    Déjà un compte?{" "}
                    <Link href="/login" className="text-primary font-semibold hover:underline">
                      Se connecter
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Register;
