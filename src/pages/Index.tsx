import { Helmet } from "react-helmet-async";
import { Info, HeartHandshake, Phone, Calendar, MessageCircle, ArrowRight, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-luxury.jpg";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigationItems = [
    { 
      title: "Découvrir", 
      subtitle: "Qui sommes-nous",
      icon: Info, 
      to: "/about",
      accent: "bg-amber-500"
    },
    { 
      title: "Nos Soins", 
      subtitle: "Services sur mesure",
      icon: HeartHandshake, 
      to: "/services",
      accent: "bg-rose-500"
    },
    { 
      title: "Rendez-vous", 
      subtitle: "Réservez en ligne",
      icon: Calendar, 
      to: "/contact",
      accent: "bg-orange-500"
    },
    { 
      title: "Appeler", 
      subtitle: "+33 1 23 45 67 89",
      icon: Phone, 
      to: "tel:+33123456789",
      isExternal: true,
      accent: "bg-emerald-500"
    },
  ];

  const handleWhatsApp = () => {
    window.open("https://wa.me/33123456789?text=Bonjour, je souhaite avoir des informations sur vos services.", "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Clos du Soleil - Soins et Accompagnement pour Seniors en Europe</title>
        <meta name="description" content="Clos du Soleil accompagne les personnes âgées en Europe avec des soins personnalisés, de la bienveillance et du professionnalisme." />
      </Helmet>

      <div className="relative min-h-screen flex flex-col overflow-x-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt=""
            className="w-full h-full object-cover object-top"
          />
          {/* Dark cinematic overlay - stronger for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/50" />
          
          {/* Warm color accent at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-orange-950/40 to-transparent" />
        </div>

        {/* Subtle vignette */}
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{ boxShadow: 'inset 0 0 200px rgba(0,0,0,0.5)' }} />

        {/* Top Navigation Bar */}
        <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl md:text-2xl font-bold text-white tracking-tight">
              Clos du Soleil
            </span>
          </div>

          {/* Login Button */}
          <Link to="/login">
            <Button 
              variant="ghost"
              className="text-white/90 hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full px-6 py-2 backdrop-blur-sm transition-all duration-300"
            >
              Connexion
            </Button>
          </Link>
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
                <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-amber-400 border border-amber-400/30 rounded-full">
                  Soins Premium pour Seniors
                </span>
              </div>

              {/* Main Headline */}
              <h1 
                className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight animate-fade-up opacity-0"
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                L'excellence au
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">
                  service du cœur
                </span>
              </h1>

              {/* Subtitle */}
              <p 
                className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed animate-fade-up opacity-0"
                style={{ animationDelay: "350ms", animationFillMode: "forwards" }}
              >
                Accompagnement bienveillant et soins personnalisés pour vos proches, 
                partout en Europe.
              </p>

              {/* CTA Buttons */}
              <div 
                className="flex flex-wrap gap-4 pt-4 animate-fade-up opacity-0"
                style={{ animationDelay: "450ms", animationFillMode: "forwards" }}
              >
                <Button
                  onClick={handleWhatsApp}
                  className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white border-none shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 gap-3 text-lg py-7 px-8 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">Nous contacter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Link to="/services">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-white/10 border border-white/30 hover:border-white/50 gap-2 text-lg py-7 px-8 rounded-full transition-all duration-300"
                  >
                    Découvrir nos services
                  </Button>
                </Link>
              </div>
            </div>

            {/* Navigation Cards - Bottom section */}
            <nav 
              className="mt-16 md:mt-24 animate-fade-up opacity-0"
              style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {navigationItems.map((item) => {
                  const CardContent = (
                    <div className="group relative backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 flex items-center gap-4 h-[90px] md:h-[100px]">
                      {/* Accent bar */}
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 ${item.accent} rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors">
                        <item.icon className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                      </div>
                      
                      {/* Text */}
                      <div className="min-w-0">
                        <h2 className="font-semibold text-white text-base md:text-lg leading-tight truncate">
                          {item.title}
                        </h2>
                        <p className="text-white/50 text-sm truncate">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-4 h-4 text-white/30 ml-auto shrink-0 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                    </div>
                  );

                  return item.isExternal ? (
                    <a key={item.title} href={item.to}>
                      {CardContent}
                    </a>
                  ) : (
                    <Link key={item.title} to={item.to}>
                      {CardContent}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </main>

        {/* Bottom Stats Bar */}
        <footer 
          className="relative z-10 border-t border-white/10 backdrop-blur-sm bg-black/20 animate-fade-up opacity-0"
          style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-8 md:gap-12">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider">Familles</div>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white">15+</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider">Années</div>
                </div>
                <div className="w-px h-8 bg-white/20 hidden md:block" />
                <div className="hidden md:block">
                  <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider">Disponible</div>
                </div>
              </div>
              
              <div className="text-white/40 text-sm">
                © 2024 Clos du Soleil
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;