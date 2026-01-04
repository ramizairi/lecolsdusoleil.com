import { Helmet } from "react-helmet-async";
import { Info, HeartHandshake, Phone, Calendar, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-luxury.jpg";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigationItems = [
    { 
      title: "Qui sommes-nous ?", 
      description: "Découvrez notre équipe", 
      icon: Info, 
      to: "/about",
      delay: 500 
    },
    { 
      title: "Nos Soins", 
      description: "Comment nous aidons", 
      icon: HeartHandshake, 
      to: "/services",
      delay: 600 
    },
    { 
      title: "Prendre Rendez-vous", 
      description: "Réservez facilement", 
      icon: Calendar, 
      to: "/contact",
      delay: 700 
    },
    { 
      title: "Nous Appeler", 
      description: "+33 1 23 45 67 89", 
      icon: Phone, 
      to: "tel:+33123456789",
      delay: 800,
      isExternal: true
    },
  ];

  const handleWhatsApp = () => {
    window.open("https://wa.me/33123456789?text=Bonjour, je souhaite avoir des informations sur vos services.", "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Clos du Soleil - Soins et Accompagnement pour Seniors en Europe</title>
        <meta name="description" content="Clos du Soleil accompagne les personnes âgées en Europe avec des soins personnalisés, de la bienveillance et du professionnalisme. Contactez-nous." />
      </Helmet>

      <div className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Full-screen Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Couple dans un jardin européen"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          {/* Warm gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>

        {/* Decorative top line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-sunset opacity-90" />

        {/* Main Content */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10">
          <div className="max-w-5xl w-full text-center space-y-10">
            
            {/* Logo */}
            <div 
              className="animate-fade-up opacity-0" 
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              <img 
                src={logo} 
                alt="Clos du Soleil" 
                className="h-20 md:h-28 w-auto mx-auto drop-shadow-lg" 
              />
            </div>

            {/* Trust Message - Clear value proposition */}
            <div 
              className="space-y-5 animate-fade-up opacity-0"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              <h1 className="font-serif text-accessible-3xl md:text-accessible-4xl lg:text-[4rem] font-bold text-foreground leading-tight">
                Vous êtes au bon endroit
              </h1>
              <p className="text-gradient-sunset font-serif text-accessible-xl md:text-accessible-2xl font-semibold">
                Accompagnement & Soins pour Seniors
              </p>
            </div>

            {/* Simple explanation */}
            <p 
              className="text-accessible-lg md:text-accessible-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              Nous accompagnons les personnes âgées vivant en Europe avec{" "}
              <strong className="text-primary">des soins personnalisés</strong>,{" "}
              de la bienveillance et du professionnalisme.
            </p>

            {/* Trust badges */}
            <div 
              className="flex flex-wrap justify-center gap-4 md:gap-6 text-accessible-base md:text-accessible-lg text-muted-foreground animate-fade-up opacity-0"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <span className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                ✓ Équipe qualifiée
              </span>
              <span className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                ✓ À votre écoute
              </span>
              <span className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                ✓ Service humain
              </span>
            </div>

            {/* Navigation Buttons - Bigger and clearer */}
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto pt-4">
              {navigationItems.map((item) => (
                item.isExternal ? (
                  <a
                    key={item.title}
                    href={item.to}
                    className="group animate-fade-up opacity-0"
                    style={{ animationDelay: `${item.delay}ms`, animationFillMode: "forwards" }}
                  >
                    <div className="relative bg-card/90 backdrop-blur-md border-2 border-border/60 rounded-2xl p-6 md:p-7 shadow-elevated hover:shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-card hover:border-primary/40 active:scale-[0.98] flex items-center gap-5">
                      <div className="w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-gradient-sunset flex items-center justify-center shadow-soft shrink-0">
                        <item.icon className="w-8 h-8 md:w-9 md:h-9 text-primary-foreground" strokeWidth={1.5} />
                      </div>
                      <div className="text-left">
                        <h2 className="font-serif text-accessible-lg md:text-accessible-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h2>
                        <p className="text-primary text-accessible-base md:text-accessible-lg font-medium mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <Link
                    key={item.title}
                    to={item.to}
                    className="group animate-fade-up opacity-0"
                    style={{ animationDelay: `${item.delay}ms`, animationFillMode: "forwards" }}
                  >
                    <div className="relative bg-card/90 backdrop-blur-md border-2 border-border/60 rounded-2xl p-6 md:p-7 shadow-elevated hover:shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-card hover:border-primary/40 active:scale-[0.98] flex items-center gap-5">
                      <div className="w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-gradient-sunset flex items-center justify-center shadow-soft shrink-0">
                        <item.icon className="w-8 h-8 md:w-9 md:h-9 text-primary-foreground" strokeWidth={1.5} />
                      </div>
                      <div className="text-left">
                        <h2 className="font-serif text-accessible-lg md:text-accessible-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h2>
                        <p className="text-muted-foreground text-accessible-base md:text-accessible-lg mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              ))}
            </nav>

            {/* WhatsApp Button - Easy contact for low digital literacy */}
            <div 
              className="animate-fade-up opacity-0 pt-2"
              style={{ animationDelay: "900ms", animationFillMode: "forwards" }}
            >
              <Button
                onClick={handleWhatsApp}
                variant="accessible"
                className="bg-[#25D366] hover:bg-[#20BD5A] text-white border-none shadow-lg hover:shadow-xl gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Écrivez-nous sur WhatsApp
              </Button>
              <p className="text-muted-foreground text-accessible-sm mt-3">
                Simple et rapide, comme envoyer un message
              </p>
            </div>
          </div>
        </main>

        {/* Simple Footer */}
        <footer 
          className="relative z-10 text-center py-6 px-6 animate-fade-up opacity-0"
          style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}
        >
          <p className="text-muted-foreground/80 text-accessible-sm">
            © 2024 Clos du Soleil — À votre service avec bienveillance
          </p>
        </footer>
      </div>
    </>
  );
};

export default Index;
