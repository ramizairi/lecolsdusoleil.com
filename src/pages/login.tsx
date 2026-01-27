import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedBackground from "@/components/AnimatedBackground";
import Seo from "@/components/Seo";
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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        toast({
          title: "Connexion impossible",
          description: data?.error?.message ?? "Email ou mot de passe incorrect.",
          variant: "destructive",
        });
        return;
      }

      if (data?.data?.mustChangePassword) {
        toast({
          title: "Mot de passe temporaire",
          description: "Pour votre securite, changez votre mot de passe des votre premiere connexion.",
        });
      }

      toast({
        title: "Connexion reussie !",
        description: "Bienvenue dans votre espace client.",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Connexion impossible",
        description: "Impossible de joindre le serveur. Reessayez plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Connexion - Clos du Soleil"
        description="Connectez-vous à votre espace client Clos du Soleil pour accéder à vos informations personnelles."
        noindex
      />

      <div className="min-h-screen flex flex-col">
        <AnimatedBackground variant="minimal" />
        <PageHeader />

        <main className="flex-1 flex items-center justify-center py-32 px-6">
          <Card 
            className="w-full max-w-lg shadow-elevated animate-fade-up opacity-0 border-border/50 overflow-hidden" 
            style={{ animationFillMode: "forwards" }}
          >
            {/* Decorative top gradient */}
            <div className="h-1 bg-gradient-sunset" />
            
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-3xl font-serif">
                Connexion
              </CardTitle>
              <CardDescription className="text-base">
                Accédez à votre espace personnel
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="flex items-center gap-2 text-base">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    Adresse e-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-base py-6 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="flex items-center gap-2 text-base">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-primary" />
                    </div>
                    Mot de passe
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Votre mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-base py-6 pr-14 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-1"
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Mot de passe oublié?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="group w-full py-7 text-lg rounded-xl bg-gradient-sunset hover:opacity-90 gap-3 shadow-elevated transition-all duration-300 hover:scale-[1.01]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Connexion en cours..."
                  ) : (
                    <>
                      Se connecter
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <div className="text-center pt-4 border-t border-border">
                  <p className="text-muted-foreground flex items-center justify-center gap-2">
                    <User className="w-4 h-4" />
                    Pas encore de compte?{" "}
                    <Link href="/contact" className="text-primary font-semibold hover:underline">
                      Prenez rendez-vous
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
