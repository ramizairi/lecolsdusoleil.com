import { Helmet } from "react-helmet-async";
import { Stethoscope, Brain, Activity, Home, Utensils, Heart, Phone, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "Soins Médicaux",
      description: "Consultations régulières et suivi médical personnalisé par notre équipe de professionnels.",
    },
    {
      icon: Brain,
      title: "Bien-être Mental",
      description: "Accompagnement psychologique et activités pour garder l'esprit vif et serein.",
    },
    {
      icon: Activity,
      title: "Rééducation",
      description: "Exercices adaptés et kinésithérapie pour maintenir votre mobilité et votre autonomie.",
    },
    {
      icon: Home,
      title: "Soins à Domicile",
      description: "Services personnalisés directement chez vous, dans le confort de votre maison.",
    },
    {
      icon: Utensils,
      title: "Nutrition",
      description: "Conseils alimentaires adaptés à vos besoins pour une santé optimale.",
    },
    {
      icon: Heart,
      title: "Accompagnement",
      description: "Présence bienveillante et soutien au quotidien pour vous et votre famille.",
    },
  ];

  const handleCall = () => {
    window.location.href = "tel:+33123456789";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/33123456789?text=Bonjour, je souhaite en savoir plus sur vos services.", "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Nos Services - Clos du Soleil</title>
        <meta name="description" content="Découvrez nos services de soins pour seniors : consultations médicales, rééducation, bien-être mental, soins à domicile et accompagnement personnalisé." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-soft">
            <div className="container mx-auto px-6 text-center">
              <h1 className="font-serif text-accessible-3xl md:text-accessible-4xl font-bold text-foreground mb-4 animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
                Comment nous{" "}
                <span className="text-gradient-sunset">vous aidons</span>
              </h1>
              <p className="text-accessible-lg md:text-accessible-xl text-foreground/80 max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
                Des soins adaptés à vos besoins, dispensés avec bienveillance par notre équipe qualifiée.
              </p>
            </div>
          </section>

          {/* Services Grid - Simplified */}
          <section className="py-16 bg-card">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {services.map((service, index) => (
                  <Card 
                    key={service.title}
                    className="hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] animate-fade-up opacity-0 border-2 border-border/50 hover:border-primary/30"
                    style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: "forwards" }}
                  >
                    <CardHeader className="pb-3">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-sunset flex items-center justify-center mb-4">
                        <service.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-accessible-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-accessible-lg text-muted-foreground">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section - Warm and inviting */}
          <section className="py-20 bg-gradient-hero">
            <div className="container mx-auto px-6 text-center">
              <h2 className="font-serif text-accessible-2xl md:text-accessible-3xl font-bold text-primary-foreground mb-4">
                Des questions sur nos services ?
              </h2>
              <p className="text-accessible-lg md:text-accessible-xl text-primary-foreground/90 max-w-xl mx-auto mb-10">
                Notre équipe est à votre écoute pour vous conseiller et répondre à toutes vos questions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleCall}
                  variant="accessible"
                  className="bg-card text-foreground hover:bg-card/90 text-accessible-lg py-7 px-8"
                >
                  <Phone className="w-6 h-6" />
                  Appelez-nous
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  variant="accessible"
                  className="bg-[#25D366] hover:bg-[#20BD5A] border-none text-white text-accessible-lg py-7 px-8"
                >
                  <MessageCircle className="w-6 h-6" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Services;
