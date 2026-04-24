import { useState } from "react";
import { Mail, Send } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const HomeNewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        toast({
          title: "Inscription impossible",
          description:
            data?.error?.message ?? "Une erreur est survenue. Réessayez.",
          variant: "destructive",
        });
        return;
      }

      const description = data?.data?.reactivated
        ? "Votre inscription est réactivée."
        : data?.data?.isNew
          ? "Vous recevrez nos actualités très prochainement."
          : "Vous êtes déjà inscrit(e) à notre newsletter.";

      toast({
        title: data?.message ?? "Merci pour votre inscription !",
        description,
      });
      setEmail("");
    } catch {
      toast({
        title: "Connexion impossible",
        description: "Impossible de joindre le serveur. Réessayez plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="px-3 py-12 sm:px-6 md:py-16"
      aria-labelledby="newsletter-title"
    >
      <div
        className="relative mx-auto max-w-5xl animate-fade-up overflow-hidden rounded-[2.4rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.95)_0%,rgba(255,249,242,0.9)_55%,rgba(255,246,236,0.98)_100%)] px-5 py-8 opacity-0 shadow-[0_26px_70px_rgba(116,84,43,0.1)] ring-1 ring-white/80 sm:px-6 md:px-10 md:py-10"
        style={{ animationFillMode: "forwards" }}
      >
        <div className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="pointer-events-none absolute right-[-3rem] bottom-0 h-56 w-56 rounded-full bg-orange-200/16 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-10 top-0 h-24 bg-[radial-gradient(circle,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0)_72%)] blur-2xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(145, 92, 29, 0.7) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <Eyebrow
            label="Newsletter"
            icon={<Mail className="h-4 w-4" />}
            className="border-amber-300/60 bg-white/82 text-amber-700"
          />

          <h2
            id="newsletter-title"
            className="mt-6 font-serif text-4xl font-bold tracking-[-0.04em] text-warm-brown md:text-5xl"
          >
            Restez informé
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
            Recevez nos actualités et les nouvelles du Clos du Soleil dans une
            mise à jour sobre et occasionnelle.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
          >
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/45" />
              <Input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-full border-white/75 bg-white/88 pl-12 pr-5 shadow-soft"
                required
                maxLength={255}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 rounded-full bg-gradient-sunset px-7 text-base font-semibold shadow-elevated transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 sm:px-8"
            >
              {isSubmitting ? (
                "Envoi..."
              ) : (
                <>
                  S'inscrire
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HomeNewsletterSection;
