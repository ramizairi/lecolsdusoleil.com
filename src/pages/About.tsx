import { Helmet } from "react-helmet-async";
import { Heart, Shield, Users, Award, Star, Gem } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "Chaque résident est traité avec l'amour et le respect qu'il mérite, comme un membre de notre propre famille.",
    },
    {
      icon: Shield,
      title: "Excellence",
      description: "Les plus hauts standards de qualité dans chaque aspect de nos soins et de notre service.",
    },
    {
      icon: Gem,
      title: "Prestige",
      description: "Un environnement raffiné et élégant pour une expérience de vie exceptionnelle.",
    },
    {
      icon: Star,
      title: "Distinction",
      description: "Un accompagnement personnalisé qui répond aux attentes les plus exigeantes.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>À Propos - Clos du Soleil | Excellence & Prestige</title>
        <meta name="description" content="Découvrez l'histoire et la mission de Clos du Soleil, votre partenaire de prestige pour les soins aux personnes âgées en Europe." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="py-24 bg-gradient-soft relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-20 left-10 w-64 h-64 bg-sunset-coral/10 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-sunset-gold/10 rounded-full blur-3xl" />
            </div>
            
            <div className="container mx-auto px-6 text-center relative">
              <p 
                className="text-primary font-medium tracking-widest uppercase text-accessible-sm mb-6 animate-fade-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                Notre Histoire
              </p>
              <h1 
                className="font-serif text-accessible-4xl md:text-[4rem] font-bold text-foreground mb-8 animate-fade-up opacity-0" 
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                L'Excellence au Service
                <br />
                <span className="text-gradient-sunset">de l'Humanité</span>
              </h1>
              <p 
                className="text-accessible-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-up opacity-0" 
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Depuis plus de 20 ans, nous accompagnons les personnes les plus exigeantes 
                avec des soins d'exception, une équipe dévouée et un engagement sans faille envers l'excellence.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-24 bg-card">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-sunset mb-8 shadow-glow">
                  <Users className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 className="font-serif text-accessible-3xl font-bold text-foreground mb-8">
                  Notre Mission
                </h2>
                <p className="text-accessible-lg text-muted-foreground leading-relaxed">
                  Chez Clos du Soleil, nous croyons que chaque personne mérite de vivre ses années dorées 
                  dans le confort, la dignité et l'élégance. Notre mission est d'offrir une expérience 
                  de soins inégalée, où chaque détail est pensé pour le bien-être et la sérénité de nos résidents.
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-24 bg-gradient-soft">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <p className="text-primary font-medium tracking-widest uppercase text-accessible-sm mb-4">
                  Ce qui nous définit
                </p>
                <h2 className="font-serif text-accessible-3xl font-bold text-foreground">
                  Nos Valeurs
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <Card 
                    key={value.title}
                    className="text-center hover:shadow-glow transition-all duration-500 hover:scale-[1.02] bg-card/80 backdrop-blur-sm border-border/50 animate-fade-up opacity-0"
                    style={{ animationDelay: `${index * 100 + 100}ms`, animationFillMode: "forwards" }}
                  >
                    <CardContent className="pt-10 pb-8">
                      <div className="w-16 h-16 rounded-full bg-gradient-sunset flex items-center justify-center mx-auto mb-6 shadow-soft">
                        <value.icon className="w-8 h-8 text-primary-foreground" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif text-accessible-xl font-bold text-foreground mb-4">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-accessible-base leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-gradient-hero">
            <div className="container mx-auto px-6 text-center">
              <h2 className="font-serif text-accessible-3xl font-bold text-primary-foreground mb-6">
                Découvrez Notre Excellence
              </h2>
              <p className="text-accessible-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                Contactez-nous pour organiser une visite privée de nos établissements.
              </p>
              <Link to="/contact">
                <Button 
                  variant="accessible-secondary"
                  className="bg-card text-foreground hover:bg-card/90 shadow-elevated"
                >
                  Prendre Rendez-vous
                </Button>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
