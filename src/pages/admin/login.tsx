import { useState } from "react";
import { useRouter } from "next/router";
import { Lock, Mail, ShieldCheck, KeyRound } from "lucide-react";
import Seo from "@/components/Seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error?.message ?? "Connexion impossible");
      }

      toast({
        title: "OTP envoye",
        description: "Veuillez saisir le code a 4 chiffres recu par email.",
      });
      setStep("otp");
    } catch (error) {
      toast({
        title: "Connexion impossible",
        description: error instanceof Error ? error.message : "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error?.message ?? "Code invalide");
      }

      toast({
        title: "Connexion admin reussie",
        description: "Bienvenue sur le tableau de bord.",
      });
      router.push("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Code invalide",
        description: error instanceof Error ? error.message : "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Admin - Connexion"
        description="Connexion administrateur Clos du Soleil"
        noindex
      />

      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <Card className="w-full max-w-md shadow-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif flex items-center justify-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              Acces administrateur
            </CardTitle>
            <CardDescription>
              {step === "credentials"
                ? "Entrez vos identifiants"
                : "Saisissez le code OTP recu par email"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "credentials" ? (
              <form onSubmit={handleCredentials} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email admin
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Connexion..." : "Continuer"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtp} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4" />
                    Code OTP
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="0000"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Verification..." : "Valider"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setStep("credentials")}
                  >
                    Revenir aux identifiants
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminLogin;
