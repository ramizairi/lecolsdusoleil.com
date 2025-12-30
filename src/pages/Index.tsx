import { Helmet } from "react-helmet-async";
import { Info, HeartHandshake, Phone, LogIn } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavigationCard from "@/components/NavigationCard";
import heroImage from "@/assets/hero-image.jpg";
import logo from "@/assets/logo.png";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Clos du Soleil - Soins et Bien-être pour Seniors en Europe</title>
        <meta name="description" content="Clos du Soleil offre des soins de qualité et des traitements personnalisés pour les personnes âgées en Europe. Découvrez nos services de bien-être." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center pt-24">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage} 
              alt="Couple âgé heureux dans un jardin au coucher du soleil"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-2xl space-y-8">
              <div className="animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
                <img src={logo} alt="Clos du Soleil" className="h-20 w-auto mb-6" />
              </div>
              
              <h1 
                className="font-serif text-accessible-4xl md:text-[4rem] font-bold text-foreground leading-tight animate-fade-up opacity-0"
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Bienvenue au{" "}
                <span className="text-gradient-sunset">
                  Clos du Soleil
                </span>
              </h1>
              <p 
                className="text-accessible-lg text-muted-foreground leading-relaxed animate-fade-up opacity-0"
                style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
              >
                Nous accompagnons les personnes âgées en Europe avec des soins personnalisés, 
                des traitements de qualité et une attention bienveillante pour une vie épanouie.
              </p>

              <div 
                className="flex flex-wrap gap-4 animate-fade-up opacity-0"
                style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
              >
                <a 
                  href="#navigation"
                  className="bg-gradient-sunset text-primary-foreground px-10 py-5 rounded-2xl text-accessible-lg font-bold shadow-elevated hover:shadow-glow hover:scale-105 transition-all duration-300"
                >
                  Découvrir nos services
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Cards Section */}
        <section id="navigation" className="py-20 bg-gradient-soft">
          <div className="container mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="font-serif text-accessible-3xl font-bold text-foreground mb-4 animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
                Comment pouvons-nous vous aider?
              </h2>
              <p className="text-accessible-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
                Choisissez une option ci-dessous pour en savoir plus sur nos services
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <NavigationCard
                title="À Propos"
                description="Découvrez notre histoire et notre mission"
                icon={Info}
                to="/about"
                delay={200}
              />
              <NavigationCard
                title="Nos Services"
                description="Explorez nos soins et traitements"
                icon={HeartHandshake}
                to="/services"
                delay={300}
              />
              <NavigationCard
                title="Contact"
                description="Prenez rendez-vous avec nous"
                icon={Phone}
                to="/contact"
                delay={400}
              />
              <NavigationCard
                title="Espace Client"
                description="Accédez à votre compte personnel"
                icon={LogIn}
                to="/login"
                delay={500}
              />
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div className="space-y-4 animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
                <div className="text-accessible-4xl font-serif font-bold text-gradient-sunset">
                  20+
                </div>
                <p className="text-accessible-lg text-muted-foreground">Années d'expérience</p>
              </div>
              <div className="space-y-4 animate-fade-up opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
                <div className="text-accessible-4xl font-serif font-bold text-gradient-sunset">
                  5000+
                </div>
                <p className="text-accessible-lg text-muted-foreground">Patients satisfaits</p>
              </div>
              <div className="space-y-4 animate-fade-up opacity-0" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
                <div className="text-accessible-4xl font-serif font-bold text-gradient-sunset">
                  15
                </div>
                <p className="text-accessible-lg text-muted-foreground">Pays en Europe</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Index;
