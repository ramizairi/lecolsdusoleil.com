import { Helmet } from "react-helmet-async";
import { Info, HeartHandshake, Phone, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-luxury.jpg";
import logo from "@/assets/logo.png";

const Index = () => {
  const navigationItems = [
    { 
      title: "À Propos", 
      description: "Notre histoire", 
      icon: Info, 
      to: "/about",
      delay: 400 
    },
    { 
      title: "Services", 
      description: "Nos soins", 
      icon: HeartHandshake, 
      to: "/services",
      delay: 500 
    },
    { 
      title: "Contact", 
      description: "Nous joindre", 
      icon: Phone, 
      to: "/contact",
      delay: 600 
    },
    { 
      title: "Espace Client", 
      description: "Connexion", 
      icon: LogIn, 
      to: "/login",
      delay: 700 
    },
  ];

  return (
    <>
      <Helmet>
        <title>Clos du Soleil - Soins d'Excellence pour Seniors en Europe</title>
        <meta name="description" content="Clos du Soleil offre des soins de prestige et des traitements personnalisés pour les personnes âgées en Europe. Excellence et bien-être." />
      </Helmet>

      <div className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Full-screen Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Couple élégant dans un jardin européen"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          {/* Luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-sunset opacity-80" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sunset-gold/30 to-transparent" />

        {/* Main Content */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-5xl w-full text-center space-y-12">
            
            {/* Logo & Title */}
            <div className="space-y-8">
              <div 
                className="animate-fade-up opacity-0" 
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                <img 
                  src={logo} 
                  alt="Clos du Soleil" 
                  className="h-24 md:h-32 w-auto mx-auto drop-shadow-lg" 
                />
              </div>
              
              <div 
                className="space-y-4 animate-fade-up opacity-0"
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                <h1 className="font-serif text-accessible-3xl md:text-accessible-4xl lg:text-[4.5rem] font-bold text-foreground leading-tight tracking-tight">
                  L'Excellence au Service
                  <br />
                  <span className="text-gradient-sunset">de Votre Bien-Être</span>
                </h1>
              </div>
              
              <p 
                className="text-accessible-lg md:text-accessible-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0 font-light"
                style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
              >
                Soins personnalisés et accompagnement d'exception 
                pour une vie sereine et épanouie.
              </p>
            </div>

            {/* Elegant Divider */}
            <div 
              className="flex items-center justify-center gap-4 animate-fade-up opacity-0"
              style={{ animationDelay: "350ms", animationFillMode: "forwards" }}
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-sunset-gold/50" />
              <div className="w-2 h-2 rounded-full bg-sunset-gold/60" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-sunset-gold/50" />
            </div>

            {/* Navigation Buttons */}
            <nav className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.to}
                  className="group animate-fade-up opacity-0"
                  style={{ animationDelay: `${item.delay}ms`, animationFillMode: "forwards" }}
                >
                  <div className="relative bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl p-6 md:p-8 shadow-elevated hover:shadow-glow transition-all duration-500 hover:scale-[1.03] hover:bg-card/95 hover:border-primary/30 active:scale-[0.98] min-h-[160px] md:min-h-[200px] flex flex-col items-center justify-center gap-4 overflow-hidden">
                    
                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-sunset-coral/5 via-transparent to-sunset-gold/5" />
                    
                    {/* Icon */}
                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-sunset flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-500 group-hover:scale-110">
                      <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" strokeWidth={1.5} />
                    </div>
                    
                    {/* Text */}
                    <div className="relative text-center">
                      <h2 className="font-serif text-accessible-lg md:text-accessible-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h2>
                      <p className="text-muted-foreground text-accessible-sm md:text-accessible-base mt-1 opacity-80">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </main>

        {/* Elegant Footer */}
        <footer 
          className="relative z-10 text-center py-8 px-6 animate-fade-up opacity-0"
          style={{ animationDelay: "900ms", animationFillMode: "forwards" }}
        >
          <p className="text-muted-foreground/70 text-accessible-sm font-light tracking-wide">
            © 2024 Clos du Soleil — Excellence & Sérénité
          </p>
        </footer>
      </div>
    </>
  );
};

export default Index;
