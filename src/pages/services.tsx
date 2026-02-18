import { HandHeart, Plane, Stethoscope, Palette, Utensils, BedDouble, Phone, MessageCircle, ArrowRight, Sparkles, Sun, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedBackground from "@/components/AnimatedBackground";
import SunEffect from "@/components/SunEffect";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ctaBg from "@/assets/cta-bg-sunset.jpg";

const Services = () => {
  const services = [
    {
      icon: HandHeart,
      title: "Accompagnement quotidien et personnalisé",
      description: "Accompagnement quotidien et personnalisé : aide aux gestes de la vie courante avec respect et discrétion.",
      color: "from-rose-500 to-pink-500",
      image: "/service-accompagnement.jpg",
      imagePosition: "left",
    },
    {
      icon: Plane,
      title: "Accueil et transport individuel",
      description: "Accueil et transport individuel depuis l'aéroport, avec une prise en charge adaptée aux personnes à mobilité réduite.",
      color: "from-sky-500 to-blue-500",
      image: "/service-transport.jpg",
      imagePosition: "right",
    },
    {
      icon: Stethoscope,
      title: "Soins médicaux et paramédicaux",
      description: "Présence d'une équipe compétente composée d'infirmier(ère)s et d'un kinésithérapeute, proposant des séances de rééducation et de maintien de la mobilité adaptées aux besoins de chacun.",
      color: "from-emerald-500 to-teal-500",
      image: "/service-medical.jpg",
      imagePosition: "left",
    },
    {
      icon: Palette,
      title: "Activités et loisirs",
      description: "Ateliers créatifs, moments de détente, sorties culturelles et sociales pour stimuler le corps et l'esprit.",
      color: "from-violet-500 to-purple-500",
      image: "/service-activities.jpg",
      imagePosition: "right",
    },
    {
      icon: Utensils,
      title: "Repas équilibrés et conviviaux",
      description: "Repas équilibrés et conviviaux : préparés avec soin et adaptés aux besoins de chacun, avec la formule all inclusive soft.",
      color: "from-amber-500 to-orange-500",
      image: "/service-meals.jpg",
      imagePosition: "left",
    },
    {
      icon: BedDouble,
      title: "CONFORT ET PROPRETÉ",
      description:
        "L'hébergement en chambre moderne et spacieuse avec terrasse ou balcon privatif.\nPassage quotidien d'une femme de chambre.\nLa blanchisserie : linge de maison fourni et vêtements personnels entretenus avec soin.",
      color: "from-indigo-500 to-blue-500",
      image: "/service-comfort.jpg",
      imagePosition: "right",
    },
  ];

  const handleCall = () => {
    window.location.href = "tel:+3228860614";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/32465200310?text=Bonjour, je souhaite en savoir plus sur vos services.", "_blank");
  };

  return (
    <>
      <Seo
        title="Nos Services - Clos du Soleil | Résidence Hôtelière pour Seniors en Tunisie"
        description="Découvrez nos services : accompagnement quotidien et personnalisé, soins médicaux et paramédicaux, transport aéroport, activités et repas équilibrés au Clos du Soleil en Tunisie."
      />

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
                <Eyebrow label="Nos Services" icon={<Sparkles className="w-4 h-4" />} className="text-lg" />
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
                Au Clos du Soleil, nous offrons une gamme complète de services pour le bien-être de nos résidents.
              </p>
            </div>
          </section>

          {/* Services Sections - Clean Alternating Layout */}
          <section className="py-24 relative">
            <div className="container mx-auto px-6 space-y-20">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`flex flex-col ${
                    service.imagePosition === "left"
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  } gap-12 md:gap-16 items-center md:items-stretch animate-fade-up opacity-0`}
                  style={{
                    animationDelay: `${150 + index * 100}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  {/* Image - Clean and Simple */}
                  <div className="flex-1">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-72 md:h-96 object-cover rounded-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>



          {/* Qui sommes-nous Section */}
          <section className="py-20 relative">
            <SunEffect variant="subtle" className="inset-0" />

            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <Eyebrow label="Qui sommes-nous ?" icon={<Sun className="w-4 h-4" />} className="mb-6" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Le Clos du Soleil, une résidence dédiée au bien-être
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Le Clos du Soleil est une résidence hôtelière pour seniors située en Tunisie. Nous accueillons des personnes âgées dans un cadre calme, sécurisé et bienveillant. Nous offrons un accompagnement quotidien, des soins personnalisés et une attention particulière au bien-être et à la dignité de chaque résident.
                </p>
              </div>
            </div>
          </section>

          {/* Pourquoi nous choisir Section */}
          <section className="py-20 relative">
            <SunEffect variant="subtle" className="inset-0" />
            
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <Eyebrow label="Pourquoi nous choisir ?" icon={<Sun className="w-4 h-4" />} className="mb-6" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
                  La Tunisie, un cadre de vie idéal
                </h2>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl p-8 md:p-10 border border-amber-200/50 dark:border-amber-800/30 mb-10">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-amber-700 dark:text-amber-300 mb-3">
                    40% moins cher qu'en Europe
                  </h3>
                  <p className="text-amber-600 dark:text-amber-200 font-medium">
                    Un coût de vie et d'hébergement significativement réduit pour un même niveau de qualité
                  </p>
                </div>
                <div className="grid md:grid-cols-1 gap-4 text-left">
                  {[
                    "La Tunisie, c'est la sécurité, le soleil, la mer et un climat agréable",
                    "Une alimentation fraîche et équilibrée toute l'année",
                    "Une attention personnalisée et un cadre de vie apaisant au Clos du Soleil",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 transition-colors duration-300">
                      <div className="flex-shrink-0 mt-1">
                        <Check className="w-6 h-6 text-amber-600 dark:text-amber-400 font-bold" />
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section with Background Image */}
          <section className="py-32 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={ctaBg.src}
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
                <Eyebrow
                  label="Contactez-nous"
                  icon={<Phone className="w-4 h-4" />}
                  className="text-amber-300 border-amber-400/30 bg-amber-400/10 shadow-none"
                />
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
