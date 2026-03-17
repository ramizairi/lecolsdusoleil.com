import { useState } from "react";
import { Phone, Send } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import PageIntroSection from "@/components/PageIntroSection";
import Seo from "@/components/Seo";
import ServiceSiteHeader from "@/components/ServiceSiteHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        toast({
          title: "Envoi impossible",
          description:
            data?.error?.message ?? "Une erreur est survenue. Reessayez.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Demande envoyee !",
        description:
          data?.message ?? "Nous vous contacterons tres bientot.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast({
        title: "Connexion impossible",
        description: "Impossible de joindre le serveur. Reessayez plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Contactez-nous - Clos du Soleil"
        description="Contactez Clos du Soleil pour organiser votre séjour ou demander un rendez-vous."
        canonicalPath="/contact"
      />

      <div className="relative min-h-screen overflow-x-hidden bg-background">
        <AnimatedBackground variant="sunrise" />

        <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
          <div className="absolute left-1/2 top-32 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-amber-300/14 blur-3xl" />
          <div className="absolute -left-20 top-[30rem] h-80 w-80 rounded-full bg-orange-200/16 blur-3xl" />
          <div className="absolute bottom-[-10rem] right-[-6rem] h-[24rem] w-[24rem] rounded-full bg-yellow-200/18 blur-3xl" />
        </div>

        <ServiceSiteHeader activeKey="contact" logoMode="always" />

        <main className="relative z-10">
          <PageIntroSection
            label="Contact"
            title="Contactez-nous"
            icon={<Phone className="h-4 w-4" />}
          />

          <section className="px-6 pb-10 md:pb-14">
            <div className="container mx-auto max-w-4xl">
              <div
                className="animate-fade-up opacity-0"
                style={{ animationDelay: "80ms", animationFillMode: "forwards" }}
              >
                <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.94)_0%,rgba(255,249,242,0.9)_55%,rgba(255,246,236,0.98)_100%)] px-6 py-8 text-center shadow-[0_26px_70px_rgba(116,84,43,0.1)] ring-1 ring-white/80 md:px-10 md:py-10">
                  <div className="pointer-events-none absolute left-0 top-0 h-44 w-44 rounded-full bg-amber-200/20 blur-3xl" />
                  <div className="pointer-events-none absolute right-[-2rem] top-4 h-40 w-40 rounded-full bg-orange-200/18 blur-3xl" />

                  <div className="relative">
                    <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
                    <p className="mt-5 text-lg leading-relaxed text-foreground/72 md:text-xl">
                      Un premier échange simple pour comprendre votre besoin et
                      vous orienter vers la formule la plus adaptée.
                    </p>
                    <a
                      href="tel:+3228860614"
                      className="mt-7 inline-flex items-center gap-3 rounded-full bg-gradient-sunset px-7 py-4 text-lg font-semibold text-primary-foreground shadow-elevated transition-all duration-300 hover:-translate-y-1"
                    >
                      <Phone className="h-5 w-5" />
                      Appelez-nous
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative px-6 pb-20 pt-2 md:pb-24">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-[8%] top-16 h-64 w-64 rounded-full bg-amber-200/18 blur-3xl" />
              <div className="absolute right-[10%] top-24 h-72 w-72 rounded-full bg-orange-200/16 blur-3xl" />
              <div className="absolute bottom-8 left-1/2 h-40 w-[34rem] -translate-x-1/2 bg-[radial-gradient(circle,rgba(251,191,36,0.14)_0%,rgba(251,191,36,0)_72%)] blur-3xl" />
            </div>

            <div className="container relative mx-auto max-w-2xl">
              <Card
                className="relative animate-fade-up overflow-hidden border-white/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.95)_0%,rgba(255,249,242,0.9)_55%,rgba(255,246,236,0.98)_100%)] opacity-0 shadow-[0_30px_80px_rgba(116,84,43,0.12)] ring-1 ring-white/80"
                style={{ animationDelay: "140ms", animationFillMode: "forwards" }}
              >
                <div className="h-1 bg-gradient-sunset" />
                <div className="pointer-events-none absolute -left-10 top-10 h-52 w-52 rounded-full bg-amber-200/24 blur-3xl" />
                <div className="pointer-events-none absolute right-[-3rem] bottom-0 h-64 w-64 rounded-full bg-orange-200/18 blur-3xl" />
                <div className="pointer-events-none absolute inset-x-10 top-0 h-28 bg-[radial-gradient(circle,rgba(255,255,255,0.84)_0%,rgba(255,255,255,0)_72%)] blur-2xl" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, rgba(145, 92, 29, 0.7) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <CardHeader className="relative pb-2 text-center">
                  <CardTitle className="font-serif text-2xl text-warm-brown">
                    Prendre rendez-vous
                  </CardTitle>
                  <CardDescription className="text-base text-foreground/68">
                    Laissez vos coordonnées, nous vous contacterons
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-medium text-warm-brown">
                        Votre nom
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="rounded-xl border-2 border-white/70 bg-white/88 py-6 text-base shadow-soft transition-colors focus-visible:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium text-warm-brown">
                        Votre email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="rounded-xl border-2 border-white/70 bg-white/88 py-6 text-base shadow-soft transition-colors focus-visible:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base font-medium text-warm-brown">
                        Votre numéro de téléphone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="rounded-xl border-2 border-white/70 bg-white/88 py-6 text-base shadow-soft transition-colors focus-visible:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-base font-medium text-warm-brown">
                        Laissez-nous un message, nous vous répondrons rapidement
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        placeholder="Décrivez brièvement votre besoin..."
                        value={formData.message}
                        onChange={handleChange}
                        className="flex w-full resize-none rounded-xl border-2 border-white/70 bg-white/88 px-5 py-4 text-base ring-offset-background shadow-soft transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-gradient-sunset py-7 text-lg shadow-elevated transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
                    >
                      {isSubmitting ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Envoyer
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
