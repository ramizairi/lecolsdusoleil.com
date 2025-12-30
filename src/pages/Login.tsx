import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login (would connect to backend)
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Connexion réussie!",
          description: "Bienvenue dans votre espace client.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Connexion - Clos du Soleil</title>
        <meta name="description" content="Connectez-vous à votre espace client Clos du Soleil pour accéder à vos informations personnelles et suivre vos traitements." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 flex items-center justify-center py-32 px-6">
          <Card className="w-full max-w-lg shadow-elevated animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-accessible-3xl">
                Connexion
              </CardTitle>
              <CardDescription className="text-accessible-lg">
                Accédez à votre espace personnel
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Adresse e-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-accessible-lg"
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
                      type={showPassword ? "text" : "password"}
                      placeholder="Votre mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-accessible-lg pr-14"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link 
                    to="/forgot-password" 
                    className="text-accessible-base text-primary hover:underline"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  variant="accessible" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>

                <div className="text-center pt-4 border-t border-border">
                  <p className="text-accessible-base text-muted-foreground">
                    Pas encore de compte?{" "}
                    <Link to="/register" className="text-primary font-semibold hover:underline">
                      Créer un compte
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

export default Login;
