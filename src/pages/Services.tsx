import { Helmet } from "react-helmet-async";
import { HandHeart, Plane, Stethoscope, Palette, Utensils, Phone, MessageCircle, ArrowRight, Sparkles, Sun, Waves, Apple, Heart } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedBackground from "@/components/AnimatedBackground";
import SunEffect from "@/components/SunEffect";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ctaBg from "@/assets/cta-bg-sunset.jpg";

const Services = () => {
  const services = [
    {
      icon: HandHeart,
      title: "Accompagnement Quotidien",
      description: "Aide aux gestes de la vie courante avec respect et discrétion, pour un accompagnement personnalisé.",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: Plane,
      title: "Accueil & Transport",
      description: "Transport individuel depuis l'aéroport, avec une prise en charge adaptée aux personnes à mobilité réduite.",
      color: "from-sky-500 to-blue-500",
    },
    {
      icon: Stethoscope,
      title: "Soins Médicaux",
      description: "Équipe compétente d'infirmier(ère)s et kinésithérapeute, proposant rééducation et maintien de la mobilité.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Palette,
      title: "Activités & Loisirs",
      description: "Ateliers créatifs, moments de détente, sorties culturelles et sociales pour stimuler le corps et l'esprit.",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Utensils,
      title: "Repas All Inclusive",
      description: "Repas équilibrés et conviviaux, préparés avec soin et adaptés aux besoins de chacun, formule all inclusive soft.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Heart,
      title: "Bien-être & Dignité",
      description: "Chaque service pensé pour offrir confort, sécurité et plaisir de vivre, en respectant le rythme de nos résidents.",
      color: "from-red-500 to-rose-500",
    },
  ];

  const whyChooseUs = [
    {
      icon: Sun,
      title: "Soleil & Climat",
      description: "La Tunisie offre sécurité, soleil et un climat agréable toute l'année.",
    },
    {
      icon: Waves,
      title: "Bord de Mer",
      description: "Profitez de la proximité de la mer et d'un cadre de vie apaisant.",
    },
    {
      icon: Apple,
      title: "Alimentation Saine",
      description: "Une alimentation fraîche, équilibrée et préparée avec des produits locaux.",
    },
    {
      icon: HandHeart,
      title: "Attention Personnalisée",
      description: "Chaque résident bénéficie d'une attention personnalisée et d'un suivi adapté.",
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
        <title>Nos Services - Clos du Soleil | Résidence Hôtelière pour Seniors en Tunisie</title>
        <meta name="description" content="Découvrez nos services : accompagnement quotidien, soins médicaux, transport aéroport, activités et repas all inclusive au Clos du Soleil en Tunisie." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <AnimatedBackground variant="sunset" />
        <PageHeader />

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="py-20 md:py-28 relative">
            <SunEffect variant="corner" className="inset-0 z-0" />
            
            <div className="container mx-auto px-6 text-center relative z-10">
              {/* Eyebrow */}
              <div 
                className="animate-fade-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <span className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-[0.2em] uppercase text-primary border border-primary/30 rounded-full bg-primary/5 backdrop-blur-sm shadow-soft">
                  <Sparkles className="w-4 h-4" />
                  Nos Services
                </span>
              </div>
              
              <h1 
                className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mt-8 mb-6 animate-fade-up opacity-0" 
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                Une gamme complète pour{" "}
                <span className="text-gradient-sunset">votre bien-être</span>
              </h1>
              
              <p 
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up opacity-0" 
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Au Clos du Soleil, nous offrons des services pensés pour le confort, la sécurité et le plaisir de vivre de nos résidents.
              </p>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-16 bg-card/60 backdrop-blur-sm border-y border-border/50 relative">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {services.map((service, index) => (
                  <Card 
                    key={service.title}
                    className="group relative overflow-hidden hover:shadow-glow transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 animate-fade-up opacity-0 border-2 border-border/50 hover:border-primary/30 bg-card backdrop-blur-sm"
                    style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: "forwards" }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 bg-gradient-to-br ${service.color}`} />
                    
                    {/* Floating sun decoration */}
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 group-hover:scale-150 transition-all duration-700" />
                    
                    <CardHeader className="pb-3 relative z-10">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-serif">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-base text-muted-foreground leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                    
                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-20 relative">
            <SunEffect variant="subtle" className="inset-0" />
            
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-[0.2em] uppercase text-primary border border-primary/30 rounded-full bg-primary/5 mb-6 shadow-soft">
                  <Sun className="w-4 h-4" />
                  Pourquoi nous choisir
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  La Tunisie, un cadre de vie idéal
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Sécurité, soleil, mer et climat agréable pour une qualité de vie exceptionnelle.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {whyChooseUs.map((item, index) => (
                  <Card 
                    key={item.title}
                    className="group relative overflow-hidden text-center hover:shadow-glow transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 bg-card backdrop-blur-sm border-border/50 animate-fade-up opacity-0"
                    style={{ animationDelay: `${index * 100 + 100}ms`, animationFillMode: "forwards" }}
                  >
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 group-hover:scale-150 transition-all duration-700" />
                    
                    <CardContent className="pt-8 pb-6 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section with Background Image */}
          <section className="py-32 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src={ctaBg} 
                alt="" 
                className="w-full h-full object-cover"
              />
              {/* Elegant overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
            </div>
            
            {/* Sun rays effect */}
            <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
              <div 
                className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(42 90% 70% / 0.15) 0%, transparent 50%)",
                  filter: "blur(40px)",
                }}
              />
            </div>
            
            {/* Vignette */}
            <div className="absolute inset-0 z-[1]" style={{ boxShadow: 'inset 0 0 150px rgba(0,0,0,0.4)' }} />
            
            <div className="container mx-auto px-6 text-center relative z-10">
              <div 
                className="animate-fade-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <span className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-[0.2em] uppercase text-amber-300 border border-amber-400/30 rounded-full bg-amber-400/10 backdrop-blur-sm">
                  <Phone className="w-4 h-4" />
                  Contactez-nous
                </span>
              </div>
              
              <h2 
                className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mt-8 mb-6 animate-fade-up opacity-0"
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                Prêt à découvrir le Clos du Soleil ?
              </h2>
              <p 
                className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-12 animate-fade-up opacity-0"
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Notre équipe est à votre écoute pour organiser votre séjour et répondre à toutes vos questions.
              </p>
              
              <div 
                className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0"
                style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
              >
                <Button 
                  onClick={handleCall}
                  className="group relative overflow-hidden bg-white text-foreground hover:bg-white/95 text-lg py-7 px-10 rounded-full shadow-elevated gap-3 transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">Appelez-nous</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  className="group relative overflow-hidden bg-[#25D366] hover:bg-[#20BD5A] border-none text-white text-lg py-7 px-10 rounded-full shadow-elevated gap-3 transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">WhatsApp</span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
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