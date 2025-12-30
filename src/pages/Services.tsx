import { Helmet } from "react-helmet-async";
import { Stethoscope, Brain, Activity, Home, Utensils, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "Soins Médicaux",
      description: "Consultations régulières, suivi médical personnalisé et coordination avec votre médecin traitant.",
      features: ["Examens de routine", "Suivi des maladies chroniques", "Gestion des médicaments"],
    },
    {
      icon: Brain,
      title: "Bien-être Mental",
      description: "Accompagnement psychologique et activités stimulantes pour maintenir la vivacité d'esprit.",
      features: ["Thérapie cognitive", "Groupes de discussion", "Activités mémoire"],
    },
    {
      icon: Activity,
      title: "Rééducation",
      description: "Programmes de physiothérapie et exercices adaptés pour maintenir votre mobilité.",
      features: ["Kinésithérapie", "Exercices doux", "Prévention des chutes"],
    },
    {
      icon: Home,
      title: "Soins à Domicile",
      description: "Services personnalisés directement chez vous pour un confort optimal.",
      features: ["Aide quotidienne", "Soins infirmiers", "Accompagnement"],
    },
    {
      icon: Utensils,
      title: "Nutrition",
      description: "Plans alimentaires personnalisés et conseils nutritionnels adaptés à vos besoins.",
      features: ["Régimes spéciaux", "Conseils diététiques", "Repas équilibrés"],
    },
    {
      icon: Sparkles,
      title: "Bien-être",
      description: "Massages, relaxation et activités de loisirs pour une vie épanouie.",
      features: ["Massages thérapeutiques", "Yoga doux", "Art-thérapie"],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Nos Services - Clos du Soleil</title>
        <meta name="description" content="Découvrez nos services de soins pour seniors : consultations médicales, rééducation, bien-être mental, soins à domicile et plus." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-6 text-center">
              <h1 className="font-serif text-accessible-4xl font-bold text-foreground mb-6 animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
                Nos{" "}
                <span className="bg-gradient-sunset bg-clip-text text-transparent">
                  Services
                </span>
              </h1>
              <p className="text-accessible-lg text-muted-foreground max-w-3xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
                Des soins complets et personnalisés pour accompagner chaque étape de votre vie avec sérénité et dignité.
              </p>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <Card 
                    key={service.title}
                    className="hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] animate-fade-up opacity-0"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                  >
                    <CardHeader>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-sunset flex items-center justify-center mb-4">
                        <service.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription className="text-accessible-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-hero">
            <div className="container mx-auto px-6 text-center">
              <h2 className="font-serif text-accessible-3xl font-bold text-primary-foreground mb-6">
                Prêt à commencer?
              </h2>
              <p className="text-accessible-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                Contactez-nous pour discuter de vos besoins et découvrir comment nous pouvons vous accompagner.
              </p>
              <Link to="/contact">
                <Button 
                  variant="accessible-secondary"
                  className="bg-card text-foreground hover:bg-card/90"
                >
                  Nous contacter
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

export default Services;
