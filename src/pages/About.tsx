import { Helmet } from "react-helmet-async";
import { Heart, Shield, Users, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "Nous traitons chaque patient avec amour et respect, comme s'il faisait partie de notre famille.",
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "La sécurité et le bien-être de nos patients sont notre priorité absolue.",
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Nous créons un environnement chaleureux où chacun se sent chez soi.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Nous nous engageons à fournir des soins de la plus haute qualité.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>À Propos - Clos du Soleil</title>
        <meta name="description" content="Découvrez l'histoire et la mission de Clos du Soleil, votre partenaire de confiance pour les soins aux personnes âgées en Europe." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-6 text-center">
              <h1 className="font-serif text-accessible-4xl font-bold text-foreground mb-6 animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
                À Propos de{" "}
                <span className="bg-gradient-sunset bg-clip-text text-transparent">
                  Clos du Soleil
                </span>
              </h1>
              <p className="text-accessible-lg text-muted-foreground max-w-3xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
                Depuis plus de 20 ans, nous accompagnons les personnes âgées en Europe avec des soins 
                personnalisés, une équipe dévouée et une approche centrée sur le bien-être.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif text-accessible-3xl font-bold text-foreground mb-8 text-center">
                  Notre Mission
                </h2>
                <p className="text-accessible-lg text-muted-foreground text-center leading-relaxed">
                  Chez Clos du Soleil, nous croyons que chaque personne mérite de vieillir dans la dignité, 
                  le confort et la joie. Notre mission est d'offrir des soins exceptionnels qui améliorent 
                  la qualité de vie de nos patients, tout en soutenant leurs familles avec compassion et professionnalisme.
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-6">
              <h2 className="font-serif text-accessible-3xl font-bold text-foreground mb-12 text-center">
                Nos Valeurs
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <Card 
                    key={value.title}
                    className="text-center hover:shadow-elevated transition-shadow animate-fade-up opacity-0"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                  >
                    <CardContent className="pt-8">
                      <div className="w-16 h-16 rounded-full bg-gradient-sunset flex items-center justify-center mx-auto mb-6">
                        <value.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="font-serif text-accessible-xl font-bold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-accessible-base">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
