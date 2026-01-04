import { Helmet } from "react-helmet-async";
import { Info, HeartHandshake, Phone, Calendar, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-luxury.jpg";
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
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Couple dans un jardin européen"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          {/* Modern gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
          
          {/* Decorative blobs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
        </div>

        {/* Animated top border */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-animated" />

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-10 w-4 h-4 rounded-full bg-primary/40 animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-40 left-20 w-3 h-3 rounded-full bg-accent/40 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 right-20 w-5 h-5 rounded-full bg-sunset-gold/40 animate-float" style={{ animationDelay: "2s" }} />

        {/* Main Content */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10">
          <div className="max-w-5xl w-full text-center space-y-8">
            
            {/* Logo with glow */}
            <div 
              className="animate-fade-up opacity-0" 
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-sunset rounded-full blur-2xl opacity-30 scale-150" />
                <img 
                  src={logo} 
                  alt="Clos du Soleil" 
                  className="relative h-20 md:h-28 w-auto mx-auto drop-shadow-2xl" 
                />
              </div>
            </div>

            {/* Hero Text with modern typography */}
            <div 
              className="space-y-4 animate-fade-up opacity-0"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-accessible-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Bienvenue chez Clos du Soleil</span>
              </div>
              
              <h1 className="font-serif text-accessible-3xl md:text-accessible-4xl lg:text-[4.5rem] font-bold text-foreground leading-[1.1]">
                Vous êtes au{" "}
                <span className="text-shimmer">bon endroit</span>
              </h1>
            </div>

            {/* Subtitle with accent */}
            <p 
              className="text-accessible-lg md:text-accessible-xl text-foreground/85 max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              Nous accompagnons les personnes âgées en Europe avec{" "}
              <span className="text-primary font-semibold">des soins personnalisés</span>,{" "}
              de la bienveillance et du professionnalisme.
            </p>

            {/* Trust badges with glass effect */}
            <div 
              className="flex flex-wrap justify-center gap-3 md:gap-4 animate-fade-up opacity-0"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              {["Équipe qualifiée", "À votre écoute", "Service humain"].map((badge, i) => (
                <span 
                  key={badge}
                  className="flex items-center gap-2 glass px-5 py-2.5 rounded-full text-accessible-base text-foreground/80 font-medium shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-sunset" />
                  {badge}
                </span>
              ))}
            </div>

            {/* Elegant divider */}
            <div 
              className="flex items-center justify-center gap-4 py-2 animate-fade-up opacity-0"
              style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
            >
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <div className="w-3 h-3 rounded-full bg-gradient-sunset animate-pulse-glow" />
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>

            {/* Navigation Cards - Clean minimal design */}
            <nav className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
              {navigationItems.map((item) => {
                const CardContent = (
                  <div className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col items-center text-center gap-4">
                    {/* Icon circle */}
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={1.5} />
                    </div>
                    
                    {/* Text content */}
                    <div>
                      <h2 className="font-serif text-accessible-base md:text-accessible-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h2>
                      <p className={`text-sm md:text-accessible-base mt-1 ${item.isExternal ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                );

                return item.isExternal ? (
                  <a
                    key={item.title}
                    href={item.to}
                    className="animate-fade-up opacity-0"
                    style={{ animationDelay: `${item.delay}ms`, animationFillMode: "forwards" }}
                  >
                    {CardContent}
                  </a>
                ) : (
                  <Link
                    key={item.title}
                    to={item.to}
                    className="animate-fade-up opacity-0"
                    style={{ animationDelay: `${item.delay}ms`, animationFillMode: "forwards" }}
                  >
                    {CardContent}
                  </Link>
                );
              })}
            </nav>

            {/* WhatsApp CTA - Eye-catching design */}
            <div 
              className="animate-fade-up opacity-0 pt-4"
              style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}
            >
              <Button
                onClick={handleWhatsApp}
                className="relative overflow-hidden bg-[#25D366] hover:bg-[#20BD5A] text-white border-none shadow-lg hover:shadow-xl gap-3 text-accessible-lg py-7 px-8 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
                <MessageCircle className="w-6 h-6" />
                <span className="font-semibold">Écrivez-nous sur WhatsApp</span>
              </Button>
              <p className="text-muted-foreground text-accessible-sm mt-4 font-medium">
                Simple et rapide — comme envoyer un message à un ami
              </p>
            </div>
          </div>
        </main>

        {/* Modern Footer */}
        <footer 
          className="relative z-10 text-center py-8 px-6 animate-fade-up opacity-0"
          style={{ animationDelay: "1100ms", animationFillMode: "forwards" }}
        >
          <div className="flex items-center justify-center gap-3 text-muted-foreground text-accessible-sm">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-border" />
            <span>© 2024 Clos du Soleil</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <span>Avec bienveillance</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-border" />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
