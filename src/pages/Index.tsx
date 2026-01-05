import { Helmet } from "react-helmet-async";
import { Info, HeartHandshake, Phone, Calendar, MessageCircle, Sparkles, LogIn, Star } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigationItems = [
    { 
      title: "Qui sommes-nous ?", 
      description: "Notre équipe bienveillante", 
      icon: Info, 
      to: "/about",
      delay: 600,
      gradient: "from-orange-400 to-amber-500"
    },
    { 
      title: "Nos Soins", 
      description: "Services personnalisés", 
      icon: HeartHandshake, 
      to: "/services",
      delay: 700,
      gradient: "from-rose-400 to-orange-500"
    },
    { 
      title: "Prendre Rendez-vous", 
      description: "Réservez facilement", 
      icon: Calendar, 
      to: "/contact",
      delay: 800,
      gradient: "from-amber-400 to-yellow-500"
    },
    { 
      title: "Nous Appeler", 
      description: "+33 1 23 45 67 89", 
      icon: Phone, 
      to: "tel:+33123456789",
      delay: 900,
      isExternal: true,
      gradient: "from-emerald-400 to-teal-500"
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

      <div className="relative min-h-screen flex flex-col overflow-hidden bg-background">
        {/* Sophisticated gradient background - no image */}
        <div className="absolute inset-0 z-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
          
          {/* Animated orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/25 via-accent/15 to-transparent rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/20 via-primary/10 to-transparent rounded-full blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial opacity-50" />
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        {/* Animated top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-animated z-50" />

        {/* Floating Login Button - Top Right */}
        <div className="fixed top-4 right-4 md:top-6 md:right-8 z-50 animate-fade-up opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
          <Link to="/login">
            <Button 
              className="glass-strong border-border/50 hover:border-primary/50 text-foreground hover:text-primary gap-2 px-5 py-2.5 rounded-full shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5"
              variant="ghost"
            >
              <LogIn className="w-4 h-4" />
              <span className="font-medium">Connexion</span>
            </Button>
          </Link>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-32 right-16 w-3 h-3 rounded-full bg-primary/40 animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-48 left-24 w-2 h-2 rounded-full bg-accent/50 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 right-24 w-4 h-4 rounded-full bg-primary/30 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-48 left-16 w-2 h-2 rounded-full bg-accent/40 animate-float" style={{ animationDelay: "1.5s" }} />

        {/* Main Content */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-10">
          <div className="max-w-5xl w-full text-center space-y-10">
            
            {/* Logo with elegant glow */}
            <div 
              className="animate-fade-up opacity-0" 
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-sunset rounded-full blur-3xl opacity-20 scale-[2]" />
                <img 
                  src={logo} 
                  alt="Clos du Soleil" 
                  className="relative h-24 md:h-32 w-auto mx-auto drop-shadow-xl" 
                />
              </div>
            </div>

            {/* Hero Text - Clean and impactful */}
            <div 
              className="space-y-6 animate-fade-up opacity-0"
              style={{ animationDelay: "250ms", animationFillMode: "forwards" }}
            >
              {/* Premium badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-accessible-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Bienvenue chez Clos du Soleil</span>
              </div>
              
              {/* Main headline - with solid background for contrast */}
              <div className="relative">
                <h1 className="font-serif text-accessible-4xl md:text-[4rem] lg:text-[5rem] font-bold leading-[1.05] text-foreground">
                  Prenez soin de{" "}
                  <span className="relative inline-block">
                    <span className="text-gradient-sunset">vos proches</span>
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <path d="M0,6 Q50,0 100,6 T200,6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>
              </div>
            </div>

            {/* Subtitle */}
            <p 
              className="text-accessible-lg md:text-accessible-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              Nous accompagnons les personnes âgées en Europe avec{" "}
              <span className="text-foreground font-medium">des soins personnalisés</span>,{" "}
              de la bienveillance et du professionnalisme.
            </p>

            {/* Star rating trust element */}
            <div 
              className="flex items-center justify-center gap-1 animate-fade-up opacity-0"
              style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
              <span className="ml-3 text-muted-foreground text-accessible-base font-medium">
                Plus de 500 familles accompagnées
              </span>
            </div>

            {/* Navigation Cards - Refined design */}
            <nav 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full max-w-4xl mx-auto pt-4 animate-fade-up opacity-0"
              style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
            >
              {navigationItems.map((item, index) => {
                const CardContent = (
                  <div className="group relative bg-card border border-border/80 rounded-2xl p-5 md:p-6 hover:border-primary/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-elevated flex flex-col items-center justify-center text-center gap-4 h-[150px] md:h-[170px] overflow-hidden">
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Icon with gradient background */}
                    <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0`}>
                      <item.icon className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={1.5} />
                    </div>
                    
                    {/* Text content */}
                    <div className="relative">
                      <h2 className="font-serif text-accessible-base md:text-accessible-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                        {item.title}
                      </h2>
                      <p className={`text-sm mt-1.5 leading-tight ${item.isExternal ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                );

                return item.isExternal ? (
                  <a
                    key={item.title}
                    href={item.to}
                    className="block"
                  >
                    {CardContent}
                  </a>
                ) : (
                  <Link
                    key={item.title}
                    to={item.to}
                    className="block"
                  >
                    {CardContent}
                  </Link>
                );
              })}
            </nav>

            {/* WhatsApp CTA */}
            <div 
              className="animate-fade-up opacity-0 pt-6"
              style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
            >
              <Button
                onClick={handleWhatsApp}
                className="relative overflow-hidden bg-[#25D366] hover:bg-[#1fb855] text-white border-none shadow-lg hover:shadow-xl gap-3 text-accessible-lg py-7 px-10 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <MessageCircle className="w-6 h-6" />
                <span className="font-semibold">Écrivez-nous sur WhatsApp</span>
              </Button>
              <p className="text-muted-foreground text-accessible-sm mt-4 font-medium">
                Simple et rapide — comme envoyer un message à un ami
              </p>
            </div>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer 
          className="relative z-10 text-center py-8 px-6 animate-fade-up opacity-0"
          style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}
        >
          <div className="flex items-center justify-center gap-3 text-muted-foreground text-accessible-sm">
            <span>© 2024 Clos du Soleil</span>
            <span className="w-1 h-1 rounded-full bg-primary/50" />
            <span>Avec bienveillance ❤️</span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
