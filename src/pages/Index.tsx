import { Helmet } from "react-helmet-async";
import { Info, HeartHandshake, Phone, Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-luxury.jpg";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

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
          {/* Logo - Real image */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={logo} 
                alt="Clos du Soleil" 
                className="h-14 md:h-18 w-auto drop-shadow-2xl transition-transform duration-300 group-hover:scale-105" 
              />
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 blur-xl bg-amber-400/20 -z-10 scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>

          {/* Right side - Theme toggle and Login */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <Link to="/login">
              <Button 
                variant="ghost"
                className="relative overflow-hidden text-white/90 hover:text-white bg-white/5 hover:bg-white/15 border border-white/20 hover:border-amber-400/50 rounded-full px-8 py-3 backdrop-blur-md transition-all duration-300 group"
              >
                <span className="relative z-10 font-semibold tracking-wide">Connexion</span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </Button>
            </Link>
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
                <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-amber-400 border border-amber-400/30 rounded-full bg-amber-400/5 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
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
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">
                    service du cœur
                  </span>
                  {/* Decorative underline with animation */}
                  <svg 
                    className="absolute -bottom-2 left-0 w-full h-4" 
                    viewBox="0 0 300 12" 
                    preserveAspectRatio="none"
                  >
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
                        <stop offset="0%" stopColor="#fcd34d" />
                        <stop offset="50%" stopColor="#fb923c" />
                        <stop offset="100%" stopColor="#fb7185" />
                      </linearGradient>
                    </defs>
                  </svg>
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
                  className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white border-none shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 gap-3 text-lg py-7 px-10 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 relative z-10" />
                  <span className="font-semibold relative z-10">Nous contacter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </Button>

                <Link to="/services">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-white/10 border border-white/30 hover:border-white/50 gap-2 text-lg py-7 px-10 rounded-full transition-all duration-300"
                  >
                    Découvrir nos services
                  </Button>
                </Link>
              </div>
            </div>

            {/* Navigation Cards - BIGGER with special effects */}
            <nav 
              className="mt-16 md:mt-24 animate-fade-up opacity-0"
              style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {navigationItems.map((item, index) => {
                  const CardContent = (
                    <div 
                      className="group relative overflow-hidden backdrop-blur-xl bg-white/[0.07] border border-white/[0.12] hover:border-white/30 hover:bg-white/[0.12] rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20 flex flex-col justify-between h-[160px] md:h-[180px]"
                      style={{ animationDelay: `${600 + index * 100}ms` }}
                    >
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.accent.replace('bg-', 'from-')}/10 to-transparent`} />
                      
                      {/* Floating particles effect */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute w-20 h-20 -top-10 -right-10 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all duration-700 group-hover:scale-150" />
                        <div className="absolute w-16 h-16 -bottom-8 -left-8 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all duration-700 group-hover:scale-150" />
                      </div>
                      
                      {/* Top section with icon */}
                      <div className="relative z-10 flex items-start justify-between">
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${item.accent} bg-opacity-20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={1.5} />
                        </div>
                        
                        {/* Arrow with rotate effect */}
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:rotate-[-45deg]">
                          <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      
                      {/* Text section */}
                      <div className="relative z-10 space-y-1">
                        <h2 className="font-serif font-bold text-white text-xl md:text-2xl leading-tight">
                          {item.title}
                        </h2>
                        <p className="text-white/50 text-sm md:text-base">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Bottom accent line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 ${item.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
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
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">Familles</div>
                  </div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">15+</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">Années</div>
                  </div>
                </div>
                <div className="w-px h-10 bg-white/20 hidden md:block" />
                <div className="hidden md:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">Disponible</div>
                  </div>
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