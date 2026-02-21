import { Info, HeartHandshake, Phone, Calendar, MessageCircle, ArrowRight, Mail, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-luxury.jpg";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const emailSchema = z.string().trim().email({ message: "Veuillez entrer une adresse email valide" }).max(255);

const Index = () => {
  const navigationItems = [
    {
      title: "Découvrir",
      subtitle: "Qui sommes-nous",
      icon: Info,
      to: "/about",
      accent: "bg-amber-500",
    },
    {
      title: "Nos Services",
      subtitle: "Services sur mesure",
      icon: HeartHandshake,
      to: "/services",
      accent: "bg-rose-500",
    },
    {
      title: "Rendez-vous",
      subtitle: "Réservez en ligne",
      icon: Calendar,
      to: "/contact",
      accent: "bg-orange-500",
    },
    {
      title: "Appeler",
      subtitle: "+32 2 886 06 14",
      icon: Phone,
      to: "tel:+33123456789",
      isExternal: true,
      accent: "bg-emerald-500",
    },
  ];

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/32465200310?text=Bonjour, je souhaite avoir des informations sur vos services.",
      "_blank",
    );
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({
        title: "Email invalide",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: result.data }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        toast({
          title: "Inscription impossible",
          description: data?.error?.message ?? "Une erreur est survenue. Réessayez.",
          variant: "destructive",
        });
        return;
      }

      const description =
        data?.data?.reactivated
          ? "Votre inscription est réactivée."
          : data?.data?.isNew
            ? "Vous recevrez nos actualités très prochainement."
            : "Vous êtes déjà inscrit(e) à notre newsletter.";

      toast({
        title: data?.message ?? "Merci pour votre inscription !",
        description,
      });

      setEmail("");
    } catch (error) {
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
    <>
      <Seo
        title="Clos du Soleil - Soins et Accompagnement pour Seniors en Europe"
        description="Clos du Soleil accompagne les personnes âgées en Europe avec des soins personnalisés, de la bienveillance et du professionnalisme."
      />

      <div className="relative min-h-screen flex flex-col overflow-x-hidden">
        {/* Light Luminous Background */}
        <div className="fixed inset-2 z-0 pointer-events-none">
          <img
            src={heroImage.src}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center -300px" }}
          />
          {/* Light overlay with warm cream tones */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-amber-50/70 to-orange-50/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-amber-100/40" />

          {/* Warm golden accent at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-100/50 to-transparent" />
        </div>

        {/* Subtle warm vignette */}
        <div
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{ boxShadow: "inset 0 0 150px rgba(255,248,240,0.4)" }}
        />

        {/* Top Navigation Bar */}
        <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
          {/* Logo - Real image */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={logo.src}
                alt="Clos du Soleil"
                className="h-14 md:h-18 w-auto drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 blur-xl bg-amber-400/20 -z-10 scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>

          {/* Right side - Login */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              className="relative overflow-hidden text-foreground hover:text-foreground bg-white/70 hover:bg-white/90 border border-amber-200 hover:border-amber-400 rounded-full px-8 py-3 backdrop-blur-md shadow-lg shadow-amber-100/50 transition-all duration-300 group"
            >
              <Link href="/login">
                <span className="relative z-10 font-semibold tracking-wide">Connexion</span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />
              </Link>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-8">
          <div className="max-w-6xl w-full">
            {/* Hero Section - Left aligned for editorial feel */}
            <div className="max-w-3xl space-y-8">
              {/* Eyebrow */}
              <div
                className="animate-fade-up opacity-0"
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                <Eyebrow
                  label="Séjours pour Seniors"
                  icon={<span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />}
                  className="px-4 py-2 text-amber-700 border-amber-400/50 bg-white/80 shadow-sm"
                />
              </div>

              {/* Main Headline */}
              <h1
                className="font-serif text-4xl md:text-7xl lg:text-8xl font-bold text-warm-brown leading-[0.95] tracking-tight animate-fade-up opacity-0"
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                La douceur du soleil
                <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500">
                    la chaleur humaine.
                  </span>
                  {/* Decorative underline with animation */}
                  <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 300 12" preserveAspectRatio="none">
                    <path
                      d="M0,8 Q75,0 150,8 T300,8"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="animate-[dash_2s_ease-in-out_forwards]"
                      style={{ strokeDasharray: 400, strokeDashoffset: 400 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#d97706" />
                        <stop offset="50%" stopColor="#ea580c" />
                        <stop offset="100%" stopColor="#e11d48" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-xl md:text-2xl text-foreground/75 max-w-2xl leading-relaxed tracking-[0.005em] animate-fade-up opacity-0"
                style={{ animationDelay: "350ms", animationFillMode: "forwards" }}
              >
                Accompagnement bienveillant et soins personnalisés pour nous aînés.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-wrap gap-4 pt-4 animate-fade-up opacity-0"
                style={{ animationDelay: "450ms", animationFillMode: "forwards" }}
              >
                <Button
                  onClick={handleWhatsApp}
                  className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white border-none shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 gap-3 text-lg py-7 px-10 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 relative z-10" />
                  <span className="font-semibold relative z-10">Nous contacter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="text-foreground hover:text-foreground hover:bg-white/80 border border-amber-300 hover:border-amber-400 bg-white/50 backdrop-blur-sm gap-2 text-lg py-7 px-10 rounded-full transition-all duration-300 shadow-lg shadow-amber-100/30"
                >
                  <Link href="/services">Découvrir nos services</Link>
                </Button>
              </div>
            </div>

            {/* Navigation Cards - BIGGER with special effects */}
            <nav
              className="mt-16 md:mt-24 animate-fade-up opacity-0"
              style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {navigationItems.map((item, index) => {
                  const CardContent = (
                    <div
                      className="group relative overflow-hidden backdrop-blur-xl bg-white/80 border border-amber-200/50 hover:border-amber-300 hover:bg-white/95 rounded-3xl p-7 md:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-200/40 flex flex-col justify-between h-[190px] md:h-[230px] shadow-lg shadow-amber-100/30"
                      style={{ animationDelay: `${600 + index * 100}ms` }}
                    >
                      {/* Gradient overlay on hover */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.accent.replace("bg-", "from-")}/5 to-transparent`}
                      />

                      {/* Floating particles effect */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute w-20 h-20 -top-10 -right-10 bg-amber-200/20 rounded-full blur-xl group-hover:bg-amber-300/30 transition-all duration-700 group-hover:scale-150" />
                        <div className="absolute w-16 h-16 -bottom-8 -left-8 bg-orange-200/20 rounded-full blur-xl group-hover:bg-orange-300/30 transition-all duration-700 group-hover:scale-150" />
                      </div>

                      {/* Top section with icon */}
                      <div className="relative z-10 flex items-start justify-between">
                        <div
                          className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${item.accent} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
                        </div>

                        {/* Arrow with rotate effect */}
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-all duration-300 group-hover:rotate-[-45deg]">
                          <ArrowRight className="w-6 h-6 text-amber-600 group-hover:text-amber-700 transition-colors" />
                        </div>
                      </div>

                      {/* Text section */}
                      <div className="relative z-10 space-y-2">
                        <h2 className="font-serif font-bold text-foreground text-2xl md:text-3xl leading-tight">
                          {item.title}
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">{item.subtitle}</p>
                      </div>

                      {/* Bottom accent line */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 ${item.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                      />
                    </div>
                  );

                  return item.isExternal ? (
                    <a key={item.title} href={item.to}>
                      {CardContent}
                    </a>
                  ) : (
                    <Link key={item.title} href={item.to}>
                      {CardContent}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </main>

        {/* Newsletter Section - Simple */}
        <section 
          className="relative z-10 w-full py-12 md:py-16 border-t border-amber-200/30 animate-fade-up opacity-0"
          style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
        >
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
              Restez informé
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Recevez nos actualités et offres exclusives.
            </p>
            
            {/* Email Form */}
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 rounded-full bg-white/80 border border-amber-200 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-amber-400"
                  required
                  maxLength={255}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 px-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold gap-2 transition-all duration-300 hover:scale-105 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    S'inscrire
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </section>

        {/* Stats section */}
        <section
          className="relative z-10 w-full py-12 md:py-16 px-6 md:px-12 animate-fade-up opacity-0"
          style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {[
              {
                value: "300",
                label: "JOURS DE SOLEIL",
              },
              {
                value: "24h/7j",
                compactUnits: true,
                label: "ÉQUIPE PRÉSENTE",
              },
              {
                value: "4★",
                label: "STANDING HÔTELIER",
              },
              {
                value: "200 m",
                label: "DE LA MER",
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-amber-200/80 bg-white/75 backdrop-blur-xl min-h-[130px] md:min-h-[160px] px-3 py-5 md:px-6 md:py-7 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-200/30 hover:border-amber-300"
                style={{ animationDelay: `${850 + index * 80}ms` }}
              >
                <p className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-none text-foreground">
                  {stat.compactUnits ? (
                    <>
                      24
                      <span className="text-[0.55em] align-top">h</span>/7
                      <span className="text-[0.55em] align-top">j</span>
                    </>
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-foreground/85 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Small Footer */}
        <footer className="relative z-10 border-t border-amber-200/50 bg-white/60 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Clos du Soleil
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
