import { Helmet } from "react-helmet-async";
import { Heart, Shield, Users, Star, Gem, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "Chaque résident est traité avec l'amour et le respect qu'il mérite.",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Excellence",
      description: "Les plus hauts standards de qualité dans chaque aspect de nos soins.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Gem,
      title: "Prestige",
      description: "Un environnement raffiné et élégant pour une expérience exceptionnelle.",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Star,
      title: "Distinction",
      description: "Un accompagnement personnalisé pour les attentes les plus exigeantes.",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <>
      <Helmet>
        <title>À Propos - Clos du Soleil | Excellence & Prestige</title>
        <meta name="description" content="Découvrez l'histoire et la mission de Clos du Soleil, votre partenaire de prestige pour les soins aux personnes âgées en Europe." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <AnimatedBackground variant="sunrise" />
        <PageHeader />

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="py-20 md:py-28 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center relative z-10">
              {/* Eyebrow */}
              <div 
                className="animate-fade-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-primary border border-primary/30 rounded-full bg-primary/5 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Notre Histoire
                </span>
              </div>
              
              <h1 
                className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mt-8 mb-6 animate-fade-up opacity-0" 
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                L'Excellence au Service
                <br />
                <span className="text-gradient-sunset">de l'Humanité</span>
              </h1>
              
              <p 
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-up opacity-0" 
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Depuis plus de 20 ans, nous accompagnons les personnes les plus exigeantes 
                avec des soins d'exception et un engagement sans faille.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-20 bg-card/50 backdrop-blur-sm border-y border-border/50">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-sunset mb-8 shadow-glow animate-fade-up opacity-0"
                  style={{ animationFillMode: "forwards" }}
                >
                  <Users className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 
                  className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-up opacity-0"
                  style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
                >
                  Notre Mission
                </h2>
                <p 
                  className="text-lg text-muted-foreground leading-relaxed animate-fade-up opacity-0"
                  style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
                >
                  Chez Clos du Soleil, nous croyons que chaque personne mérite de vivre ses années dorées 
                  dans le confort, la dignité et l'élégance. Notre mission est d'offrir une expérience 
                  de soins inégalée, où chaque détail est pensé pour le bien-être de nos résidents.
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-24 relative">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-primary border border-primary/30 rounded-full bg-primary/5 mb-6">
                  Ce qui nous définit
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  Nos Valeurs
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <Card 
                    key={value.title}
                    className="group relative overflow-hidden text-center hover:shadow-glow transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-border/50 animate-fade-up opacity-0"
                    style={{ animationDelay: `${index * 100 + 100}ms`, animationFillMode: "forwards" }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${value.color}`} />
                    
                    <CardContent className="pt-10 pb-8 relative z-10">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <value.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                    
                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-gradient-hero relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
            </div>
            
            <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Découvrez Notre Excellence
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                Contactez-nous pour organiser une visite privée de nos établissements.
              </p>
              <Link to="/contact">
                <Button 
                  className="group bg-card text-foreground hover:bg-card/90 shadow-elevated gap-3 text-lg py-7 px-10 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Prendre Rendez-vous
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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