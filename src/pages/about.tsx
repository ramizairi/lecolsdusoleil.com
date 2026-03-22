import { Heart, Shield, Users, Star, Home, MapPin, ArrowRight, Sparkles } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedBackground from "@/components/AnimatedBackground";
import SunEffect from "@/components/SunEffect";
import ContactCallToActionSection from "@/components/ContactCallToActionSection";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Bienveillance",
      description: "Un accompagnement quotidien dans le respect et la dignité de chaque résident.",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "Un cadre calme et sécurisé pour vivre sereinement au quotidien.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Home,
      title: "Confort",
      description: "Une résidence hôtelière pensée pour votre bien-être et votre épanouissement.",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Star,
      title: "Excellence",
      description: "Des soins personnalisés et une attention particulière à chaque détail.",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <>
      <Seo
        title="Qui Sommes-Nous - Clos du Soleil | Résidence pour Seniors en Tunisie"
        description="Le Clos du Soleil est une résidence hôtelière pour seniors en Tunisie. Découvrez notre mission : accompagnement, soins personnalisés et bien-être."
      />

      <div className="min-h-screen flex flex-col">
        <AnimatedBackground variant="sunrise" />
        <PageHeader />

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="py-20 md:py-28 relative overflow-hidden">
            <SunEffect variant="corner" className="inset-0 z-0" />
            
            <div className="container mx-auto px-3 text-center relative z-10 sm:px-6">
              {/* Eyebrow */}
              <div 
                className="animate-fade-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <Eyebrow label="Qui Sommes-Nous" icon={<Sparkles className="w-4 h-4" />} />
              </div>
              
              <h1 
                className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mt-8 mb-6 animate-fade-up opacity-0" 
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                Une résidence d'exception
                <br />
                <span className="text-gradient-sunset">en Tunisie</span>
              </h1>
              
              <p 
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-up opacity-0" 
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Le Clos du Soleil est une résidence hôtelière pour seniors située en Tunisie.
                Nous accueillons des personnes âgées dans un cadre calme, sécurisé et bienveillant.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-20 bg-card/60 backdrop-blur-sm border-y border-border/50 relative">
            <SunEffect variant="subtle" className="inset-0" />
            
            <div className="container mx-auto px-3 relative z-10 sm:px-6">
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
                  Nous offrons un accompagnement quotidien, des soins personnalisés et une attention 
                  particulière au bien-être et à la dignité de chaque résident. Notre équipe dévouée 
                  s'engage à créer un environnement chaleureux où chacun peut profiter pleinement 
                  de ses journées dans le confort et la sérénité.
                </p>
                
                <div className="flex items-center justify-center gap-2 mt-8 text-primary animate-fade-up opacity-0" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Tunisie</span>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-24 relative">
            <SunEffect variant="corner" className="inset-0" />
            
            <div className="container mx-auto px-3 relative z-10 sm:px-6">
              <div className="text-center mb-16">
                <Eyebrow label="Ce qui nous définit" icon={<Star className="w-4 h-4" />} className="mb-6" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  Nos Valeurs
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <Card 
                    key={value.title}
                    className="group relative overflow-hidden text-center hover:shadow-glow transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 bg-card backdrop-blur-sm border-border/50 animate-fade-up opacity-0"
                    style={{ animationDelay: `${index * 100 + 100}ms`, animationFillMode: "forwards" }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 bg-gradient-to-br ${value.color}`} />
                    
                    {/* Sun decoration */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 group-hover:scale-150 transition-all duration-700" />
                    
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

          <ContactCallToActionSection
            title="Découvrez Notre Résidence"
            description={
              <>
                Contactez-nous pour organiser une visite et découvrir le cadre
                de vie exceptionnel du Clos du Soleil.
              </>
            }
            buttonLabel="Prendre Rendez-vous"
            buttonHref="/contact"
            buttonTrailingIcon={
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            }
            sectionClassName="py-32"
          />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
