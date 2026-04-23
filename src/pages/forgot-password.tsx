import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        toast({
          title: "Demande impossible",
          description: data?.error?.message ?? "Impossible de traiter la demande pour le moment.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Demande envoyée",
        description: data?.message ?? "Si un compte existe, vous recevrez un email.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Demande impossible",
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
        title="Mot de passe oublie - Clos du Soleil"
        description="Recevez un nouveau mot de passe temporaire pour acceder a votre espace client Clos du Soleil."
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
            <div className="h-1 bg-gradient-sunset" />

            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-3xl font-serif">Mot de passe oublie</CardTitle>
              <CardDescription className="text-base">
                Saisissez votre email pour recevoir un mot de passe temporaire.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-xl border border-border bg-card/60 p-4">
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    Pour des raisons de securite, un nouveau mot de passe temporaire vous sera envoye si le compte
                    existe.
                  </p>
                </div>

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

                <Button
                  type="submit"
                  className="group w-full py-7 text-lg rounded-xl bg-gradient-sunset hover:opacity-90 gap-3 shadow-elevated transition-all duration-300 hover:scale-[1.01]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      Envoyer un nouveau mot de passe
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <div className="text-center pt-4 border-t border-border">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour a la connexion
                  </Link>
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

export default ForgotPasswordPage;
